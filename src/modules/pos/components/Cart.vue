<template>
  <div class="w-full h-full flex flex-col justify-between gap-4">
    <div class="w-full space-y-4">
      <div class="flex items-center justify-between">
        <h1 class="text-lg font-semibold text-gray-900">
          Cart ({{ posStore.cartItemCount }})
        </h1>
        <Button
          severity="danger"
          variant="outlined"
          icon="pi pi-trash"
          label="Clear All"
          size="small"
          :disabled="posStore.cartItems.length === 0"
          @click="onClearCart"
        />
      </div>
    </div>
    
    <div class="flex-1 p-4 rounded-xl bg-gray-50 overflow-y-auto">
      <div
        v-if="posStore.cartItems.length === 0"
        class="h-full flex flex-col items-center justify-center"
      >
        <i class="pi pi-shopping-cart text-[32px] mb-4" />
        <p class="text-base text-gray-500">Cart is empty</p>
      </div>
      
      <div
        v-else
        class="space-y-3"
      >
        <UiCard
          v-for="item in posStore.cartItems"
          :key="item.id"
        >
          <div class="space-y-4">
            <div class="flex gap-3">
              <div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <img
                  v-if="item.thumbnail"
                  :src="item.thumbnail"
                  :alt="item.name"
                  class="w-full h-full object-cover rounded-lg"
                >
                <i
                  v-else
                  class="pi pi-image text-2xl text-gray-400"
                />
              </div>
              
              <div class="flex-1 min-w-0">
                <div class="font-semibold text-gray-900 truncate">
                  {{ item.name }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ item.category }}
                </div>
                <div class="text-sm font-semibold text-primary mt-1">
                  {{ getCurrency(item.price) }}
                </div>
              </div>
              
              <div class="flex flex-col items-end justify-between">
                <Button
                  icon="pi pi-trash"
                  severity="danger"
                  text
                  rounded
                  size="small"
                  @click="removeItem(item.id)"
                />
                
                <div class="flex items-center gap-2">
                  <Button
                    icon="pi pi-minus"
                    size="small"
                    rounded
                    outlined
                    @click="decrementQuantity(item.id)"
                  />
                  <span class="w-8 text-center font-semibold">
                    {{ item.quantity }}
                  </span>
                  <Button
                    icon="pi pi-plus"
                    size="small"
                    rounded
                    outlined
                    :disabled="item.quantity >= item.stock_qty"
                    @click="incrementQuantity(item.id)"
                  />
                </div>
              </div>
            </div>
            
            <Divider class="my-2" />
            
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600">Subtotal</span>
              <span class="font-semibold text-gray-900">
                {{ getCurrency(Number(item.price) * item.quantity) }}
              </span>
            </div>
          </div>
        </UiCard>
      </div>
    </div>

    <div
      v-if="isUserInShift"
      class="w-full space-y-4"
    >
      <div class="p-4 rounded-xl bg-gray-50 space-y-4">
        <div class="space-y-2">
          <div class="text-sm font-medium text-gray-700">Payment Method</div>
          <Select
            v-model="transactionForm.payment_method"
            :options="paymentMethods"
            option-label="label"
            option-value="value"
            placeholder="Select Payment Method"
            fluid
            class="w-full"
          />
        </div>

        <div class="flex items-center justify-between">
          <label class="text-sm font-medium text-gray-700">Is Offline Order?</label>
          <InputSwitch
            v-model="transactionForm.is_offline"
            :binary="true"
          />
        </div>
      </div>
      
      <div class="p-4 rounded-xl bg-gray-50 space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-900">
            Total ({{ posStore.cartItemCount }})
          </span>
          <span class="text-sm text-primary font-semibold">
            {{ getCurrency(posStore.cartTotal) }}
          </span>
        </div>
        <Button
          label="Checkout"
          size="medium"
          fluid
          :disabled="isCanCheckout"
          :loading="isCheckingOut"
          @click="onCheckout"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { usePosStore } from '@/modules/pos/stores';
import { getCurrency } from '@/helpers/utils.ts';
import { showConfirm, showToast } from '@/helpers/toast.ts';
import { postTransaction } from '@/modules/transaction/services/api.ts';
import UiCard from '@/components/UiCard.vue';

const props = defineProps({
  isUserInShift: {
    type: Boolean,
    default: false,
  },
  shiftId: {
    type: String,
    default: ''
  },
  outletId: {
    type: String,
    default: ''
  },
});

const posStore = usePosStore();
const isCheckingOut = ref(false);

const transactionForm = ref({
  outlet_id: '',
  shift_id: '',
  payment_method: 'cash',
  is_offline: true,
  device_id: `device-${Date.now()}`,
});

const paymentMethods = ref([
  { label: 'Cash', value: 'cash' },
  { label: 'Debit Card', value: 'debit' },
  { label: 'Credit Card', value: 'credit' },
  { label: 'E-Wallet', value: 'e-wallet' },
  { label: 'QRIS', value: 'qris' },
]);

watch(() => props.outletId, (newVal: string) => {
  transactionForm.value.outlet_id = newVal;
}, { immediate: true });

watch(() => props.shiftId, (newVal: string) => {
  transactionForm.value.shift_id = newVal;
}, { immediate: true });

// Cart Items
const removeItem = (productId: string) => {
  posStore.removeFromCart(productId);
};

const incrementQuantity = (productId: string) => {
  posStore.incrementQuantity(productId);
};

const decrementQuantity = (productId: string) => {
  posStore.decrementQuantity(productId);
};

const onClearCart = () => {
  showConfirm({
    header: 'Clear Cart',
    message: 'Are you sure you want to clear the cart?',
    rejectLabel: 'Cancel',
    acceptLabel: 'Clear',
    type: 'warn',
    accept: () => {
      posStore.clearCart();
      showToast({
        type: 'success',
        title: 'Cart cleared',
        message: 'All items removed from cart',
      });
    },
  });
};

// Checkout Process
const isCanCheckout = computed(() => {
  return (
    posStore.cartItems.length === 0 ||
    isCheckingOut.value ||
    !transactionForm.value.shift_id ||
    !transactionForm.value.outlet_id ||
    !transactionForm.value.payment_method
  );
});

const onCheckout = async () => {
  if (isCheckingOut.value) return;
  
  // Validate form
  if (!transactionForm.value.outlet_id) {
    showToast({
      type: 'error',
      title: 'Validation Error',
      message: 'Please select an outlet',
    });
    return;
  }
  
  if (!transactionForm.value.shift_id) {
    showToast({
      type: 'error',
      title: 'Validation Error',
      message: 'Please select a shift',
    });
    return;
  }
  
  if (!transactionForm.value.payment_method) {
    showToast({
      type: 'error',
      title: 'Validation Error',
      message: 'Please select a payment method',
    });
    return;
  }
  
  try {
    isCheckingOut.value = true;
    
    // Prepare transaction payload
    const payload = {
      outlet_id: transactionForm.value.outlet_id,
      shift_id: transactionForm.value.shift_id,
      payment_method: transactionForm.value.payment_method,
      is_offline: transactionForm.value.is_offline,
      device_id: transactionForm.value.device_id,
      items: posStore.cartItems.map(item => ({
        product_id: item.id,
        qty: item.quantity
      }))
    };
    
    const response = await postTransaction(payload);
    
    if (response.data) {
      showToast({
        type: 'success',
        title: 'Transaction Complete',
        message: 'Transaction has been processed successfully',
      });
      
      posStore.clearCart();
    }
  } catch (error: any) {
    console.error('Checkout error:', error);
    showToast({
      type: 'error',
      title: 'Checkout Failed',
      message: error.response?.data?.message || 'Failed to process transaction',
    });
  } finally {
    isCheckingOut.value = false;
  }
};
</script>

<template>
  <div class="pos-page">
    <div class="pos-page__product space-y-4">
      <div
        class="w-full p-2 rounded-lg border border-gray-200 bg-white"
        :class="{
          'border-red-200 bg-red-50!': currentShift.status !== ShiftStatus.OPEN,
          'border-yellow-200 bg-yellow-50!': currentShift.status === ShiftStatus.OPEN,
        }"
      >
        <div class="flex items-center justify-between gap-4">
          <div class="flex-1 flex gap-2 items-center pl-2">
            <i
              class="pi pi-circle-fill"
              style="font-size: 10px;"
              :class="{
                'text-red-400': currentShift.status !== ShiftStatus.OPEN,
                'text-yellow-400': currentShift.status === ShiftStatus.OPEN,
              }"
            />
            <span
              v-if="currentShift.status === ShiftStatus.OPEN"
              class="flex-1 text-sm text-gray-900 font-semibold"
            >
              {{ currentShift?.users?.name?.split(' ')[0] }}'s in Shift
            </span>
            <span
              v-else
              class="flex-1 text-sm text-gray-900 font-semibold"
            >
              No One's in Shift
            </span>
          </div>
          <Button
            v-if="!loadingShift && isUserInShift && currentShift.status === ShiftStatus.OPEN"
            severity="secondary"
            variant="outlined"
            label="Close Shift"
            size="small"
            class="bg-white!"
            @click="handleShift"
          />
          <Button
            v-if="!loadingShift && currentShift.status === ShiftStatus.CLOSE"
            severity="secondary"
            variant="outlined"
            label="Open Shift"
            size="small"
            class="bg-white!"
            @click="handleShift"
          />
        </div>
      </div>

      <PosProduct :is-user-in-shift="isUserInShift" />
    </div>
    <PosCart
      :is-user-in-shift="isUserInShift"
      :shift-id="currentShift?.id"
      :outlet-id="currentShift?.outlet_id"
      class="pos-page__cart"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { getErrorMessage } from '@/helpers/utils.ts';
import { showConfirm, showToast } from '@/helpers/toast.ts';
import { getOutlet, getUser } from '@/helpers/auth.ts';
import { openShift, closeShift, getOutletShift } from '@/modules/shift/services/api.ts';
import PosCart from '@/modules/pos/components/Cart.vue';
import PosProduct from '@/modules/pos/components/Product.vue';

interface CurrentShift {
  id: string;
  user_id: string;
  outlet_id: string;
  status: string;
  start_time: string;
  end_time: string;
  users: {
    id?: string;
    name?: string;
    username?: string;
  } | null;
};

const ShiftStatus = {
  OPEN: 'open',
  CLOSE: 'closed',
}

const user = getUser();
const outlet = getOutlet();

// Shift Management
const loadingShift = ref(false);
const currentShift = ref<CurrentShift>({
  id: '',
  user_id: '',
  outlet_id: outlet?.id,
  status: ShiftStatus.CLOSE,
  start_time: '',
  end_time: '',
  users: null,
});

const isUserInShift = computed(() => {
  return currentShift.value.status === ShiftStatus.OPEN && 
    currentShift.value.user_id === user?.id;
})

const fetchOutletShift = async () => {
  try {
    loadingShift.value = true;
    const response = await getOutletShift(outlet?.id);
    const { data, success } = response?.data || {};

    if (success) {
      currentShift.value.id = data?.id;
      currentShift.value.user_id = data?.user_id;
      currentShift.value.status = data?.status;
      currentShift.value.start_time = data?.start_time;
      currentShift.value.end_time = data?.end_time;
      currentShift.value.users = data?.users;
    }
  } catch (error) {
    console.error('failed to fetch outlet shift', error);
  } finally {
    loadingShift.value = false;
  }
}

const onOpenShift = async () => {
  try {
    loadingShift.value = true;
    const payload = {
      outlet_id: currentShift.value.outlet_id,
    };
    const response = await openShift(payload);
    const { success } = response?.data || {};

    if (success) {
      fetchOutletShift();
    }
  } catch (error) {
    showToast({
      type: 'error',
      title: 'Open Shift Failed.',
      message: getErrorMessage(error) || 'There was an error.',
    });
  } finally {
    loadingShift.value = false;
  }
};

const onCloseShift = async () => {
  showConfirm({
    header: 'Close Shift',
    message: 'Are you sure you want to close this shift?',
    rejectLabel: 'Cancel',
    acceptLabel: 'Close',
    type: 'warn',
    accept: async () => {
      try {
        loadingShift.value = true;
        const shiftId = currentShift.value.id;
        const response = await closeShift(shiftId);
        const { success } = response?.data || {};

        if (success) {
          fetchOutletShift();
        }
      } catch (error) {
        showToast({
          type: 'error',
          title: 'Close Shift Failed.',
          message: getErrorMessage(error) || 'There was an error.',
        });
      } finally {
        loadingShift.value = false;
      }
    },
  });
};

const handleShift = () => {
  if (currentShift.value.status === ShiftStatus.OPEN) {
    onCloseShift();
  } else {
    onOpenShift();
  }
};

onMounted(() => {
  fetchOutletShift();
});
</script>

<style scoped>
@import "tailwindcss";

.pos-page {
  @apply w-full h-full;
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 1rem;
}

.pos-page__product {
  @apply relative flex-1;
}

.pos-page__cart {
  @apply sticky right-0 flex-1;
  top: 72px;
  height: max(100vh - 90px);
}
</style>

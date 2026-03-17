<template>
  <div
    class="pos-page"
    :class="{
      'pos-page--mobile': !isWeb,
      'pos-page--desktop': isWeb,
    }"
  >
    <!-- POS Product -->
    <div lass="pos-page__product">
      <div
        v-if="currentShift && currentShift?.id"
        class="pos-shift-status pos-shift-status--dark"
        :class="{
          'pos-shift-status--open': currentShift.status === ShiftStatus.OPEN,
          'pos-shift-status--closed': currentShift.status !== ShiftStatus.OPEN,
        }"
      >
        <div class="pos-shift-status__content">
          <div class="pos-shift-status__left">
            <i
              class="pi pi-circle-fill pos-shift-status__indicator"
              :class="{
                'pos-shift-status__indicator--closed': currentShift.status !== ShiftStatus.OPEN,
                'pos-shift-status__indicator--open': currentShift.status === ShiftStatus.OPEN,
              }"
            />
            <span
              v-if="currentShift.status === ShiftStatus.OPEN"
              class="pos-shift-status__label"
            >
              {{ currentShift?.users?.name?.split(' ')[0] }}'s in Shift
            </span>
            <span
              v-else
              class="pos-shift-status__label pos-shift-status__label--empty pos-shift-status__label--empty-dark"
            >
              No One's in Shift
            </span>
          </div>
          <Button
            v-if="!loadingShift && isUserInShift && currentShift.status === ShiftStatus.OPEN"
            severity="success"
            variant="soft"
            label="Close Shift"
            size="small"
            @click="handleShift"
          />
          <Button
            v-if="!loadingShift && currentShift.status === ShiftStatus.CLOSE"
            severity="danger"
            variant="soft"
            label="Open Shift"
            size="small"
            @click="handleShift"
          />
        </div>
      </div>

      <PosProduct :is-user-in-shift="isUserInShift" />
    </div>

    <!-- POS Cart -->
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
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/modules/auth/stores/index.ts';
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

// Device type
const authStore = useAuthStore();
const { deviceType } = storeToRefs(authStore);

const isWeb = computed(() => deviceType.value === 'web');

onMounted(() => {
  fetchOutletShift();
});
</script>

<style scoped>
@import "tailwindcss";
@import "@/assets/styles/themes.css";

.pos-page {
  @apply w-full h-full grid gap-4;
}

.pos-page--mobile {
  @apply grid-cols-1 pb-20;
}

.pos-page--desktop {
  @apply grid-cols-[1fr_420px];
}

.pos-page__product {
  @apply relative flex-1;
}

.pos-page__cart {
  @apply sticky right-0 flex-1;
  top: 72px;
  height: max(100vh - 90px);
}

/* Shift Status Component */
.pos-shift-status {
  @apply w-full p-2 rounded-lg border transition-colors duration-200 mb-4;
}

.pos-shift-status--open {
  @apply border-green-500 bg-green-50;
}

.pos-shift-status--closed {
  @apply border-red-500 bg-red-50;
}

.pos-shift-status--dark {
  @apply dark:border-dark! dark:bg-dark-secondary!;
}

.pos-shift-status__content {
  @apply flex items-center justify-between gap-4;
}

.pos-shift-status__left {
  @apply flex-1 flex gap-2 items-center pl-2;
}

.pos-shift-status__indicator {
  font-size: 10px;
}

.pos-shift-status__indicator--open {
  @apply text-green-400 dark:text-green-400;
}

.pos-shift-status__indicator--closed {
  @apply text-red-400 dark:text-red-400;
}

.pos-shift-status__label {
  @apply flex-1 text-sm font-semibold;
}

.pos-shift-status__label--empty {
  @apply text-gray-900;
}

.pos-shift-status__label--empty-dark {
  @apply dark:text-white;
}
</style>

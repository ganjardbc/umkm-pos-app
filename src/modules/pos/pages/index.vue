<template>
  <div
    class="pos-page"
    :class="{
      'pos-page--mobile': !isWeb,
      'pos-page--desktop': isWeb,
    }"
  >
    <!-- POS Product -->
    <div class="pos-page__content">
      <ShiftStatus :outlet-id="outlet?.id" />

      <!-- Tabs for Products and Shift Management -->
       <Tabs v-model:value="activeTab">
        <TabList class="bg-transparent!">
            <Tab value="0">Products</Tab>
          <Tab value="1">Shifts</Tab>
        </TabList>
      </Tabs>

      <!-- Products Tab -->
      <PosProduct
        v-if="activeTab === '0'"
        :is-user-in-shift="isUserInShift"
      />

      <!-- Shift Management Tab -->
      <PosShift
        v-if="activeTab === '1'"
        :outlet-id="outlet?.id"
        @shift-loaded="onShiftLoaded"
      />
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
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/modules/auth/stores/index.ts';
import { useShift } from '@/modules/shift/composables/useShift.ts';
import { getOutlet } from '@/helpers/auth.ts';
import PosCart from '@/modules/pos/components/Cart.vue';
import PosProduct from '@/modules/pos/components/Product.vue';
import PosShift from '@/modules/pos/components/Shift.vue';
import ShiftStatus from '@/modules/pos/components/ShiftStatus.vue';

const activeTab = ref<string>('0');
const outlet = getOutlet();

// Use shift composable to get shift data for PosCart
const { currentShift } = useShift();

// Device type
const authStore = useAuthStore();
const { deviceType } = storeToRefs(authStore);

const isWeb = computed(() => deviceType.value === 'web');

// Computed for PosCart
const isUserInShift = computed(() => {
  return currentShift.status === 'open';
});

const onShiftLoaded = (shiftData: any) => {
  // Handle shift loaded event if needed
  console.log('Shift loaded:', shiftData);
};
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

.pos-page__content {
  @apply relative flex-1 space-y-4;
}

.pos-page__cart {
  @apply sticky right-0 flex-1;
  top: 72px;
  height: max(100vh - 90px);
}
</style>

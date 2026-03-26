<template>
  <div class="w-full space-y-4">
    <div class="flex gap-4 items-center">
      <Button
        severity="secondary"
        icon="pi pi-arrow-left"
        size="small"
        @click="onBack"
      />
      <h1 class="text-2xl font-semibold">
        Shift Detail
      </h1>
    </div>

    <!-- Shift Information -->
    <Information
      v-if="currentShift.id"
      :current-shift="currentShift"
    />

    <!-- Metrics Tab -->
    <MetricsDisplay
      v-if="currentShift.id"
      :shift-id="currentShift.id"
      :participants="participants"
    />
  </div>
</template>

<script setup lang="ts">
import MetricsDisplay from '@/modules/pos/components/MetricsDisplay.vue';
import Information from '@/modules/shift/components/Information.vue';
import { useShift } from '@/modules/shift/composables/useShift.ts';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted } from 'vue';

const route = useRoute();
const router = useRouter();
const shiftID = computed(() => route.params.id as string);

const { currentShift, participants, fetchShift, fetchShiftParticipants } = useShift();

const fetchDetailShift = async () => {
  try {
    // Set current shift
    await fetchShift({ shiftId: shiftID.value });
    
    // Fetch participants
    await fetchShiftParticipants({ shiftId: shiftID.value });
  } catch (error) {
    console.error('Failed to fetch shift:', error);
  }
};

// Methods
const onBack = () => {
  router.back();
};

onMounted(() => {
  fetchDetailShift();
});
</script>

<style scoped></style>

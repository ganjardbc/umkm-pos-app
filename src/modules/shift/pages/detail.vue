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
    <UiCard v-if="currentShift.id">
      <div class="w-full flex gap-4 items-center justify-between">
        <h1 class="text-lg font-semibold">
          Shift Information
        </h1>
      </div>

      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Outlet Information -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-600 dark:text-gray-400">Outlet</label>
            <div class="text-base font-semibold text-gray-900 dark:text-white">
              {{ currentShift.outlet?.name || 'N/A' }}
            </div>
          </div>

          <!-- Shift Owner -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-600 dark:text-gray-400">Shift Owner</label>
            <div class="text-base font-semibold text-gray-900 dark:text-white">
              {{ currentShift.shift_owner?.name || 'N/A' }}
            </div>
          </div>

          <!-- Created At -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-600 dark:text-gray-400">Created</label>
            <div class="text-base font-semibold text-gray-900 dark:text-white">
              {{ currentShift.created_at ? formatDateTime(currentShift.created_at) : 'N/A' }}
            </div>
          </div>

          <!-- Status -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-600 dark:text-gray-400">Status</label>
            <div>
              <Tag
                :value="currentShift.status?.toUpperCase() || 'N/A'"
                :severity="currentShift.status === 'open' ? 'success' : 'secondary'"
              />
            </div>
          </div>
        </div>

        <Divider />

        <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <!-- Participant Count -->
          <div class="p-4 flex flex-row xl:flex-col gap-2 justify-between items-center rounded-lg bg-gray-50 dark:bg-dark">
            <label class="text-sm font-medium text-gray-600 dark:text-gray-400">Participants</label>
            <div class="text-base font-semibold text-gray-900 dark:text-white">
              {{ currentShift.participant_count || 0 }}
            </div>
          </div>

          <!-- Total Transactions -->
          <div class="p-4 flex flex-row xl:flex-col gap-2 justify-between items-center rounded-lg bg-gray-50 dark:bg-dark">
            <label class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Transactions</label>
            <div class="text-base font-semibold text-gray-900 dark:text-white">
              {{ currentShift.total_transactions || 0 }}
            </div>
          </div>

          <!-- Shift Time -->
          <div class="p-4 flex flex-row xl:flex-col gap-2 justify-between items-center rounded-lg bg-gray-50 dark:bg-dark">
            <label class="text-sm font-medium text-gray-600 dark:text-gray-400">Shift Time</label>
            <div class="text-base font-semibold text-gray-900 dark:text-white">
              {{ formatRangeTime(currentShift.start_time, currentShift.end_time) }}
            </div>
          </div>
        </div>
      </div>
    </UiCard>

    <!-- Participant -->
    <UiCard v-if="currentShift.id">
      <div class="w-full flex gap-4 items-center justify-between">
        <h1 class="text-lg font-semibold">
          User Shifts
        </h1>
      </div>

      <div class="space-y-4">
        <div
          v-for="(participant, i) in participants"
          :key="i"
          class="participant-item"
        >
          <div class="participant-item__info">
            <div class="flex justify-between">
              <div class="participant-item__name">
                {{ participant.user_name }}
              </div>
              <div class="flex justify-end gap-2">
                <Tag
                  v-if="participant.is_owner"
                  value="Shift Owner"
                  severity="info"
                />
                <Tag
                  v-if="participant.participant_removed_at"
                  value="Removed"
                  severity="warning"
                />
              </div>
            </div>
            <div class="participant-item__meta">
              <span class="text-xs text-gray-500">
                Added: {{ formatDateTime(participant.participant_added_at) }}
              </span>
              <Divider v-if="participant.participant_removed_at" layout="vertical" />
              <span v-if="participant.participant_removed_at" class="text-xs text-gray-500">
                Removed: {{ formatDateTime(participant.participant_removed_at) }}
              </span>
              <Divider v-if="participant.transaction_count" layout="vertical" />
              <span v-if="participant.transaction_count" class="text-xs text-gray-500">
                Transactions: {{ participant.transaction_count }}
              </span>
            </div>
          </div>
        </div>

        <div v-if="participants.length === 0" class="text-center py-4 text-gray-500 dark:text-gray-400">
          No participants
        </div>
      </div>
    </UiCard>

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
import { useShift } from '@/modules/shift/composables/useShift.ts';
import UiCard from '@/components/UiCard.vue';
import { formatDateTime, formatRangeTime } from '@/helpers/utils.ts';
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

<style scoped>
@import "tailwindcss";
@import "@/assets/styles/themes.css";

.participant-item {
  @apply flex items-center justify-between p-3 bg-gray-50 dark:bg-dark rounded-lg border border-gray-200 dark:border-dark;
}

.participant-item__info {
  @apply flex-1;
}

.participant-item__name {
  @apply flex-1 font-medium text-gray-900 dark:text-white flex items-center;
}

.participant-item__meta {
  @apply flex gap-0 mt-1;
}

.participant-item__actions {
  @apply flex gap-2 ml-4;
}
</style>

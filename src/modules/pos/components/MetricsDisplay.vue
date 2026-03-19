<template>
  <div class="metrics-display">
    <div class="metrics-display__header">
      <h3 class="metrics-display__title">Performance Metrics</h3>
    </div>

    <div class="metrics-display__content">
      <div v-if="loading" class="metrics-display__loading">
        <ProgressSpinner />
      </div>

      <div v-else-if="metrics.length === 0" class="metrics-display__empty">
        <p>No metrics available</p>
      </div>

      <div v-else class="metrics-display__grid">
        <div
          v-for="metric in metrics"
          :key="metric.user_id"
          class="metric-card"
        >
          <div class="metric-card__header">
            <h4 class="metric-card__name">{{ metric.user_name }}</h4>
            <Tag
              v-if="metric.participant_removed_at"
              value="Inactive"
              severity="warning"
            />
          </div>

          <div class="metric-card__body">
            <div class="metric-row">
              <span class="metric-label">Transactions:</span>
              <span class="metric-value">{{ metric.transaction_count }}</span>
            </div>

            <div class="metric-row">
              <span class="metric-label">Total Amount:</span>
              <span class="metric-value">{{ formatCurrency(metric.total_amount) }}</span>
            </div>

            <div class="metric-row">
              <span class="metric-label">Average:</span>
              <span class="metric-value">{{ formatCurrency(metric.average_transaction_amount) }}</span>
            </div>

            <div class="metric-row">
              <span class="metric-label">Duration:</span>
              <span class="metric-value">{{ metric.participation_duration_minutes }} min</span>
            </div>

            <div class="metric-row">
              <span class="metric-label">Added:</span>
              <span class="metric-value text-xs">{{ formatDate(metric.participant_added_at) }}</span>
            </div>

            <div v-if="metric.participant_removed_at" class="metric-row">
              <span class="metric-label">Removed:</span>
              <span class="metric-value text-xs">{{ formatDate(metric.participant_removed_at) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useShift } from '@/modules/shift/composables/useShift';
import { showToast } from '@/helpers/toast';
import { getErrorMessage } from '@/helpers/utils';
import Tag from 'primevue/tag';
import ProgressSpinner from 'primevue/progressspinner';

interface Metric {
  user_id: string;
  user_name: string;
  transaction_count: number;
  total_amount: number;
  average_transaction_amount: number;
  participation_duration_minutes: number;
  participant_added_at: string;
  participant_removed_at?: string;
}

const props = defineProps({
  shiftId: {
    type: String,
    required: true,
  },
  participants: {
    type: Array as () => Array<{ user_id: string; user_name: string }>,
    required: true,
  },
});

const { fetchParticipantMetrics } = useShift();
const metrics = ref<Metric[]>([]);
const loading = ref(false);

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(amount);
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleString();
};

const loadMetrics = async () => {
  loading.value = true;
  try {
    const metricsData: Metric[] = [];
    for (const participant of props.participants) {
      try {
        const metric = await fetchParticipantMetrics({
          shiftId: props.shiftId,
          userId: participant.user_id,
        });
        metricsData.push(metric);
      } catch (error) {
        console.error(`Failed to load metrics for ${participant.user_name}:`, error);
      }
    }
    metrics.value = metricsData;
  } catch (error) {
    showToast({
      type: 'error',
      title: 'Error',
      message: getErrorMessage(error) || 'Failed to load metrics',
    });
  } finally {
    loading.value = false;
  }
};

// Watch for changes in participants prop
watch(
  () => props.participants,
  () => {
    loadMetrics();
  },
  { deep: true }
);

onMounted(() => {
  loadMetrics();
});
</script>

<style scoped>
@import "tailwindcss";
@import "@/assets/styles/themes.css";

.metrics-display {
  @apply bg-white dark:bg-dark-secondary rounded-lg p-4 border border-gray-200 dark:border-dark;
}

.metrics-display__header {
  @apply mb-4;
}

.metrics-display__title {
  @apply text-lg font-semibold text-gray-900 dark:text-white;
}

.metrics-display__content {
  @apply space-y-4;
}

.metrics-display__loading {
  @apply flex justify-center py-8;
}

.metrics-display__empty {
  @apply text-center py-8 text-gray-500 dark:text-gray-400;
}

.metrics-display__grid {
  @apply grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4;
}

.metric-card {
  @apply bg-gray-50 dark:bg-dark rounded-lg p-4 border border-gray-200 dark:border-dark;
}

.metric-card__header {
  @apply flex items-center justify-between mb-3 pb-3 border-b border-gray-200 dark:border-dark;
}

.metric-card__name {
  @apply font-semibold text-gray-900 dark:text-white;
}

.metric-card__body {
  @apply space-y-2;
}

.metric-row {
  @apply flex justify-between items-center text-sm;
}

.metric-label {
  @apply text-gray-600 dark:text-gray-400;
}

.metric-value {
  @apply font-medium text-gray-900 dark:text-white;
}
</style>

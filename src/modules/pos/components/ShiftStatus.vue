<template>
  <div
    class="pos-shift-status"
    :class="{
      'pos-shift-status--open': currentShift.status === 'open',
      'pos-shift-status--closed': currentShift.status === 'closed',
      'pos-shift-status--dark': true,
    }"
  >
    <div class="pos-shift-status__content">
      <div class="pos-shift-status__left">
        <span
          class="pos-shift-status__indicator"
          :class="{
            'pos-shift-status__indicator--open': currentShift.status === 'open',
            'pos-shift-status__indicator--closed': currentShift.status === 'closed',
          }"
        >
          ●
        </span>
        <span
          class="pos-shift-status__label"
          :class="{
            'pos-shift-status__label--empty': !currentShift.id,
            'pos-shift-status__label--empty-dark': !currentShift.id,
          }"
        >
          {{
            currentShift.id
              ? `${currentShift?.shift_owner?.name} is in Shift`
              : 'No Active Shift'
            }}
        </span>
      </div>
      <div class="pos-shift-status__actions">
        <Button
          v-if="!currentShift.id"
          label="Open Shift"
          size="small"
          @click="handleOpenShift"
          :loading="loading"
        />
        <Button
          v-else-if="currentShift.status === 'open'"
          label="Close Shift"
          size="small"
          severity="danger"
          @click="handleCloseShift"
          :loading="loading"
        />
      </div>
    </div>

    <div
      v-if="activeParticipants.length > 0"
      class="flex gap-2 flex-wrap items-center"
    >
      <Badge
        :value="activeParticipants.length"
        severity="success"
      />
      <Tag
        v-for="(participant, i) in activeParticipants"
        :key="i"
        :value="participant.user_name"
        :severity="participant.is_owner ? 'info' : 'secondary'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useShift, type Participant } from '@/modules/shift/composables/useShift';
import { showToast } from '@/helpers/toast';
import { getErrorMessage } from '@/helpers/utils';
import * as shiftApi from '@/modules/shift/services/api';

const props = defineProps({
  outletId: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['shift-loaded']);

const { currentShift, participants, loading, fetchShiftParticipants } = useShift();

const activeParticipants = computed(() => {
  return participants.value?.filter((p: Participant) => !p.participant_removed_at) || [];
});

const fetchOutletShift = async () => {
  try {
    const response = await shiftApi.getOutletShift(props.outletId);
    const shiftData = response?.data?.data || {};
    if (shiftData?.id) {
      // Set current shift
      const { fetchShift: fetchShiftDetail } = useShift();
      await fetchShiftDetail({ shiftId: shiftData.id });
      
      // Fetch participants
      await fetchShiftParticipants({ shiftId: shiftData.id });
      
      emit('shift-loaded', shiftData);
    }
  } catch (error) {
    console.error('Failed to fetch outlet shift:', error);
  }
};

const handleOpenShift = async () => {
  try {
    const response = await shiftApi.openShift({
      outlet_id: props.outletId,
      // shift_owner_id: user?.id,
    });
    const newShift = response?.data?.data;
    if (newShift?.id) {
      await fetchOutletShift();
      showToast({
        type: 'success',
        title: 'Success',
        message: 'Shift opened successfully',
      });
    }
  } catch (error) {
    showToast({
      type: 'error',
      title: 'Error',
      message: getErrorMessage(error) || 'Failed to open shift',
    });
  }
};

const handleCloseShift = async () => {
  try {
    await shiftApi.closeShift(currentShift.id);
    // Reset shift state
    const { currentShift: resetShift } = useShift();
    Object.assign(resetShift, {
      id: '',
      outlet_id: '',
      shift_owner_id: '',
      status: 'closed',
      start_time: '',
      end_time: '',
      participant_count: 0,
      total_transactions: 0,
    });
    showToast({
      type: 'success',
      title: 'Success',
      message: 'Shift closed successfully',
    });
  } catch (error) {
    showToast({
      type: 'error',
      title: 'Error',
      message: getErrorMessage(error) || 'Failed to close shift',
    });
  }
};

onMounted(() => {
  if (props.outletId) {
    fetchOutletShift();
  }
});

// Watch for outlet changes
watch(
  () => props.outletId,
  (newOutletId) => {
    if (newOutletId) {
      fetchOutletShift();
    }
  },
  { immediate: true },
);
</script>

<style scoped>
@import "tailwindcss";
@import "@/assets/styles/themes.css";

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
  @apply flex-1 flex gap-2 items-center;
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

.pos-shift-status__actions {
  @apply flex gap-2;
}
</style>

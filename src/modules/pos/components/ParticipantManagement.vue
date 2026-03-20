<template>
  <div class="participant-management">
    <div class="participant-management__header">
      <h3 class="participant-management__title">User Shifts</h3>
      <Button
        v-if="isShiftOwner && isShiftOpen"
        icon="pi pi-plus"
        rounded
        text
        severity="success"
        @click="showAddDialog = true"
        :loading="loading"
      />
    </div>

    <!-- Participants List -->
    <div class="participant-management__list">
      <div
        v-for="participant in participants"
        :key="participant.user_id"
        class="participant-item"
        :class="{ 'participant-item--removed': participant.participant_removed_at }"
      >
        <div class="participant-item__info">
          <div class="participant-item__name">
            {{ participant.user_name }}
            <Tag
              v-if="participant.is_owner"
              value="Shift Owner"
              severity="info"
              class="ml-2"
            />
            <Tag
              v-if="participant.participant_removed_at"
              value="Removed"
              severity="warning"
              class="ml-2"
            />
          </div>
          <div class="participant-item__meta">
            <span class="text-xs text-gray-500">
              Added: {{ formatDate(participant.participant_added_at) }}
            </span>
            <Divider v-if="participant.transaction_count" layout="vertical" />
            <span v-if="participant.transaction_count" class="text-xs text-gray-500">
              Transactions: {{ participant.transaction_count }}
            </span>
          </div>
        </div>
        <div class="participant-item__actions">
          <Button
            v-if="isShiftOwner && isShiftOpen && !participant.is_owner && !participant.participant_removed_at"
            icon="pi pi-trash"
            rounded
            text
            severity="danger"
            size="small"
            @click="confirmRemoveParticipant(participant)"
            :loading="loading"
          />
        </div>
      </div>

      <div v-if="participants.length === 0" class="participant-management__empty">
        <p>No participants yet</p>
      </div>
    </div>

    <!-- Add Participant Dialog -->
    <Dialog
      v-model:visible="showAddDialog"
      header="Add Participant"
      :modal="true"
      class="w-full md:w-96"
    >
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Select User</label>
          <Dropdown
            v-model="selectedUserId"
            :options="usersNotInShift"
            option-label="name"
            option-value="id"
            placeholder="Choose a user"
            class="w-full"
            :loading="loadingUsers"
          />
        </div>
        <div class="flex gap-2 justify-end">
          <Button
            label="Cancel"
            severity="secondary"
            @click="showAddDialog = false"
          />
          <Button
            label="Add"
            @click="handleAddParticipant"
            :loading="loading"
            :disabled="!selectedUserId"
          />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { type Participant, useShift } from '@/modules/shift/composables/useShift.ts';
import { getListUser } from '@/modules/user/services/api.ts';
import { showConfirm, showToast } from '@/helpers/toast.ts';
import { getErrorMessage } from '@/helpers/utils.ts';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import Tag from 'primevue/tag';

interface User {
  id: string;
  name: string;
  username: string;
}

const props = defineProps({
  shiftId: {
    type: String,
    required: true,
  },
  isShiftOwner: {
    type: Boolean,
    default: false,
  },
  isShiftOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['participant-added', 'participant-removed']);

const { participants, loading, addParticipant, removeParticipant } = useShift();

const showAddDialog = ref(false);
const showRemoveConfirm = ref(false);
const selectedUserId = ref('');
const participantToRemove = ref<Participant | null>(null);
const availableUsers = ref<User[]>([]);
const loadingUsers = ref(false);

const formatDate = (date: string) => {
  return new Date(date).toLocaleString();
};

// Filter out users who are already participants
const usersNotInShift = computed(() => {
  const participantIds = new Set(participants.value?.map((p: Participant) => p.user_id) || []);
  return availableUsers.value.filter((user) => !participantIds.has(user.id));
});

const handleAddParticipant = async () => {
  if (!selectedUserId.value) return;

  try {
    await addParticipant({
      shiftId: props.shiftId,
      userId: selectedUserId.value,
    });
    showToast({
      type: 'success',
      title: 'Success',
      message: 'Participant added successfully',
    } as any);
    showAddDialog.value = false;
    selectedUserId.value = '';
    emit('participant-added');
  } catch (error) {
    showToast({
      type: 'error',
      title: 'Error',
      message: getErrorMessage(error) || 'Failed to add participant',
    } as any);
  }
};

const confirmRemoveParticipant = (participant: Participant) => {
  participantToRemove.value = participant;
  showConfirm({
    header: 'Remove User',
    message: 'Are you sure you want to remove user from this shift?',
    rejectLabel: 'Cancel',
    acceptLabel: 'Remove',
    type: 'warn',
    accept: () => {
      handleRemoveParticipant();
    },
  });
};

const handleRemoveParticipant = async () => {
  if (!participantToRemove.value) return;

  try {
    await removeParticipant({
      shiftId: props.shiftId,
      userId: participantToRemove.value.user_id,
    });
    showToast({
      type: 'success',
      title: 'Success',
      message: 'Participant removed successfully',
    } as any);
    showRemoveConfirm.value = false;
    participantToRemove.value = null;
    emit('participant-removed');
  } catch (error) {
    showToast({
      type: 'error',
      title: 'Error',
      message: getErrorMessage(error) || 'Failed to remove participant',
    } as any);
  }
};

const loadAvailableUsers = async () => {
  loadingUsers.value = true;
  try {
    const response = await getListUser({ limit: 100, page: 1 });
    const { data } = response?.data?.data || [];
    availableUsers.value = data.map((user: any) => ({
      id: user.id,
      name: user.name,
      username: user.username,
    }));
  } catch (error) {
    console.error('Failed to load users:', error);
  } finally {
    loadingUsers.value = false;
  }
};

onMounted(() => {
  loadAvailableUsers();
});
</script>

<style scoped>
@import "tailwindcss";
@import "@/assets/styles/themes.css";

.participant-management {
  @apply bg-white dark:bg-dark-secondary rounded-lg p-4 border border-gray-200 dark:border-dark;
}

.participant-management__header {
  @apply flex items-center justify-between mb-4;
}

.participant-management__title {
  @apply text-lg font-semibold text-gray-900 dark:text-white;
}

.participant-management__list {
  @apply space-y-2;
}

.participant-management__empty {
  @apply text-center py-4 text-gray-500 dark:text-gray-400;
}

.participant-item {
  @apply flex items-center justify-between p-3 bg-gray-50 dark:bg-dark rounded-lg border border-gray-200 dark:border-dark;
}

.participant-item--removed {
  @apply opacity-60;
}

.participant-item__info {
  @apply flex-1;
}

.participant-item__name {
  @apply font-medium text-gray-900 dark:text-white flex items-center;
}

.participant-item__meta {
  @apply flex gap-0 mt-1;
}

.participant-item__actions {
  @apply flex gap-2 ml-4;
}
</style>

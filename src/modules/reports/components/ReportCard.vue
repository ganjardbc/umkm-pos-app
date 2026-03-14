<template>
  <div class="bg-white dark:bg-dark-secondary! rounded-lg shadow p-6">
    <!-- Header -->
    <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
      <div class="flex-1">
        <h3 class="text-lg font-semibold">{{ title }}</h3>
        <p class="text-sm text-gray-400 mt-1">{{ description }}</p>
      </div>
      <Button
        :label="isLoading ? 'Downloading...' : 'Download'"
        icon="pi pi-download"
        :loading="isLoading"
        :disabled="isLoading || !!error"
        @click="handleDownload"
        class="whitespace-nowrap"
      />
    </div>

    <!-- Error Message -->
    <Message
      v-if="error"
      severity="error"
      size="small"
      variant="simple"
      class="mb-4"
    >
      {{ error }}
    </Message>

    <!-- Content Slot -->
    <div v-if="!error" class="text-gray-400 text-sm">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Button from 'primevue/button';
import Message from 'primevue/message';

interface Props {
  title: string;
  description: string;
  loading?: boolean;
  error?: string | null;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  error: null,
});

const emit = defineEmits<{
  download: [];
}>();

const isLoading = computed(() => props.loading);

const handleDownload = async () => {
  emit('download');
};
</script>

<style scoped></style>

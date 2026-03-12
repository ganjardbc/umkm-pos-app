<template>
  <div class="w-full flex flex-col justify-center items-center" style="height: calc(100vh - 90px);">
    <UiEmptyState
      icon="pi pi-cog"
      title="No Settings for Now"
      description="We still build this features."
    />
  </div>
</template>

<script setup lang="ts">
import UiEmptyState from '@/components/UiEmptyState.vue';
</script>

<style scoped></style>

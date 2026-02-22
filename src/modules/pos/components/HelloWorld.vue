<template>
  <div>
    <h1>Hello pos Feature!</h1>
    <p>{{ message }}</p>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { usePosStore } from '@/modules/pos/stores';

const posStore = usePosStore();
const message = ref(posStore.message);
</script>

<style scoped>
h1 {
  color: red;
}
</style>


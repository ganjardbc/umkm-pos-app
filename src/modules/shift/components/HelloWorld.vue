<template>
  <div>
    <h1>Hello shift Feature!</h1>
    <p>{{ message }}</p>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useShiftStore } from '@/modules/shift/stores';

const shiftStore = useShiftStore();
const message = ref(shiftStore.message);
</script>

<style scoped>
h1 {
  color: red;
}
</style>


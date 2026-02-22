<template>
  <div>
    <h1>Hello transaction Feature!</h1>
    <p>{{ message }}</p>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useTransactionStore } from '@/modules/transaction/stores';

const transactionStore = useTransactionStore();
const message = ref(transactionStore.message);
</script>

<style scoped>
h1 {
  color: red;
}
</style>


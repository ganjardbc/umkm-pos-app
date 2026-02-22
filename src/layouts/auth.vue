<template>
  <div class="relative w-full h-screen flex items-center justify-center bg-gray-50">
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { isLogin } from '@/helpers/auth.ts';

import { PREFIX_ROUTE_PATH as PRP_LANDING } from '@/modules/landing/services/constants';

const router = useRouter();

onMounted(() => {
  if (isLogin()) {
    router.push(PRP_LANDING);
  }
});
</script>
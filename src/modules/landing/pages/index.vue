<template>
  <div
    class="w-full h-full md:max-w-3xl mx-auto flex flex-col justify-center items-center py-8"
    style="height: calc(100vh - 90px);"
  >
    <router-link to="/" class="flex items-center mb-8">
      <Image :src="defaultLogo" alt="Image" width="60" />
    </router-link>
    <div class="w-full text-3xl font-bold text-gray-900 mb-4 text-center">
      Selamat Datang di UMKM POS APP
    </div>
    <div class="w-full text-lg text-gray-600 mb-8 text-center">
      Sistem Informasi Manajemen Transaksi
    </div>
  </div>
</template>

<script setup lang="ts">
import defaultLogo from '@/assets/vue.svg';
</script>

<style scoped></style>

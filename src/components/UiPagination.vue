<template>
  <div class="w-full flex flex-col md:flex-row items-center justify-between">
    <div class="text-sm text-gray-900 font-semibold">
      {{ getSummaryPage(pagination) }}
    </div>
    <Paginator
      v-model="pagination"
      :rows="pagination?.rows"
      :totalRecords="pagination?.totalRecords"
      @page="onPageChange"
    />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { getSummaryPage } from '@/helpers/utils.ts';

type Pagination = {
  page: number;
  pageCount: number;
  rows: number;
  totalRecords: number;
};

const pagination = defineModel<Pagination>({
  type: Object as PropType<Pagination>,
  required: true,
});

const emit = defineEmits(['page']);

const onPageChange = (event: any) => {
  emit('page', event);
};
</script>
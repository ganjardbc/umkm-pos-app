<template>
  <div class="w-full space-y-4">
    <h1 class="text-2xl font-semibold">
      Shift
    </h1>

    <div class="flex flex-col md:flex-row gap-4">
      <UiSearch
        v-model="form.search"
        type="search"
        class="w-full"
        @input="search"
      />
    </div>

    <UiCard class="p-0! gap-0! overflow-hidden!">
      <DataTable :value="shifts" tableStyle="min-width: 50rem">
        <Column field="no" header="NO" class="w-18">
          <template #body="slotProps">
            {{ getNoTable(slotProps.index, pagination.page, pagination.rows) }}
          </template>
        </Column>
        <Column field="outlet" header="Outlet">
          <template #body="slotProps">
            {{ slotProps.data.outlets?.name }}
          </template>
        </Column>
        <Column field="users" header="Users">
          <template #body="slotProps">
            {{ slotProps.data.users?.name }}
          </template>
        </Column>
        <Column field="date" header="Date">
          <template #body="slotProps">
            {{ formatDate(slotProps.data.start_time) }}
          </template>
        </Column>
        <Column field="time" header="Time">
          <template #body="slotProps">
            {{ formatRangeTime(slotProps.data.start_time, slotProps.data.end_time) }}
          </template>
        </Column>
        <Column field="duration" header="Duration">
          <template #body="slotProps">
            {{ getDuration(slotProps.data.start_time, slotProps.data.end_time) }}
          </template>
        </Column>
        <Column field="status" header="Status">
          <template #body="slotProps">
            <Tag
              :value="slotProps.data.status"
              :severity="getStatusSeverity(slotProps.data.status)"
              class="capitalize"
            />
          </template>
        </Column>
      </DataTable>
      <UiPagination
        v-model="pagination"
        @page="onPageChange"
      />
    </UiCard>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getNoTable, getErrorMessage, formatDate, formatRangeTime, getDuration } from '@/helpers/utils.ts';
import { getListShift } from '@/modules/shift/services/api.ts';
import { showToast } from '@/helpers/toast.ts';
import { getOutlet } from '@/helpers/auth.ts';
import UiCard from '@/components/UiCard.vue';
import UiSearch from '@/components/UiSearch.vue';
import UiPagination from '@/components/UiPagination.vue';

const outlet = getOutlet();

// Fetch Data
const shifts = ref([]);
const pagination = ref({
  page: 1,
  pageCount: 0,
  rows: 10,
  totalRecords: 0,
});

const fetchShift = async () => {
  try {
    const payload = {
      outlet_id: outlet?.id,
      page: pagination.value.page,
      limit: pagination.value.rows,
    }
    const response = await getListShift(payload);
    const { data, meta } = response?.data?.data || {};

    shifts.value = data;
    pagination.value.totalRecords = meta?.total;
    pagination.value.pageCount = meta?.totalPages;
  } catch (error) {
    console.log(error);
    showToast({
        type: 'error',
        title: 'Error.',
        message: getErrorMessage(error) || 'There was an error.',
    });
  }
};

const onPageChange = (event: any) => {
  pagination.value.page = event.page + 1;
  fetchShift();
};

// Search
const form = ref({
  search: '',
});

const search = () => {
  console.log(form.value);
};

const getStatusSeverity = (status: string) => {
  switch (status) {
    case 'open':
      return 'success';
    case 'closed':
      return 'danger';
    default:
      return 'warning';
  }
};

onMounted(() => {
  fetchShift();
});
</script>

<style scoped>
</style>

<template>
  <div class="w-full space-y-4">
    <h1 class="text-2xl font-semibold">
      Shift
    </h1>

    <div class="flex flex-col md:flex-row gap-4">
      <div class="flex-1">
        <UiSearch
          v-model="form.search"
          type="search"
          class="w-full"
          @input="search"
        />
      </div>
      <Button
        icon="pi pi-plus"
        label="Add Shift"
        class="w-full md:w-[192px]"
        @click="addShift"
      />
    </div>

    <UiCard>
      <DataTable :value="shifts" tableStyle="min-width: 50rem">
        <Column field="no" header="NO" class="w-[64px]">
          <template #body="slotProps">
            {{ getNoTable(slotProps.index, pagination.page, pagination.rows) }}
          </template>
        </Column>
        <Column field="time" header="Time" class="w-[148px]">
          <template #body="slotProps">
            {{ getTime(slotProps.data.start_time, slotProps.data.end_time) }}
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
        <Column field="status" header="Status">
          <template #body="slotProps">
            <Tag
              :value="slotProps.data.status"
              :severity="getStatusSeverity(slotProps.data.status)"
              class="capitalize"
            />
          </template>
        </Column>
        <Column field="created_at" header="Created At">
          <template #body="slotProps">
            {{ formatDateTime(slotProps.data.created_at) }}
          </template>
        </Column>
        <Column field="action" header="#" class="w-[128px]">
          <template #body="slotProps">
            <div class="flex gap-2">
              <Button
                severity="secondary" 
                variant="outlined"
                icon="pi pi-pencil"
                size="small"
                @click="editShift(slotProps.data)"
              />
              <Button
                severity="secondary" 
                variant="outlined"
                icon="pi pi-trash"
                size="small"
                @click="deleteShift(slotProps.data)"
              />
            </div>
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
import { useToast } from 'primevue/usetoast';
import { getNoTable, getErrorMessage, formatRangeTime, formatDateTime } from '@/helpers/utils.ts';
import { getListShift } from '@/modules/shift/services/api.ts';
import { toastConfig } from '@/helpers/toast.ts';
import UiCard from '@/components/UiCard.vue';
import UiSearch from '@/components/UiSearch.vue';
import UiPagination from '@/components/UiPagination.vue';

const toast = useToast();

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
    toast.add(toastConfig({
        type: 'error',
        title: 'Error.',
        message: getErrorMessage(error) || 'There was an error.',
    }));
  }
};

const onPageChange = (event: any) => {
  pagination.value.page = event.page + 1;
  fetchShift();
};

// Actions
const addShift = () => {
  console.log('add shift');
};

const editShift = (shift: any) => {
  console.log('edit shift', shift);
};

const deleteShift = (shift: any) => {
  console.log('delete shift', shift);
};

// Search
const form = ref({
  search: '',
});

const search = () => {
  console.log(form.value);
};

const getTime = (startTime: string, endTime: string) => {
  return formatRangeTime(startTime, endTime);
}

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

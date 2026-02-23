<template>
  <div class="w-full space-y-4">
    <h1 class="text-2xl font-semibold">
      Permission
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
        label="Add Permission"
        class="w-full md:w-[192px]"
        @click="addPermission"
      />
    </div>

    <UiCard>
      <DataTable :value="permissions" tableStyle="min-width: 50rem">
        <Column field="no" header="NO" class="w-[64px]">
          <template #body="slotProps">
            {{ getNoTable(slotProps.index, pagination.page, pagination.rows) }}
          </template>
        </Column>
        <Column field="code" header="Code">
          <template #body="slotProps">
            {{ slotProps.data.code }}
          </template>
        </Column>
        <Column field="description" header="Description">
          <template #body="slotProps">
            {{ slotProps.data.description }}
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
                @click="editPermission(slotProps.data)"
              />
              <Button
                severity="secondary" 
                variant="outlined"
                icon="pi pi-trash"
                size="small"
                @click="deletePermission(slotProps.data)"
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
import { getNoTable, getErrorMessage, formatDateTime } from '@/helpers/utils.ts';
import { getListPermission } from '@/modules/permission/services/api.ts';
import { toastConfig } from '@/helpers/toast.ts';
import UiCard from '@/components/UiCard.vue';
import UiSearch from '@/components/UiSearch.vue';
import UiPagination from '@/components/UiPagination.vue';

const toast = useToast();

// Fetch Data
const permissions = ref([]);
const pagination = ref({
  page: 1,
  pageCount: 0,
  rows: 10,
  totalRecords: 0,
});

const fetchPermission = async () => {
  try {
    const payload = {
      page: pagination.value.page,
      limit: pagination.value.rows,
    }
    const response = await getListPermission(payload);
    const { data, meta } = response?.data?.data || {};

    permissions.value = data;
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
  fetchPermission();
};

// Actions
const addPermission = () => {
  console.log('add permission');
};

const editPermission = (permission: any) => {
  console.log('edit permission', permission);
};

const deletePermission = (permission: any) => {
  console.log('delete permission', permission);
};

// Search
const form = ref({
  search: '',
});

const search = () => {
  console.log(form.value);
};

onMounted(() => {
  fetchPermission();
});
</script>

<style scoped>
</style>

<template>
  <div class="w-full space-y-4">
    <h1 class="text-2xl font-semibold">
      Role
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
        label="Add Role"
        class="w-full md:w-[192px]"
        @click="addRole"
      />
    </div>

    <UiCard>
      <DataTable :value="roles" tableStyle="min-width: 50rem">
        <Column field="no" header="NO" class="w-[64px]">
          <template #body="slotProps">
            {{ getNoTable(slotProps.index, pagination.page, pagination.rows) }}
          </template>
        </Column>
        <Column field="name" header="Name">
          <template #body="slotProps">
            {{ slotProps.data.name }}
          </template>
        </Column>
        <Column field="description" header="Description">
          <template #body="slotProps">
            {{ slotProps.data.description }}
          </template>
        </Column>
        <Column field="role_permissions" header="Total Permissions">
          <template #body="slotProps">
            {{ slotProps.data.role_permissions?.length }}
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
                @click="editRole(slotProps.data)"
              />
              <Button
                severity="secondary" 
                variant="outlined"
                icon="pi pi-trash"
                size="small"
                @click="deleteRole(slotProps.data)"
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
import { getListRole } from '@/modules/role/services/api.ts';
import { toastConfig } from '@/helpers/toast.ts';
import UiCard from '@/components/UiCard.vue';
import UiSearch from '@/components/UiSearch.vue';
import UiPagination from '@/components/UiPagination.vue';

const toast = useToast();

// Fetch Data
const roles = ref([]);
const pagination = ref({
  page: 1,
  pageCount: 0,
  rows: 10,
  totalRecords: 0,
});

const fetchRole = async () => {
  try {
    const payload = {
      page: pagination.value.page,
      limit: pagination.value.rows,
    }
    const response = await getListRole(payload);
    const { data, meta } = response?.data?.data || {};

    roles.value = data;
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
  fetchRole();
};

// Actions
const addRole = () => {
  console.log('add role');
};

const editRole = (role: any) => {
  console.log('edit role', role);
};

const deleteRole = (role: any) => {
  console.log('delete role', role);
};

// Search
const form = ref({
  search: '',
});

const search = () => {
  console.log(form.value);
};

onMounted(() => {
  fetchRole();
});
</script>

<style scoped>
</style>

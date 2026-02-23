<template>
  <div class="w-full space-y-4">
    <h1 class="text-2xl font-semibold">
      User
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
        label="Add User"
        class="w-full md:w-[192px]"
        @click="addUser"
      />
    </div>

    <UiCard>
      <DataTable :value="users" tableStyle="min-width: 50rem">
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
        <Column field="email" header="Email">
          <template #body="slotProps">
            {{ slotProps.data.email }}
          </template>
        </Column>
        <Column field="merchants" header="Merchant">
          <template #body="slotProps">
            {{ slotProps.data.merchants.name }}
          </template>
        </Column>
        <Column field="status" header="Status">
          <template #body="slotProps">
            <Tag
              :value="slotProps.data.is_active ? 'Active' : 'Inactive'"
              :severity="slotProps.data.is_active ? 'success' : 'danger'"
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
                @click="editUser(slotProps.data)"
              />
              <Button
                severity="secondary" 
                variant="outlined"
                icon="pi pi-trash"
                size="small"
                @click="deleteUser(slotProps.data)"
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
import { getListUser } from '@/modules/user/services/api.ts';
import { toastConfig } from '@/helpers/toast.ts';
import UiCard from '@/components/UiCard.vue';
import UiSearch from '@/components/UiSearch.vue';
import UiPagination from '@/components/UiPagination.vue';

const toast = useToast();

// Fetch Data
const users = ref([]);
const pagination = ref({
  page: 1,
  pageCount: 0,
  rows: 10,
  totalRecords: 0,
});

const fetchUser = async () => {
  try {
    const payload = {
      page: pagination.value.page,
      limit: pagination.value.rows,
    }
    const response = await getListUser(payload);
    const { data, meta } = response?.data?.data || {};

    users.value = data;
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
  fetchUser();
};

// Actions
const addUser = () => {
  console.log('add user');
};

const editUser = (user: any) => {
  console.log('edit user', user);
};

const deleteUser = (user: any) => {
  console.log('delete user', user);
};

// Search
const form = ref({
  search: '',
});

const search = () => {
  console.log(form.value);
};

onMounted(() => {
  fetchUser();
});
</script>

<style scoped>
</style>

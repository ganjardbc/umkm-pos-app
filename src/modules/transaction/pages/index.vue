<template>
  <div class="w-full space-y-4">
    <h1 class="text-2xl font-semibold">
      Transaction
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
        label="Add Transaction"
        class="w-full md:w-[192px]"
        @click="addTransaction"
      />
    </div>

    <UiCard>
      <DataTable :value="transactions" tableStyle="min-width: 50rem">
        <Column field="no" header="NO" class="w-[64px]">
          <template #body="slotProps">
            {{ getNoTable(slotProps.index, pagination.page, pagination.rows) }}
          </template>
        </Column>
        <Column field="total_amount" header="Total Amount">
          <template #body="slotProps">
            {{ getCurrency(slotProps.data.total_amount) }}
          </template>
        </Column>
        <Column field="payment_method" header="Payment Method">
          <template #body="slotProps">
            <span class="capitalize">
              {{ slotProps.data.payment_method }}
            </span>
          </template>
        </Column>
        <Column field="transaction_items" header="Items">
          <template #body="slotProps">
            <span class="capitalize">
              {{ slotProps.data.transaction_items?.length || 0 }}
            </span>
          </template>
        </Column>
        <Column field="status" header="Status">
          <template #body="slotProps">
            <Tag
              :value="slotProps.data.is_offline ? 'Offline' : 'Online'"
              :severity="slotProps.data.is_offline ? 'danger' : 'success'"
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
                @click="editTransaction(slotProps.data)"
              />
              <Button
                severity="secondary" 
                variant="outlined"
                icon="pi pi-trash"
                size="small"
                @click="deleteTransaction(slotProps.data)"
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
import { getNoTable, getErrorMessage, getCurrency, formatDateTime } from '@/helpers/utils.ts';
import { getListTransaction } from '@/modules/transaction/services/api.ts';
import { toastConfig } from '@/helpers/toast.ts';
import UiCard from '@/components/UiCard.vue';
import UiSearch from '@/components/UiSearch.vue';
import UiPagination from '@/components/UiPagination.vue';

const toast = useToast();

// Fetch Data
const transactions = ref([]);
const pagination = ref({
  page: 1,
  pageCount: 0,
  rows: 10,
  totalRecords: 0,
});

const fetchTransaction = async () => {
  try {
    const payload = {
      page: pagination.value.page,
      limit: pagination.value.rows,
    }
    const response = await getListTransaction(payload);
    const { data, meta } = response?.data?.data || {};

    transactions.value = data;
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
  fetchTransaction();
};

// Actions
const addTransaction = () => {
  console.log('add transaction');
};

const editTransaction = (transaction: any) => {
  console.log('edit transaction', transaction);
};

const deleteTransaction = (transaction: any) => {
  console.log('delete transaction', transaction);
};

// Search
const form = ref({
  search: '',
});

const search = () => {
  console.log(form.value);
};

onMounted(() => {
  fetchTransaction();
});
</script>

<style scoped>
</style>

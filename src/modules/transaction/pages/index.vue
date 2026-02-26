<template>
  <div class="w-full space-y-4">
    <h1 class="text-2xl font-semibold">
      Transaction
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
      <DataTable
        v-model:expandedRows="expandedRows"
        :value="transactions"
        dataKey="id"
        tableStyle="min-width: 50rem;"
      >
        <Column expander style="width: 5rem" />
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
        <Column field="payment_method" header="Payment">
          <template #body="slotProps">
            <span class="capitalize">
              {{ slotProps.data.payment_method }}
            </span>
          </template>
        </Column>
        <Column field="total_amount" header="Total">
          <template #body="slotProps">
            {{ getCurrency(slotProps.data.total_amount) }}
          </template>
        </Column>
        <Column field="transaction_items" header="Items">
          <template #body="slotProps">
            <span class="capitalize">
              {{ slotProps.data.transaction_items?.length || 0 }}x
            </span>
          </template>
        </Column>
        <Column field="is_offline" header="Mode">
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
                icon="pi pi-print"
                size="small"
                @click="printReceipt(slotProps.data)"
              />
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

        <template #expansion="slotProps">
          <div class="py-2 space-y-4">
            <div class="text-base text-gray-900 font-semibold">
              List Items
            </div>
            <DataTable :value="slotProps?.data?.transaction_items" showGridlines>
              <Column field="no" header="NO" class="w-18">
                <template #body="slotProps">
                  {{ slotProps.index + 1 }}
                </template>
              </Column>
              <Column field="product_name_snapshot" header="Product Name" />
              <Column field="qty" header="Qty" class="w-70">
                <template #body="slotProps">
                  {{ slotProps.data.qty }}x
                </template>
              </Column>
              <Column field="subtotal" header="Price" class="w-[144px]">
                <template #body="slotProps">
                  {{ getCurrency(slotProps.data.subtotal) }}
                </template>
              </Column>
            </DataTable>
          </div>
        </template>
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
import { getNoTable, getErrorMessage, getCurrency, formatDateTime } from '@/helpers/utils.ts';
import { getListTransaction } from '@/modules/transaction/services/api.ts';
import { showToast } from '@/helpers/toast.ts';
import { getOutlet } from '@/helpers/auth.ts';
import UiCard from '@/components/UiCard.vue';
import UiSearch from '@/components/UiSearch.vue';
import UiPagination from '@/components/UiPagination.vue';

const outlet = getOutlet();
const expandedRows = ref({});

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
      outlet_id: outlet?.id,
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
    showToast({
        type: 'error',
        title: 'Error.',
        message: getErrorMessage(error) || 'There was an error.',
    });
  }
};

const onPageChange = (event: any) => {
  pagination.value.page = event.page + 1;
  fetchTransaction();
};

// Actions
const printReceipt = (transaction: any) => {
  console.log('print receipt', transaction);
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

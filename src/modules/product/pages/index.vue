<template>
  <div class="w-full space-y-4">
    <h1 class="text-2xl font-semibold">
      Product
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
        label="Add Product"
        class="w-full md:w-[192px]"
        @click="addProduct"
      />
    </div>

    <UiCard class="p-0! gap-0! overflow-hidden!">
      <DataTable :value="products" tableStyle="min-width: 50rem">
        <Column field="no" header="NO" class="w-18">
          <template #body="slotProps">
            {{ getNoTable(slotProps.index, pagination.page, pagination.rows) }}
          </template>
        </Column>
        <Column field="name" header="Name">
          <template #body="slotProps">
            {{ slotProps.data.name }}
          </template>
        </Column>
        <Column field="category" header="Category">
          <template #body="slotProps">
            {{ slotProps.data.category }}
          </template>
        </Column>
        <Column field="price" header="Price">
          <template #body="slotProps">
            {{ getCurrency(slotProps.data.price) }}
          </template>
        </Column>
        <Column field="cost" header="Cost">
          <template #body="slotProps">
            {{ getCurrency(slotProps.data.cost) }}
          </template>
        </Column>
        <Column field="min_stock" header="Min Stock">
          <template #body="slotProps">
            {{ slotProps.data.min_stock }}
          </template>
        </Column>
        <Column field="stock_qty" header="Qty">
          <template #body="slotProps">
            {{ slotProps.data.stock_qty }}
          </template>
        </Column>
        <Column field="merchants" header="Merchant">
          <template #body="slotProps">
            {{ slotProps.data.merchants.name }}
          </template>
        </Column>
        <Column field="is_active" header="Status">
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
                @click="editProduct(slotProps.data)"
              />
              <Button
                severity="secondary" 
                variant="outlined"
                icon="pi pi-trash"
                size="small"
                @click="deleteProduct(slotProps.data)"
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
import { getNoTable, getErrorMessage, getCurrency, formatDateTime } from '@/helpers/utils.ts';
import { getListProduct } from '@/modules/product/services/api.ts';
import { showToast } from '@/helpers/toast.ts';
import UiCard from '@/components/UiCard.vue';
import UiSearch from '@/components/UiSearch.vue';
import UiPagination from '@/components/UiPagination.vue';

// Fetch Data
const products = ref([]);
const pagination = ref({
  page: 1,
  pageCount: 0,
  rows: 10,
  totalRecords: 0,
});

const fetchProduct = async () => {
  try {
    const payload = {
      page: pagination.value.page,
      limit: pagination.value.rows,
    }
    const response = await getListProduct(payload);
    const { data, meta } = response?.data?.data || {};

    products.value = data;
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
  fetchProduct();
};

// Actions
const addProduct = () => {
  console.log('add product');
};

const editProduct = (product: any) => {
  console.log('edit product', product);
};

const deleteProduct = (product: any) => {
  console.log('delete product', product);
};

// Search
const form = ref({
  search: '',
});

const search = () => {
  console.log(form.value);
};

onMounted(() => {
  fetchProduct();
});
</script>

<style scoped>
</style>

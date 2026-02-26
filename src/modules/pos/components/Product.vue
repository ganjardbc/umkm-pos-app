<template>
  <div class="w-full space-y-4">
    <h1 class="text-xl font-semibold text-gray-900">
      Product
    </h1>

    <div class="flex-1">
      <UiSearch
        v-model="form.search"
        type="search"
        class="w-full"
        @input="search"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <UiCard
        v-for="product in products"
        :key="product.id"
        class="overflow-hidden hover:shadow-lg"
      >
        <div class="relative space-y-4">
          <div class="relative w-full h-40 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
            <img
              v-if="product.thumbnail"
              :src="product.thumbnail"
              :alt="product.name"
              class="w-full h-full object-cover"
            >
            <i
              v-else
              class="pi pi-image text-6xl text-gray-400"
            />
          </div>

          <Tag
            v-if="product.stock_qty <= product.min_stock"
            severity="warn"
            value="Low Stock"
            class="absolute top-0 right-0 text-xs!"
          />

          <div class="space-y-1">
            <div class="text-base font-semibold text-gray-900 truncate">
              {{ product.name }}
            </div>
            <div class="text-sm text-gray-500">
              {{ product.category }}
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="text-lg font-bold text-primary">
              {{ getCurrency(product.price) }}
            </div>
            <div class="text-sm text-gray-500">
              Stock: {{ product.stock_qty }}
            </div>
          </div>

          <Divider />

          <Button
            severity="secondary"
            variant="outlined"
            size="small"
            icon="pi pi-shopping-cart"
            label="Add to Cart"
            fluid
            :disabled="!isUserInShift"
            @click="addProductToCart(product)"
          />
        </div>
      </UiCard>
    </div>

    <UiPagination
      v-model="pagination"
      no-padding
      @page="onPageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Tag from 'primevue/tag';
import { getErrorMessage, getCurrency } from '@/helpers/utils.ts';
import { getListProduct } from '@/modules/product/services/api.ts';
import { showToast } from '@/helpers/toast.ts';
import { usePosStore } from '@/modules/pos/stores';
import UiSearch from '@/components/UiSearch.vue';
import UiPagination from '@/components/UiPagination.vue';
import UiCard from '@/components/UiCard.vue';

const posStore = usePosStore();

defineProps({
  isUserInShift: {
    type: Boolean,
    default: false,
  }
});

// Fetch Data
const products = ref();
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

    products.value = data || [];
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

// Search
const form = ref({
  search: '',
});

const search = () => {
  console.log(form.value);
};

// Cart
const addProductToCart = (product: any) => {
  if (product.stock_qty > 0) {
    posStore.addToCart(product);
    showToast({
      type: 'success',
      title: 'Success',
      message: `${product.name} added to cart`,
    });
  } else {
    showToast({
      type: 'warn',
      title: 'Out of stock',
      message: `${product.name} is out of stock`,
    });
  }
};

onMounted(() => {
  fetchProduct();
});
</script>
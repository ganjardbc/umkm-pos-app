<template>
  <div class="w-full space-y-4">
    <div class="flex gap-4 items-center">
      <Button
        severity="secondary"
        icon="pi pi-arrow-left"
        size="small"
        @click="onBack"
      />
      <h1 class="text-2xl font-semibold">
        Outlet Detail
      </h1>
    </div>

    <UiCard v-if="outletDetail">
      <template #header>  
        <div class="w-full flex gap-4 items-center justify-between">
          <h1 class="text-2xl font-semibold">
            Outlet Information
          </h1>
          <Button
            icon="pi pi-pencil"
            label="Edit Outlet"
            size="small"
            @click="onEdit"
          />
        </div>
      </template>

      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium text-gray-500">Name</label>
            <p class="text-base text-gray-900 mt-1">{{ outletDetail.name }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-500">Slug</label>
            <p class="text-base text-gray-900 mt-1">{{ outletDetail.slug }}</p>
          </div>
        </div>

        <div>
          <label class="text-sm font-medium text-gray-500">Location</label>
          <p class="text-base text-gray-900 mt-1">{{ outletDetail.location }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium text-gray-500">Merchant</label>
            <p class="text-base text-gray-900 mt-1">{{ outletDetail.merchants?.name || '-' }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-500">Status</label>
            <div class="mt-1">
              <Tag
                :value="outletDetail.is_active ? 'Active' : 'Inactive'"
                :severity="outletDetail.is_active ? 'success' : 'danger'"
                class="capitalize"
              />
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium text-gray-500">Created At</label>
            <p class="text-base text-gray-900 mt-1">{{ formatDateTime(outletDetail.created_at) }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-500">Updated At</label>
            <p class="text-base text-gray-900 mt-1">{{ formatDateTime(outletDetail.updated_at) }}</p>
          </div>
        </div>
      </div>
    </UiCard>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getErrorMessage, formatDateTime } from '@/helpers/utils.ts';
import { showToast } from '@/helpers/toast.ts';
import { getDetailOutlet } from '@/modules/outlet/services/api.ts';
import { PREFIX_ROUTE_NAME } from '@/modules/outlet/services/constants.ts';
import UiCard from '@/components/UiCard.vue';

const route = useRoute();
const router = useRouter();
const outletID = computed(() => route.params.id as string);

// Fetch Detail
const outletDetail = ref<any>(null);

const fetchDetail = async () => {
  try {
    const response = await getDetailOutlet(outletID.value);
    const { data } = response?.data || {};

    outletDetail.value = data || null;
  } catch (error) {
    showToast({
      type: 'error',
      title: 'Failed to fetch data.',
      message: getErrorMessage(error) || 'There was an error.',
    });
  }
};

// Methods
const onBack = () => {
  router.back();
};

const onEdit = () => {
  router.push({
    name: `${PREFIX_ROUTE_NAME}-edit`,
    params: {
      id: outletID.value,
    }
  });
};

onMounted(() => {
  fetchDetail();
});
</script>

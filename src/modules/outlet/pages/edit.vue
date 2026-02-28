<template>
  <UiCard class="max-w-2xl mx-auto">
    <template #header>
      <h1 class="text-xl font-semibold text-gray-900">
        Edit Outlet
      </h1>
    </template>

    <Form
      v-if="isLoaded"
      v-slot="$form"
      :resolver="resolver"
      :initialValues="initialValues"
      @submit="onFormSubmit"
      class="flex flex-col gap-4 w-full"
    >
      <div class="w-full space-y-4">
        <UiFormGroup label="Name" variant="vertical">
          <InputText
            name="name"
            type="text"
            placeholder=""
            fluid
          />
          <Message
            v-if="$form.name?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.name.error?.message }}
          </Message>
        </UiFormGroup>
        <UiFormGroup label="Location" variant="vertical">
          <Textarea
            name="location"
            placeholder=""
            fluid
          />
          <Message
            v-if="$form.location?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.location.error?.message }}
          </Message>
        </UiFormGroup>
        <UiFormGroup label="Active Status" variant="vertical">
          <Checkbox
            name="is_active"
            binary
          />
          <Message
            v-if="$form.is_active?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.is_active.error?.message }}
          </Message>
        </UiFormGroup>
      </div>

      <div class="w-full flex justify-end gap-4 border-t border-gray-200 pt-4">
        <Button
          severity="secondary"
          label="Cancel"
          size="medium"
          class="w-[128px]"
          @click="onCancel"
        />
        <Button
          type="submit"
          label="Save"
          size="medium"
          class="w-[128px]"
        />
      </div>
    </Form>
  </UiCard>
</template>
<script setup lang="ts">
import type { FormEdit } from '@/modules/outlet/services/types.ts';
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { z } from 'zod';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { getErrorMessage } from '@/helpers/utils.ts';
import { showToast } from '@/helpers/toast.ts';
import { showLoading, hideLoading } from '@/helpers/loading.ts';
import { putOutlet, getDetailOutlet } from '@/modules/outlet/services/api.ts';
import UiCard from '@/components/UiCard.vue';
import UiFormGroup from '@/components/UiFormGroup.vue';

const route = useRoute();
const router = useRouter();
const outletID = computed(() => route.params.id as string);

const isLoaded = ref(false);
const initialValues = ref<FormEdit>({
  name: '',
  location: '',
  is_active: true
});

const resolver = ref(zodResolver(
  z.object({
    name: z.string().min(1, { message: 'Name is required.' }),
    location: z.string().min(1, { message: 'Location is required.' }),
    is_active: z.boolean()
  })
));

const onFormSubmit = async ({ valid, values }: { valid: boolean; values: FormEdit }) => {
  if (valid) {
    try {
      showLoading();

      const payload = {
        name: values?.name,
        location: values?.location,
        is_active: values?.is_active,
      };
      const response = await putOutlet(outletID.value, payload);
      const { success } = response?.data || {};

      if (success) {
        router.back();
      }
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Update Outlet Failed.',
        message: getErrorMessage(error) || 'There was an error.',
      });
    } finally {
      hideLoading();
    }
  }
};

const onCancel = () => {
  router.back();
};

// Fetch Detail
const fetchDetail = async () => {
  try {
    const response = await getDetailOutlet(outletID.value);
    const { data } = response?.data || {};
    const { name, location, is_active } = data || {};

    initialValues.value = {
      name,
      location,
      is_active
    };
    
    isLoaded.value = true;
  } catch (error) {
    showToast({
      type: 'error',
      title: 'Failed to fetch data.',
      message: getErrorMessage(error) || 'There was an error.',
    });
  }
};

onMounted(() => {
  fetchDetail();
});
</script>

<template>
  <UiCard class="max-w-2xl mx-auto">
    <template #header>
      <h1 class="text-xl font-semibold text-gray-900">
        Edit User
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

        <UiFormGroup label="Email" variant="vertical">
          <InputText
            name="email"
            type="email"
            placeholder=""
            fluid
          />
          <Message
            v-if="$form.email?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.email.error?.message }}
          </Message>
        </UiFormGroup>

        <UiFormGroup label="Active Status" variant="vertical">
          <div class="flex items-center gap-2">
            <Checkbox
              name="is_active"
              :binary="true"
            />
            <label class="text-sm text-gray-700">User is active</label>
          </div>
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
import type { FormEdit } from '@/modules/user/services/types.ts';
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { z } from 'zod';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { getErrorMessage } from '@/helpers/utils.ts';
import { showToast } from '@/helpers/toast.ts';
import { showLoading, hideLoading } from '@/helpers/loading.ts';
import { putUser, getDetailUser } from '@/modules/user/services/api.ts';
import UiCard from '@/components/UiCard.vue';
import UiFormGroup from '@/components/UiFormGroup.vue';

const route = useRoute();
const router = useRouter();
const userID = computed(() => route.params.id as string);

const isLoaded = ref(false);
const initialValues = ref<FormEdit>({
  name: '',
  email: '',
  is_active: true
});

const resolver = ref(zodResolver(
  z.object({
    name: z.string().min(1, { message: 'Name is required.' }),
    email: z.string().email({ message: 'Invalid email address.' }),
    is_active: z.boolean()
  })
));

const onFormSubmit = async ({ valid, values }: { valid: boolean; values: FormEdit }) => {
  if (valid) {
    try {
      showLoading();

      const payload = {
        name: values?.name,
        email: values?.email,
        is_active: values?.is_active,
      };
      const response = await putUser(userID.value, payload);
      const { success } = response?.data || {};

      if (success) {
        router.back();
      }
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Update User Failed.',
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
    const response = await getDetailUser(userID.value);
    const { data } = response?.data || {};
    const { name, email, is_active } = data || {};

    initialValues.value = {
      name,
      email,
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

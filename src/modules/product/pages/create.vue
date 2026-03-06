<template>
  <UiCard class="max-w-2xl mx-auto">
    <template #header>
      <h1 class="text-xl font-semibold text-gray-900">
        Add Product
      </h1>
    </template>

    <Form
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
            @update:modelValue="(value: any) => onNameChange(value, $form)"
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
        <UiFormGroup label="Slug" variant="vertical">
          <InputText
            name="slug"
            type="text"
            placeholder=""
            fluid
            readonly
            disabled
          />
          <Message
            v-if="$form.slug?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.slug.error?.message }}
          </Message>
        </UiFormGroup>
        <UiFormGroup label="Category" variant="vertical">
          <InputText
            name="category"
            type="text"
            placeholder=""
            fluid
          />
          <Message
            v-if="$form.category?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.category.error?.message }}
          </Message>
        </UiFormGroup>
        <UiFormGroup label="Price" variant="vertical">
          <InputNumber
            name="price"
            placeholder=""
            fluid
            :min="0"
            mode="currency"
            currency="IDR"
            locale="id-ID"
          />
          <Message
            v-if="$form.price?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.price.error?.message }}
          </Message>
        </UiFormGroup>
        <UiFormGroup label="Cost" variant="vertical">
          <InputNumber
            name="cost"
            placeholder=""
            fluid
            :min="0"
            mode="currency"
            currency="IDR"
            locale="id-ID"
          />
          <Message
            v-if="$form.cost?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.cost.error?.message }}
          </Message>
        </UiFormGroup>
        <UiFormGroup label="Stock Quantity" variant="vertical">
          <InputNumber
            name="stock_qty"
            placeholder=""
            fluid
            :min="0"
          />
          <Message
            v-if="$form.stock_qty?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.stock_qty.error?.message }}
          </Message>
        </UiFormGroup>
        <UiFormGroup label="Minimum Stock" variant="vertical">
          <InputNumber
            name="min_stock"
            placeholder=""
            fluid
            :min="0"
          />
          <Message
            v-if="$form.min_stock?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $form.min_stock.error?.message }}
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
import type { FormCreate } from '@/modules/product/services/types.ts';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { z } from 'zod';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { getErrorMessage } from '@/helpers/utils.ts';
import { showToast } from '@/helpers/toast.ts';
import { showLoading, hideLoading } from '@/helpers/loading.ts';
import { postProduct } from '@/modules/product/services/api.ts';
import UiCard from '@/components/UiCard.vue';
import UiFormGroup from '@/components/UiFormGroup.vue';

const router = useRouter();

const initialValues = ref<FormCreate>({
  slug: '',
  name: '',
  category: '',
  thumbnail: '',
  price: 0,
  cost: 0,
  stock_qty: 0,
  min_stock: 0,
  is_active: true
});

const resolver = ref(zodResolver(
  z.object({
    slug: z.string().min(1, { message: 'Slug is required.' }),
    name: z.string().min(1, { message: 'Name is required.' }),
    category: z.string().min(1, { message: 'Category is required.' }),
    price: z.number().min(0, { message: 'Price must be at least 0.' }),
    cost: z.number().min(0, { message: 'Cost must be at least 0.' }),
    stock_qty: z.number().min(0, { message: 'Stock quantity must be at least 0.' }),
    min_stock: z.number().min(0, { message: 'Minimum stock must be at least 0.' }),
    is_active: z.boolean()
  })
));

const onFormSubmit = async ({ valid, values }: { valid: boolean; values: FormCreate }) => {
  if (valid) {
    try {
      showLoading();

      const payload = {
        slug: values?.slug,
        name: values?.name,
        category: values?.category,
        thumbnail: values?.thumbnail,
        price: values?.price,
        cost: values?.cost,
        stock_qty: values?.stock_qty,
        min_stock: values?.min_stock,
        is_active: values?.is_active,
      };
      const response = await postProduct(payload);
      const { success } = response?.data || {};

      if (success) {
        router.back();
      }
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Create Product Failed.',
        message: getErrorMessage(error) || 'There was an error.',
      });
    } finally {
      hideLoading();
    }
  }
};

const onNameChange = (name: string, form: any) => {
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  
  form.slug.value = slug;
};

const onCancel = () => {
  router.back();
}
</script>
<template>
  <div class="relative w-100 rounded-lg bg-white shadow-md px-4 py-6 flex flex-col items-center">
    <Image :src="defaultLogo" alt="Image" width="74" />

    <Form
      v-slot="$form"
      :resolver="resolver"
      :initialValues="initialValues"
      @submit="onFormSubmit"
      class="flex flex-col gap-4 w-full pt-6"
    >
      <UiFormGroup label="Email" variant="vertical">
        <InputText
          name="email"
          type="email"
          placeholder=""
          fluid
          :disabled="loading"
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
      <UiFormGroup label="Password" variant="vertical">
        <InputGroup>
          <InputText
            name="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder=""
            fluid
            :disabled="loading"
          />
          <InputGroupAddon>
            <Button
              :icon="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"
              severity="secondary"
              variant="text"
              class="w-full"
              @click="showPassword = !showPassword"
            />
          </InputGroupAddon>
        </InputGroup>
        <Message
          v-if="$form.password?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form.password.error?.message }}
        </Message>
      </UiFormGroup>
      <div class="w-full flex">
        <Button
          type="submit"
          variant="primary"
          label="Login"
          class="w-full"
          :loading="loading"
        />
      </div>
      <div class="text-xs text-center text-gray-400">
        Version 1.0.0
      </div>
    </Form>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import { z } from 'zod';

import defaultLogo from '@/assets/vue.svg';

import { setAuth } from '@/helpers/auth.ts';
import { getErrorMessage } from '@/helpers/utils.ts';
import { toastConfig } from '@/helpers/toast.ts';
import { postLogin } from '@/modules/auth/services/api.ts';

import UiFormGroup from '@/components/UiFormGroup.vue';

import { PREFIX_ROUTE_PATH as PRP_LANDING } from '@/modules/landing/services/constants';

const router = useRouter();
const toast = useToast();
const initialValues = ref({
  email: '',
  password: ''
});
const showPassword = ref(false);
const loading = ref(false);

const resolver = ref(zodResolver(
  z.object({
    email: z.string().email({ message: 'Please enter a valid email address.' }).min(1, { message: 'Email is required.' }),
    password: z.string().min(1, { message: 'Password is required.' })
  })
));

const onFormSubmit = async ({ valid, values }) => {
  if (valid) {
    loading.value = true;

    try {
      const payload = {
        email: values.email,
        password: values.password,
      };
      const response = await postLogin(payload);
      const { success, data} = response?.data;

      
      if (success) {
        await setAuth(data);

        router.push(PRP_LANDING);
        toast.add(toastConfig({
          type: 'success',
          title: 'Login Success',
        }));
      }
    } catch (error) {
      toast.add(toastConfig({
        type: 'error',
        title: 'Login Failed.',
        message: getErrorMessage(error) || 'There was an error.',
      }));
    } finally {
      loading.value = false;
    }
  }
};
</script>

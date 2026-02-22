import { createApp } from 'vue';

// Main application component
import App from '../App.vue';
const vueInit = createApp(App);

// Setup router
import { setupRouter } from './global-routes';
const router = setupRouter();
vueInit.use(router);

// Setup Pinia
import { createPinia } from 'pinia';
const pinia = createPinia();
vueInit.use(pinia);

// Setup PrimeVue components
import PrimeVue from 'primevue/config';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const customPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: 'var(--primary-50)',
      100: 'var(--primary-100)',
      200: 'var(--primary-200)',
      300: 'var(--primary-300)',
      400: 'var(--primary-400)',
      500: 'var(--primary-500)',
      600: 'var(--primary-600)',
      700: 'var(--primary-700)',
      800: 'var(--primary-800)',
      900: 'var(--primary-900)',
    },
  },
});

vueInit.use(PrimeVue, {
  theme: {
    preset: customPreset,
    options: {
      darkModeSelector: '.my-app-dark',
    }
  }
});

import ToastService from 'primevue/toastservice'; 
vueInit.use(ToastService);

import ConfirmationService from 'primevue/confirmationservice';
vueInit.use(ConfirmationService);

// Mount the application
vueInit.mount('#app');

export default vueInit;

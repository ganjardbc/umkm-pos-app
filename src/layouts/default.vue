<template>
  <div class="relative w-full h-screen bg-white flex">
    <!-- Sidebar -->
    <!-- transition-all duration-300 -->
    <div
      class="top-0 h-screen border-r border-gray-200 flex flex-col justify-between transition-all duration-100"
      :class="{
        'w-16': isSmallSidebar,
        'w-70': !isSmallSidebar && !isMobile,
        'w-full': !isSmallSidebar && isMobile,
        'z-20 bg-white': isMobile,
        'fixed': isMobile,
        'relative': isWeb,
        'left-0': isMobile && isCollapsed,
        '-left-full': isMobile && !isCollapsed,
      }"
    >
      <div
        class="w-full flex items-center p-2"
        :class="{
          'justify-between': isMobile,
          'justify-center': !isMobile,
        }"
      >
        <router-link
          to="/landing"
          class="flex items-center"
        >
          <Image
            :src="defaultLogo"
            alt="Image"
            width="40"
          />
        </router-link>

        <Button
          v-if="isMobile"
          severity="secondary" 
          variant="text"
          size="medium"
          icon="pi pi-times"
          aria-label="Collapse" 
          class="w-10.5!"
          @click="handleOpenSidebar"
        />
      </div>

      <!-- Content -->
      <div class="p-2 h-full flex flex-col gap-4 overflow-y-auto">
        <UiSidebarMenu
          :is-collapsed="isSmallSidebar"
          @navigate="isMobile ? handleOpenSidebar() : null"
        />
      </div>

      <!-- Footer -->
      <div
        class="flex justify-center gap-2 px-2 py-3"
        :class="{
          'flex-col items-center': isSmallSidebar,
          'flex-row': !isSmallSidebar,
        }"
      >
        <router-link
          to="/notification"
        >
          <Button
            severity="secondary" 
            variant="outlined"
            size="medium"
            icon="pi pi-bell"
          />
        </router-link>
        <router-link
          to="/settings"
        >
          <Button
            severity="secondary" 
            variant="outlined"
            size="medium"
            icon="pi pi-cog"
          />
        </router-link>
      </div>
    </div>

    <!-- Body -->
    <div class="relative flex-1 w-full h-full bg-white overflow-y-auto">
      <!-- Header -->
      <div class="sticky top-0 z-10 w-full h-14 px-4 border-b border-gray-200 bg-white">
        <div class="mx-auto h-full flex justify-between items-center">
          <div class="flex items-center overflow-hidden">
            <Button
              severity="secondary" 
              variant="text"
              size="medium"
              :icon="!isSmallSidebar ? 'pi pi-align-left' : 'pi pi-bars'"
              aria-label="Collapse" 
              class="w-10.5! mr-4"
              @click="handleOpenSidebar"
            />

            <Button
              v-if="isBack"
              severity="secondary" 
              size="medium"
              icon="pi pi-arrow-left"
              aria-label="Collapse" 
              class="mr-4"
              @click="$router.back()"
            />

            <div class="text-lg font-semibold text-gray-900 mr-3 truncate">
              {{ title }}
            </div>

            <Divider
              v-if="breadcrumbs.length && isWeb"
              layout="vertical"
            />

            <Breadcrumb
              v-if="breadcrumbs.length && isWeb"
              :home="home"
              :model="breadcrumbs"
              size="small"
            >
              <template #item="{ item, props }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                  <a :href="href" v-bind="props.action" @click="navigate">
                    <span :class="[item.icon, 'text-color']" />
                    <span
                      class="text-sm! text-gray-500 font-normal truncate"
                      :class="{
                        'text-primary-500 font-semibold': item.isActive,
                      }"
                    >{{ item.label }}</span>
                  </a>
                </router-link>
                <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                  <span class="text-sm! text-surface-700 dark:text-surface-0 truncate">{{ item.label }}</span>
                </a>
              </template>
            </Breadcrumb>
          </div>

          <div class="flex items-center">
            <UiSidebarOutlet
              :is-collapsed="isSmallSidebar"
              @navigate="isMobile ? handleOpenSidebar() : null"
            />

            <Divider layout="vertical" />

            <UiSidebarProfile
              :is-collapsed="isSmallSidebar"
              @navigate="isMobile ? handleOpenSidebar() : null"
            />
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="w-full p-4">
        <div class="mx-auto min-h-[calc(100vh-88px)]">
          <slot />
        </div>
      </div>

      <!-- Footer -->
      <div
        id="layout-footer"
        class="sticky bottom-0 w-full h-18.5 bg-white border-t border-gray-200 py-2"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed, ref, watch } from "vue";
import { useRoute, useRouter } from 'vue-router';
import defaultLogo from '@/assets/vue.svg';

import { isLogin } from '@/helpers/auth.ts';

import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/modules/auth/stores/index.ts';

import { PREFIX_ROUTE_PATH as PRP_AUTH } from '@/modules/auth/services/constants.ts';

import UiSidebarMenu from '@/components/UiSidebarMenu.vue';
import UiSidebarOutlet from '@/components/UiSidebarOutlet.vue';
import UiSidebarProfile from '@/components/UiSidebarProfile.vue';

const route = useRoute();
const isBack = computed(() => route.meta.isBack || false);
const title = computed(() => route.meta.title || '-');
const breadcrumbs = computed(() => Array.isArray(route.meta.breadcrumbs) ? route.meta.breadcrumbs : []);

const home = computed(() => ({
  icon: 'pi pi-home',
  route: '/landing',
}));

const router = useRouter();

// Device type
const authStore = useAuthStore();
const { deviceType } = storeToRefs(authStore);

const isMobile = computed(() => deviceType.value === 'mobile');
const isWeb = computed(() => deviceType.value === 'web');

// Sidebar collapsed
const isCollapsed = ref(false);

const isSmallSidebar = computed(() => {
  if (isMobile.value) {
    return false;
  }
  return isCollapsed.value;
});

const handleOpenSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};

watch(deviceType, () => {
  if (isWeb.value) {
    isCollapsed.value = false;
  } else if (isMobile.value) {
    isCollapsed.value = false;
  } else {
    isCollapsed.value = true;
  }
}, { immediate: true });

onMounted(() => {
  if (!isLogin()) {
    router.push(PRP_AUTH);
  }
});
</script>
<style>
#layout-footer:empty {
  display: none;
}
</style>
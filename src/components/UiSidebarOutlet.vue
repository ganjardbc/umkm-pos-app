<template>
  <div class="ui-sidebar-outlet">
    <div
      class="ui-sidebar-outlet__toggle"
      @click="openOutletMenu"
    >
      <div class="min-w-6 text-center">
        <i class="text-[10px]! text-gray-400 pi pi-chevron-down" />
      </div>

      <div
        v-if="!isMobile"
        class="flex-1 overflow-hidden flex flex-col"
      >
        <div class="text-xs text-gray-900 text-right truncate">
          {{ merchant?.name || '-' }}
        </div>
        <div class="text-[10px] text-gray-400 text-right truncate">
          {{ activeOutlet?.name || '-' }}
        </div>
      </div>

      <Avatar
        icon="pi pi-shop"
        size="small"
        shape="square"
      />
    </div>
    <Popover
      ref="opOutletMenu"
      position="right"
      class="ui-sidebar-outlet__popper"
    >
      <div class="space-y-4 w-75">
        <div class="text-xs text-gray-900 font-semibold">
          Outlet Lists
        </div>
        <div
          v-for="(outlet, i) in listOutlet"
          :key="i"
          class="flex items-center gap-2"
          :class="{
            'pb-4 border-b border-gray-200': i !== listOutlet.length - 1,
          }"
        >
          <Avatar
            :label="outlet?.outlet?.name?.charAt(0)"
            size="small"
            shape="square"
          />
          <div
            class="flex-1 overflow-hidden flex flex-col"
          >
            <div class="text-xs text-gray-900 text-left truncate">
              {{ outlet?.outlet?.name || '-' }}
            </div>
            <div class="text-[10px] text-gray-400 text-left truncate">
              {{ outlet?.role?.name || '-' }}
            </div>
          </div>
          <Button
            severity="secondary" 
            variant="outlined"
            size="small"
            :label="activeOutlet.id === outlet?.outlet?.id ? 'Current' : 'Visit'"
            :disabled="activeOutlet.id === outlet?.outlet?.id"
            class="h-[32px] text-xs!"
            @click="onVisitOutlet(outlet)"
          />
        </div>
      </div>
    </Popover>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useRouter } from 'vue-router';
import { useConfirm } from 'primevue/useconfirm';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/modules/auth/stores/index.ts';
import { removeAuth } from '@/helpers/auth.ts';
import { showToast } from '@/helpers/toast.ts';
import { getMerchant, getListOutlet, getOutlet, setOutlet } from '@/helpers/auth.ts';

defineProps({
  isCollapsed: {
    type: Boolean,
    default: false,
  },
});

// Device type
const authStore = useAuthStore();
const { deviceType } = storeToRefs(authStore);

const isMobile = computed(() => deviceType.value === 'mobile');

// Personal info
const router = useRouter();
const confirm = useConfirm();

const merchant = computed(() => getMerchant());

const listOutlet = computed(() => getListOutlet());
const activeOutlet = computed(() => getOutlet());

const opOutletMenu = ref();
const openOutletMenu = (event) => {
  opOutletMenu.value.toggle(event);
}

// Methods
const onVisitOutlet = async (outlet) => {
  try {
    await setOutlet(outlet);
    window.location.href = '/landing';
  }
  catch (error) {
    console.error(error);
    showToast({
      type: 'error',
      title: 'Error',
      message: error.message,
    })
  }
};
</script>
<style>
@import 'tailwindcss';

.ui-sidebar-outlet {
  @apply relative;
}

.ui-sidebar-outlet__toggle {
  @apply flex items-center gap-2 p-2 rounded-lg  cursor-pointer hover:bg-gray-50;
}

.ui-sidebar-outlet__popper.p-popover {
  margin-right: 8px;
}

.ui-sidebar-outlet__popper.p-popover:before,
.ui-sidebar-outlet__popper.p-popover:after {
  @apply hidden;
}
</style>
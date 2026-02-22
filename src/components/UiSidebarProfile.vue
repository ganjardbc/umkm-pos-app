<template>
  <div class="ui-sidebar-profile">
    <div
      class="ui-sidebar-profile__toggle"
      @click="openProfileMenu"
    >
      <Avatar
        :label="personalInfo?.user?.name?.charAt(0)"
        size="small"
        shape="circle"
      />
    </div>
    <Popover ref="opProfileMenu" position="right" class="ui-sidebar-profile__popper">
      <div class="space-y-4 w-55">
        <router-link :to="PRP_PROFILE" class="flex items-center gap-2">
          <Avatar
            :label="personalInfo?.user?.name?.charAt(0)"
            size="small"
            shape="circle"
          />
          <div
            class="flex-1 overflow-hidden flex flex-col"
          >
            <div class="text-xs text-gray-900 text-left truncate">
              {{ personalInfo?.user?.name || '-' }}
            </div>
            <div class="text-[10px] text-gray-400 text-left truncate">
              {{ personalInfo?.user?.email || '-' }}
            </div>
          </div>
        </router-link>
        <Divider />
        <Button
          severity="secondary"
          variant="outlined"
          icon="pi pi-power-off"
          size="small"
          label="Logout"
          fluid
          @click="handleLogout"
        />
      </div>
    </Popover>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useRouter } from 'vue-router';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { removeAuth } from '@/helpers/auth.ts';
import { confirmConfig, toastConfig } from "@/helpers/toast.ts";
import { getPersonalInformation } from '@/helpers/auth.ts';
import { PREFIX_ROUTE_PATH as PRP_AUTH } from '@/modules/auth/services/constants.ts';
import { PREFIX_ROUTE_PATH as PRP_PROFILE } from '@/modules/profile/services/constants.ts';

defineProps({
  isCollapsed: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();
const confirm = useConfirm();
const toast = useToast();

const personalInfo = computed(() => getPersonalInformation());

const handleLogout = () => {
  confirm.require({
    ...confirmConfig({
      // message: 'Semua data akan disimpan.',
      header: 'Logout dari Akun ini?',
      rejectLabel: 'Batal',
      acceptLabel: 'Ok, Lanjutkan',
      type: 'warn',
    }),
    accept: () => {
      removeAuth();

      toast.add(toastConfig({
        type: 'success',
        title: 'Logout Succesfully',
      }));

      router.push(PRP_AUTH);
    },
  });
}

const opProfileMenu = ref();
const openProfileMenu = (event) => {
  opProfileMenu.value.toggle(event);
}
</script>
<style>
@import 'tailwindcss';

.ui-sidebar-profile {
  @apply relative;
}

.ui-sidebar-profile__toggle {
  @apply p-2 rounded-lg  cursor-pointer hover:bg-gray-50;
}

.ui-sidebar-profile__popper.p-popover {
  margin-right: 8px;
}

.ui-sidebar-profile__popper.p-popover:before,
.ui-sidebar-profile__popper.p-popover:after {
  @apply hidden;
}
</style>
<template>
  <component
    :is="item?.menus ? 'div' : 'router-link'"
    :to="item?.route"
    class="relative"
  >
    <div
      class="group flex items-center gap-2 rounded-md px-4 py-3 cursor-pointer hover:bg-gray-100 hover:text-gray-900"
      :class="{
        'bg-gray-100 text-gray-900': isActive,
        'bg-transparent text-gray-500': !isActive,
        'justify-center py-2! h-12!': isCollapsed,
      }"
      @click="item?.menus ? submenuCollapsed = !submenuCollapsed : emit('navigate')"
    >
      <i
        class="min-w-6"
        :class="[
          item?.icon,
          isCollapsed ? 'text-lg! text-center!' : 'text-md! text-left!',
        ]"
      />
      <span
        v-if="!isCollapsed"
        class="text-sm overflow-hidden truncate flex-1"
      >
        {{ item?.label }}
      </span>
      <i
        v-if="item?.menus && !isCollapsed"
        :class="['text-[8px]! pi pi-chevron-right', submenuCollapsed ? 'rotate-90' : '']"
      />
    </div>

    <div
      v-if="item?.menus && submenuCollapsed"
    >
      <slot />
    </div>
  </component>
</template>

<script lang="ts" setup>
interface MenuItem {
  label: string;
  route?: string;
  icon?: string;
  menus?: MenuItem[];
}

const props = defineProps({
  item: {
    type: Object as () => MenuItem,
    required: true,
  },
  isCollapsed: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

const submenuCollapsed = defineModel({
  type: Boolean,
  default: false,
});

const emit = defineEmits(['navigate']);
</script>

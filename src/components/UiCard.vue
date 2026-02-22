<template>
  <div class="relative border border-gray-200 bg-white rounded-md p-4 flex flex-col gap-4">
    <div
      v-if="$slots.header"
      class="w-full pb-4 border-b border-gray-200"
    >
      <slot name="header" />
    </div>

    <slot />

    <div
      v-if="$slots.footer"
      class="w-full pt-4 border-t border-gray-200"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
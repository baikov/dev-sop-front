<script lang="ts" setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer
    class="border-t bg-gray-900 text-gray-200 dark:border-gray-50/[0.2] lg:border-gray-900/10"
  >
    <UContainer class="flex flex-col items-center justify-between py-4 sm:flex-row">
      <div class="flex flex-col items-center sm:items-start">
        <span class="font-bold">ООО "СПЕЦОПТТОРГ"</span>
        <span>Оптовые поставки металлопроката © {{ year }}</span>
      </div>
      <div class="flex flex-col items-center py-2 sm:items-start">
        <p><span class="font-bold">Время работы</span> пн-пт: 8.00-17.00</p>
        <NuxtLink
          to="company/confidentiality"
          target="_blank"
          class="underline"
        >
          Политика конфиденциальности
        </NuxtLink>
      </div>
      <div class="hidden items-center gap-1 sm:float-right md:flex">
        <CommonSocial />
      </div>
    </UContainer>
    <UContainer class="flex w-full max-w-full items-center justify-center gap-5 bg-gray-950 py-2">
      <NuxtLink
        to="https://baikov.dev"
        target="_blank"
        class="text-sm font-bold"
      >
        baikov<span class="font-bold text-red-500 dark:text-gray-200">.dev</span>
      </NuxtLink>
      <span class="bg-primary-700 text-light-200 block rounded px-1 py-0.5 text-xs dark:bg-gray-200 dark:text-gray-900">
        v0.15.2
      </span>
    </UContainer>
  </footer>
</template>

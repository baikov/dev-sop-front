<script lang="ts" setup>
// const year = new Date().getFullYear().toString()
// const month = `0${(new Date().getMonth() + 1).toString().slice(-2)}`
</script>

<template>
  <div
    class="border-b border-gray-600 bg-green-700 text-slate-100 dark:bg-gray-900 dark:text-slate-300"
  >
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-1">
      <div class="flex flex-1 items-center justify-between gap-3 text-sm md:flex-auto md:justify-start">
        <NuxtLink
          class="font-bold hover:text-gray-800 dark:hover:text-zinc-200"
          to="tel:78312140314"
        >
          +7 (831) 214-03-14
        </NuxtLink>
        <span class="mx-2 hidden h-4 w-px bg-slate-100 md:block lg:mx-2" aria-hidden="true" />
        <NuxtLink
          class="font-bold hover:text-gray-800 dark:hover:text-zinc-200"
          to="mailto:info@soptorg.ru"
        >
          info@soptorg.ru
        </NuxtLink>
      </div>
      <div class="hidden md:block">
        <CommonCitySelector />
      </div>
      <!-- <div class="text-sm">
        <span>Актуальный прайс на {{ month }}.{{ year }}: </span>
        <NuxtLink
          to="#"
          class="font-bold underline hover:text-gray-800 dark:hover:text-zinc-200"
        >
          price.xlsx
        </NuxtLink>
      </div> -->
    </div>
  </div>
</template>

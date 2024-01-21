<script lang="ts" setup>
defineProps<{
  h1?: string
}>()
</script>

<template>
  <section class="relative mx-auto flex w-full flex-col">
    <div class="mx-auto w-full max-w-7xl p-4">
      <h1 class="my-2 text-2xl font-bold text-gray-800 dark:text-zinc-200 md:text-3xl">
        {{ h1 }}
      </h1>
      <div class="mt-2">
        <span class="inline-block h-1 w-40 rounded-full bg-green-700 dark:bg-zinc-200" />
        <span class="ml-1 inline-block h-1 w-3 rounded-full bg-green-700 dark:bg-zinc-200" />
        <span class="ml-1 inline-block size-1 rounded-full bg-green-700 dark:bg-zinc-200" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const cities = [
  'Нижний Новгород',
  'Бор',
  'Дзержинск',
  'Балахна',
  'Арзамас',
  'Городец',
  'Заволжье',
  'Выкса',
  'Кстово',
  'Кулебаки',
  'Павлово',
  'Саров'
]

const selected = ref(cities[0])
</script>

<template>
  <USelectMenu v-slot="{ open }" v-model="selected" :options="cities">
    <UButton variant="link" color="white" class="flex-1 justify-between">
      {{ selected }}

      <UIcon name="i-heroicons-chevron-right-20-solid" class="size-5 text-gray-50 transition-transform dark:text-gray-500" :class="[open && 'rotate-90']" />
    </UButton>
  </USelectMenu>
</template>

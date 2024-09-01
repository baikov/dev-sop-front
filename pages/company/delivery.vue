<script lang="ts" setup>
useHead({
  title: 'Информация о доставке стальной трубы, металлопроката и изоляции для труб',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content: 'Информация о доставке стальной трубы, металлопроката и изоляции для труб'
    }
  ]
})
const breadcrumbs = [
  {
    level: 1,
    name: 'Доставка',
    href: '/delivery',
    disabled: true
  }
]
</script>

<template>
  <div>
    <CommonBreadcrumbs :items="breadcrumbs" />
    <CommonPageHeader h1="Доставка стальной трубы, металлопроката и изоляции для труб" />
    <div class="mx-auto w-full max-w-7xl p-4">
      <CommonDelivery />
    </div>
  </div>
</template>

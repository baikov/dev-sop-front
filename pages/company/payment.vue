<script lang="ts" setup>
useHead({
  title: 'Информация об оплате',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content: 'Информация об оплате стальной трубы, металлопроката и изоляции для труб',
    },
  ],
})
const breadcrumbs = [
  {
    level: 1,
    name: 'О компании',
    href: '/company',
    disabled: true,
  },
  {
    level: 2,
    name: 'Оплата',
    href: '/company/payment',
    disabled: true,
  },
]
</script>

<template>
  <div>
    <CommonBreadcrumbs :items="breadcrumbs" />
    <CommonPageHeader h1="Оплата продукции компании СПЕЦОПТТОРГ" />
    <div class="mx-auto w-full max-w-7xl p-4">
      <CommonPayment />
    </div>
  </div>
</template>

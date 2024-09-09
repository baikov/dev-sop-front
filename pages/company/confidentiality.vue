<script lang="ts" setup>
useHead({
  title: 'Политика в области обработки и защиты персональных данных — СПЕЦОПТТОРГ',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content: 'Политика в области обработки и защиты персональных данных — СПЕЦОПТТОРГ'
    }
  ]
})
const breadcrumbs = [
  {
    level: 1,
    name: 'О компании',
    href: '/company',
    disabled: true
  },
  {
    level: 2,
    name: 'Политика конфиденциальности',
    href: '/company/confidentiality',
    disabled: true
  }
]
</script>

<template>
  <div>
    <CommonBreadcrumbs :items="breadcrumbs" />
    <CommonPageHeader h1="Политика конфиденциальности СПЕЦОПТТОРГ" />
    <div class="mx-auto w-full max-w-7xl p-4">
      <CommonConfidentiality />
    </div>
  </div>
</template>

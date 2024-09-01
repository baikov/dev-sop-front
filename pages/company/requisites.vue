<script lang="ts" setup>
useHead({
  title: 'Реквизиты ООО "СПЕЦОПТТОРГ"',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content: 'Реквизиты компании ООО "СПЕЦОПТТОРГ"'
    }
  ]
})
const breadcrumbs = [
  {
    level: 1,
    name: 'О компании',
    href: '/company',
    disabled: false
  },
  {
    level: 2,
    name: 'Реквизиты',
    href: '/company/requisites',
    disabled: true
  }
]
</script>

<template>
  <div>
    <CommonBreadcrumbs :items="breadcrumbs" />
    <CommonPageHeader h1="Реквизиты" />
    <div class="mx-auto w-full max-w-7xl p-4">
      <CommonRequisites />
    </div>
  </div>
</template>

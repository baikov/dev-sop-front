<script lang="ts" setup>
const config = useRuntimeConfig()
useHead({
  title: 'ООО "СПЕЦОПТТОРГ" - поставки стальной трубы, металлопроката, изоляции, опор для трубопроводов',
  titleTemplate: '%s',
  meta: [
    {
      name: 'description',
      content: 'Широкий выбор стальной трубы, металлопроката, деталей для трубопровода. Услуги доставки.'
    },
    {
      name: 'robots',
      content: 'index, follow'
    },
    {
      property: 'og:site_name',
      content: config.public.siteName
    },
    {
      property: 'og:url',
      content: config.public.siteUrl
    }
  ],
  link: [
    { rel: 'canonical', href: config.public.siteUrl }
  ]
})
</script>

<template>
  <div>
    <HomeHero />
    <HomeCatalog />
    <HomeAbout />
  </div>
</template>

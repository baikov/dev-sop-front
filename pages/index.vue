<script lang="ts" setup>
const config = useRuntimeConfig()
useHead({
  title: 'Металлопрокат в Нижнем Новгороде - купить с доставкой',
  titleTemplate: '%s',
  meta: [
    {
      name: 'description',
      content: 'Купить металлопрокат в Нижнем Новгороде оптом. Поставка трубного и сортового металлопроката по выгодным ценам за тонну и метр. Доставка по Нижегородской области',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      property: 'og:site_name',
      content: config.public.siteName,
    },
    {
      property: 'og:url',
      content: config.public.siteUrl,
    },
  ],
  link: [
    { rel: 'canonical', href: config.public.siteUrl },
  ],
})
</script>

<template>
  <div>
    <HomeHero />
    <HomeCatalog />
    <HomeAbout />
    <HomeSeoText />
  </div>
</template>

<script lang="ts" setup>
useSchemaOrg([
  defineLocalBusiness({
    name: 'ООО "СПЕЦОПТТОРГ"',
    url: 'https://soptorg.ru',
    logo: '/logo.png',
    sameAs: [
      'https://vk.com/soptorg'
    ],
    email: 'info@soptorg.ru',
    telephone: '+7 (831) 214-03-14',
    address: {
      addressCountry: 'Россия',
      postalCode: '603095',
      addressRegion: 'Нижегородская область',
      addressLocality: 'Нижний Новгород',
      streetAddress: 'пр-кт Бусыгина, д. 1, офис 325'
    },
    openingHours: 'Mo,Tu,We,Th,Fr 08:00-17:00'
  })
])
</script>
<template>
  <Body
    class="bg-gray-100 text-gray-800 antialiased transition-colors duration-0 dark:bg-gray-700 dark:text-gray-200"
  >
    <NuxtLayout>
      <NuxtLoadingIndicator :height="5" :duration="3000" :throttle="400" />
      <NuxtPage />
      <UNotifications />
    </NuxtLayout>
  </Body>
</template>

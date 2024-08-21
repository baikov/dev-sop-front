<script setup lang="ts">
const socialMediaRegexMap = [
  { regex: /vk\.com/, name: 'VK', icon: 'i-mdi-vk' },
  { regex: /t\.me/, name: 'Telegram', icon: 'i-mdi-telegram' },
  { regex: /instagram\.com/, name: 'Instagram', icon: 'i-mdi-instagram' },
  { regex: /wa\.me/, name: 'Whatsapp', icon: 'i-mdi-whatsapp' },
  { regex: /viber/, name: 'Viber', icon: 'i-icon-park-solid-phone-two' }
]

const { socials } = useAppConfig()
const mappedSocials = Object.values(socials).map((link) => {
  const foundSocial = socialMediaRegexMap.find(social => social.regex.test(link))
  if (!foundSocial) { throw new Error(`No social media found for link: ${link}`) }
  const { name, icon } = foundSocial
  return { name, link, icon }
})
</script>

<template>
  <div class="my-7 flex items-center justify-center gap-4">
    <NuxtLink
      v-for="social in mappedSocials"
      :key="social.name"
      :to="social.link"
      target="_blank"
      class="flex items-center justify-center"
      :aria-label="'Go to ' + social.name + ' profile'"
    >
      <UIcon :name="social.icon" class="size-8" />
    </NuxtLink>
  </div>
</template>

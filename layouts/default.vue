<script lang="ts" setup>
defineOgImage({
  component: 'OgImageDefault'
  // title: 'My awesome home page.'
})
</script>

<template>
  <div class="flex min-h-screen w-full flex-col">
    <CommonTopBanner />
    <CommonHeader />
    <div class="flex w-full flex-1 flex-col">
      <slot />
    </div>
    <CommonFooter />
    <CommonFormCall />
    <CommonFormQuestion />
  </div>
</template>

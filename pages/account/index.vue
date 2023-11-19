<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/store/auth'

const { authenticated } = storeToRefs(useAuthStore())
const breadcrumbs = [
  {
    level: 1,
    name: 'Account',
    href: '/account',
    disabled: true
  }
]
</script>

<template>
  <div>
    <CommonBreadcrumbs :items="breadcrumbs" />
    <UContainer class="flex flex-col items-center justify-center">
      <CommonAccountLoginRegistr v-if="!authenticated" />
      <CommonAccountProfile v-else />
    </UContainer>
  </div>
</template>

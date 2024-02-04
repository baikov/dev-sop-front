<script setup lang="ts">
import type { NuxtError } from '#app'
const router = useRouter()

defineProps({
  error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <Body
    class="bg-gray-100 text-gray-800 antialiased transition-colors duration-0 dark:bg-gray-700 dark:text-gray-200"
  >
    <NuxtLayout>
      <NuxtLoadingIndicator :height="5" :duration="3000" :throttle="400" />
      <div class="mx-auto flex size-full max-w-7xl flex-1 flex-col items-center justify-center gap-4 px-4">
        <h1 class="text-center text-5xl">
          {{ error?.statusCode }}
        </h1>
        <h2>Страница не найдена...</h2>
        <UButtonGroup size="sm" orientation="horizontal">
          <UButton
            label="Назад"
            @click="router.back()"
          />
          <UButton
            label="На главную"
            variant="outline"
            @click="handleError"
          />
        </UButtonGroup>
      </div>
      <UNotifications />
    </NuxtLayout>
  </Body>
</template>

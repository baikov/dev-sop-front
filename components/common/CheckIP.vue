<script setup lang="ts">
const config = useRuntimeConfig()

interface Geo {
  ip: string
  country: string
  region: string
  city: string
  error: string
}

const breadcrumbs = [
  {
    level: 1,
    name: 'Check IP',
    href: '/account/checkip',
    disabled: true,
  },
]
const endpoint = computed(
  () => `${config.public.apiUrl}/forms/check-ip/`,
)
const { data: geo, refresh } = await useFetch<Geo>(endpoint, {
  method: 'GET',
  server: false,
})

// const realIP = useState<string | string[]>('realIP')
// const forwardedFor = useState<string | string[]>('forwardedFor')
// const socketAddr = useState<string>('socketAddr')

// const testip = getRequestHeader(event, 'x-forwarded-for')
</script>

<template>
  <div>
    <CommonBreadcrumbs :items="breadcrumbs" />
    <UContainer class="flex flex-col items-center justify-center">
      <ClientOnly>
        <div
          v-if="geo"
          class="flex flex-col items-start justify-center gap-4"
        >
          <span class="text-lg font-bold">Backend:</span>
          <span>
            IP: <span class="font-bold">{{ geo.ip || 'Не определен' }}</span>
          </span>
          <span>
            Страна: <span class="font-bold">{{ geo.country || 'Не определена' }}</span>
          </span>
          <span>
            Регион: <span class="font-bold">{{ geo.region || 'Не определен' }}</span>
          </span>
          <span>
            Город: <span class="font-bold">{{ geo.city || 'Не определен' }}</span>
          </span>
          <span v-show="geo.error">
            Ошибка: <span class="font-bold">{{ geo.error }}</span>
          </span>
          <UButton @click="refresh">
            Refresh
          </UButton>
        </div>
        <div v-else>
          Something went wrong
        </div>
      </ClientOnly>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()

const breadcrumbs = [
  {
    level: 1,
    name: 'Check IP',
    href: '/account/checkip',
    disabled: true
  }
]
const endpoint = computed(
  () => `${config.public.apiUrl}/forms/check-ip`
)
const { data: ip, refresh } = await useFetch(endpoint)

const realIP = useState<string | string[]>('realIP')
const forwardedFor = useState<string | string[]>('forwardedFor')
const socketAddr = useState<string>('socketAddr')
</script>

<template>
  <div>
    <CommonBreadcrumbs :items="breadcrumbs" />
    <UContainer class="flex flex-col items-center justify-center">
      <div class="flex flex-col items-start justify-center gap-4">
        <span class="text-lg font-bold">Backend:</span>
        <span>
          REMOTE_ADDR: <span class="font-bold" :class="ip.remote_addr ? 'text-green-700' : 'text-red-700'">{{ ip.remote_addr || 'Не определен' }}</span>
        </span>
        <span>
          HTTP_X_FORWARDED_FOR: <span class="font-bold" :class="ip.forwarded ? 'text-green-700' : 'text-red-700'">{{ ip.forwarded || 'Не определен' }}</span>
        </span>
        <span class="text-lg font-bold">Frontend:</span>
        <span>
          x-real-ip: <span class="font-bold">{{ realIP }}</span>
        </span>
        <span>
          x-forwarded-for: <span class="font-bold">{{ forwardedFor }}</span>
        </span>
        <span>
          socket.remoteAddress: <span class="font-bold">{{ socketAddr }}</span>
        </span>
        <UButton @click="refresh">
          Refresh
        </UButton>
      </div>
    </UContainer>
  </div>
</template>

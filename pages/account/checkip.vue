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
const jsip = useState('ip')
</script>

<template>
  <div>
    <CommonBreadcrumbs :items="breadcrumbs" />
    <UContainer class="flex flex-col items-center justify-center">
      <div class="flex flex-col items-start justify-center gap-4">
        <span>
          REMOTE_ADDR: <span class="font-bold" :class="ip.remote_addr ? 'text-green-700' : 'text-red-700'">{{ ip.remote_addr || 'Не определен' }}</span>
        </span>
        <span>
          HTTP_X_FORWARDED_FOR: <span class="font-bold" :class="ip.forwarded ? 'text-green-700' : 'text-red-700'">{{ ip.forwarded || 'Не определен' }}</span>
        </span>
        <span>
          jsip: <span class="font-bold" :class="jsip ? 'text-green-700' : 'text-red-700'">{{ jsip || 'Не определен' }}</span>
        </span>
        <UButton @click="refresh">
          Refresh
        </UButton>
      </div>
    </UContainer>
  </div>
</template>

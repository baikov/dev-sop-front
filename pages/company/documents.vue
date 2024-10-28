<script lang="ts" setup>
import type { IDocument } from '~/types/catalog'

const config = useRuntimeConfig()
const toast = useToast()
useHead({
  title: 'Документы',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content: 'Сертификаты и лицензии',
    },
  ],
})
const breadcrumbs = [
  {
    level: 1,
    name: 'О компании',
    href: '/company',
    disabled: true,
  },
  {
    level: 2,
    name: 'Документы',
    href: '/company/documents',
    disabled: true,
  },
]

const { data: docs, error } = await useFetch<IDocument[]>(`${config.public.apiUrl}/documents/`)

if (error.value) {
  if (error.value.statusCode === 500) {
    toast.add({
      title: 'Ошибка на сервере',
      description: 'Что-то пошло не так, попробуйте позже',
      icon: 'i-heroicons-x-circle-solid',
      color: 'red',
    })
  }
  else {
    for (const key of Object.keys(error.value.data)) {
      toast.add({
        title: 'Ошибка получения списка документов',
        description: `${key}: ${error.value.data[key]}`,
        icon: 'i-heroicons-x-circle-solid',
        color: 'red',
      })
    }
  }
}
</script>

<template>
  <div>
    <CommonBreadcrumbs :items="breadcrumbs" />
    <CommonPageHeader h1="Сертификаты и лицензии" />
    <div class="mx-auto w-full max-w-7xl p-4">
      <CommonDocuments
        v-if="docs"
        :docs="docs"
      />
      <div v-else>
        <UIcon
          name="i-heroicons-x-circle-solid"
          class="text-4xl text-gray-500 dark:text-gray-400"
        />
        <p class="text-center text-lg text-gray-500 dark:text-gray-400">
          Документы не найдены
        </p>
      </div>
    </div>
  </div>
</template>

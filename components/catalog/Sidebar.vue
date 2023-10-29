<script lang="ts" setup>
const { getCatalogMenu } = useMenu()
const { data: catalogMenu, error } = await getCatalogMenu()

const toast = useToast()

if (error.value) {
  if (error.value.statusCode === 500) {
    toast.add({
      title: 'Ошибка на сервере',
      description: 'Что-то пошло не так, попробуйте позже',
      icon: 'i-heroicons-x-circle-solid',
      color: 'red'
    })
  } else {
    for (const key of Object.keys(error.value.data)) {
      toast.add({
        title: 'Ошибка получения списка меню',
        description: `${key}: ${error.value.data[key]}`,
        icon: 'i-heroicons-x-circle-solid',
        color: 'red'
      })
    }
  }
}
</script>

<template>
  <div class="flex w-full flex-1 flex-col justify-between border-e dark:border-gray-500">
    <div class="p-4">
      <CatalogLeftMenu :menu="catalogMenu" />
    </div>

    <div class="sticky inset-x-0 bottom-0 border-t border-gray-100 dark:border-gray-500">
      <NuxtLink to="mailto:info@soptorg.ru" class="flex items-center gap-2 bg-green-700 p-4 text-zinc-200 dark:bg-zinc-200 dark:text-gray-900">
        <UIcon name="i-mdi-email" class="h-10 w-10 rounded-full object-cover" />

        <div>
          <p class="text-md">
            <span class="block">Отправьте заявку</span>
            <span class="font-bold">info@soptorg.ru</span>
          </p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { getRootCategories } = useCategory()
const { data: rootCategories, error } = await getRootCategories()

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
        title: 'Ошибка получения списка категорий',
        description: `${key}: ${error.value.data[key]}`,
        icon: 'i-heroicons-x-circle-solid',
        color: 'red'
      })
    }
  }
}
const breadcrumbs = [
  {
    level: 1,
    name: 'Каталог',
    href: '/catalog',
    disabled: true
  }
]
</script>

<template>
  <div>
    <CommonBreadcrumbs :items="breadcrumbs" />
    <CommonPageHeader h1="Каталог металлопроката" />
    <div class="mx-auto flex w-full max-w-7xl flex-1 gap-4 px-4">
      <!-- <div class="hidden flex-col md:flex md:w-4/12 lg:w-3/12">
        <CatalogSidebar />
      </div> -->
      <div class="w-full">
        <CatalogSubcategories :subcat-list="rootCategories" />
      </div>
    </div>
  </div>
</template>

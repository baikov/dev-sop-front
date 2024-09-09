<script lang="ts" setup>
// import { storeToRefs } from 'pinia'
// import { useAuthStore } from '~/store/auth'
// const router = useRouter()
// const { authenticated } = storeToRefs(useAuthStore())
// const logout = () => {
//   logUserOut()
//   router.push('/login')
// }
import type { IMenuItem } from '~/types'
const { getCatalogMenu } = useMenu()
const { data: catalogMenu, error } = await getCatalogMenu()
const toast = useToast()

const mainMenu: IMenuItem[] = [
  {
    id: 274,
    name: 'О компании',
    depth: 1,
    slug: 'company',
    submenu: [
      { id: 278, name: 'Доставка', depth: 1, slug: 'delivery', submenu: [] },
      { id: 279, name: 'Оплата', depth: 1, slug: 'payment', submenu: [] },
      { id: 277, name: 'Реквизиты', depth: 1, slug: 'requisites', submenu: [] },
      { id: 280, name: 'Документы', depth: 1, slug: 'documents', submenu: [] }
    ]
  },
  { id: 275, name: 'Услуги', depth: 1, slug: 'services', submenu: [] },
  { id: 276, name: 'Контакты', depth: 1, slug: 'contacts', submenu: [] }
]
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
        title: 'Ошибка получения списка клиентов',
        description: `${key}: ${error.value.data[key]}`,
        icon: 'i-heroicons-x-circle-solid',
        color: 'red'
      })
    }
  }
}

const callFormIsOpen = useState('callFormIsOpen', () => false)
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-gray-600 bg-gradient-to-r from-gray-900 to-gray-700 text-zinc-200">
    <CommonTopBanner />
    <UContainer class="flex flex-1 items-center justify-between">
      <CommonLogo />
      <nav class="hidden flex-1 items-center justify-end px-4 md:flex">
        <CommonMainMenu :main-menu="mainMenu" :catalog-menu="catalogMenu" />
      </nav>
      <div class="flex items-center md:flex-initial">
        <LazyCommonSearch />
        <CommonDarkToggleSwipe />
        <!-- <CommonDarkToggle /> -->
        <!-- <CommonHeaderProfile class="ml-4" /> -->
        <!-- <CommonCart /> -->
        <UButton label="Заказать звонок" class="ml-4 hidden md:block" @click="callFormIsOpen = true" />
        <LazyCommonMobileMenu :main-menu="mainMenu" :catalog-menu="catalogMenu" />
      </div>
    </UContainer>
  </header>
</template>

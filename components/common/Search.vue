<script lang="ts" setup>
import type { IProductList, IProduct } from '~/types/catalog'
const config = useRuntimeConfig()
const toast = useToast()
const searchPopUpIsOpen = useState('searchPopUpIsOpen', () => false)
const q = useState<string>('q', () => '')
const serched = ref<boolean>(false)
// const inStock = useState<boolean>('inStock', () => false)

const foundedProducts = ref<IProduct[] | []>([] as IProduct[])
async function search () {
  serched.value = true
  if (q.value === '') { return }
  const { data: products, error } = await useFetch<IProductList>(`${config.public.apiUrl}/products/?name=${q.value}`, {
    method: 'GET',
    server: false
  })
  if (products.value) {
    foundedProducts.value = products.value?.results
  } else {
    foundedProducts.value = []
  }

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
          title: 'Ошибка получения списка продукции',
          description: `${key}: ${error.value.data[key]}`,
          icon: 'i-heroicons-x-circle-solid',
          color: 'red'
        })
      }
    }
  }
}
</script>

<template>
  <UButton
    class="hover:text-primary-500 mr-4 text-gray-50"
    icon="i-heroicons-magnifying-glass-20-solid"
    variant="link"
    @click="searchPopUpIsOpen = true"
  />
  <ClientOnly>
    <UModal v-model="searchPopUpIsOpen">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Поиск по товарам
            </p>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="searchPopUpIsOpen = false" />
          </div>
        </template>

        <div class="flex items-center gap-2">
          <UInput
            v-model="q"
            class="flex-1"
            name="q"
            placeholder="Трубы ВГП 65"
            icon="i-heroicons-magnifying-glass-20-solid"
            autocomplete="off"
            :ui="{ icon: { trailing: { pointer: '' } } }"
          >
            <template #trailing>
              <UButton
                v-show="q !== ''"
                color="gray"
                variant="link"
                icon="i-heroicons-x-mark-20-solid"
                :padded="false"
                @click="q = ''"
              />
            </template>
          </UInput>
          <UButton :disabled="!q" @click="search">
            Найти
          </UButton>

          <!-- <UFormGroup>
            <UCheckbox v-model="inStock">
              <template #label>
                <span>Только в наличии</span>
              </template>
            </UCheckbox>
          </UFormGroup> -->
        </div>

        <!-- Search results -->
        <div class="py-4">
          <div v-if="foundedProducts.length > 0" class="p-4">
            <div v-for="product in foundedProducts.slice(0, 50)" :key="product.id" class="pb-2">
              <ULink :to="`/product/${product.slug}`" @click="searchPopUpIsOpen = false">
                <div class="items center flex flex-col">
                  <div class="flex items-center justify-between align-middle">
                    <span class="text-blue-800">
                      {{ product.name }}
                    </span>
                    <span v-if="product.ton_price_with_coef" class="text-xs text-gray-600">
                      {{ product.ton_price_with_coef }} ₽/т
                    </span>
                    <span v-if="product.meter_price_with_coef" class="text-xs text-gray-600">
                      {{ product.meter_price_with_coef }} ₽/м
                    </span>
                  </div>
                  <div class="flex gap-2 text-xs text-gray-500">
                    <span v-for="prop in product.properties" :key="prop.id" class="">
                      {{ prop.name }}: {{ prop.value }}
                    </span>
                  </div>
                </div>
              </ULink>
            </div>
          </div>
          <div v-else-if="serched">
            <div class="flex items-center justify-center">
              <UIcon name="i-mdi-database-search-outline" class="size-5" />
              <p class="text-gray-500">
                Ничего не найдено
              </p>
            </div>
          </div>
          <div v-if="!serched">
            <div class="flex items-center justify-center">
              <UIcon name="i-mdi-database-search-outline" class="size-5" />
              <p class="text-gray-500">
                Введите запрос и нажмите "Найти"
              </p>
            </div>
          </div>
        </div>
        <template #footer />
      </UCard>
    </UModal>
  </ClientOnly>
</template>

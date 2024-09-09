<script lang="ts" setup>
// import type { IProduct } from '~/types/catalog'

// Cart
// import { useCartStore } from '~/store/cart'
// const { cart, addProduct, removeProduct, increaseProductQuantity, decreaseProductQuantity } = useCartStore()
const { getProductDetail } = useCategory()
const route = useRoute()
const config = useRuntimeConfig()
const slug = route.params.slug.toString()
const { data: productDetail, error } = await getProductDetail(slug)
const toast = useToast()

if (error.value) {
  if (error.value.statusCode === 500) {
    toast.add({
      title: 'Ошибка на сервере',
      description: 'Что-то пошло не так, попробуйте позже',
      icon: 'i-heroicons-x-circle-solid',
      color: 'red'
    })
  } else if (error.value.statusCode === 404) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Страница не найдена'
    })
  } else {
    for (const key of Object.keys(error.value.data)) {
      toast.add({
        title: 'Ошибка получения категории',
        description: `${key}: ${error.value.data[key]}`,
        icon: 'i-heroicons-x-circle-solid',
        color: 'red'
      })
    }
  }
}

const columns = [
  {
    key: 'name',
    label: 'Название'
  },
  {
    key: 'in_stock',
    label: 'Наличие'
  },
  {
    key: 'price',
    label: 'Цена'
  }
]
const seoTitleTemplate = productDetail?.value?.name + ' купить в Нижнем Новгороде | ' + productDetail.value?.category
const seoDescriptionTemplate = 'Купить ' + productDetail?.value?.category + ' с доставкой по Нижнему Новгороду. ' + productDetail?.value?.name + ' в наличии на складе ' + config.public.siteName
useHead({
  title: productDetail?.value?.seo.seo_title || seoTitleTemplate,
  titleTemplate: '%s',

  meta: [
    {
      name: 'description',
      content: productDetail?.value?.seo.seo_description || seoDescriptionTemplate
    },
    {
      name: 'robots',
      content: `${productDetail?.value?.seo.is_index ? 'index' : 'noindex'}, ${productDetail?.value?.seo.is_follow ? 'follow' : 'nofollow'
        }`
    },
    {
      property: 'og:site_name',
      content: config.public.siteName
    },
    {
      property: 'og:url',
      content: `${config.public.siteUrl}${route.path}`
    }
  ],
  link: [
    { rel: 'canonical', href: `${config.public.siteUrl}${route.path}` }
  ]
})

const tabItems: any = []

if (productDetail.value?.description) {
  tabItems.push({
    key: 'description',
    label: 'Описание',
    defaultOpen: true,
    icon: 'i-heroicons-information-circle'
  })
}
if (productDetail.value?.documents && productDetail.value?.documents.length > 0) {
  tabItems.push({
    key: 'docs',
    label: 'Документы',
    icon: 'i-mdi-file-pdf'
  })
}

const currencyOptions = {
  // style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0
}

// Cart
// const count = ref(1)
// const quantityInCart = computed(() => {
//   const productInCart = cart.productsInCart.find(product => product.id === productDetail.value?.id)
//   return productInCart ? productInCart.quantity : 0
// })

const questionFormIsOpen = useState('questionFormIsOpen')
const productName = useState('productName', () => productDetail.value?.name)
productName.value = productDetail.value?.name

useSchemaOrg([
  defineProduct({
    name: productDetail.value?.seo.h1 || productDetail.value?.name,
    description: productDetail.value?.seo.seo_description,
    image: productDetail.value?.image,
    offers: [
      {
        price: productDetail.value?.ton_price_with_coef,
        url: `${config.public.siteUrl}${route.path}`,
        priceCurrency: 'RUB',
        availability: 'https://schema.org/InStock'
      }
    ],
    aggregateRating: {
      ratingValue: Math.random() * (5.0 - 4.0) + 4.0,
      bestRating: 5,
      ratingCount: Math.floor(Math.random() * 49)
    }
  })
])

const deliveryModalIsOpen = useState('deliveryModalIsOpen', () => false)
const paymentModalIsOpen = useState('paymentModalIsOpen', () => false)
</script>

<template>
  <div>
    <CommonBreadcrumbs :items="productDetail?.breadcrumbs" />
    <CommonPageHeader :h1="productDetail?.seo.h1 || productDetail?.name" />
    <div class="mx-auto flex w-full max-w-7xl flex-1 gap-4 px-4">
      <div class="hidden flex-col md:flex md:w-4/12 lg:w-3/12">
        <CatalogSidebar />
      </div>
      <div v-if="productDetail" class="w-full md:w-8/12 lg:w-9/12">
        <div class="flex w-full flex-col items-center justify-center gap-4 pb-8 md:flex-row">
          <div class="flex w-full items-center justify-center md:w-1/3">
            <!-- <NuxtImg src="https://via.placeholder.com/600" placeholder densities="x1 x2" height="300" /> -->
            <NuxtImg
              v-show="productDetail.image"
              :src="`/soptorg/media/${productDetail.image}`"
              sizes="100vw sm:50vw md:400px"
              :alt="productDetail.name"
              :title="productDetail.name"
              loading="lazy"
              class="relative top-0 inline-block transition-all duration-300 ease-in-out group-hover:-top-0.5 dark:invert"
            />
            <div class="absolute left-12 top-2">
              <div v-for="prop in productDetail.properties" :key="prop.id">
                <span v-if="prop.code === 'diametr'" class="text-xl font-bold">{{ prop.value }}</span>
              </div>
            </div>
            <div class="absolute right-12 top-2">
              <div v-for="prop in productDetail.properties" :key="prop.id">
                <span v-if="prop.code === 'tolshina_stenki'" class="text-xl font-bold">{{ prop.value }}</span>
              </div>
            </div>
          </div>
          <div class="w-full md:w-2/3">
            <UCard>
              <template #header>
                Наличие на складах:
                <span :class="{ 'text-yellow-500': !productDetail.in_stock, 'text-green-500': productDetail.in_stock }">
                  {{ productDetail.in_stock ? 'Много' : 'Мало' }}
                </span>
              </template>

              <div class="flex gap-4">
                <div class="w-1/2">
                  <span class="font-bold">
                    Характеристики:
                  </span>
                  <ul>
                    <li v-for="prop in productDetail.properties" :key="prop.id">
                      {{ prop.name }}: {{ prop.value }}
                    </li>
                  </ul>
                </div>
                <div class="w-1/2">
                  <div v-if="productDetail.ton_price_with_coef">
                    <span>Цена за тонну: </span>
                    <span class="font-bold">{{ productDetail.ton_price_with_coef.toLocaleString('ru-RU', {'style': 'currency', ...currencyOptions}) }}</span>
                  </div>
                  <div v-if="productDetail.meter_price_with_coef">
                    <span>Цена за метр:</span>
                    {{ productDetail.meter_price_with_coef.toLocaleString('ru-RU', {'style': 'currency', ...currencyOptions}) }}
                  </div>
                  <div v-if="productDetail.unit_price_with_coef">
                    <span>Цена за штуку:</span>
                    {{ productDetail.unit_price_with_coef.toLocaleString('ru-RU', {'style': 'currency', ...currencyOptions}) }}
                  </div>
                </div>
              </div>

              <template #footer>
                <div class="flex justify-between gap-4">
                  <!-- Cart -->
                  <!-- <UButtonGroup size="sm" orientation="horizontal">
                    <UButton
                      icon="i-heroicons-minus"
                      size="sm"
                      color="primary"
                      square
                      variant="solid"
                      @click="count > 1 ? count-- : 1"
                    />
                    <UInput v-model="count" class="w-[100px]">
                      <template #trailing>
                        <span class="text-xs text-gray-500 dark:text-gray-400">тонн</span>
                      </template>
                    </UInput>
                    <UButton
                      icon="i-heroicons-plus"
                      size="sm"
                      color="primary"
                      square
                      variant="solid"
                      @click="count++"
                    />
                  </UButtonGroup>
                  <UButton
                    icon="i-mdi-playlist-plus"
                    @click="addProduct({
                      'id': productDetail.id,
                      'name': productDetail.name,
                      'price': productDetail.ton_price_with_coef,
                      'quantity': count,
                      'total': (quantityInCart + count) * productDetail.ton_price_with_coef
                    })"
                  >
                    Добавить в заказ
                  </UButton> -->
                  <UButton icon="i-mdi-mail" variant="outline" @click="questionFormIsOpen = true">
                    Задать вопрос
                  </UButton>
                  <div class="flex items-center">
                    <UButton
                      icon="i-mdi-truck-fast-outline"
                      size="sm"
                      color="black"
                      variant="link"
                      :trailing="false"
                      @click="deliveryModalIsOpen = true"
                    >
                      <span class="hidden md:block">Доставка</span>
                    </UButton>
                    <UButton
                      icon="i-mdi-credit-card-outline"
                      size="sm"
                      color="black"
                      variant="link"
                      :trailing="false"
                      @click="paymentModalIsOpen = true"
                    >
                      <span class="hidden md:block">Оплата</span>
                    </UButton>
                  </div>
                </div>
                <!-- <div v-if="quantityInCart">
                  <span>В заказ уже добавлено {{ quantityInCart }} тонн</span>
                </div>
                <div v-else>
                  Отсутствут в заказе
                </div> -->
              </template>
            </UCard>
          </div>
        </div>

        <div class="flex flex-col gap-4 pb-8 md:flex-row">
          <UCard class="border-primary-500 flex w-full items-center justify-center border-2 text-center dark:border-gray-400 md:w-1/3">
            Оптимальное соотношение цены и качества
          </UCard>
          <UCard class="border-primary-500 flex w-full items-center justify-center border-2 text-center dark:border-gray-400 md:w-1/3">
            Репутация надежного поставщика
          </UCard>
          <UCard class="border-primary-500 flex w-full items-center justify-center border-2 text-center dark:border-gray-400 md:w-1/3">
            Гарантия соблюдения сроков
          </UCard>
        </div>

        <UTabs v-if="tabItems.length > 0" :items="tabItems" class="hidden w-full pb-8 md:block">
          <template #default="{ item, selected }">
            <div class="relative flex items-center gap-2 truncate">
              <UIcon :name="item.icon" class="size-4 shrink-0" />

              <h2 class="truncate">
                {{ item.label }}
              </h2>

              <span v-if="selected" class="bg-primary-500 dark:bg-primary-400 absolute -right-4 size-2 rounded-full" />
            </div>
          </template>
          <template #item="{ item }">
            <div v-if="item.key === 'docs'">
              <!-- Documents -->
              <div v-if="productDetail.documents.length > 0" class="flex flex-col gap-4">
                <CommonDocuments :docs="productDetail.documents" :is-full="true" />
              </div>
              <div v-else>
                <p>{{ item.content }}</p>
              </div>
            </div>
            <div v-if="item.key === 'description'" class="description px-4">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <div v-if="productDetail?.description" v-html="productDetail?.description" />
              <div v-else>
                {{ item.content }}
              </div>
            </div>
          </template>
        </UTabs>

        <UAccordion v-if="tabItems.length > 0" :items="tabItems" class="block w-full pb-8 md:hidden">
          <template #default="{ item, selected }">
            <div class="relative flex items-center gap-2 truncate">
              <UIcon :name="item.icon" class="size-4 shrink-0" />

              <h2 class="truncate">
                {{ item.label }}
              </h2>

              <span v-if="selected" class="bg-primary-500 dark:bg-primary-400 absolute -right-4 size-2 rounded-full" />
            </div>
          </template>
          <template #item="{ item }">
            <!-- Description -->
            <div v-if="item.key === 'description'" class="description px-4">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <div v-if="productDetail?.description" v-html="productDetail?.description" />
              <div v-else>
                {{ item.content }}
              </div>
            </div>
            <!-- Documents -->
            <div v-if="item.key === 'docs'">
              <div v-if="productDetail.documents.length > 0" class="flex flex-col gap-4">
                <CommonDocuments :docs="productDetail.documents" :is-full="true" />
              </div>
              <div v-else>
                <p>{{ item.content }}</p>
              </div>
            </div>
          </template>
        </UAccordion>

        <h2 class="my-2 text-xl font-bold text-gray-800 dark:text-zinc-200 md:text-xl">
          {{ productDetail.category }} других размеров
        </h2>
        <UTable
          v-if="productDetail.same_category_products.length > 0"
          :columns="columns"
          :rows="productDetail.same_category_products"
        >
          <template #name-data="{ row }">
            <NuxtLink :to="`/product/${row.slug}`" class="underline hover:text-gray-700 dark:hover:text-gray-200">
              {{ row.name }}
            </NuxtLink>
          </template>
          <template #in_stock-data="{ row }">
            <span :class="{ 'text-yellow-500': !row.in_stock, 'text-green-500': row.in_stock }">{{ row.in_stock ? 'Много' : 'Мало' }}</span>
          </template>
          <template #price-data="{ row }">
            <div v-if="row.ton_price_with_coef || row.meter_price_with_coef || row.unit_price_with_coef">
              <span v-show="row.ton_price_with_coef" class="font-bold">
                {{ row.ton_price_with_coef.toLocaleString('ru-RU', currencyOptions) }}/т
              </span>
              <span v-show="!row.ton_price_with_coef && row.unit_price_with_coef" class="font-bold">
                {{ `${row.unit_price_with_coef.toLocaleString('ru-RU', currencyOptions)}/шт` }}
              </span>
              <span v-show="!row.ton_price_with_coef && row.meter_price_with_coef" class="font-bold">
                {{ `${row.meter_price_with_coef.toLocaleString('ru-RU', currencyOptions)}/м` }}
              </span>
              <p v-if="row.ton_price_with_coef && row.meter_price_with_coef" class="text-xs font-normal text-gray-600 dark:text-gray-400">
                {{ row.meter_price_with_coef.toLocaleString('ru-RU', currencyOptions) }}/м
              </p>
              <p v-if="row.ton_price_with_coef && row.unit_price_with_coef" class="text-xs font-normal text-gray-600 dark:text-gray-400">
                {{ row.unit_price_with_coef.toLocaleString('ru-RU', currencyOptions) }}/шт
              </p>
            </div>
            <div v-else>
              <span class="font-bold">
                По запросу
              </span>
            </div>
          </template>
        </UTable>
        <h2 class="my-2 text-xl font-bold text-gray-800 dark:text-zinc-200 md:text-xl">
          Сопутствующие товары
        </h2>
        <UTable
          v-if="productDetail.related_products.length > 0"
          :columns="columns"
          :rows="productDetail.related_products"
        >
          <template #name-data="{ row }">
            <NuxtLink :to="`/product/${row.slug}`" class="underline hover:text-gray-700 dark:hover:text-gray-200">
              {{ row.name }}
            </NuxtLink>
          </template>
          <template #in_stock-data="{ row }">
            <span :class="{ 'text-yellow-500': !row.in_stock, 'text-green-500': row.in_stock }">{{ row.in_stock ? 'Много' : 'Мало' }}</span>
          </template>
          <template #price-data="{ row }">
            <div v-if="row.ton_price_with_coef || row.meter_price_with_coef || row.unit_price_with_coef">
              <span v-show="row.ton_price_with_coef" class="font-bold">
                {{ row.ton_price_with_coef.toLocaleString('ru-RU', currencyOptions) }}/т
              </span>
              <span v-show="!row.ton_price_with_coef && row.unit_price_with_coef" class="font-bold">
                {{ `${row.unit_price_with_coef.toLocaleString('ru-RU', currencyOptions)}/шт` }}
              </span>
              <span v-show="!row.ton_price_with_coef && row.meter_price_with_coef" class="font-bold">
                {{ `${row.meter_price_with_coef.toLocaleString('ru-RU', currencyOptions)}/м` }}
              </span>
              <p v-if="row.ton_price_with_coef && row.meter_price_with_coef" class="text-xs font-normal text-gray-600 dark:text-gray-400">
                {{ row.meter_price_with_coef.toLocaleString('ru-RU', currencyOptions) }}/м
              </p>
              <p v-if="row.ton_price_with_coef && row.unit_price_with_coef" class="text-xs font-normal text-gray-600 dark:text-gray-400">
                {{ row.unit_price_with_coef.toLocaleString('ru-RU', currencyOptions) }}/шт
              </p>
            </div>
            <div v-else>
              <span class="font-bold">
                По запросу
              </span>
            </div>
          </template>
        </UTable>
      </div>
      <div v-else class="w-full">
        <p>Проблема получения данных...</p>
      </div>
    </div>
    <LazyUModal v-model="deliveryModalIsOpen">
      <UCard
        class="dark:bg-gray-800"
        :ui="{
          base: 'h-full flex flex-col',
          rounded: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-600',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <p class="text-base font-semibold leading-4 text-gray-900 dark:text-white">
              Доставка
            </p>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="deliveryModalIsOpen = false" />
          </div>
        </template>

        <CommonDelivery />
      </UCard>
    </LazyUModal>
    <LazyUModal v-model="paymentModalIsOpen">
      <UCard
        class="dark:bg-gray-800"
        :ui="{
          base: 'h-full flex flex-col',
          rounded: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-600',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <p class="text-base font-semibold leading-4 text-gray-900 dark:text-white">
              Оплата
            </p>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="paymentModalIsOpen = false" />
          </div>
        </template>
        <CommonPayment />
      </ucard>
    </LazyUModal>
  </div>
</template>

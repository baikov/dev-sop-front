<script lang="ts" setup>
// import type { IProduct } from '~/types/catalog'
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

// const items = [{
//   label: 'Описание',
//   icon: 'i-heroicons-information-circle',
//   content: productDetail?.value?.description || `Компания ООО «СпецОптТорг» является крупнейшим поставщиком ${productDetail.value?.name}`
// }, {
//   label: 'Доставка и оплата',
//   icon: 'i-mdi-truck-fast-outline',
//   content: 'Доставка металлопродукции до вашего объекта - от 1 дня. Доставляем металл собственным автопарком и транспортными компаниями в любую точкуРФ. Выдаем с грузом сопроводительные документы: ТТН, счет-фактура, акт выполненных работ и УПД'
// }, {
//   label: 'Документы',
//   icon: 'i-mdi-file-pdf',
//   content: 'Finally, this is the content for Tab3'
// }]

// const count = ref(1)

const currencyOptions = {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0
}
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
        <div class="flex w-full gap-4 pb-8">
          <div class="relative w-1/3 self-center">
            <!-- <NuxtImg src="https://via.placeholder.com/600" placeholder densities="x1 x2" height="300" /> -->
            <NuxtImg
              v-show="productDetail.image"
              :src="`/soptorg/${productDetail.image}`"
              sizes="100vw sm:50vw md:400px"
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
          <div class="w-2/3">
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
                    <span class="font-bold">{{ productDetail.ton_price_with_coef.toLocaleString('ru-RU', currencyOptions) }}</span>
                  </div>
                  <div v-if="productDetail.meter_price_with_coef">
                    <span>Цена за метр:</span>
                    {{ productDetail.meter_price_with_coef.toLocaleString('ru-RU', currencyOptions) }}
                  </div>
                  <div v-if="productDetail.unit_price_with_coef">
                    <span>Цена за штуку:</span>
                    {{ productDetail.unit_price_with_coef.toLocaleString('ru-RU', currencyOptions) }}
                  </div>
                </div>
              </div>

              <template #footer>
                <!-- <div class="flex gap-4">
                  <UButtonGroup size="sm" orientation="horizontal">
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
                  <UButton to="#" icon="i-mdi-playlist-plus">
                    Добавить в заказ
                  </UButton>
                </div> -->
                <UButton to="mailto:info@soptorg.ru" icon="i-mdi-mail-ru">
                  Отправить заявку
                </UButton>
              </template>
            </UCard>
          </div>
        </div>

        <div class="flex gap-4 pb-8">
          <UCard class="border-primary-500 w-1/3 border-2 dark:border-gray-400">
            Оптимальное соотношение цены и качества
          </UCard>
          <UCard class="border-primary-500 w-1/3 border-2 dark:border-gray-400">
            Репутация надежного поставщика
          </UCard>
          <UCard class="border-primary-500 w-1/3 border-2 dark:border-gray-400">
            Гарантия соблюдения сроков
          </UCard>
        </div>

        <!-- <UTabs :items="items" class="w-full pb-8">
          <template #default="{ item, index, selected }">
            <div class="relative flex items-center gap-2 truncate">
              <UIcon :name="item.icon" class="h-4 w-4 shrink-0" />

              <span class="truncate">{{ index + 1 }}. {{ item.label }}</span>

              <span v-if="selected" class="bg-primary-500 dark:bg-primary-400 absolute -right-4 h-2 w-2 rounded-full" />
            </div>
          </template>
        </UTabs> -->

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
                {{ row.ton_price_with_coef.toLocaleString('ru-RU', currencyOptions) }}/тн
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
                {{ row.ton_price_with_coef.toLocaleString('ru-RU', currencyOptions) }}/тн
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
  </div>
</template>

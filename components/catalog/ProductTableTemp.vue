<script lang="ts" setup>
import type { IProductList, IProductProperty } from '~/types/catalog'
const config = useRuntimeConfig()
const route = useRoute()
const slug = route.params.slug.toString()
const toast = useToast()

interface SortRef {
  column: string;
  direction: 'asc' | 'desc';
}
const sort = ref<SortRef>({
  column: 'diametr',
  direction: 'asc'
})

const props = defineProps<{
  categoryProperties: IProductProperty[]
}>()

const djangoSort = computed(() => {
  if (sort.value.direction === 'desc') {
    return `-${sort.value.column}`
  } else {
    return sort.value.column
  }
})

const productListParams = useState('productListParams', () => {
  const res = props.categoryProperties.reduce((acc: Record<string, any>, item: any) => {
    acc[item.code] = ''
    return acc
  }, {}) || {}
  res.limit = 50
  res.offset = 0
  return res
})

const page = computed({
  get () {
    return productListParams.value.offset / productListParams.value.limit + 1
  },
  set (newValue) {
    productListParams.value.offset = (newValue - 1) * productListParams.value.limit
  }
})

const filters = computed(
  () => {
    let result = ''
    for (const prop of props.categoryProperties) {
      if (productListParams.value[prop.code]) {
        result += `&${prop.code}=${productListParams.value[prop.code]}`
      }
    }
    return result
  }
)

// const productProperties = ref<string[]>([])

// const getProps = () => {
//   if (!productList.value?.results[0]) {
//     console.log('No products', productList.value?.results[0])
//     return []
//   }
//   for (const realProp of productList.value?.results[0].properties || []) {
//     productProperties.value.push(realProp.code)
//   }
// }

const endpoint = computed(
  () => `${config.public.apiUrl}/products/?category=${slug}&sort=${djangoSort.value}&limit=${productListParams.value.limit}&offset=${productListParams.value.offset}${filters.value}`
)

const { data: productList, pending, error } = await useFetch<IProductList>(
  endpoint,
  {
    method: 'get',
    watch: [endpoint]
  }
)

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
// else {
//   getProps()
// }

interface IProductRow {
  id: number
  name: string
  slug: string
  in_stock: boolean
  meter_price_with_coef: number
  ton_price_with_coef: number
  unit_price_with_coef: number
  [key: string | number | symbol]: any
}
const table = computed(() => {
  const res = [] as IProductRow[]
  for (const item of productList.value?.results || []) {
    const props = item.properties
    const row: IProductRow = {
      id: item.id,
      name: item.name,
      slug: item.slug,
      in_stock: item.in_stock,
      meter_price_with_coef: item.meter_price_with_coef,
      ton_price_with_coef: item.ton_price_with_coef,
      unit_price_with_coef: item.unit_price_with_coef
    }
    for (const prop of props) {
      row[prop.code] = parseFloat(prop.value) || prop.value
    }
    res.push(row)
  }
  return res
})

const baseColumns = [
  {
    key: 'in_stock',
    label: 'Наличие'
  },
  {
    key: 'price',
    label: 'Цена'
  }
]

const productProperties = computed(() => {
  if (!productList.value?.results[0]) {
    return []
  }
  const res = []
  for (const realProp of productList.value?.results[0].properties || []) {
    res.push(realProp.code)
  }
  return res
})

const propColumns = computed(() => {
  const res = []
  for (const item of props.categoryProperties) {
    if (productProperties.value.includes(item.code)) {
      res.push({
        key: item.code,
        label: item.name,
        sortable: item.is_sortable
      })
    }
  }
  return res
}
)

const columns = computed(() => {
  return [
    {
      key: 'name',
      label: 'Название'
    },
    ...propColumns.value,
    ...baseColumns
  ]
})

const updateSort = () => {
  productListParams.value.offset = 0
}

const setUnsetFilter = (propertyCode: string, value: string) => {
  if (productListParams.value[propertyCode] === value) {
    productListParams.value[propertyCode] = ''
  } else {
    productListParams.value[propertyCode] = value
  }
  productListParams.value.offset = 0
  isOpen.value = false
}

const isOpen = ref(false)

watch(route, () => {
  productListParams.value.offset = 0
  for (const item in props.categoryProperties) {
    productListParams.value[props.categoryProperties[item].code] = ''
  }
}, { flush: 'sync', immediate: true, deep: true })

watch(error, () => {
  if (error.value) {
    if (error.value.statusCode === 500) {
      toast.add({
        title: 'Ошибка на сервере',
        description: 'Что-то пошло не так, попробуйте позже',
        icon: 'i-heroicons-x-circle-solid',
        color: 'red'
      })
      sort.value = { direction: 'asc', column: 'diametr' }
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
})

const currencyOptions = {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0
}
// const ctx = useNuxtApp()
// if (process.client)
//   ctx.$metrika.reachGoal('zzz')
</script>

<template>
  <div class="flex flex-col">
    <div>
      <UButton label="Фильтры" @click="isOpen = true" />
    </div>
    <div class="flex gap-2 py-2">
      <template v-for="prop in categoryProperties" :key="prop.code">
        <UChip v-if="productListParams[prop.code] !== ''" text="x" color="gray">
          <UBadge
            class="cursor-pointer bg-red-500"
            @click="setUnsetFilter(prop.code, productListParams[prop.code])"
          >
            {{ prop.name }}: {{ productListParams[prop.code] }}
          </UBadge>
        </UChip>
      </template>
    </div>
    <USlideover v-model="isOpen">
      <UCard class="flex flex-1 flex-col overflow-y-auto" :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          Фильтры
        </template>

        <div v-for="prop in categoryProperties" :key="prop.code">
          <span v-if="prop.values != null && prop.values.length > 0">
            {{ prop.name }}:
            <UBadge
              v-for="value in prop.values"
              :key="value"
              class="mb-2 ml-2 cursor-pointer"
              :class="{ 'bg-red-500': productListParams[prop.code] === value }"
              @click="setUnsetFilter(prop.code, value)"
            >
              {{ value }}
            </UBadge>
          </span>
        </div>

        <template #footer>
          <div class="h-8" />
        </template>
      </UCard>
    </USlideover>

    <div v-if="productList" class="flex flex-col justify-between gap-5 px-3 py-3.5 dark:border-gray-700 md:flex-row">
      <div class="sm:flex sm:items-center sm:justify-between">
        <div>
          <div class="flex items-center gap-x-3">
            <h2 class="text-lg font-medium text-gray-800 dark:text-white">
              Список продукции
            </h2>
            <span class="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700 dark:bg-gray-900 dark:text-zinc-200">
              {{ productList?.count }} позиций
            </span>
          </div>
        </div>
      </div>
      <UPagination v-model="page" class="self-center justify-self-center py-2 md:py-0" :total="productList?.count" :page-count="productListParams.limit" />
    </div>
    <UTable
      v-model:sort="sort"
      :rows="table"
      :loading="pending"
      :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Загрузка...' }"
      :columns="columns"
      @update:sort="updateSort"
    >
      <!-- Product name -->
      <template #name-data="{ row }">
        <NuxtLink :to="`/product/${row.slug}`" class="underline hover:text-gray-700 dark:hover:text-gray-200">
          {{ row.name }}
        </NuxtLink>
      </template>
      <!-- In stock -->
      <template #in_stock-data="{ row }">
        <span :class="{ 'text-yellow-500': !row.in_stock, 'text-green-500': row.in_stock }">{{ row.in_stock ? 'Много' : 'Мало' }}</span>
      </template>
      <!-- Price -->
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
      <template #empty-state>
        <div class="flex flex-col items-center justify-center gap-3 py-6">
          <span class="text-sm italic">Товары не найдены</span>
        <!-- <UButton label="Сбросить фильтры" @click="filters = {}" /> -->
        </div>
      </template>
    </UTable>
    <div v-if="productList" class="flex justify-center border-t border-gray-200 px-3 py-3.5 dark:border-gray-700 md:justify-end">
      <UPagination v-model="page" :total="productList?.count" :page-count="productListParams.limit" />
    </div>
  </div>
</template>

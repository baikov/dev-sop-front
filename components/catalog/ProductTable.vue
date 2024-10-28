<script lang="ts" setup>
import type { IProductList, IProductProperty } from '~/types/catalog'

defineProps<{
  products: IProductList
  productProperties: IProductProperty[]
}>()
// const ctx = useNuxtApp()
// if (process.client)
//   ctx.$metrika.reachGoal('zzz')
</script>

<template>
  <section class="container mx-auto p-4">
    <div class="sm:flex sm:items-center sm:justify-between">
      <div>
        <div class="flex items-center gap-x-3">
          <h2 class="text-lg font-medium text-gray-800 dark:text-white">
            Список продукции
          </h2>

          <span class="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700 dark:bg-gray-900 dark:text-zinc-200">
            {{ products.count }} позиций
          </span>
        </div>
      </div>
    </div>

    <CatalogPagination
      :next="products.next"
      :previous="products.previous"
      :limit="products.limit"
      :offset="products.offset"
      :count="products.count"
    />
    <div class="mt-6 flex flex-col">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 text-left text-sm font-bold text-zinc-900 dark:bg-gray-800 dark:text-zinc-200">
                <tr>
                  <th
                    scope="col"
                    class="p-4"
                  >
                    Сортамент
                  </th>
                  <th
                    v-for="property in productProperties"
                    :key="property.id"
                    scope="col"
                    class="p-4"
                  >
                    {{ property.name }}
                  </th>

                  <th
                    scope="col"
                    class="p-4"
                  >
                    Цена
                  </th>

                  <th
                    scope="col"
                    class="p-4"
                  >
                    Наличие
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                <tr
                  v-for="product in products.results"
                  :key="product.id"
                >
                  <td class="whitespace-nowrap p-4 text-sm font-medium">
                    <div>
                      <h3 class="font-medium text-gray-800 dark:text-white ">
                        {{ product.name }}
                      </h3>
                    </div>
                  </td>
                  <!-- Выводим только свойства, которые выбраны у категории -->
                  <template
                    v-for="prop in productProperties"
                    :key="prop.code"
                  >
                    <td
                      :id="prop.code"
                      class="whitespace-nowrap p-4 text-sm"
                    >
                      <template
                        v-for="prod_prop in product.properties"
                        :key="prod_prop.code"
                      >
                        <span
                          v-if="prod_prop.code === prop.code"
                          :id="prod_prop.code"
                        >
                          {{ prod_prop.value }}
                        </span>
                      </template>
                    </td>
                  </template>

                  <td class="whitespace-nowrap p-4 text-sm font-medium">
                    <div v-if="product.ton_price_with_coef || product.meter_price_with_coef || product.unit_price_with_coef">
                      <span
                        v-show="product.ton_price_with_coef"
                        class="font-bold"
                      >
                        {{ `${product.ton_price_with_coef} ₽/тн` }}
                      </span>
                      <span
                        v-show="!product.ton_price_with_coef && product.unit_price_with_coef"
                        class="font-bold"
                      >
                        {{ `${product.unit_price_with_coef} ₽/шт` }}
                      </span>
                      <span
                        v-show="!product.ton_price_with_coef && product.meter_price_with_coef"
                        class="font-bold"
                      >
                        {{ `${product.meter_price_with_coef} ₽/м` }}
                      </span>
                      <p
                        v-if="product.ton_price_with_coef && product.meter_price_with_coef"
                        class="text-xs font-normal text-gray-600 dark:text-gray-400"
                      >
                        {{ product.meter_price_with_coef }} ₽/м
                      </p>
                      <p
                        v-if="product.ton_price_with_coef && product.unit_price_with_coef"
                        class="text-xs font-normal text-gray-600 dark:text-gray-400"
                      >
                        {{ product.unit_price_with_coef }} ₽/шт
                      </p>
                    </div>
                    <div v-else>
                      <span class="font-bold">
                        По запросу
                      </span>
                    </div>
                  </td>
                  <td class="whitespace-nowrap p-4 text-sm font-medium">
                    <span
                      v-if="product.in_stock"
                      class="text-green-700 dark:text-green-500"
                    >Много</span>
                    <span
                      v-else
                      class="text-yellow-700 dark:text-yellow-500"
                    >Мало</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <CatalogPagination
      :next="products.next"
      :previous="products.previous"
      :limit="products.limit"
      :offset="products.offset"
      :count="products.count"
    />
  </section>
</template>

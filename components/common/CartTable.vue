<script setup lang="ts">
import { useCartStore } from '~/store/cart'

const { cart, removeProduct } = useCartStore()

const totalPosition = computed(() => cart.productsInCart.length)
const totalPrice = computed(() => cart.productsInCart.reduce((acc, item) => acc + item.total, 0))

const columns = [{
  key: 'name',
  label: 'Наименование',
}, {
  key: 'price',
  label: 'Цена',
}, {
  key: 'quantity',
  label: 'Количество',
},
{
  key: 'total',
  label: 'Сумма',
},
{
  key: 'actions',
  label: 'Действия',
}]

const cartEditIsOpen = useState('cartEditIsOpen', () => false)
const productEdit = ref(null)
function editCurrentProduct(product: any) {
  productEdit.value = product
  cartEditIsOpen.value = true
}
</script>

<template>
  <UTable
    :rows="cart.productsInCart"
    :columns="columns"
  >
    <template #name-data="{ row }">
      <ULink
        :to="`/product/${row.slug}`"
        class="underline hover:text-gray-700 dark:hover:text-gray-200"
      >
        <span>{{ row.name }}</span>
      </ULink>
    </template>
    <template #quantity-data="{ row }">
      <div class="flex flex-col gap-1">
        <span
          v-show="row.tons"
          class="font-bold"
        >
          ~{{ row.tons }} т
        </span>
        <span
          v-show="!row.tons && row.peaces"
          class="font-bold"
        >
          {{ row.peaces }} шт
        </span>
        <span
          v-show="!row.tons && row.meters"
          class="font-bold"
        >
          {{ row.meters }} м
        </span>
        <p
          v-if="row.tons && row.meters"
          class="text-xs font-normal text-gray-600 dark:text-gray-400"
        >
          {{ row.meters }} м
        </p>
        <p
          v-if="row.tons && row.peaces"
          class="text-xs font-normal text-gray-600 dark:text-gray-400"
        >
          {{ row.peaces }} шт
        </p>
      </div>
    </template>
    <template #price-data="{ row }">
      <div class="flex flex-col gap-1">
        <span
          v-show="row.ton_price_with_coef"
          class="font-bold"
        >
          {{ formatPrice(row.ton_price_with_coef) }}/т
        </span>
        <span
          v-show="!row.ton_price_with_coef && row.unit_price_with_coef"
          class="font-bold"
        >
          {{ `${formatPrice(row.unit_price_with_coef)}/шт` }}
        </span>
        <span
          v-show="!row.ton_price_with_coef && row.meter_price_with_coef"
          class="font-bold"
        >
          {{ `${formatPrice(row.meter_price_with_coef)}/м` }}
        </span>
        <p
          v-if="row.ton_price_with_coef && row.meter_price_with_coef"
          class="text-xs font-normal text-gray-600 dark:text-gray-400"
        >
          {{ formatPrice(row.meter_price_with_coef) }}/м
        </p>
        <p
          v-if="row.ton_price_with_coef && row.unit_price_with_coef"
          class="text-xs font-normal text-gray-600 dark:text-gray-400"
        >
          {{ formatPrice(row.unit_price_with_coef) }}/шт
        </p>
      </div>
    </template>
    <template #total-data="{ row }">
      <span class="font-bold">{{ formatPrice(row.total) }}</span>
    </template>
    <template #actions-data="{ row }">
      <UButtonGroup
        size="sm"
        orientation="horizontal"
      >
        <UButton
          icon="i-heroicons-pencil-square"
          color="gray"
          square
          @click="editCurrentProduct(row)"
        />
        <UButton
          icon="i-heroicons-trash"
          color="red"
          square
          @click="removeProduct(row.id)"
        />
      </UButtonGroup>
    </template>
  </UTable>
  <div class="flex flex-col justify-end p-4 text-gray-500 dark:text-gray-200">
    <div class="p-4">
      <span>В корзине: {{ totalPosition }} товара</span>
    </div>
    <div class="p-4 font-bold">
      <span>Итого: {{ formatPrice(totalPrice) }}</span>
    </div>
  </div>
  <ClientOnly>
    <UModal v-model="cartEditIsOpen">
      <CatalogProductInCartEdit
        v-if="productEdit"
        :product="productEdit"
      />
      <span v-else>Странная ошибка ¯\_(ツ)_/¯</span>
    </UModal>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { useCartStore } from '~/store/cart'
import type { ProductInCart } from '~/types/cart'

const { cart, editProduct } = useCartStore()
const toast = useToast()

// вместо продукта можно прокидывать только id, а продукт брать из store cart
const props = defineProps<{
  product: ProductInCart
}>()

const productInCart = computed(() => cart.productsInCart.find(item => item.id === props.product.id))

const vesMetra = productInCart.value?.vesMetra ?? 0
const dlina = productInCart.value?.dlina ?? 0

const tons = ref(productInCart.value?.tons ?? 0)
const meters = ref(productInCart.value?.meters ?? 0)
const peaces = ref(productInCart.value?.peaces ?? 0)

const tonsToCart = ref(productInCart.value?.tons ?? 0)
const metersToCart = ref(productInCart.value?.meters ?? 0)
const peacesToCart = ref(productInCart.value?.peaces ?? 0)

const totalPrice = ref(productInCart.value?.total ?? 0)

const isTonsDisabled = computed(() => !productInCart.value?.ton_price_with_coef)
const isMetersDisabled = computed(() => !(productInCart.value?.meter_price_with_coef || vesMetra))
const isPeacesDisabled = computed(() => !(productInCart.value?.unit_price_with_coef || (vesMetra && dlina)))

function calculateTotalPrice() {
  if (productInCart.value?.unit_price_with_coef && peacesToCart.value) {
    return Math.ceil(peacesToCart.value * productInCart.value?.unit_price_with_coef)
  }

  if (productInCart.value?.meter_price_with_coef && metersToCart.value) {
    return Math.ceil(metersToCart.value * productInCart.value?.meter_price_with_coef)
  }

  if (productInCart.value?.ton_price_with_coef) {
    return Math.ceil(tonsToCart.value * productInCart.value?.ton_price_with_coef)
  }

  if (productInCart.value?.meter_price_with_coef) {
    return Math.ceil(metersToCart.value * productInCart.value?.meter_price_with_coef)
  }

  if (productInCart.value?.unit_price_with_coef) {
    return Math.ceil(peacesToCart.value * productInCart.value?.unit_price_with_coef)
  }
  return 0
}

function updateValues(changedField: string) {
  if (changedField === 'tons') {
    tons.value = +tons.value.toFixed(3)
    if (vesMetra) {
      meters.value = Math.ceil((tons.value * 1000 / +vesMetra) * 1000) / 1000
    }
    else { meters.value = 0 }
    if (dlina) {
      peaces.value = Math.ceil((meters.value / (+dlina / 1000)) * 1000) / 1000
    }
    else { peaces.value = 0 }
  }
  else if (changedField === 'meters') {
    if (vesMetra) {
      tons.value = Math.ceil((meters.value * +vesMetra / 1000) * 1000) / 1000
    }
    else { tons.value = 0 }
    if (dlina) {
      peaces.value = Math.ceil((meters.value / (+dlina / 1000)) * 1000) / 1000
    }
    else {
      peaces.value = 0
    }
  }
  else if (changedField === 'peaces') {
    if (dlina) {
      meters.value = Math.ceil((peaces.value * (+dlina / 1000)) * 1000) / 1000
    }
    else {
      meters.value = 0
    }
    if (vesMetra && dlina) {
      tons.value = Math.ceil((peaces.value * (+dlina / 1000) * +vesMetra / 1000) * 1000) / 1000
    }
    else {
      tons.value = 0
    }
  }
  if (!isMetersDisabled.value) {
    if (peaces.value) {
      metersToCart.value = Math.ceil(peaces.value) * (+dlina / 1000)
    }
    else {
      metersToCart.value = Math.ceil(meters.value)
    }
  }
  else {
    metersToCart.value = 0
  }
  if (!isPeacesDisabled.value) {
    peacesToCart.value = Math.ceil(peaces.value)
  }
  else {
    peacesToCart.value = 0
  }
  if (vesMetra) {
    if (dlina) {
      tonsToCart.value = Math.ceil((peaces.value * (+dlina / 1000) * +vesMetra / 1000) * 1000) / 1000
    }
    else {
      tonsToCart.value = Math.ceil((metersToCart.value * +vesMetra / 1000) * 1000) / 1000
    }
  }
  else {
    tonsToCart.value = tons.value
  }
  totalPrice.value = calculateTotalPrice()
}

function incraseValue(field: string) {
  if (field === 'tons') {
    tons.value = tons.value + 0.001
  }
  else if (field === 'meters') {
    meters.value = Math.floor(meters.value) + 1
  }
  else if (field === 'peaces') {
    peaces.value = Math.floor(peaces.value) + 1
  }
  updateValues(field)
}

function decraseValue(field: string) {
  if (field === 'tons') {
    tons.value = tons.value - 0.001
    if (tons.value < 0) {
      tons.value = 0
    }
  }
  else if (field === 'meters') {
    meters.value = Math.ceil(meters.value) - 1
    if (meters.value < 0) {
      meters.value = 0
    }
  }
  else if (field === 'peaces') {
    peaces.value = Math.ceil(peaces.value) - 1
    if (peaces.value < 0) {
      peaces.value = 0
    }
  }
  updateValues(field)
}

function confirmProductEdit() {
  const price = totalPrice.value ? `${totalPrice.value} руб` : 'уточнит менеджер'
  const desc = `
    ${productInCart.value?.name}: <b>${tonsToCart.value} т</b> | <b>${metersToCart.value} м</b> | <b>${peacesToCart.value} шт</b><br>
    На сумму: ${price}.
  `
  toast.add({
    title: 'Количество товара в корзине изменено',
    description: desc,
    icon: 'i-heroicons-check-circle-solid',
    color: 'green',
  })
  cartEditIsOpen.value = false
}

const cartEditIsOpen = useState('cartEditIsOpen')
</script>

<template>
  <UCard>
    <template #header>
      <div class="text-center text-xl font-bold">
        {{ product.name }}
      </div>
    </template>

    <div class="space-y-4">
      <!-- Calculator -->
      <div class="flex flex-col items-center justify-center gap-2 py-4 md:flex-row">
        <!-- Тонны -->
        <div class="flex">
          <UButtonGroup
            size="sm"
            orientation="horizontal"
          >
            <UButton
              icon="i-heroicons-minus"
              color="gray"
              :disabled="isTonsDisabled"
              class="disabled:bg-gray-200"
              @click="decraseValue('tons')"
            />
            <div class="relative">
              <input
                id="weight"
                v-model.number="tons"
                :disabled="isTonsDisabled"
                class="form-input focus:ring-primary-500 dark:focus:ring-primary-400 relative block w-full border-0 bg-white px-2.5 py-1.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75 dark:bg-gray-900 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500"
                @input="updateValues('tons')"
              >
              <span class="pointer-events-none absolute inset-y-0 end-0 flex items-center px-2.5">
                <span class="text-xs text-gray-500 dark:text-gray-400">т</span>
              </span>
            </div>
            <UButton
              icon="i-heroicons-plus"
              color="gray"
              :disabled="isTonsDisabled"
              class="disabled:bg-gray-200"
              @click="incraseValue('tons')"
            />
          </UButtonGroup>
        </div>

        <!-- Метры -->
        <div class="flex">
          <UButtonGroup
            size="sm"
            orientation="horizontal"
          >
            <UButton
              icon="i-heroicons-minus"
              color="gray"
              :disabled="isMetersDisabled"
              class="disabled:bg-gray-200"
              @click="decraseValue('meters')"
            />
            <div class="relative">
              <input
                id="meter"
                v-model.number="meters"
                class="form-input focus:ring-primary-500 dark:focus:ring-primary-400 relative block w-full border-0 bg-white px-2.5 py-1.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75 dark:bg-gray-900 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500"
                :disabled="isMetersDisabled"
                @input="updateValues('meters')"
              >
              <span class="pointer-events-none absolute inset-y-0 end-0 flex items-center px-2.5">
                <span class="text-xs text-gray-500 dark:text-gray-400">м</span>
              </span>
            </div>
            <UButton
              icon="i-heroicons-plus"
              color="gray"
              :disabled="isMetersDisabled"
              class="disabled:bg-gray-200"
              @click="incraseValue('meters')"
            />
          </UButtonGroup>
        </div>

        <div class="flex">
          <!-- Штуки -->
          <UButtonGroup
            size="sm"
            orientation="horizontal"
          >
            <UButton
              icon="i-heroicons-minus"
              color="gray"
              class="disabled:bg-gray-200"
              :disabled="isPeacesDisabled"
              @click="decraseValue('peaces')"
            />
            <div class="relative">
              <input
                id="unit"
                v-model.number="peaces"
                class="form-input focus:ring-primary-500 dark:focus:ring-primary-400 relative block w-full border-0 bg-white px-2.5 py-1.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75 dark:bg-gray-900 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500"
                :disabled="isPeacesDisabled"
                @input="updateValues('peaces')"
              >
              <span class="pointer-events-none absolute inset-y-0 end-0 flex items-center px-2.5">
                <span class="text-xs text-gray-500 dark:text-gray-400">шт</span>
              </span>
            </div>
            <UButton
              icon="i-heroicons-plus"
              color="gray"
              class="disabled:bg-gray-200"
              :disabled="isPeacesDisabled"
              @click="incraseValue('peaces')"
            />
          </UButtonGroup>
        </div>
      </div>
      <div class="ring-primary-500 dark:ring-primary-400 relative w-full overflow-hidden rounded-lg p-4 ring-1 ring-inset">
        <div class="flex items-center justify-between pb-2">
          <span class="font-normal">Количество товара в корзине изменится на следующие значения:</span>
          <UPopover mode="hover">
            <UButton
              size="sm"
              icon="i-heroicons-information-circle"
              color="primary"
              square
              variant="link"
            />
            <template #panel>
              <div class="text-md p-4 font-normal">
                <p class="pb-2">
                  Количество добавляемого в корзину товара автоматически пересчитывается на основе:
                </p>
                <p v-show="vesMetra">
                  Веса метра: <span class="font-bold">{{ vesMetra }} кг</span>
                </p>
                <p v-show="dlina">
                  Длины: <span class="font-bold">{{ dlina / 1000 }} м</span>
                </p>
              </div>
            </template>
          </UPopover>
        </div>
        <div class="grid grid-cols-3 gap-2 sm:grid-cols-4">
          <UInput
            v-model="tonsToCart"
            disabled
            :ui="{ color: { white: {
              outline: 'shadow-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400',
            } } }"
          >
            <template #trailing>
              <span class="text-xs text-gray-500 dark:text-gray-400">т</span>
            </template>
          </UInput>
          <UInput
            v-model="metersToCart"
            disabled
            :ui="{ color: { white: {
              outline: 'shadow-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400',
            } } }"
          >
            <template #trailing>
              <span class="text-xs text-gray-500 dark:text-gray-400">м</span>
            </template>
          </UInput>
          <UInput
            v-model="peacesToCart"
            disabled
            :ui="{ color: { white: {
              outline: 'shadow-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400',
            } } }"
          >
            <template #trailing>
              <span class="text-xs text-gray-500 dark:text-gray-400">шт</span>
            </template>
          </UInput>
          <span class="col-span-3 flex items-center justify-center sm:col-span-1">
            <span class="block pr-2 sm:hidden">Сумма:</span>
            <span class="font-bold underline">{{ formatPrice(totalPrice) }}</span>
          </span>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center justify-between">
        <UButton
          icon="i-heroicons-check-circle"
          :disabled="!tonsToCart && !metersToCart && !peacesToCart"
          @click="editProduct(product.id, tonsToCart, metersToCart, peacesToCart, totalPrice); confirmProductEdit();cartEditIsOpen=false"
        >
          Сохранить изменения
        </UButton>
        <UButton
          icon="i-heroicons-x-circle"
          color="gray"
          @click="cartEditIsOpen=false"
        >
          Отмена
        </UButton>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { useCartStore } from '~/store/cart'

const { cart } = useCartStore()

const totalPosition = computed(() => cart.productsInCart.length)
const cartIsOpen = ref(false)
</script>

<template>
  <UPopover
    v-model:open="cartIsOpen"
    :popper="{ placement: 'bottom-end' }"
    class="pl-5"
  >
    <div class="hidden size-8 items-center justify-center rounded-full bg-gray-50 dark:bg-gray-900 md:flex">
      <UChip
        :text="totalPosition"
        size="2xl"
        :class="totalPosition ? 'animate-bounce' : ''"
      >
        <UIcon
          name="i-heroicons-shopping-cart"
          class="size-5 text-gray-900 dark:text-gray-200"
        />
      </UChip>
    </div>

    <template #panel>
      <div class="space-y-2 p-4">
        <CommonCartTable />
        <UButton
          to="/cart"
          label="Оформить заявку"
          @click="cartIsOpen = false"
        />
      </div>
    </template>
  </UPopover>
  <div class="flex size-8 items-center justify-center rounded-full bg-gray-50 dark:bg-gray-900 md:hidden">
    <ULink to="/cart">
      <UChip
        :text="totalPosition"
        size="2xl"
        :class="totalPosition ? 'animate-pulse' : ''"
      >
        <UIcon
          name="i-heroicons-shopping-cart"
          class="size-5 text-gray-900 dark:text-gray-200"
        />
      </UChip>
    </ULink>
  </div>
</template>

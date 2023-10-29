<script lang="ts" setup>
import type { IMenuItem } from '~/types'
defineProps<{
  catalogMenu?: IMenuItem[] | null
  mainMenu: IMenuItem[]
}>()
</script>

<template>
  <div
    class="relative flex h-full cursor-pointer items-center p-4 font-bold transition-colors ease-in-out hover:bg-white/10 hover:text-zinc-50"
    :class="catalogMenu ? 'group' : ''"
  >
    <NuxtLink to="/catalog" active-class="underline">
      Каталог
    </NuxtLink>
    <div class="absolute right-0 top-full hidden bg-gray-700 group-hover:block group-hover:touch-auto dark:bg-gray-900">
      <div
        v-for="item in catalogMenu"
        :key="item.id"
        class="relative flex h-full cursor-pointer items-center p-4 font-bold transition-colors ease-in-out hover:bg-white/10 hover:text-zinc-50"
        :class="item.submenu ? 'group/level2' : ''"
      >
        <NuxtLink
          :to="`/catalog/${item.slug}`"
          active-class="underline"
          class="whitespace-nowrap"
        >
          {{ item.name }}
        </NuxtLink>
        <div
          class="absolute left-full top-0 hidden bg-gray-700 group-hover/level2:block dark:bg-gray-900"
        >
          <NuxtLink
            v-for="subitem in item.submenu"
            :key="subitem.id"
            :to="`/catalog/${subitem.slug}`"
            active-class="underline"
            class="block cursor-pointer whitespace-nowrap px-4 py-2 transition-colors ease-in-out hover:bg-white/10"
          >
            <span v-show="subitem.depth === 3">-</span>
            {{ subitem.name }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
  <div
    v-for="item in mainMenu"
    :key="item.id"
    class="relative flex h-full cursor-pointer items-center p-4 font-bold transition-colors ease-in-out hover:bg-white/10 hover:text-zinc-50"
    :class="item.submenu ? 'group' : ''"
  >
    <NuxtLink :to="`/${item.slug}`" active-class="underline">
      {{ item.name }}
    </NuxtLink>
    <div
      v-if="item.submenu"
      class="absolute right-0 top-full hidden bg-gray-700 group-hover:block dark:bg-gray-900"
    >
      <NuxtLink
        v-for="subitem in item.submenu"
        :key="subitem.id"
        :to="`/${item.slug}/${subitem.slug}`"
        active-class="underline"
        class="block cursor-pointer whitespace-nowrap px-4 py-2 transition-colors ease-in-out hover:bg-white/10 dark:bg-gray-900"
      >
        {{ subitem.name }}
      </NuxtLink>
    </div>
  </div>
</template>

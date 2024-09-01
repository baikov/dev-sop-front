<script setup lang="ts">
import type { IMenuItem } from '~/types'

defineProps<{
  catalogMenu?: IMenuItem[] | null
  mainMenu: IMenuItem[]
}>()

const toggleSubmenu = (id: number) => {
  const sub = document.querySelector(`#submenu-${id}`)
  if (sub?.classList.contains('hidden')) { sub.classList.replace('hidden', 'block') } else { sub?.classList.replace('block', 'hidden') }
}
const mmIsOpen = ref(false)
</script>

<template>
  <div class="my-auto flex items-center md:hidden">
    <div class="cursor-pointer" @click="mmIsOpen = !mmIsOpen">
      <div
        class="relative h-0.5 w-8 rounded bg-zinc-200 transition-all"
        :class="mmIsOpen ? 'top-2 rotate-45' : 'top-0 rotate-0'"
      />
      <div
        class="relative mt-1.5 h-0.5 w-8 rounded bg-zinc-200 transition-all"
        :class="mmIsOpen ? 'opacity-0' : 'opacity-100'"
      />
      <div
        class="relative mt-1.5 h-0.5 w-8 rounded bg-zinc-200 transition-all"
        :class="mmIsOpen ? '-top-2 -rotate-45' : 'top-0 rotate-0'"
      />
    </div>
  </div>

  <UModal v-model="mmIsOpen">
    <UCard
      class="dark:bg-gray-800"
      :ui="{
        base: 'h-full flex flex-col',
        rounded: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        body: {
          base: 'grow'
        }
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <CommonDarkToggle />
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="mmIsOpen = false" />
        </div>
      </template>

      <div class="flex-1 pl-7">
        <div
          class="relative my-4 flex w-full cursor-pointer items-center justify-start font-bold"
        >
          <!-- <UIcon name="i-mdi-format-align-justify" class="mr-2 size-6" /> -->
          <NuxtLink to="/" @click="mmIsOpen = false">
            Главная
          </NuxtLink>
        </div>
        <div
          class="relative my-4 flex w-full cursor-pointer items-center justify-start font-bold"
        >
          <!-- <UIcon name="i-mdi-format-align-justify" class="mr-2 size-6" /> -->
          <NuxtLink to="/catalog" @click="mmIsOpen = false">
            Каталог
          </NuxtLink>
        </div>
        <div
          v-for="item in mainMenu"
          :key="item.id"
          class="my-4 flex w-full flex-col items-center justify-start"
          :class="
            item.submenu
              ? 'group'
              : ''
          "
          @click="toggleSubmenu(item.id)"
        >
          <div class="relative flex w-full cursor-pointer items-center justify-start font-bold">
            <!-- <UIcon v-if="item.icon" :name="item.icon" class="mr-2 size-6" /> -->
            <NuxtLink :to="`/${item.slug}`" @click="mmIsOpen = false">
              {{ item.name }}
            </NuxtLink>
            <UIcon
              v-if="item.submenu.length !== 0"
              class="inline-block"
              name="i-mdi-triangle-small-down"
            />
          </div>
          <div
            v-if="item.submenu"
            :id="`submenu-${item.id}`"
            class="relative hidden w-full cursor-pointer items-center justify-start"
          >
            <NuxtLink
              v-for="subitem in item.submenu"
              :key="subitem.id"
              :to="`/${item.slug}/${subitem.slug}`"
              class="block cursor-pointer whitespace-nowrap px-4 py-2"
              @click="mmIsOpen = false"
            >
              - {{ subitem.name }}
            </NuxtLink>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-center">
          <CommonCitySelector />
        </div>
      </template>
    </UCard>
  </UModal>
</template>

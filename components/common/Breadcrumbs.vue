<script lang="ts" setup>
import type { IBreadcrumb } from '~/types'

const breadcrumbs = defineProps<{
  items?: IBreadcrumb[]
}>()
const schemaBreadcrumbs = breadcrumbs.items?.map(({ name, href }) => ({ name, item: href }))
schemaBreadcrumbs?.unshift({ name: 'Главная', item: '/' })
useSchemaOrg([
  defineBreadcrumb({
    itemListElement: schemaBreadcrumbs,
  }),
])
</script>

<template>
  <UContainer class="pb-8">
    <nav
      class="flex overflow-x-auto border-b border-gray-200 py-3 dark:border-gray-600"
      aria-label="Breadcrumb"
    >
      <ol
        role="list"
        class="mx-auto flex w-full space-x-4"
      >
        <li class="flex">
          <div class="flex">
            <NuxtLink
              to="/"
              class="flex items-center justify-center"
            >
              <UIcon
                name="i-mdi-home"
                class="text-primary-700 size-5 shrink-0 dark:text-gray-200"
                aria-hidden="true"
              />
            </NuxtLink>
          </div>
        </li>
        <template v-if="items && items.length > 0">
          <li
            v-for="(item, index) in items"
            :key="item.level"
            class="flex whitespace-nowrap"
          >
            <div class="flex items-center">
              <UIcon
                name="i-mdi-chevron-right"
                class="h-full w-6 shrink-0"
              />
              <NuxtLink
                v-if="index !== items.length - 1"
                :to="item.href"
                class="ml-4 text-sm font-medium hover:underline"
                :aria-current="item.href ? 'page' : undefined"
              >
                {{ item.name }}
              </NuxtLink>
              <span
                v-else
                class="ml-4 text-sm font-bold"
                aria-current="page"
              >
                {{ item.name }}
              </span>
            </div>
          </li>
        </template>
      </ol>
    </nav>
  </UContainer>
</template>

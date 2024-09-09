<script setup lang="ts">
import { fileSize } from '~/utils/base'
import type { IDocument } from '~/types/catalog'
const config = useRuntimeConfig()

defineProps<{
  docs: IDocument[]
  isFull?: boolean
}>()

const fileIconMapping = {
  pdf: 'i-bi-filetype-pdf',
  doc: 'i-bi-filetype-doc',
  docx: 'i-bi-filetype-docx',
  xls: 'i-bi-filetype-xls',
  xlsx: 'i-bi-filetype-xlsx',
  png: 'i-bi-filetype-png',
  jpg: 'i-bi-filetype-jpg',
  jpeg: 'i-bi-filetype-jpg'
}
</script>

<template>
  <div v-if="docs" class="grid grid-cols-1 gap-4" :class="isFull ? '' : 'md:grid-cols-2 lg:grid-cols-3'">
    <UCard
      v-for="doc in docs"
      :key="doc.id"
      :ui="isFull ? { body: {padding: 'px-1 py-1 sm:p-2'}} : ''"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <UIcon :name="fileIconMapping[doc.file.split('.').slice(-1)[0] as keyof typeof fileIconMapping]" class="mr-2 size-5 shrink-0" />
          <NuxtLink :to="`${config.public.mediaUrl}/${doc.file}`" class="underline hover:text-gray-700 dark:hover:text-gray-200" external target="_blank">
            {{ doc.title }}
          </NuxtLink>
        </div>
        <div class="flex items-center justify-center gap-2">
          <span class="text-xs text-gray-500 dark:text-gray-300">
            {{ fileSize(doc.size) }}
          </span>
          <UPopover
            v-if="!isFull && doc.categories && doc.categories?.length > 0"
            class="flex items-center justify-center"
            :popper="{ placement: 'left' }"
          >
            <UIcon name="i-mdi-information" class="size-5" />
            <template #panel>
              <div class="px-4 py-1 text-xs font-bold">
                Размещено в категориях:
              </div>
              <div v-for="cat in doc.categories" :key="cat.id" class="px-4 py-1 text-xs">
                <NuxtLink :to="`/catalog/${cat.slug}`" class="underline hover:text-gray-700 dark:hover:text-gray-200">
                  {{ cat.name }}
                </NuxtLink>
              </div>
            </template>
          </UPopover>
        </div>
      </div>
    </UCard>
  </div>
</template>

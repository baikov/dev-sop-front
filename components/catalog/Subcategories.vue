<script lang="ts" setup>
import type { Category } from '~/types/catalog'
defineProps<{
  subcatList?: Category[] | []
}>()
</script>

<template>
  <section class="py-6">
    <div class="container mx-auto px-4 transition-all duration-300 ease-in-out">
      <div class="mx-auto max-w-6xl transition-all duration-300 ease-in-out">
        <div class="grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          <div v-for="cat in subcatList" :key="cat.id" data-aos="fade-up">
            <NuxtLink
              class="group relative top-0
              flex h-full flex-col items-center justify-center rounded-md
              border border-gray-200 bg-gray-100 p-4 transition-all duration-300 ease-in-out hover:-top-0.5
              hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800
              dark:text-zinc-200 dark:hover:bg-gray-900"
              :to="`/catalog/${cat.slug}`"
            >
              <NuxtImg
                v-show="cat.image"
                :src="`/soptorg/media/${cat.image}`"
                :alt="cat.name"
                width="120"
                height="60"
                loading="lazy"
                class="relative top-0 inline-block transition-all duration-300 ease-in-out group-hover:-top-0.5 dark:invert"
              />
              <h2 class="text-md mt-3 text-center transition-all duration-300  ease-in-out dark:group-hover:text-zinc-100">
                {{ cat.name }}
              </h2>
              <!-- <span class="transition-all ease-in-out duration-300 text-md text-gray-400 group-hover:text-gray-600">2,041</span> -->
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

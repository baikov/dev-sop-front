<script lang="ts" setup>
import { onMounted } from 'vue'
const props = defineProps<{
  next: string | null
  previous: string | null
  limit: number
  offset: number
  count: number
}>()
const currentPage = useState('currentPage', () => 1)
const pagesCount = useState('pagesCount', () => 1)
const pageOffset = useState('offset', () => props.offset)
// const pageLimit = useState('limit')

if (props.limit !== 0) { pagesCount.value = Math.ceil(props.count / props.limit) }
const goNext = () => {
  pageOffset.value += props.limit || 20
  currentPage.value += 1
}
const goPrevious = () => {
  pageOffset.value -= props.limit || 20
  currentPage.value -= 1
}
const changePage = (page: number) => {
  pageOffset.value = (page - 1) * props.limit
  currentPage.value = page
}
onMounted(() => {
  pageOffset.value = 0
  currentPage.value = 1
})
</script>

<template>
  <div class="mx-auto flex items-center justify-between py-4">
    <button
      :disabled="previous === null"
      class="flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
      @click="goPrevious()"
    >
      <UIcon name="i-mdi-chevron-left" class="size-5 rtl:-scale-x-100" />
      <span>
        Предыдущая
      </span>
    </button>

    <div class="hidden max-w-xs items-center gap-x-3 overflow-x-auto p-3 md:flex">
      <button
        v-for="number in pagesCount"
        :key="number"
        class="rounded-md bg-blue-100/60 px-2 py-1 text-sm text-green-500 dark:bg-gray-800 dark:text-zinc-200"
        :class="[number === currentPage ? 'bg-green-100' : 'bg-white']"
        @click="changePage(number)"
      >
        {{ number }}
      </button>
    </div>

    <button :disabled="next === null" class="flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800" @click="goNext()">
      <span>
        Следующая
      </span>
      <UIcon name="i-mdi-chevron-right" class="size-5 rtl:-scale-x-100" />
    </button>
  </div>
</template>

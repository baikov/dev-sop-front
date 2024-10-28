<script lang="ts" setup>
const table = [
  { name: 'Наименование', value: 'ООО "СПЕЦОПТТОРГ"' },
  { name: 'ИНН', value: '5256207934' },
  { name: 'КПП', value: '525601001' },
  { name: 'ОГРН', value: '1235200008560' },
  { name: 'Юридический адрес', value: '603095, Нижегородская область, г. Нижний Новгород, пр-кт Бусыгина, д. 1, офис 325' },
  { name: 'Расчётный счет', value: '40702810001500188475' },
  { name: 'Название банка', value: 'ООО "Банк Точка"' },
  { name: 'БИК', value: '044525104' },
  { name: 'Корр. счет', value: '30101810745374525104' },
]
</script>

<template>
  <div>
    <dl>
      <div
        v-for="item, i in table"
        :key="i"
        class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
        :class="i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : ''"
      >
        <dt class="text-sm font-medium">
          {{ item.name }}
        </dt>
        <dd class="mt-1 text-sm sm:col-span-2 sm:mt-0">
          {{ item.value }}
        </dd>
      </div>
      <div class="bg-gray-50 px-4 py-5 dark:bg-gray-800 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium">
          Файлы
        </dt>
        <dd class="mt-1 text-sm sm:col-span-2 sm:mt-0">
          <ul
            role="list"
            class="divide-y divide-gray-200 rounded-md border border-gray-200"
          >
            <li class="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
              <div class="flex w-0 flex-1 items-center">
                <UIcon
                  class="size-5 shrink-0"
                  aria-hidden="true"
                  name="i-mdi-file-pdf"
                />
                <span class="ml-2 w-0 flex-1 truncate">Карточка_организации.pdf</span>
              </div>
              <div class="ml-4 shrink-0">
                <NuxtLink
                  to="/soptorg_req.pdf"
                  class="font-medium hover:underline"
                  external
                  target="_blank"
                >
                  Скачать
                </NuxtLink>
              </div>
            </li>
            <!-- <li class="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                  <div class="flex w-0 flex-1 items-center">
                    <UIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" name="i-mdi-file-pdf" />
                    <span class="ml-2 w-0 flex-1 truncate">coverletter_back_end_developer.pdf</span>
                  </div>
                  <div class="ml-4 flex-shrink-0">
                    <NuxtLink to="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                      Скачать
                    </NuxtLink>
                  </div>
                </li> -->
          </ul>
        </dd>
      </div>
    </dl>
  </div>
</template>

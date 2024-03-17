<script lang="ts" setup>
useHead({
  title: 'Контактная информация ООО "СПЕЦОПТТОРГ"',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content: 'Контакты компании ООО "СПЕЦОПТТОРГ"'
    }
  ]
})
const breadcrumbs = [
  {
    level: 1,
    name: 'Контакты',
    href: '/contacts',
    disabled: true
  }
]
</script>

<template>
  <div>
    <CommonBreadcrumbs :items="breadcrumbs" />
    <CommonPageHeader h1="Контактная информация" />
    <section class="relative mx-auto flex w-full flex-1 flex-col">
      <div class="mx-auto w-full max-w-7xl p-4">
        <div class="block rounded-lg">
          <div class="flex flex-wrap items-center">
            <div class="w-full shrink-0 grow-0 basis-auto lg:w-6/12 xl:w-8/12">
              <div class="flex flex-wrap pt-12 lg:pt-0">
                <div class="mb-12 w-full shrink-0 grow-0 basis-auto px-3 md:w-6/12 md:px-6 lg:w-full xl:w-6/12 xl:px-12">
                  <div class="flex items-start">
                    <div class="shrink-0">
                      <div class="bg-primary-700 flex size-14 items-center justify-center rounded-md p-4 shadow-md dark:bg-gray-800">
                        <UIcon name="i-mdi-phone" class="w-6 text-white" />
                      </div>
                    </div>
                    <div class="ml-6 grow">
                      <p class="mb-1 font-bold">
                        Телефон
                      </p>
                      <p>
                        +7 (831) 214-03-14
                      </p>
                    </div>
                  </div>
                </div>
                <div class="mb-12 w-full shrink-0 grow-0 basis-auto px-3 md:w-6/12 md:px-6 lg:w-full xl:w-6/12 xl:px-12">
                  <div class="flex items-start">
                    <div class="shrink-0">
                      <div class="bg-primary-700 flex size-14 items-center justify-center rounded-md p-4 shadow-md dark:bg-gray-800">
                        <UIcon name="i-mdi-email" class="w-6 text-white" />
                      </div>
                    </div>
                    <div class="ml-6 grow">
                      <p class="mb-1 font-bold">
                        Email
                      </p>
                      <p>
                        info@soptorg.ru
                      </p>
                    </div>
                  </div>
                </div>
                <div class="mb-12 w-full shrink-0 grow-0 basis-auto px-3 md:w-6/12 md:px-6 lg:mb-0 lg:w-full xl:w-6/12 xl:px-12">
                  <div class="align-start flex">
                    <div class="shrink-0">
                      <div class="bg-primary-700 flex size-14 items-center justify-center rounded-md p-4 shadow-md dark:bg-gray-800">
                        <UIcon name="i-mdi-map-marker" class="w-6 text-white" />
                      </div>
                    </div>
                    <div class="ml-6 grow">
                      <p class="mb-1 font-bold">
                        Адрес
                      </p>
                      <p>
                        603095, Нижний Новгород, пр-т Бусыгина, д.1, оф.325
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="block w-full shrink-0 grow-0 basis-auto lg:flex lg:w-6/12 xl:w-4/12">
              <div class="block w-full overflow-hidden rounded-lg shadow-lg">
                <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A832f2b93d8e203a25b2eaf25f4da38f4a271b283c8a15d665841d9eb563e04c4&amp;source=constructor&amp;scroll=false" width="100%" height="400" frameborder="0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

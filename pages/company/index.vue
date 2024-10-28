<script lang="ts" setup>
useHead({
  title: 'О компании ООО "СПЕЦОПТТОРГ"',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content: 'Информация о компании ООО "СПЕЦОПТТОРГ"',
    },
  ],
})
const breadcrumbs = [
  {
    level: 1,
    name: 'О компании',
    href: '/company',
    disabled: true,
  },
]
const pictures = [
  '/img/company/1.jpg',
  '/img/company/2.jpg',
  '/img/company/3.jpg',
  '/img/company/4.jpg',
  '/img/company/5.jpg',
  '/img/company/6.jpg',
]
</script>

<template>
  <div>
    <CommonBreadcrumbs :items="breadcrumbs" />
    <CommonPageHeader h1="О компании" />
    <section class="relative mx-auto flex size-full flex-1 flex-col">
      <div class="relative isolate overflow-hidden px-6 py-20 dark:text-zinc-200 sm:py-6 lg:overflow-visible lg:px-0">
        <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div class="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <UCarousel
              v-slot="{ item }"
              :items="pictures"
              :ui="{ item: 'basis-full' }"
              class="overflow-hidden rounded-lg"
              arrows
              indicators
            >
              <img
                :src="item"
                class="w-full"
                draggable="false"
              >
            </UCarousel>
          </div>
          <div class="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div class="lg:pr-4">
              <div class="max-w-xl text-base leading-7 text-gray-700 dark:text-zinc-200 lg:max-w-lg">
                <p>СПЕЦОПТТОРГ – компания, которая занимается продажей металлопроката в Нижнем Новгороде и области более 10 лет. За это время мы зарекомендовали себя как надежный поставщик металлических изделий высокого качества.</p>
                <!-- <ul role="list" class="mt-8 space-y-8 text-gray-600 dark:text-zinc-200">
                <li class="flex gap-x-3">
                  <UIcon name="i-mdi-cloud-arrow-left-outline" class="mt-1 h-5 w-5 flex-none text-indigo-600 dark:text-zinc-100" aria-hidden="true" />
                  <span><strong class="font-semibold text-gray-900 dark:text-zinc-200">Push to deploy.</strong> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.</span>
                </li>
                <li class="flex gap-x-3">
                  <UIcon name="i-mdi-lock-alert-outline" class="mt-1 h-5 w-5 flex-none text-indigo-600 dark:text-zinc-100" aria-hidden="true" />
                  <span><strong class="font-semibold text-gray-900 dark:text-zinc-200">SSL certificates.</strong> Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.</span>
                </li>
                <li class="flex gap-x-3">
                  <UIcon name="i-mdi-server" class="mt-1 h-5 w-5 flex-none text-indigo-600 dark:text-zinc-100" aria-hidden="true" />
                  <span><strong class="font-semibold text-gray-900 dark:text-zinc-200">Database backups.</strong> Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.</span>
                </li>
              </ul> -->
                <p class="mt-8">
                  Мы предлагаем широкий ассортимент металлопроката, включая стальные листы, трубы, профильную трубу, уголок, круг, проволоку, сетку и другие виды металлических изделий. Наши клиенты могут быть уверены в том, что они получат качественный продукт, который полностью соответствует их требованиям.
                </p>
                <p class="mt-8">
                  Мы также предоставляем услуги по обработке металлопроката, включая резку, гибку, сварку и другие виды обработки. Наша команда профессионалов готова выполнить любой заказ в кратчайшие сроки и с наивысшим качеством.
                </p>
                <p class="mt-8">
                  Кроме того, мы предлагаем нашим клиентам гибкую систему скидок и индивидуальный подход к каждому заказу. Мы всегда готовы обсудить все детали и предоставить нашим клиентам наилучшее решение по оптимальной цене.
                </p>
                <h2 class="mt-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-zinc-200">
                  Готовы к сотрудничеству!
                </h2>
                <p class="mt-6">
                  Мы стремимся к долгосрочным отношениям с нашими клиентами и готовы предложить выгодные условия сотрудничества. Если у вас есть вопросы или вы хотите получить консультацию по выбору металлопроката, наши менеджеры всегда готовы помочь вам.
                </p>
                <p class="text-md mt-6 font-semibold">
                  Благодарим за выбор СПЕЦОПТТОРГ – ваш надежный партнер в мире металлопроката!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

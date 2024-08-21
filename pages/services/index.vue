<script lang="ts" setup>
useHead({
  title: 'Услуги',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content: 'Услуги компании ООО "СПЕЦОПТТОРГ"'
    }
  ]
})
const breadcrumbs = [
  {
    level: 1,
    name: 'Услуги',
    href: '/services',
    disabled: true
  }
]
const services = [
  { title: 'Транспортные услуги', description: 'Мы предоставляем полный спектр транспортных услуг, связанных с доставкой металлопроката по Нижнему Новгороду и области. Наша компания обладает собственным автопарком, включающим в себя различные виды транспорта. Мы понимаем, что один из самых важных аспектов при работе с металлопрокатом - это быстрая и надежная доставка. Поэтому мы делаем все возможное, чтобы груз был доставлен в срок и без задержек.', image: 'transpot.png' },
  { title: 'Резка металла', description: 'Мы предлагаем услуги резки металла на заказ с использованием современного оборудования и высококвалифицированных специалистов. Мы используем только профессиональное оборудование, что позволяет обеспечивать точность и высокую скорость резки. Если у вас есть какие-либо вопросы, наша команда готова ответить на них и предложить оптимальное решение.', image: 'rezka.png' },
  { title: 'Изоляция труб', description: 'Мы предлагаем профессиональные услуги по изоляции труб, которые обеспечивают надежную защиту трубопроводов от внешних воздействий и гарантируют сохранность транспортируемых по ним жидкостей и газов. Используем только качественные материалы, которые обеспечивают долговечность и эффективность изоляции труб. Гарантируем качественное выполнение работ, соблюдение сроков и доступные цены на услуги по изоляции труб.', image: 'izolyatsiya.png' },
  { title: 'Цинкование', description: 'Мы предоставляем услуги по цинкованию, которые обеспечивают надежную защиту металла от коррозии и повышают его срок службы. Мы используем только качественные материалы, что позволяет гарантировать высокое качество цинкования и долговечность защитного покрытия.', image: 'tsinkovanie.png' }
]
</script>

<template>
  <div>
    <CommonBreadcrumbs :items="breadcrumbs" />
    <CommonPageHeader h1="Услуги" />
    <section class="relative mx-auto flex size-full flex-col">
      <div class="container mx-auto w-full max-w-7xl p-4">
        <div class="mt-8 lg:flex lg:items-center">
          <div class="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 xl:gap-16">
            <div v-for="service, i in services" :key="i" class="space-y-3">
              <span class="inline-block rounded-xl bg-gray-300 p-3 dark:bg-gray-800">
                <NuxtPicture
                  :src="`/img/services/${service.image}`"
                  :alt="service.title"
                  sizes="sm:400px md:400px lg:300px"
                  class="inline-block p-3 dark:invert"
                />
              </span>
              <h2 class="text-xl font-semibold">
                {{ service.title }}
              </h2>
              <p>
                {{ service.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

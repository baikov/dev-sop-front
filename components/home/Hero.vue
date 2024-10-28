<template>
  <div class="relative overflow-hidden bg-white dark:bg-gray-900 ">
    <div class="mx-auto max-w-7xl">
      <div class="relative z-10 bg-white pb-8 dark:bg-gray-900 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
        <svg
          class="absolute inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 text-white dark:text-gray-900 lg:block"
          fill="currentColor"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon points="50,0 100,0 50,100 0,100" />
        </svg>
        <main class="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-12 md:pt-16 lg:px-8 lg:pt-20 xl:pt-28">
          <div class="sm:text-center lg:text-left">
            <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-zinc-100 sm:text-5xl md:text-6xl">
              <span class="block xl:inline">Металлопрокат со склада</span>
              {{ ' ' }}
              <span class="block text-green-700 xl:inline">в Нижнем Новгороде</span>
            </h1>
            <p class="mt-3 text-base text-gray-500 dark:text-zinc-300 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
              Имеем огромный опыт работы в сфере реализации металла. Работаем с ведущими предприятиями производителями металлоизделий России.
            </p>
            <!-- <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div class="rounded-md shadow">
                <NuxtLink to="#" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10">
                  Get started
                </NuxtLink>
              </div>
              <div class="mt-3 sm:mt-0 sm:ml-3">
                <NuxtLink to="#" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 md:py-4 md:text-lg md:px-10">
                  Live demo
                </NuxtLink>
              </div>
            </div> -->
          </div>
        </main>
      </div>
    </div>
    <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
      <NuxtPicture
        src="/img/main-banner.jpg"
        sizes="sm:550px md:1000px lg:900px"
        alt="СПЕЦОПТТОРГ - Оптовые продажи металлопроката"
        title="СПЕЦОПТТОРГ - Оптовые продажи металлопроката"
        :img-attrs="{ class: 'h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full' }"
      />
    </div>
  </div>
  <!-- <section class="bg-white dark:bg-gray-900">
    <div class="lg:flex">
      <div class="flex items-center justify-center w-full px-6 py-8 lg:h-[32rem] lg:w-1/2">
        <div class="max-w-xl">
          <h2 class="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
            Оптовые продажи металлопроката <span class="text-blue-600 dark:text-blue-400">со склада</span>
          </h2>

          <p class="mt-4 text-sm text-gray-500 dark:text-gray-400 lg:text-base">
            Имеем огромный опыт работы в сфере реализации металла. Работаем с ведущими предприятиями производителями металлоизделий России.
          </p>

          <div class="flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row">
            <NuxtLink to="/catalog" class="block px-5 py-2 text-sm font-medium tracking-wider text-center text-white transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-700">
              Каталог
            </NuxtLink>

  </div>
  </div>
  </div>

  <div class="w-full h-64 lg:w-1/2 lg:h-auto">
    <div class="w-full h-full bg-cover" style="background-image: url(~/assets/img/about.jpg)">
      <div class="w-full h-full bg-black opacity-25" />
    </div>
  </div>
  </div>
  </section> -->
</template>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="container mx-auto w-full max-w-7xl px-4 py-10">
      <div class="lg:flex lg:items-center">
        <div class="w-full space-y-12 lg:w-1/2 ">
          <div>
            <h1 class="text-2xl font-semibold text-gray-800 dark:text-white lg:text-3xl">
              ООО «СПЕЦОПТТОРГ» <br> надежный партнер
            </h1>

            <div class="mt-2">
              <span class="bg-primary-700 inline-block h-1 w-40 rounded-full" />
              <span class="bg-primary-700 ml-1 inline-block h-1 w-3 rounded-full" />
              <span class="bg-primary-700 ml-1 inline-block h-1 w-1 rounded-full" />
            </div>
          </div>

          <div class="md:-mx-4 md:flex md:items-start">
            <span class="bg-primary-100 text-primary-700 dark:bg-primary-500 inline-block rounded-xl p-2 dark:text-white md:mx-4">
              <UIcon name="i-mdi-ruble" />
            </span>

            <div class="mt-4 md:mx-4 md:mt-0">
              <h1 class="text-xl font-semibold text-gray-700  dark:text-white">
                Выгодные цены
              </h1>

              <p class="mt-3 text-gray-500 dark:text-gray-300">
                Низкие цены и специальные скидки для наших постоянных клиентов
              </p>
            </div>
          </div>

          <div class="md:-mx-4 md:flex md:items-start">
            <span class="bg-primary-100 text-primary-700 dark:bg-primary-500 inline-block rounded-xl p-2 dark:text-white md:mx-4">
              <UIcon name="i-mdi-tow-truck" />
            </span>

            <div class="mt-4 md:mx-4 md:mt-0">
              <h1 class="text-xl font-semibold text-gray-700 dark:text-white">
                Отгрузка продуции в день оплаты
              </h1>

              <p class="mt-3 text-gray-500 dark:text-gray-300">
                Наша компания имеет возможность отгрузить продукцию в день оплаты счета при предоставлении платежного поручения
              </p>
            </div>
          </div>

          <div class="md:-mx-4 md:flex md:items-start">
            <span class="bg-primary-100 text-primary-700 dark:bg-primary-500 inline-block rounded-xl p-2 dark:text-white md:mx-4">
              <UIcon name="i-mdi-toolbox-outline" />
            </span>

            <div class="mt-4 md:mx-4 md:mt-0">
              <h1 class="text-xl font-semibold text-gray-700  dark:text-white">
                Дополнительные услуги
              </h1>

              <p class="mt-3 text-gray-500 dark:text-gray-300">
                Предоставляем дополнительные услуги, такие как услуги доставки продукции и услуги резки в размер
              </p>
            </div>
          </div>
        </div>

        <div class="hidden lg:flex lg:w-1/2 lg:items-center lg:justify-center">
          <NuxtPicture
            src="/img/armatura.jpg"
            sizes="sm:200px md:300px lg:600px"
            :img-attrs="{ class: 'w-[28rem] h-[28rem] object-cover xl:w-[34rem] xl:h-[34rem] rounded-full' }"
          />
        </div>
      </div>

      <hr class="my-12 border-gray-200 dark:border-gray-700">

      <div class="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
        <div class="col-span-1 flex items-center justify-center md:col-span-2 lg:col-span-1">
          <!-- <img class="col-span-2 max-h-8 w-full object-contain lg:col-span-1" src="/img/partners/chtpz.png" alt="ЧТПЗ" width="150" height="35"> -->
          <NuxtPicture
            src="/img/partners/mechel.png"
            sizes="sm:100px md:100px lg:100px"
            :img-attrs="{ class: 'filter grayscale hover:grayscale-0 transition-all ease-in-out duration-300 col-span-2 w-full object-contain lg:col-span-1' }"
          />
        </div>

        <div class="col-span-1 flex items-center justify-center md:col-span-2 lg:col-span-1">
          <!-- <img class="col-span-2 max-h-8 w-full object-contain lg:col-span-1" src="/img/partners/mech.png" alt="МЕЧЕЛ" width="150" height="40"> -->
          <NuxtPicture
            src="/img/partners/omk.png"
            sizes="sm:100px md:100px lg:100px"
            :img-attrs="{ class: 'filter grayscale hover:grayscale-0 transition-all ease-in-out duration-300 col-span-2 w-full object-contain lg:col-span-1' }"
          />
        </div>

        <div class="col-span-1 flex items-center justify-center md:col-span-2 lg:col-span-1">
          <!-- <img class="col-span-2 max-h-8 w-full object-contain lg:col-span-1" src="/img/partners/mmk.gif" alt="ММК" width="150" height="34"> -->
          <NuxtPicture
            src="/img/partners/severstal.png"
            sizes="sm:100px md:100px lg:100px"
            :img-attrs="{ class: 'filter grayscale hover:grayscale-0 transition-all ease-in-out duration-300 col-span-2 w-full object-contain lg:col-span-1' }"
          />
        </div>

        <div class="col-span-1 flex items-center justify-center md:col-span-3 lg:col-span-1">
          <!-- <img class="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1" src="/img/partners/omk.png" alt="ОМК" width="146" height="46"> -->
          <NuxtPicture
            src="/img/partners/tmk.png"
            sizes="sm:100px md:100px lg:100px"
            :img-attrs="{ class: 'filter grayscale hover:grayscale-0 transition-all ease-in-out duration-300 col-span-2 w-full object-contain sm:col-start-2 lg:col-span-1' }"
          />
        </div>

        <div class="col-span-2 flex items-center justify-center md:col-span-3 lg:col-span-1">
          <!-- <img class="col-span-2 col-start-2 max-h-8 w-full object-contain sm:col-start-auto lg:col-span-1" src="/img/partners/Severstal.jpg" alt="Statamic" width="150" height="50"> -->
          <NuxtPicture
            src="/img/partners/ugmk.png"
            sizes="sm:100px md:100px lg:100px"
            :img-attrs="{ class: 'filter grayscale hover:grayscale-0 transition-all ease-in-out duration-300 col-span-2 col-start-2 w-full object-contain sm:col-start-auto lg:col-span-1' }"
          />
        </div>
      </div>
    </div>
  </section>
</template>

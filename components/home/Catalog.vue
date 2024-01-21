<template>
  <section class="relative mx-auto flex size-full flex-1 flex-col" style="background-image: url('');">
    <div class="mx-auto w-full max-w-7xl px-4 py-10">
      <div class="">
        <div class="group grid grid-cols-1 border bg-white dark:bg-gray-300 md:grid-cols-2 lg:xl:grid-cols-3 ">
          <div
            class="group flex cursor-pointer flex-col items-center p-10 text-center hover:bg-slate-50 md:lg:xl:border-r md:lg:xl:border-b"
          >
            <NuxtLink to="/catalog/armatura-katanka" class="hover:underline">
              <NuxtPicture
                src="/img/categories/armatura-riflenaya.png"
                sizes="sm:200px md:200px lg:200px"
                :img-attrs="{ class: 'object-cover' }"
              />
              <p class="mt-3 text-xl font-medium text-slate-700">
                Арматура, катанка
              </p>
            </NuxtLink>
            <div class="mt-2 text-sm text-slate-500">
              <NuxtLink to="/catalog/armatura-riflenaya-a3" class="hover:underline">
                Арматура рифленая А3
              </NuxtLink>,
              <NuxtLink to="/catalog/armatura-gladkaya-a1" class="hover:underline">
                Арматура гладкая А1
              </NuxtLink>,
              <NuxtLink to="/catalog/armatura-at800" class="hover:underline">
                Арматура Ат800
              </NuxtLink>,
              <NuxtLink to="/catalog/katanka" class="hover:underline">
                Катанка
              </NuxtLink>
            </div>
          </div>

          <div
            class="group flex cursor-pointer flex-col items-center p-10 text-center hover:bg-slate-50 md:lg:xl:border-r md:lg:xl:border-b"
          >
            <NuxtLink to="/catalog/balki-dvutavr" class="hover:underline">
              <NuxtPicture
                src="/img/categories/balka.png"
                sizes="sm:200px md:200px lg:200px"
                :img-attrs="{ class: 'object-cover' }"
              />
              <p class="mt-3 text-xl font-medium text-slate-700">
                Балка двутавр
              </p>
            </NuxtLink>
            <div class="mt-2 text-sm text-slate-500">
              <NuxtLink to="/catalog/balki-dvutavr-nizkolegirovannye" class="hover:underline">
                Балки двутавр низколегированные
              </NuxtLink>
            </div>
          </div>

          <div class="group flex cursor-pointer flex-col items-center p-10 text-center hover:bg-slate-50 md:lg:xl:border-b">
            <NuxtLink to="/catalog/vgp-elektrosvarnye-truby" class="hover:underline">
              <NuxtPicture
                src="/img/categories/trubnij-prokat.png"
                sizes="sm:200px md:200px lg:200px"
                :img-attrs="{ class: 'object-cover' }"
              />
              <p class="mt-3 text-xl font-medium text-slate-700">
                Трубы стальные
              </p>
            </NuxtLink>
            <div class="mt-2 text-sm text-slate-500">
              <NuxtLink to="/catalog/truby-vgp" class="hover:underline">
                Трубы ВГП
              </NuxtLink>,
              <NuxtLink to="/catalog/truby-kvadratnye-otsinkovannye" class="hover:underline">
                Квадратные оцинкованные
              </NuxtLink>,
              <NuxtLink to="/catalog/truby-kruglye-otsinkovannye" class="hover:underline">
                Круглые оцинкованные
              </NuxtLink>,
              <NuxtLink to="/catalog/truby-elektrosvarnye-v-izolyatsii-ppu" class="hover:underline">
                В ППУ изоляции
              </NuxtLink>
            </div>
          </div>

          <div class="group flex cursor-pointer flex-col items-center p-10 text-center hover:bg-slate-50 md:lg:xl:border-r">
            <NuxtLink to="/catalog/truby-elektrosvarnye-pryamougolnye" class="hover:underline">
              <NuxtPicture
                src="/img/categories/truby-profilnie.png"
                sizes="sm:200px md:200px lg:200px"
                :img-attrs="{ class: 'object-cover' }"
              />
              <p class="mt-3 text-xl font-medium text-slate-700">
                Трубы профильные
              </p>
            </NuxtLink>
            <div class="mt-2 text-sm text-slate-500">
              <NuxtLink to="/catalog/truby-pryamougolnye-otsinkovannye" class="hover:underline">
                Трубы прямоугольные оцинкованные
              </NuxtLink>,
              <NuxtLink to="/catalog/truby-kvadratnye-otsinkovannye" class="hover:underline">
                Трубы квадратные оцинкованные
              </NuxtLink>,
              <NuxtLink to="/catalog/truby-elektrosvarnye-kvadratnye" class="hover:underline">
                Трубы квадратные ЭСВ
              </NuxtLink>,
              <NuxtLink to="/catalog/truby-elektrosvarnye-pryamougolnye" class="hover:underline">
                Трубы прямоугольные ЭСВ
              </NuxtLink>
            </div>
          </div>

          <div class="group flex cursor-pointer flex-col items-center p-10 text-center hover:bg-slate-50 md:lg:xl:border-r">
            <NuxtLink to="/catalog/shveller" class="hover:underline">
              <NuxtPicture
                src="/img/categories/shveller.png"
                sizes="sm:200px md:200px lg:200px"
                :img-attrs="{ class: 'object-cover' }"
              />
              <p class="mt-3 text-xl font-medium text-slate-700">
                Швеллер
              </p>
            </NuxtLink>
            <div class="mt-2 text-sm text-slate-500">
              <NuxtLink to="/catalog/shveller-gnutyi" class="hover:underline">
                Швеллер гнутый
              </NuxtLink>,
              <NuxtLink to="/catalog/shveller-nizkolegirovannyi" class="hover:underline">
                Швеллер низколегированный
              </NuxtLink>
            </div>
          </div>

          <div class="group flex cursor-pointer flex-col items-center p-10 text-center hover:bg-slate-50">
            <NuxtLink to="/catalog/ugolok" class="hover:underline">
              <NuxtPicture
                src="/img/categories/ugolok.png"
                sizes="sm:200px md:200px lg:200px"
                :img-attrs="{ class: 'object-cover' }"
              />
              <p class="mt-3 text-xl font-medium text-slate-700">
                Уголок
              </p>
            </NuxtLink>
            <div class="mt-2 text-sm text-slate-500">
              <NuxtLink to="/catalog/ugolok-neravnopolochnyi" class="hover:underline">
                Уголок неравнополочный
              </NuxtLink>,
              <NuxtLink to="/catalog/ugolok-ravnopolochnyi" class="hover:underline">
                Уголок равнополочный
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="flex w-full flex-col items-center justify-between bg-gray-700 px-20 py-10 shadow-xl dark:bg-gray-900 md:flex-row">
          <p class="text-center text-zinc-200 md:text-left">
            <span class="text-lg font-medium md:text-2xl">Нужна быстрая помощь в подборе позиций и рассчете количества?</span>
            <br>
            <span class="text-md md:text-lg">Присылайте заявку на почту!</span>
          </p>
          <span class="mt-2 bg-green-600 px-5 py-2 font-bold text-zinc-200 shadow-xl duration-150 hover:bg-green-700">
            info@soptorg.ru
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

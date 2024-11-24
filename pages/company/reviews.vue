<script lang="ts" setup>
import type { FormError } from '#ui/types'
import type { ContactInfo } from '~/types/catalog'

const toast = useToast()
const config = useRuntimeConfig()
const route = useRoute()
const fullUrl = computed(() => `${config.public.siteUrl}${route.path}`)

const contactInfo = useState<ContactInfo>('contactInfo')
const formTitle = 'Оставить отзыв'
const question = ref('')
const agree = useState('agree', () => true)
const reviewModalIsOpen = ref(false)

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name) {
    errors.push({ path: 'name', message: 'Обязательно для заполнения' })
  }
  if (!state.phone) {
    errors.push({ path: 'phone', message: 'Укажите телефон для связи' })
  }
  if (state.phone && !/^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/.test(state.phone)) {
    errors.push({ path: 'phone', message: 'Некорректный формат телефонного номера' })
  }
  if (state.email && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(state.email)) {
    errors.push({ path: 'email', message: 'Некорректный формат электронной почты' })
  }
  return errors
}

const formData = computed(() => ({
  ...contactInfo.value,
  title: formTitle,
  question: question.value || '',
  url: fullUrl.value,
}))

async function onSubmit() {
  const { data, error } = await useFetch<ContactInfo>(
    `${config.public.apiUrl}/forms/`, {
      method: 'POST',
      body: JSON.stringify(formData.value),
    },
  )
  if (data.value) {
    toast.add({
      title: 'Отзыв отправлен 🚀',
      description: `Уважаемый ${data.value?.name}, ваш отзыв успешно отправлен и появится после проверки. Спасибо за ваше мнение!`,
      icon: 'i-heroicons-check-solid',
      color: 'green',
      timeout: 10000,
    })

    if (import.meta.client) {
      // @ts-expect-error: because fuck you, that's why
      ctx.$metrika.reachGoal('formQuestion')
    }
  }
  else if (error.value?.statusCode === 429) {
    toast.add({
      title: 'Ошибка!',
      description: 'Мы уже получили ваш отзыв. Повторная отправка не требуется.',
      icon: 'i-heroicons-x-circle-solid',
      color: 'red',
    })
  }
  else {
    toast.add({
      title: 'Ошибка!',
      description: `Форма не отправлена: ${error.value?.message}`,
      icon: 'i-heroicons-x-circle-solid',
      color: 'red',
    })
  }
}

useHead({
  title: 'Отзывы и благодарственные письма',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content: 'Отзывы клиентов о компании и благодарственные письма',
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
  {
    level: 2,
    name: 'Отзывы',
    href: '/company/reviews',
    disabled: true,
  },
]

const reviews = [
  {
    id: 1,
    name: 'Аноним',
    company: '',
    date: '2023-09-01',
    text: 'Регулярно заказываем в «Спецоптторг» стальные круглые трубы. Все товарные позиции всегда есть в наличии. Несмотря на доступные цены, качество металла на высоте. К срокам поставки претензий также нет.',
  },
  {
    id: 2,
    name: 'Аноним',
    company: '',
    date: '2023-11-12',
    text: 'Заказывали стальные листы. Отличное качество. Во всей партии на 3 тонны вообще не было брака (никакой ржавчины, деформации и пр.), респект сотрудникам отдела контроля качества. Теперь всегда советую Спецоптторг коллегам!',
  },
  {
    id: 3,
    name: 'Аноним',
    company: '',
    date: '2024-03-23',
    text: 'В Нижнем Новгороде это лучший поставщик металлопроката. Из главных плюсов для меня лично – удобное расположение склада, можно приехать, лично все посмотреть и пощупать. Есть самовывоз и доставка.',
  },
  {
    id: 4,
    name: 'Аноним',
    company: '',
    date: '2024-07-04',
    text: 'Покупали хомутовые опоры. После установки трубопровод зафиксирован на века, поэтому очень довольны выбором и высоким качеством изделий. Привезли за город без проблем, даже получили небольшую скидку за счет солидного объема заказа. ',
  },
  {
    id: 5,
    name: 'Аноним',
    company: '',
    date: '2024-08-05',
    text: 'Брали трубы эсв квадратные 20х20х1,5 6000 метров. Все привезли в указанное время, хоть и находится объект в 150 км от их склада. Рекомендую, будем сотрудничать! ',
  },
  {
    id: 6,
    name: 'Аноним',
    company: '',
    date: '2024-09-19',
    text: 'Работаем со СПЕЦОПТТОРГом уже не первый год. Продукция всегда соответствует заявленному качеству, предоставляют сертификаты по запросу. Доставка точно в срок и в оговоренном объеме.',
  },
  {
    id: 7,
    name: 'Аноним',
    company: '',
    date: '2024-10-07',
    text: 'Заказывали стальную кладочную сетку 50х50х4 для нашего строительного объекта. Заказ получили на следующий день после оформления заявки и внесения оплаты. До этого обзвонили несколько компаний, все называют заоблачные цены и сроки. Поэтому теперь будем сотрудничать только с компанией «Спецоптторг».',
  },
]

const items = [
  { id: 1, src: 'img/company/reviews/mshk-company-letter.jpg' },
  { id: 2, src: 'img/company/reviews/td-kaz-letter.jpg' },
]
const isOpen = ref(false)
const picture = ref('')

const handleOpen = (src: string) => {
  picture.value = src
  isOpen.value = true
}
</script>

<template>
  <div>
    <CommonBreadcrumbs :items="breadcrumbs" />
    <CommonPageHeader h1="Отзывы и благодарственные письма" />
    <div class="mx-auto flex w-full max-w-7xl p-4">
      <div
        v-for="item in items"
        :key="item.id"
        class="p-2"
      >
        <NuxtPicture
          :src="item.src"
          class="cursor-pointer"
          sizes="sm:200px md:200px lg:200px"
          @click="handleOpen(item.src)"
        />
      </div>
    </div>
    <div class="mx-auto w-full max-w-7xl p-4">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="mb-4"
      >
        <div class="flex items-center justify-between">
          <div class="text-lg font-semibold">
            {{ review.name }}
          </div>
          <div class="">
            {{ review.date }}
          </div>
        </div>
        <div class="">
          {{ review.text }}
        </div>
      </div>
      <UButton
        @click="reviewModalIsOpen = true"
      >
        Оставить отзыв
      </UButton>
    </div>

    <UModal
      v-model="isOpen"
    >
      <NuxtPicture
        :src="picture"
        sizes="sm:800px md:1000px lg:1000px"
        :img-attrs="{ class: 'object-cover' }"
      />
    </UModal>
    <UModal
      v-model="reviewModalIsOpen"
    >
      <ClientOnly>
        <UForm
          :validate="validate"
          :state="formData"
          @submit="onSubmit"
        >
          <UCard>
            <template #header>
              <div class="text-center text-xl font-bold">
                {{ formTitle }}
              </div>
            </template>

            <div class="space-y-4">
              <UFormGroup
                label="ФИО"
                name="name"
                required
              >
                <UInput
                  v-model="contactInfo.name"
                  placeholder="Иванов Иван Иванович"
                />
              </UFormGroup>

              <UFormGroup
                label="Телефон"
                name="phone"
                required
              >
                <UInput
                  v-model="contactInfo.phone"
                  placeholder="+7(999) 888-77-66"
                  type="tel"
                />
              </UFormGroup>

              <UFormGroup
                label="Email"
                name="email"
              >
                <UInput
                  v-model="contactInfo.email"
                  type="email"
                  placeholder="your@email.ru"
                />
              </UFormGroup>
              <UFormGroup
                label="Отзыв"
                name="question"
              >
                <UTextarea
                  v-model="question"
                  placeholder="Ваш отзыв о компании"
                />
              </UFormGroup>
              <UFormGroup>
                <UCheckbox
                  v-model="agree"
                  required
                >
                  <template #label>
                    <span>Даю согласие на обработку
                      <NuxtLink
                        to="company/confidentiality"
                        target="_blank"
                        class="text-primary-700 underline"
                      >Персональных данных</NuxtLink>
                    </span>
                  </template>
                </UCheckbox>
              </UFormGroup>
            </div>

            <template #footer>
              <UButton
                type="submit"
                block
              >
                Отправить
              </UButton>
            </template>
          </UCard>
        </UForm>
      </ClientOnly>
    </UModal>
  </div>
</template>

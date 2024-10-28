<script lang="ts" setup>
import type { FormError } from '#ui/types'
import { useCartStore } from '~/store/cart'
import type { ContactInfo } from '~/types/catalog'

const { cart, clearCart } = useCartStore()
const toast = useToast()
const config = useRuntimeConfig()
const route = useRoute()
const fullUrl = computed(() => `${config.public.siteUrl}${route.path}`)

const contactInfo = useState<ContactInfo>('contactInfo')
const formTitle = 'Оформление заказа'
const question = ref('')

const order = computed(() =>
  cart.productsInCart.reduce((acc, item) =>
    acc + `
      ${item.name} ${item.tons} т | ${item.meters} м | ${item.peaces} шт.
      цена: ${formatPrice(item.ton_price_with_coef)} |
      ${formatPrice(item.meter_price_with_coef)} |
      ${formatPrice(item.unit_price_with_coef)}
      на сумму: ${formatPrice(item.total)}\n\r
    `,
  '',
  ),
)
const totalPrice = computed(() => cart.productsInCart.reduce((acc, item) => acc + item.total, 0))

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
  products: cart.productsInCart,
  question: question.value || '',
  order: order.value + '\n' + 'Итого: ' + totalPrice.value + ' руб.',
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
      title: 'Заказ оформлен! 🚀',
      description: `Уважаемый ${data.value?.name}, наши менеджеры свяжутся с вами в ближайшее время по телефону ${data.value?.phone}`,
      icon: 'i-heroicons-check-solid',
      color: 'green',
      timeout: 10000,
    })
    clearCart()

    if (import.meta.client) {
      // @ts-expect-error: because fuck you, that's why
      ctx.$metrika.reachGoal('formQuestion')
    }
  }
  else if (error.value?.statusCode === 429) {
    toast.add({
      title: 'Ошибка!',
      description: 'Мы уже получили ваш запрос. Повторная отправка не требуется. Мы свяжемся с вами в ближайшее время.',
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

const breadcrumbs = [
  {
    level: 1,
    name: 'Заказ',
    href: '/cart',
    disabled: true,
  },
]
const agree = useState('agree', () => true)
</script>

<template>
  <div>
    <CommonBreadcrumbs :items="breadcrumbs" />
    <CommonPageHeader h1="Оформление заказа" />
    <div class="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-4 px-4 md:flex-row">
      <div class="w-full md:w-2/3">
        <CommonCartTable />
      </div>
      <div class="w-full md:w-1/3">
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
                  label="Комментарий к заказу"
                  name="question"
                >
                  <UTextarea
                    v-model="question"
                    placeholder="Произвольный комментарий к заказу"
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
      </div>
    </div>
  </div>
</template>

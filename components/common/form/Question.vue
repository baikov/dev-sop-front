<script setup lang="ts">
import type { FormError } from '#ui/types'
import { useNuxtApp } from '#app'
const toast = useToast()
const config = useRuntimeConfig()
const route = useRoute()
const fullUrl = computed(() => `${config.public.siteUrl}${route.path}`)
const ctx = useNuxtApp()

interface ContactInfo {
    name: string,
    phone: string,
    email: string
}

const initialContactInfo: ContactInfo = {
  name: '',
  phone: '',
  email: ''
}

// const initialContactInfo: ContactInfo = form
const productName = useState<string>('productName')
const questionFormIsOpen = useState('questionFormIsOpen', () => false)
const contactInfo = useState('contactInfo', () => initialContactInfo)
const formTitle = 'Задать вопрос'
const question = ref('')

const formData = computed(() => ({
  ...contactInfo.value,
  product: productName.value,
  title: formTitle,
  question: question.value,
  url: fullUrl.value
}))

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name) { errors.push({ path: 'name', message: 'Обязательно для заполнения' }) }
  if (!state.phone) { errors.push({ path: 'phone', message: 'Укажите телефон для связи' }) }
  if (state.phone && !/^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/.test(state.phone)) { errors.push({ path: 'phone', message: 'Некорректный формат телефонного номера' }) }
  if (state.email && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(state.email)) {
    errors.push({ path: 'email', message: 'Некорректный формат электронной почты' })
  }
  if (!state.question) { errors.push({ path: 'question', message: 'Обязательно для заполнения' }) }
  // if (!state.email && !state.phone) { errors.push({ path: 'email', message: 'Укажите телефон или email для связи' }) }
  return errors
}

async function onSubmit () { // event: FormSubmitEvent<any>
  const { data, error } = await useFetch<ContactInfo>(
    `${config.public.apiUrl}/forms/`, {
      method: 'POST',
      body: JSON.stringify(formData.value)
    }
  )
  if (data.value) {
    toast.add({
      title: 'Запрос отправлен! 🚀',
      description: `Уважаемый ${data.value?.name}, наши менеджеры свяжутся с вами в ближайшее время по телефону ${data.value?.phone}`,
      icon: 'i-heroicons-check-solid',
      color: 'green',
      timeout: 10000
    })

    // @ts-ignore
    if (process.client) { ctx.$metrika.reachGoal('formQuestion') }
  } else if (error.value?.statusCode === 429) {
    toast.add({
      title: 'Ошибка!',
      description: 'Мы уже получили ваш запрос. Повторная отправка не требуется. Мы свяжемся с вами в ближайшее время.',
      icon: 'i-heroicons-x-circle-solid',
      color: 'red'
    })
  } else {
    toast.add({
      title: 'Ошибка!',
      description: `Форма не отправлена: ${error.value?.message}`,
      icon: 'i-heroicons-x-circle-solid',
      color: 'red'
    })
  }
  questionFormIsOpen.value = false
}
const agree = useState('agree', () => true)
</script>

<template>
  <ClientOnly>
    <UModal v-model="questionFormIsOpen">
      <UForm :validate="validate" :state="formData" @submit="onSubmit">
        <UCard>
          <template #header>
            <div class="text-center text-xl font-bold">
              {{ formTitle }}
            </div>
          </template>

          <div class="space-y-4">
            <UFormGroup label="ФИО" name="name" required>
              <UInput v-model="contactInfo.name" placeholder="Иванов Иван Иванович" />
            </UFormGroup>

            <UFormGroup label="Телефон" name="phone" required>
              <UInput v-model="contactInfo.phone" placeholder="+7(999) 888-77-66" type="tel" />
            </UFormGroup>

            <UFormGroup label="Email" name="email">
              <UInput v-model="contactInfo.email" type="email" placeholder="your@email.ru" />
            </UFormGroup>
            <UFormGroup label="Товар" name="product">
              <UInput :placeholder="productName" disabled />
            </UFormGroup>
            <UFormGroup label="Вопрос" name="question" required>
              <UTextarea v-model="question" placeholder="Ваш вопрос" />
            </UFormGroup>
            <UFormGroup>
              <UCheckbox v-model="agree" required>
                <template #label>
                  <span>Даю согласие на обработку
                    <NuxtLink to="company/confidentiality" target="_blank" class="text-primary-700 underline">Персональных данных</NuxtLink>
                  </span>
                </template>
              </UCheckbox>
            </UFormGroup>
          </div>

          <template #footer>
            <UButton type="submit" block>
              Отправить
            </UButton>
          </template>
        </UCard>
      </UForm>
    </UModal>
  </ClientOnly>
</template>

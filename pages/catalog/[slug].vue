<script lang="ts" setup>
const { getCategory } = useCategory()
const route = useRoute()
const config = useRuntimeConfig()
const slug = route.params.slug.toString()
const { data: detailCategory, error } = await getCategory(slug)
const toast = useToast()

if (error.value) {
  if (error.value.statusCode === 500) {
    toast.add({
      title: 'Ошибка на сервере',
      description: 'Что-то пошло не так, попробуйте позже',
      icon: 'i-heroicons-x-circle-solid',
      color: 'red'
    })
  } else {
    for (const key of Object.keys(error.value.data)) {
      toast.add({
        title: 'Ошибка получения категории',
        description: `${key}: ${error.value.data[key]}`,
        icon: 'i-heroicons-x-circle-solid',
        color: 'red'
      })
    }
  }
}

useHead({
  title: detailCategory?.value?.seo.seo_title,
  titleTemplate: '%s',

  meta: [
    {
      name: 'description',
      content: detailCategory?.value?.seo.seo_description
    },
    {
      name: 'robots',
      content: `${detailCategory?.value?.seo.is_index ? 'index' : 'noindex'}, ${detailCategory?.value?.seo.is_follow ? 'follow' : 'nofollow'
        }`
    },
    {
      property: 'og:site_name',
      content: config.public.siteName
    },
    {
      property: 'og:url',
      content: `${config.public.siteUrl}${route.path}`
    }
  ],
  link: [
    { rel: 'canonical', href: `${config.public.siteUrl}${route.path}` }
  ]
})

useSchemaOrg([
  defineProduct({
    name: detailCategory?.value?.seo.h1 || detailCategory?.value?.name,
    description: detailCategory?.value?.description,
    image: detailCategory?.value?.image,
    offers: {
      type: 'AggregateOffer',
      url: `${config.public.siteUrl}${route.path}`,
      offerCount: detailCategory?.value?.products_count,
      lowPrice: detailCategory?.value?.min_price,
      highPrice: detailCategory?.value?.max_price,
      priceCurrency: 'RUB'
    },
    aggregateRating: {
      ratingValue: Math.random() * (5.0 - 4.0) + 4.0,
      bestRating: 5,
      ratingCount: Math.floor(Math.random() * 49)
    }
  })
])
</script>

<template>
  <div>
    <CommonBreadcrumbs :items="detailCategory?.breadcrumbs" />
    <CommonPageHeader :h1="detailCategory?.seo.h1 || detailCategory?.name" />
    <div class="mx-auto flex w-full max-w-7xl flex-1 gap-4 px-4">
      <div class="hidden flex-col md:flex md:w-4/12 lg:w-3/12">
        <CatalogSidebar />
      </div>
      <div class="w-full md:w-8/12 lg:w-9/12">
        <CatalogSubcategories v-show="detailCategory?.subcategories && detailCategory?.subcategories.length > 0" :subcat-list="detailCategory?.subcategories" />
        <div class="">
          {{ detailCategory?.description }}
        </div>
        <CatalogProductTableTemp :category-properties="detailCategory?.product_properties || []" />
      </div>
    </div>
  </div>
</template>

import type { IBreadcrumb } from '~/types'

interface ISEO {
  seo_title: string
  seo_description: string
  h1: string
  is_index: boolean
  is_follow: boolean
}
interface Category {
  id: number
  name: string
  slug: string
  image: string | null
  // parents: string[]
  description: string
}
interface IProductProperty {
  id: number
  name: string
  code: string
  units: string
  is_display_in_list: boolean
  ordering: number
  values: string[]
}
interface ICategoryDetail {
  id: number
  name: string
  slug: string
  seo: ISEO
  description: string
  breadcrumbs: IBreadcrumb[]
  product_properties: IProductProperty[]
  subcategories: Category[] | []
}
interface IProductPropertyValue extends IProductProperty {
  value: string
}
interface IProduct {
  id: number
  name: string
  slug: string
  properties: IProductPropertyValue[]
  unit_price_with_coef: number
  ton_price_with_coef: number
  meter_price_with_coef: number
  seo: ISEO
  category: string
  description: string
  breadcrumbs: IBreadcrumb[]
  in_stock: boolean
}
interface IProductList {
  limit: number
  offset: number
  count: number
  next: string | null
  previous: string | null
  results: IProduct[]
}

export type {
  Category,
  IProduct,
  IBreadcrumb,
  ICategoryDetail,
  IProductList,
  IProductProperty,
  IProductPropertyValue
}

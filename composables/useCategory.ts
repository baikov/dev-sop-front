import type { Category, ICategoryDetail, IProductList, IProduct } from '~/types/catalog'

export const useCategory = () => {
  const config = useRuntimeConfig()
  const productListParams = useState('productListParams')

  const getCategryList = async () => {
    const { data, error } = await useFetch<Category[]>(
      `${config.public.apiUrl}/categories/`, {
        // headers: { Authorization: `JWT ${tokenCookie.value}` }
      }
    )
    return {
      data,
      error
    }
  }

  const getRootCategories = async () => {
    const { data, error } = await useFetch<Category[]>(
      `${config.public.apiUrl}/categories/root/`, {
        // headers: { Authorization: `JWT ${tokenCookie.value}` }
      }
    )
    return {
      data,
      error
    }
  }

  const getCategory = async (slug: string) => {
    const { data, error } = await useFetch<ICategoryDetail>(
      `${config.public.apiUrl}/categories/${slug}/`, {
        // headers: { Authorization: `JWT ${tokenCookie.value}` }
      }
    )
    return {
      data,
      error
    }
  }

  const getProductList = async (slug: string) => {
    const { data, error } = await useFetch<IProductList>(
      `${config.public.apiUrl}/categories/${slug}/products/`,
      {
        // query: { limit: pageLimit, offset: pageOffset }
        // watch: [pageLimit, pageOffset],
      }
    )
    return {
      data,
      error
    }
  }

  const getProductListNew = async (slug: string) => {
    const { data, error, refresh } = await useFetch<IProductList>(
      `${config.public.apiUrl}/products/?category=${slug}`,
      {
        query: productListParams
        // watch: [sort]
        // transform: (productList) => {
        //   return productList.map(productList.results => ({ title: mountain.title, description: mountain.description }))
        // }
      }
    )
    return {
      data,
      error,
      refresh
    }
  }

  const getProductDetail = async (slug: string) => {
    const { data, error, refresh } = await useFetch<IProduct>(
      `${config.public.apiUrl}/products/${slug}/`
    )
    return {
      data,
      error,
      refresh
    }
  }

  return { getCategryList, getCategory, getRootCategories, getProductList, getProductListNew, getProductDetail }
}

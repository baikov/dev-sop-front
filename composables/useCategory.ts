import type { Category, ICategoryDetail, IProductList } from '~/types/catalog'

export const useCategory = () => {
  const config = useRuntimeConfig()
  const pageLimit = useState('limit', () => 0)
  const pageOffset = useState('offset', () => 0)

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
        query: { limit: pageLimit, offset: pageOffset }
        // watch: [pageLimit, pageOffset],
      }
    )
    return {
      data,
      error
    }
  }

  return { getCategryList, getCategory, getProductList, getRootCategories, pageLimit, pageOffset }
}

import type { IMenuItem } from '~/types'

export const useMenu = () => {
  const config = useRuntimeConfig()
  // const tokenCookie = useCookie<string>('token')

  const getCatalogMenu = async () => {
    const { data, error } = await useFetch<IMenuItem[]>(
      `${config.public.apiUrl}/categories/menu/`, {
        // headers: { Authorization: `JWT ${tokenCookie.value}` }
      },
    )
    return {
      data,
      error,
    }
  }

  return { getCatalogMenu }
}

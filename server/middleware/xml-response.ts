import { parseURL } from 'ufo'
import type { IYML } from '~/types/catalog'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { pathname } = parseURL(event.node.req.url)

  if (pathname === '/yml') {
    const yml = await $fetch<IYML>(`${config.public.apiUrl}/yml/`)
    // <picture>https://soptorg.ru${product.picture}</picture>
    const offers = yml.products.map(product => `
      <offer id="${product.id}">
          <name>${product.name}</name>
          <url>https://soptorg.ru/product/${product.slug}</url>
          <price>${product.price}</price>
          <currencyId>RUR</currencyId>
          <categoryId>${product.category_id}</categoryId>
          <vendor>Спецоптторг</vendor>
          <description>
              <![CDATA[
              ${product.description}
              ]]>
          </description>
      </offer>
      `,
    ).join('')

    const categories = yml.categories.map(category => `
      <category id="${category.id}"${category.parent_id !== 0 ? ` parentId="${category.parent_id}"` : ''}>${category.name}</category>
      `,
    ).join('')

    // console.log('products', offers)

    const currentDate = new Date().toISOString()
    event.node.res.setHeader('Content-Type', 'application/xml')
    event.node.res.write('<?xml version="1.0" encoding="UTF-8"?>')
    const xmlData = `
        <yml_catalog date="${currentDate}">
            <shop>
                <name>Soptorg</name>
                <company>ООО "Спецоптторг"</company>
                <url>https://soptorg.ru</url>
                <currencies>
                    <currency id="RUR" rate="1"/>
                </currencies>
                <categories>
                    ${categories}
                </categories>
                <offers>
                    ${offers}
                </offers>
            </shop>
        </yml_catalog>`

    event.node.res.end(xmlData)
  }
})

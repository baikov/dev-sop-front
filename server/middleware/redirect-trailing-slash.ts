import { parseURL } from 'ufo'

export default defineEventHandler(async (event) => {
  const { pathname } = parseURL(event.node.req.url)

  if (pathname.endsWith('/') && pathname !== '/') {
    event.node.res.writeHead(301, { Location: pathname.slice(0, -1) })
    event.node.res.end()
  }
})

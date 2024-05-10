export default defineNuxtPlugin(() => {
  const ip = useState<string | string[]>('ip', () => '')

  const event = useRequestEvent()
  if (event) {
  // attempt to get IP
    ip.value = event.node.req.headers['x-real-ip'] || event.node.req.headers['x-forwarded-for'] || event.node.req.socket?.remoteAddress || ''
  } else {
    // fallback to window object
    ip.value = 'No'
  }
})

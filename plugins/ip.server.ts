export default defineNuxtPlugin(() => {
  const realIP = useState<string | string[]>('realIP', () => '')
  const forwardedFor = useState<string | string[]>('forwardedFor', () => [])
  const socketAddr = useState<string>('socketAddr', () => '')

  const event = useRequestEvent()
  if (event) {
  // attempt to get IP
    realIP.value = event.node.req.headers['x-real-ip'] || 'No'
    forwardedFor.value = event.node.req.headers['x-forwarded-for'] || 'No'
    socketAddr.value = event.node.req.socket?.remoteAddress || 'No'
  } else {
    // fallback to window object
    realIP.value = 'No event'
    forwardedFor.value = 'No event'
    socketAddr.value = 'No event'
  }
})

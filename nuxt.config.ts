// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@artmizu/yandex-metrika-nuxt',
    'nuxt-gtag',
    '@nuxt/scripts',
    '@nuxtjs/seo',
  ],
  $production: {
    routeRules: {
      '/company/**': { prerender: true },
      '/contacts': { prerender: true },
      '/services': { prerender: true },
      '/manager-dashboard': { ssr: false },
    },
    gtag: {
      id: 'G-75N44N3M4H',
    },
    scripts: {
      globals: {
        jivosite: '//code.jivo.ru/widget/hQHL62Yd1r',
      },
    },
    yandexMetrika: {
      id: process.env.YANDEX_METRIKA_ID,
    },
  },
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png?v=2' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png?v=2' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png?v=2' },
        { rel: 'manifest', href: '/site.webmanifest?v=2' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg?v=2', color: '#15803d' },
        { rel: 'shortcut icon', href: '/favicon.ico?v=2' },
      ],
      meta: [
        { name: 'msapplication-TileColor', content: '#00a300' },
        { name: 'theme-color', content: '#ffffff' },
      ],
    },
  },
  site: {
    url: `${process.env.HTTPS === 'true' ? 'https://' : 'http://'}${process.env.DOMAIN}`,
    defaultLocale: 'ru-RU',
  },
  ui: {
    global: true,
  //   icons: ['mdi', 'heroicons', 'tabler', 'icon-park-solid', 'bi']
  },
  runtimeConfig: {
    public: {
      siteUrl: `${process.env.HTTPS === 'true' ? 'https://' : 'http://'}${process.env.DOMAIN}`,
      apiUrl: `${process.env.HTTPS === 'true' ? 'https://' : 'http://'}${process.env.DOMAIN}${process.env.API_PORT ? `:${process.env.API_PORT}` : ''}/api`,
      mediaUrl: `${process.env.HTTPS === 'true' ? 'https://' : 'http://'}${process.env.DOMAIN}:8000/media`,
      siteName: process.env.SITE_NAME || 'Nuxt 3',
      language: 'ru-RU',
      // titleSeparator: '|',
    },
  },
  compatibilityDate: '2024-10-27',
  vite: {
    server: {
      hmr: {
        protocol: `${process.env.HTTPS === 'true' ? 'wss' : 'ws'}`,
      },
    },
  },
  // ssr: true, // for SPA with Nginx
  typescript: {
    strict: true,
    typeCheck: false,
    shim: false,
  },
  eslint: {
    checker: false,
    config: {
      stylistic: true,
    },
  },
  googleFonts: {
    families: {
      Ubuntu: [300, 400, 500, 700],
    },
  },
  image: {
    // dir: 'assets/img',
    domains: [
      `${process.env.HTTPS === 'true' ? 'https://' : 'http://'}${process.env.DOMAIN}`,
      'localhost',
    ],
    alias: {
      soptorg: `${process.env.HTTPS === 'true' ? 'https://' : 'http://'}${process.env.DOMAIN}`,
      // soptorg: `${process.env.HTTPS === 'true' ? 'https://' : 'http://localhost:8000'}`
    },
  },
  linkChecker: {
    enabled: false,
  },
  robots: {
    disallow: ['/account', '/admin', '/manager-dashboard'],
    groups: [
      {
        userAgent: ['Yandex'],
        cleanParam: ['etext', '_openstat', 'yclid', 'gclid', 'yclid', 'fbclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'],
      },
    ],
  },
  seo: {
    // clear default whitelist: ['page', 'sort', 'filter', 'search', 'q', 'query']
    canonicalQueryWhitelist: [],
    // fallbackTitle: false,
  },
  sitemap: {
    sitemaps: {
      products: {
        sources: [
          `${process.env.HTTPS === 'true' ? 'https://' : 'http://'}${process.env.DOMAIN}${process.env.API_PORT ? `:${process.env.API_PORT}` : ''}/api` + '/products/sitemap/',
        ],
        defaults: { priority: 0.5 },
      },
      categories: {
        sources: [
          `${process.env.HTTPS === 'true' ? 'https://' : 'http://'}${process.env.DOMAIN}${process.env.API_PORT ? `:${process.env.API_PORT}` : ''}/api` + '/categories/sitemap/',
        ],
        defaults: { priority: 0.7 },
      },
      pages: {
        includeAppSources: true,
        exclude: [
          '/account/**',
          '/manager-dashboard/**',
        ],
      },
    },
  },
  tailwindcss: {
    viewer: false,
  },
  vueuse: {
    ssrHandlers: true,
  },
})

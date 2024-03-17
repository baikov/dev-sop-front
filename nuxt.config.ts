// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  site: {
    url: 'https://soptorg.ru'
  },
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
        { rel: 'shortcut icon', href: '/favicon.ico?v=2' }
      ],
      meta: [
        { name: 'msapplication-TileColor', content: '#00a300' },
        { name: 'theme-color', content: '#ffffff' }
      ]
    }
  },
  runtimeConfig: {
    // apiSecret: '123',
    public: {
      siteUrl: `${process.env.HTTPS === 'true' ? 'https://' : 'http://'}${process.env.DOMAIN}`,
      apiUrl: `${process.env.HTTPS === 'true' ? 'https://' : 'http://'}${process.env.DOMAIN}${process.env.API_PORT ? `:${process.env.API_PORT}` : ''}/api`,
      siteName: process.env.SITE_NAME || 'Nuxt 3',
      language: 'ru-RU'
      // titleSeparator: '|',
    }
  },
  // ssr: true, // for SPA with Nginx
  typescript: {
    strict: true,
    typeCheck: false,
    shim: false
  },
  modules: [
    '@nuxtjs/eslint-module', // https://github.com/nuxt-modules/eslint
    '@nuxt/ui',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/sitemap', // https://nuxtseo.com/sitemap
    // 'nuxt-simple-sitemap', // https://nuxtseo.com/sitemap
    'nuxt-simple-robots', // https://github.com/harlan-zw/nuxt-simple-robots
    'nuxt-og-image', // https://github.com/harlan-zw/nuxt-og-image
    'nuxt-schema-org', // https://unhead-schema-org.harlanzw.com/integrations/nuxt/module
    '@pinia/nuxt',
    '@artmizu/yandex-metrika-nuxt'
    // 'nuxt-vitest',
    // https://sentry.nuxtjs.org/getting-started/setup
  ],
  vite: {
    server: {
      hmr: {
        protocol: `${process.env.HTTPS === 'true' ? 'wss' : 'ws'}`
      }
    }
  },
  ui: {
    global: true,
    icons: ['mdi', 'heroicons', 'tabler', 'icon-park-solid']
  },
  image: {
    // dir: 'assets/img',
    domains: [
      `${process.env.HTTPS === 'true' ? 'https://' : 'http://'}${process.env.DOMAIN}`,
      'localhost'
    ],
    alias: {
      soptorg: `${process.env.HTTPS === 'true' ? 'https://' : 'http://'}${process.env.DOMAIN}`
      // soptorg: `${process.env.HTTPS === 'true' ? 'https://' : 'http://localhost:8000'}`
    }
  },
  googleFonts: {
    families: {
      // Nunito: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      Ubuntu: [300, 400, 500, 700]
    }
  },
  yandexMetrika: {
    id: process.env.YANDEX_METRIKA_ID
  },
  vueuse: {
    ssrHandlers: true
  },
  robots: {
    // provide simple disallow rules for all robots `user-agent: *`
    disallow: ['/account', '/admin'],
    allow: '/admin/login'
  },
  eslint: {
    lintOnStart: false
  },
  tailwindcss: {
    viewer: false
  },
  sitemap: {
    sitemaps: {
      products: {
        sources: [
          `${process.env.HTTPS === 'true' ? 'https://' : 'http://'}${process.env.DOMAIN}${process.env.API_PORT ? `:${process.env.API_PORT}` : ''}/api` + '/products/sitemap/'
        ],
        defaults: { priority: 0.5 }
      },
      categories: {
        sources: [
          `${process.env.HTTPS === 'true' ? 'https://' : 'http://'}${process.env.DOMAIN}${process.env.API_PORT ? `:${process.env.API_PORT}` : ''}/api` + '/categories/sitemap/'
        ],
        defaults: { priority: 0.7 }
      },
      pages: {
        includeAppSources: true,
        exclude: [
          '/account/**'
        ]
      }
    }
  }
})

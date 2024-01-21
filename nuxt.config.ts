// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  site: {
    url: `${process.env.HTTPS === 'true' ? 'https://' : 'http://'}${process.env.DOMAIN}`
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
      Ubuntu: [100, 200, 300, 400, 500, 600, 700, 800, 900]
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
          `${process.env.HTTPS === 'true' ? 'https://' : 'http://'}${process.env.DOMAIN}${process.env.API_PORT ? `:${process.env.API_PORT}` : ''}/api` + '/products/sitemap'
        ],
        defaults: { priority: 0.5 }
      },
      categories: {
        sources: [
          `${process.env.HTTPS === 'true' ? 'https://' : 'http://'}${process.env.DOMAIN}${process.env.API_PORT ? `:${process.env.API_PORT}` : ''}/api` + '/categories/sitemap'
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

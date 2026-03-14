import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: [
    "@pinia/nuxt",
    "shadcn-nuxt",
    "@nuxtjs/google-fonts",
  ],

  googleFonts: {
    families: {
      Ubuntu: {
        wght: [300, 400, 500, 600, 700],
      },
    },
    display: 'swap',
    preload: true,
  },

  shadcn: {
    prefix: '',
    componentDir: '@/components/ui'
  },
  
  css: [
    "@fortawesome/fontawesome-free/css/all.css",
    "~/assets/css/tailwind.css"
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: "Calcifer.shop",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Premium single-product audio experience - Where Sound Meets Soul" },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      ],
      htmlAttrs: {
        class: 'dark',
        style: 'font-family: "Ubuntu", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;'
      }
    },
  },

  ssr: true,
  compatibilityDate: '2025-10-01',
  srcDir: 'app/',

  components: [
    { path: '~/components', pathPrefix: false },
  ],
})

import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: [
    "@pinia/nuxt",
    "shadcn-nuxt",
  ],

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
      title: "RH Business Club",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Premium e-commerce platform with curated products" },
      ],
      htmlAttrs: {
        class: 'dark'
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
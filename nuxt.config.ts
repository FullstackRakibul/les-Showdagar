import { defineNuxtConfig } from 'nuxt/config';


export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@storefront-ui/nuxt",
    "nuxt-lucide-icons",
    "@pinia/nuxt",
    "@ant-design-vue/nuxt",
  ],
  
  css: ["@fortawesome/fontawesome-free/css/all.css",'~/assets/css/main.css'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: "RH Business Club",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Premium e-commerce platform with curated products" },
      ],
    },
  },
  ssr: true,
  compatibilityDate: '2025-10-01',
  srcDir: 'app/',
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  components: [
    { path: '~/app/components', pathPrefix: false },
    { path: '~/components', pathPrefix: false },
    
  ],
  
  
})
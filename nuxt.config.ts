import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@storefront-ui/nuxt", "nuxt-lucide-icons", "@pinia/nuxt"],
  css: ["@fortawesome/fontawesome-free/css/all.css",'~/assets/css/main.css'],
  app: {
    head: {
      title: "Les Showdagar - Premium E-commerce",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Premium e-commerce platform with curated products" },
      ],
    },
  },
  srcDir: 'app/',
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
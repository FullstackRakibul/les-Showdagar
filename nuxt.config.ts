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
        class: ''
      }
    },
  },

  runtimeConfig: {
    public: {
      apiBase: import.meta.env.NUXT_PUBLIC_API_BASE || '/api',
    },
  },

  ssr: true,
  compatibilityDate: '2026-08-01',
  srcDir: 'app/',

  // `srcDir: 'app/'` makes Nitro look for `app/server/`, but the API handlers
  // live in `server/` at the repo root. Without this every /api/* route 404s.
  serverDir: 'server/',

  nitro: {
    routeRules: {
      '/video/**': { headers: { 'content-type': 'video/mp4' }, static: true },
    },
  },

  experimental: {
    // Vite's dependency scanner probes `#app-manifest` before Nuxt registers
    // that virtual module, logging a "Failed to resolve import" error on every
    // dev start. Nothing here uses the manifest (no useAppManifest, no route
    // rules, no prerendering), so turning it off removes the noise.
    appManifest: false,
  },

  components: [
    { path: '~/components', pathPrefix: false },
  ],
})
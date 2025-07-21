import { defineNuxtPlugin } from 'nuxt/app'
import { SfButton } from '@storefront-ui/vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('SfButton', SfButton)

})

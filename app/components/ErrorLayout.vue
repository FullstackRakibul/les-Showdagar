<template>
  <div
    class="flex flex-col items-center justify-center text-center py-24 px-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
    <img src="https://illustrations.popsy.co/gray/error.svg" alt="Error Illustration" class="w-64 h-auto mb-8" />
    <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">
      {{ title }}
    </h2>
    <p class="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
      {{ message }}
    </p>
    <NuxtLink to="/" class="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
      Back to Home
      </NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Something went wrong'
  },
  message: {
    type: String,
    default: 'An unexpected error occurred. Please try again later.'
  }
})
</script>
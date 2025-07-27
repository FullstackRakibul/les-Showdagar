<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 text-center">
    <h1 class="text-6xl font-bold text-primary mb-4">Oops!</h1>
    <p class="text-2xl text-gray-800 dark:text-gray-200 font-semibold mb-2">
      {{ error.statusCode === 404 ? '404 - Page Not Found' : 'Something went wrong' }}
    </p>
    <p class="text-gray-500 dark:text-gray-400 mb-6">
      {{ error.message || 'Sorry, an unexpected error has occurred.' }}
    </p>

    <NuxtLink to="/"
      class="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
      Go back home
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  error: {
    type: Object,
    required: true
  }
})
</script>
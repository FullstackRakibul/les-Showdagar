<template>
  <section class="w-full bg-black dark:bg-gray-900 transition-colors duration-200">
    <!-- Top Info Bar -->
    <div class="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4">
      <div class="max-w-7xl mx-auto flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <div class="flex items-center space-x-6">
          <a href="tel:+1234567890"
            class="flex items-center space-x-2 hover:text-gray-900 dark:hover:text-white transition-colors">
            <Phone class="w-4 h-4" />
            <span>+1 234 567 890</span>
          </a>
          <a href="mailto:support@rhbusinessclub.com"
            class="flex items-center space-x-2 hover:text-gray-900 dark:hover:text-white transition-colors">
            <Mail class="w-4 h-4" />
            <span>support@rhbusinessclub.com</span>
          </a>
        </div>
        <div class="hidden sm:flex items-center space-x-4">
          <span>EN</span>
          <span class="text-gray-300 dark:text-gray-600">|</span>
          <span>ID</span>
        </div>
      </div>
    </div>
  </section>
</template>
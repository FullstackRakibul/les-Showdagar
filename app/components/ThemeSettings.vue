<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md transition-colors duration-300">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Theme Settings
        </h1>
        <p class="text-gray-600 dark:text-gray-400 text-sm">
          Customize your experience
        </p>
      </div>
      <button @click="$emit('close')"
        class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
        <X class="w-5 h-5" />
      </button>
    </div>

    <!-- Color Swatches -->
    <div class="mb-8">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Primary Color
      </h2>
      <div class="flex justify-center space-x-4">
        <button v-for="color in themeColors" :key="color.name" @click="setActiveColor(color)" :class="[
          'w-12 h-12 rounded-full border-4 transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-opacity-50',
          activeColor.name === color.name
            ? 'border-gray-900 dark:border-white shadow-lg scale-110'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
        ]" :style="{ backgroundColor: color.value }" :aria-label="`Select ${color.name} theme`"
          :aria-pressed="activeColor.name === color.name" role="radio">
          <span class="sr-only">{{ color.name }} theme</span>
          <div v-if="activeColor.name === color.name"
            class="w-full h-full rounded-full flex items-center justify-center">
            <Check class="w-4 h-4 text-white drop-shadow-sm" />
          </div>
        </button>
      </div>
    </div>

    <!-- Dark Mode Toggle -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
            Dark Mode
          </h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Toggle dark theme
          </p>
        </div>
        <button @click="toggleDarkMode" :class="[
          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800',
          isDarkMode
            ? 'bg-primary focus:ring-primary'
            : 'bg-gray-300 dark:bg-gray-600 focus:ring-gray-300'
        ]" role="switch" :aria-checked="isDarkMode" aria-label="Toggle dark mode">
          <span :class="[
            'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200',
            isDarkMode ? 'translate-x-6' : 'translate-x-1'
          ]" />
        </button>
      </div>
    </div>

    <!-- Preview Section -->
    <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
      <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">
        Preview
      </h3>
      <div class="space-y-3">
        <!-- Primary Button Preview -->
        <button
          class="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
          Primary Button
        </button>

        <!-- Secondary Button Preview -->
        <button
          class="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
          Secondary Button
        </button>
      </div>
    </div>

    <!-- Theme Info -->
    <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div class="flex items-center justify-between text-sm">
        <span class="text-gray-600 dark:text-gray-400">Current Theme:</span>
        <div class="flex items-center space-x-2">
          <div class="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"
            :style="{ backgroundColor: activeColor.value }"></div>
          <span class="font-medium text-gray-900 dark:text-white capitalize">
            {{ activeColor.name }} {{ isDarkMode ? '(Dark)' : '(Light)' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Check, X } from 'lucide-vue-next'

defineEmits(['close'])

// Theme colors configuration
const themeColors = [
  { name: 'orange', value: '#f97316' },
  { name: 'blue', value: '#3b82f6' },
  { name: 'green', value: '#10b981' },
  { name: 'pink', value: '#ec4899' },
  { name: 'purple', value: '#8b5cf6' }
]

// Reactive state
const activeColor = ref(themeColors[1]) // Default to blue
const isDarkMode = ref(false)

// Set active color and update CSS variables
const setActiveColor = (color) => {
  activeColor.value = color
  updateCSSVariables()
  saveToLocalStorage()
}

// Toggle dark mode
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  updateDarkMode()
  saveToLocalStorage()
}

// Update CSS variables for theme colors
const updateCSSVariables = () => {
  const root = document.documentElement
  const color = activeColor.value.value

  // Convert hex to RGB for opacity variations
  const hex = color.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)

  root.style.setProperty('--color-primary', color)
  root.style.setProperty('--color-primary-rgb', `${r}, ${g}, ${b}`)
  root.style.setProperty('--color-primary-dark', darkenColor(color, 10))
}

// Darken color for hover states
const darkenColor = (color, percent) => {
  const hex = color.replace('#', '')
  const r = Math.max(0, parseInt(hex.substr(0, 2), 16) - Math.round(255 * percent / 100))
  const g = Math.max(0, parseInt(hex.substr(2, 2), 16) - Math.round(255 * percent / 100))
  const b = Math.max(0, parseInt(hex.substr(4, 2), 16) - Math.round(255 * percent / 100))

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

// Update dark mode
const updateDarkMode = () => {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// Save settings to localStorage
const saveToLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const settings = {
      activeColor: activeColor.value,
      isDarkMode: isDarkMode.value
    }
    localStorage.setItem('themeSettings', JSON.stringify(settings))
  }
}

// Load settings from localStorage
const loadFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('themeSettings')
    if (saved) {
      try {
        const settings = JSON.parse(saved)
        if (settings.activeColor) {
          activeColor.value = settings.activeColor
        }
        if (typeof settings.isDarkMode === 'boolean') {
          isDarkMode.value = settings.isDarkMode
        }
      } catch (error) {
        console.warn('Failed to load theme settings from localStorage:', error)
      }
    }
  }
}

// Initialize theme on mount
onMounted(() => {
  loadFromLocalStorage()
  updateCSSVariables()
  updateDarkMode()
})
</script>

<style>
/* CSS Variables for theme colors */
:root {
  --color-primary: #3b82f6;
  --color-primary-rgb: 59, 130, 246;
  --color-primary-dark: #2563eb;
}

/* Tailwind CSS custom utilities */
.bg-primary {
  background-color: var(--color-primary);
}

.bg-primary-dark {
  background-color: var(--color-primary-dark);
}

.text-primary {
  color: var(--color-primary);
}

.border-primary {
  border-color: var(--color-primary);
}

.ring-primary {
  --tw-ring-color: var(--color-primary);
}

.focus\:ring-primary:focus {
  --tw-ring-color: var(--color-primary);
}

/* Hover states */
.hover\:bg-primary:hover {
  background-color: var(--color-primary);
}

.hover\:bg-primary-dark:hover {
  background-color: var(--color-primary-dark);
}

/* Smooth transitions for theme changes */
* {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style>
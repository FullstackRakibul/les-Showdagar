<template>
  <div class="max-w-4xl mx-auto space-y-6 p-4 sm:p-6">
    <!-- Page Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
      <p class="mt-2 text-gray-600 dark:text-gray-400">Manage your account preferences and settings</p>
    </div>

    <!-- Settings Sections -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Settings Navigation -->
      <div class="lg:col-span-1">
        <nav class="space-y-1">
          <button v-for="section in sections" :key="section.key" @click="activeSection = section.key" :class="[
            'w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors',
            activeSection === section.key
              ? 'bg-primary text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          ]">
            <component :is="section.icon" class="w-5 h-5" />
            <span class="font-medium">{{ section.label }}</span>
          </button>
        </nav>
      </div>

      <!-- Settings Content -->
      <div class="lg:col-span-3">
        <!-- Profile Settings -->
        <div v-if="activeSection === 'profile'"
          class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Profile Information</h2>

          <div class="space-y-6">
            <div class="flex items-center space-x-6">
              <div
                class="w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white font-bold text-2xl">
                JD
              </div>
              <div>
                <button
                  class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium">
                  Change Photo
                </button>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">JPG, GIF or PNG. 1MB max.</p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                <input v-model="profile.firstName" type="text"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="John" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                <input v-model="profile.lastName" type="text"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Doe" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input v-model="profile.email" type="email"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="john.doe@example.com" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                <input v-model="profile.phone" type="tel"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="+1 (555) 123-4567" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
              <textarea v-model="profile.bio" rows="4"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Tell us about yourself..."></textarea>
            </div>

            <div class="flex justify-end">
              <button
                class="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors font-semibold">
                Save Changes
              </button>
            </div>
          </div>
        </div>

        <!-- Account Settings -->
        <div v-if="activeSection === 'account'"
          class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Account Settings</h2>

          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Password</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current
                    Password</label>
                  <input type="password"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                  <input type="password"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm New
                    Password</label>
                  <input type="password"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
                <button
                  class="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors font-semibold">
                  Update Password
                </button>
              </div>
            </div>

            <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Two-Factor Authentication</h3>
              <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">Enable 2FA</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
                </div>
                <button
                  class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium">
                  Enable
                </button>
              </div>
            </div>

            <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 class="text-lg font-medium text-red-600 mb-4">Danger Zone</h3>
              <div class="p-4 border border-red-200 dark:border-red-800 rounded-xl">
                <h4 class="font-medium text-gray-900 dark:text-white mb-2">Delete Account</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <button
                  class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Notifications Settings -->
        <div v-if="activeSection === 'notifications'"
          class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Notification Preferences</h2>

          <div class="space-y-6">
            <div v-for="category in notificationCategories" :key="category.key">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">{{ category.title }}</h3>
              <div class="space-y-4">
                <div v-for="setting in category.settings" :key="setting.key"
                  class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">{{ setting.title }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ setting.description }}</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input v-model="setting.enabled" type="checkbox" class="sr-only peer" />
                    <div
                      class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary">
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Privacy Settings -->
        <div v-if="activeSection === 'privacy'"
          class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Privacy Settings</h2>

          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Data & Privacy</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">Profile Visibility</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Control who can see your profile information</p>
                  </div>
                  <select
                    class="px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg text-gray-900 dark:text-white">
                    <option>Public</option>
                    <option>Friends Only</option>
                    <option>Private</option>
                  </select>
                </div>

                <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">Activity Status</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Show when you're active on the platform</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input v-model="privacy.showActivity" type="checkbox" class="sr-only peer" />
                    <div
                      class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary">
                    </div>
                  </label>
                </div>

                <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">Data Collection</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Allow us to collect analytics data to improve
                      your experience</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input v-model="privacy.dataCollection" type="checkbox" class="sr-only peer" />
                    <div
                      class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary">
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Data Export</h3>
              <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Download a copy of your data including your profile, orders, and activity history.
                </p>
                <button
                  class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium">
                  Request Data Export
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Appearance Settings -->
        <div v-if="activeSection === 'appearance'"
          class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Appearance & Theme</h2>

          <div class="space-y-8">
            <!-- Theme Colors -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Primary Color</h3>
              <div class="grid grid-cols-3 gap-3">
                <button v-for="color in themeColors" :key="color.name" @click="setActiveColor(color)" :class="[
                  'w-full h-12 rounded-xl border-2 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50',
                  activeColor.name === color.name
                    ? 'border-gray-900 dark:border-white shadow-lg scale-105'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                ]" :style="{ backgroundColor: color.value }" :aria-label="`Select ${color.name} theme`">
                  <div v-if="activeColor.name === color.name"
                    class="w-full h-full rounded-lg flex items-center justify-center">
                    <Check class="w-5 h-5 text-white drop-shadow-sm" />
                  </div>
                </button>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                Current: {{ activeColor.name.charAt(0).toUpperCase() + activeColor.name.slice(1) }}
              </p>
            </div>

            <!-- Dark Mode Toggle -->
            <div>
              <div class="flex items-center justify-between mb-4">
                <div>
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Dark Mode</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Toggle dark theme</p>
                </div>
                <button @click="toggleDarkMode" :class="[
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800',
                  isDarkMode
                    ? 'bg-primary focus:ring-primary'
                    : 'bg-gray-300 dark:bg-gray-600 focus:ring-gray-300'
                ]">
                  <span :class="[
                    'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200',
                    isDarkMode ? 'translate-x-6' : 'translate-x-1'
                  ]" />
                </button>
              </div>
            </div>

            <!-- Font Size -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Font Size</h3>
              <div class="space-y-3">
                <div v-for="size in fontSizes" :key="size.key"
                  class="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  @click="setFontSize(size.key)">
                  <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 rounded-full bg-primary"
                      :class="{ 'opacity-100': selectedFontSize === size.key, 'opacity-30': selectedFontSize !== size.key }">
                    </div>
                    <span class="font-medium text-gray-900 dark:text-white">{{ size.name }}</span>
                  </div>
                  <span :class="size.class" class="text-gray-600 dark:text-gray-400">Aa</span>
                </div>
              </div>
            </div>

            <!-- Layout Density -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Layout Density</h3>
              <div class="grid grid-cols-2 gap-3">
                <button v-for="density in layoutDensities" :key="density.key" @click="setLayoutDensity(density.key)"
                  :class="[
                    'p-4 border-2 rounded-xl transition-all duration-200 text-center',
                    selectedDensity === density.key
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                  ]">
                  <component :is="density.icon" class="w-6 h-6 mx-auto mb-2" />
                  <p class="text-sm font-medium">{{ density.name }}</p>
                </button>
              </div>
            </div>

            <!-- Language -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Language</h3>
              <select v-model="selectedLanguage"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="it">Italiano</option>
              </select>
            </div>

            <!-- Currency -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Currency</h3>
              <select v-model="selectedCurrency"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="CAD">CAD - Canadian Dollar</option>
                <option value="AUD">AUD - Australian Dollar</option>
              </select>
            </div>

            <!-- Quick Actions -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div class="space-y-3">
                <button @click="resetToDefault"
                  class="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl transition-colors font-medium">
                  <RotateCcw class="w-4 h-4" />
                  <span>Reset to Default</span>
                </button>

                <button @click="exportTheme"
                  class="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-primary hover:bg-primary-dark text-white rounded-xl transition-colors font-medium">
                  <Download class="w-4 h-4" />
                  <span>Export Theme</span>
                </button>
              </div>
            </div>

            <div class="flex justify-end">
              <button
                class="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors font-semibold">
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { User, Shield, Bell, Lock, Palette, Check, RotateCcw, Download, Maximize2, Minimize2 } from 'lucide-vue-next'

const activeSection = ref('profile')
const selectedTheme = ref('light')
const selectedLanguage = ref('en')
const selectedCurrency = ref('USD')

const sections = [
  { key: 'profile', label: 'Profile', icon: User },
  { key: 'account', label: 'Account', icon: Shield },
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'privacy', label: 'Privacy', icon: Lock },
  { key: 'appearance', label: 'Appearance', icon: Palette }
]

const profile = ref({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  bio: 'Premium e-commerce enthusiast and tech lover.'
})

const privacy = ref({
  showActivity: true,
  dataCollection: false
})

const themes = [
  {
    key: 'light',
    name: 'Light',
    preview: 'bg-gradient-to-br from-white to-gray-100'
  },
  {
    key: 'dark',
    name: 'Dark',
    preview: 'bg-gradient-to-br from-gray-800 to-gray-900'
  },
  {
    key: 'auto',
    name: 'Auto',
    preview: 'bg-gradient-to-br from-blue-400 to-purple-500'
  }
]

// Theme configuration
const themeColors = [
  { name: 'blue', value: '#3b82f6' },
  { name: 'purple', value: '#8b5cf6' },
  { name: 'green', value: '#10b981' },
  { name: 'orange', value: '#f97316' },
  { name: 'pink', value: '#ec4899' },
  { name: 'red', value: '#ef4444' }
]

const fontSizes = [
  { key: 'small', name: 'Small', class: 'text-sm' },
  { key: 'medium', name: 'Medium', class: 'text-base' },
  { key: 'large', name: 'Large', class: 'text-lg' }
]

const layoutDensities = [
  { key: 'compact', name: 'Compact', icon: Minimize2 },
  { key: 'comfortable', name: 'Comfortable', icon: Maximize2 }
]

// Theme state
const activeColor = ref(themeColors[3]) // Default to orange
const isDarkMode = ref(false)
const selectedFontSize = ref('medium')
const selectedDensity = ref('comfortable')

// Theme functions
const setActiveColor = (color) => {
  activeColor.value = color
  updateCSSVariables()
  saveToLocalStorage()
}

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  updateDarkMode()
  saveToLocalStorage()
}

const setFontSize = (size) => {
  selectedFontSize.value = size
  updateFontSize()
  saveToLocalStorage()
}

const setLayoutDensity = (density) => {
  selectedDensity.value = density
  updateLayoutDensity()
  saveToLocalStorage()
}

const updateCSSVariables = () => {
  const root = document.documentElement
  const color = activeColor.value.value

  const hex = color.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)

  root.style.setProperty('--color-primary', color)
  root.style.setProperty('--color-primary-rgb', `${r}, ${g}, ${b}`)
  root.style.setProperty('--color-primary-dark', darkenColor(color, 10))
}

const darkenColor = (color, percent) => {
  const hex = color.replace('#', '')
  const r = Math.max(0, parseInt(hex.substr(0, 2), 16) - Math.round(255 * percent / 100))
  const g = Math.max(0, parseInt(hex.substr(2, 2), 16) - Math.round(255 * percent / 100))
  const b = Math.max(0, parseInt(hex.substr(4, 2), 16) - Math.round(255 * percent / 100))

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

const updateDarkMode = () => {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const updateFontSize = () => {
  const root = document.documentElement
  const sizes = {
    small: '14px',
    medium: '16px',
    large: '18px'
  }
  root.style.setProperty('--font-size-base', sizes[selectedFontSize.value])
}

const updateLayoutDensity = () => {
  const root = document.documentElement
  const densities = {
    compact: '0.75',
    comfortable: '1'
  }
  root.style.setProperty('--layout-density', densities[selectedDensity.value])
}

const resetToDefault = () => {
  activeColor.value = themeColors[3]
  isDarkMode.value = false
  selectedFontSize.value = 'medium'
  selectedDensity.value = 'comfortable'

  updateCSSVariables()
  updateDarkMode()
  updateFontSize()
  updateLayoutDensity()
  saveToLocalStorage()
}

const exportTheme = () => {
  const themeConfig = {
    color: activeColor.value,
    darkMode: isDarkMode.value,
    fontSize: selectedFontSize.value,
    density: selectedDensity.value
  }

  const dataStr = JSON.stringify(themeConfig, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'les-showdagar-theme.json'
  link.click()
  URL.revokeObjectURL(url)
}

const saveToLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const settings = {
      activeColor: activeColor.value,
      isDarkMode: isDarkMode.value,
      fontSize: selectedFontSize.value,
      density: selectedDensity.value
    }
    localStorage.setItem('themeSettings', JSON.stringify(settings))
  }
}

const loadFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('themeSettings')
    if (saved) {
      try {
        const settings = JSON.parse(saved)
        if (settings.activeColor) activeColor.value = settings.activeColor
        if (typeof settings.isDarkMode === 'boolean') isDarkMode.value = settings.isDarkMode
        if (settings.fontSize) selectedFontSize.value = settings.fontSize
        if (settings.density) selectedDensity.value = settings.density
      } catch (error) {
        console.warn('Failed to load theme settings from localStorage:', error)
      }
    }
  }
}

const notificationCategories = [
  {
    key: 'orders',
    title: 'Orders & Shipping',
    settings: [
      {
        key: 'order_updates',
        title: 'Order Updates',
        description: 'Get notified about order status changes',
        enabled: true
      },
      {
        key: 'shipping_updates',
        title: 'Shipping Updates',
        description: 'Receive shipping and delivery notifications',
        enabled: true
      }
    ]
  },
  {
    key: 'marketing',
    title: 'Marketing & Promotions',
    settings: [
      {
        key: 'promotions',
        title: 'Promotional Emails',
        description: 'Receive emails about sales and special offers',
        enabled: false
      },
      {
        key: 'product_recommendations',
        title: 'Product Recommendations',
        description: 'Get personalized product suggestions',
        enabled: true
      }
    ]
  },
  {
    key: 'account',
    title: 'Account Activity',
    settings: [
      {
        key: 'security_alerts',
        title: 'Security Alerts',
        description: 'Important security and login notifications',
        enabled: true
      },
      {
        key: 'account_updates',
        title: 'Account Updates',
        description: 'Changes to your account settings',
        enabled: true
      }
    ]
  }
]

onMounted(() => {
  loadFromLocalStorage()
  updateCSSVariables()
  updateDarkMode()
  updateFontSize()
  updateLayoutDensity()
})
</script>
<template>
  <div class="relative min-h-screen bg-background overflow-hidden">
    <!-- Background orbs -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div class="orb orb--a" />
      <div class="orb orb--b" />
      <div class="orb orb--c" />
    </div>

    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      <!-- Page Header -->
      <header class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <p class="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground mb-2">
            Preferences
          </p>
          <h1 class="text-2xl sm:text-3xl font-bold text-foreground">Settings</h1>
          <p class="mt-1.5 text-sm text-muted-foreground">
            Manage your account, notifications, privacy and appearance.
          </p>
        </div>

        <!-- Current theme status pill -->
        <div
          class="inline-flex items-center gap-2 self-start sm:self-end px-3 py-1.5 rounded-full border border-border/60 bg-card/80 backdrop-blur-sm text-xs">
          <span class="w-2.5 h-2.5 rounded-full border border-border" :style="{ backgroundColor: activeClub.color }" />
          <span class="font-medium text-foreground">
            {{ isDark ? 'Dark' : 'Light' }} · {{ activeClub.label }}
          </span>
        </div>
      </header>

      <!-- Layout: sidebar (lg) / scrollable tabs (mobile) -->
      <div class="flex flex-col lg:grid lg:grid-cols-4 gap-6">

        <!-- Navigation -->
        <nav class="lg:col-span-1">
          <!-- Mobile: horizontal scrollable row -->
          <div class="flex lg:hidden gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1 snap-x snap-mandatory">
            <button v-for="section in sections" :key="section.key" @click="activeSection = section.key" :class="[
              'snap-start flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border whitespace-nowrap transition-colors',
              activeSection === section.key
                ? 'bg-primary text-primary-foreground border-transparent'
                : 'bg-card/70 text-muted-foreground border-border/60 hover:text-foreground hover:bg-card'
            ]">
              <component :is="section.icon" class="w-4 h-4" />
              {{ section.label }}
            </button>
          </div>

          <!-- Desktop: vertical list -->
          <div
            class="hidden lg:flex flex-col gap-1 bg-card/80 backdrop-blur-sm border border-border/60 rounded-2xl p-2 sticky top-6">
            <button v-for="section in sections" :key="section.key" @click="activeSection = section.key" :class="[
              'w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-sm font-medium transition-colors',
              activeSection === section.key
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            ]">
              <component :is="section.icon" class="w-4 h-4" />
              {{ section.label }}
            </button>
          </div>
        </nav>

        <!-- Content -->
        <div class="lg:col-span-3 space-y-6">

          <!-- ============ PROFILE ============ -->
          <section v-if="activeSection === 'profile'" class="panel">
            <header class="panel__header">
              <h2 class="panel__title">Profile Information</h2>
              <p class="panel__subtitle">Update how you appear across the platform.</p>
            </header>

            <div class="space-y-6">
              <div class="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <div
                  class="w-20 h-20 rounded-full flex items-center justify-center bg-primary text-primary-foreground font-bold text-2xl shrink-0">
                  {{ profileInitials }}
                </div>
                <div>
                  <button class="btn-primary">Change Photo</button>
                  <p class="text-xs text-muted-foreground mt-2">JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label class="field-label">First Name</label>
                  <input v-model="profileDraft.firstName" type="text" class="field" placeholder="John" />
                </div>
                <div>
                  <label class="field-label">Last Name</label>
                  <input v-model="profileDraft.lastName" type="text" class="field" placeholder="Doe" />
                </div>
                <div>
                  <label class="field-label">Email</label>
                  <input v-model="profileDraft.email" type="email" class="field" placeholder="john.doe@example.com" />
                </div>
                <div>
                  <label class="field-label">Phone</label>
                  <input v-model="profileDraft.phone" type="tel" class="field" placeholder="+1 (555) 123-4567" />
                </div>
              </div>

              <div>
                <label class="field-label">Bio</label>
                <textarea v-model="profileDraft.bio" rows="4" class="field" placeholder="Tell us about yourself..." />
              </div>

              <div class="panel__actions">
                <button class="btn-ghost" @click="resetProfileDraft">Cancel</button>
                <button class="btn-primary" @click="saveProfile">Save Changes</button>
              </div>
            </div>
          </section>

          <!-- ============ ACCOUNT ============ -->
          <section v-else-if="activeSection === 'account'" class="panel">
            <header class="panel__header">
              <h2 class="panel__title">Account Settings</h2>
              <p class="panel__subtitle">Security, authentication, and account control.</p>
            </header>

            <div class="space-y-8">
              <div>
                <h3 class="subsection-title">Password</h3>
                <div class="space-y-4">
                  <div>
                    <label class="field-label">Current Password</label>
                    <input type="password" class="field" autocomplete="current-password" />
                  </div>
                  <div>
                    <label class="field-label">New Password</label>
                    <input type="password" class="field" autocomplete="new-password" />
                  </div>
                  <div>
                    <label class="field-label">Confirm New Password</label>
                    <input type="password" class="field" autocomplete="new-password" />
                  </div>
                  <button class="btn-primary">Update Password</button>
                </div>
              </div>

              <div class="divider" />

              <div>
                <h3 class="subsection-title">Two-Factor Authentication</h3>
                <div class="row-card">
                  <div>
                    <p class="row-card__title">Enable 2FA</p>
                    <p class="row-card__desc">Add an extra layer of security to your account.</p>
                  </div>
                  <button class="btn-secondary">Enable</button>
                </div>
              </div>

              <div class="divider" />

              <div>
                <h3 class="subsection-title text-destructive">Danger Zone</h3>
                <div class="rounded-xl border border-destructive/40 bg-destructive/5 p-4 sm:p-5">
                  <h4 class="font-medium text-foreground mb-1">Delete Account</h4>
                  <p class="text-sm text-muted-foreground mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <button
                    class="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground font-medium text-sm hover:opacity-90 transition-opacity">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </section>

          <!-- ============ NOTIFICATIONS ============ -->
          <section v-else-if="activeSection === 'notifications'" class="panel">
            <header class="panel__header">
              <h2 class="panel__title">Notification Preferences</h2>
              <p class="panel__subtitle">Choose what we contact you about.</p>
            </header>

            <div class="space-y-7">
              <div v-for="cat in notificationCategories" :key="cat.key">
                <h3 class="subsection-title">{{ cat.title }}</h3>
                <div class="space-y-3">
                  <div v-for="item in cat.items" :key="item.key" class="row-card">
                    <div>
                      <p class="row-card__title">{{ item.title }}</p>
                      <p class="row-card__desc">{{ item.description }}</p>
                    </div>
                    <label class="switch">
                      <input type="checkbox" :checked="notificationsDraft[item.key]"
                        @change="notificationsDraft[item.key] = ($event.target as HTMLInputElement).checked"
                        class="sr-only peer" />
                      <span class="switch__track" />
                    </label>
                  </div>
                </div>
              </div>

              <div class="panel__actions">
                <button class="btn-ghost" @click="resetNotificationsDraft">Cancel</button>
                <button class="btn-primary" @click="saveNotifications">Save Changes</button>
              </div>
            </div>
          </section>

          <!-- ============ PRIVACY ============ -->
          <section v-else-if="activeSection === 'privacy'" class="panel">
            <header class="panel__header">
              <h2 class="panel__title">Privacy Settings</h2>
              <p class="panel__subtitle">Control your visibility and data preferences.</p>
            </header>

            <div class="space-y-6">
              <div class="row-card">
                <div>
                  <p class="row-card__title">Profile Visibility</p>
                  <p class="row-card__desc">Control who can see your profile information.</p>
                </div>
                <select v-model="privacyDraft.profileVisibility" class="field field--compact w-full sm:w-44">
                  <option value="public">Public</option>
                  <option value="friends">Friends Only</option>
                  <option value="private">Private</option>
                </select>
              </div>

              <div class="row-card">
                <div>
                  <p class="row-card__title">Activity Status</p>
                  <p class="row-card__desc">Show when you're active on the platform.</p>
                </div>
                <label class="switch">
                  <input v-model="privacyDraft.showActivity" type="checkbox" class="sr-only peer" />
                  <span class="switch__track" />
                </label>
              </div>

              <div class="row-card">
                <div>
                  <p class="row-card__title">Data Collection</p>
                  <p class="row-card__desc">Allow analytics to improve your experience.</p>
                </div>
                <label class="switch">
                  <input v-model="privacyDraft.dataCollection" type="checkbox" class="sr-only peer" />
                  <span class="switch__track" />
                </label>
              </div>

              <div class="divider" />

              <div>
                <h3 class="subsection-title">Data Export</h3>
                <div class="rounded-xl border border-border/60 bg-muted/40 p-4 sm:p-5">
                  <p class="text-sm text-muted-foreground mb-4">
                    Download a copy of your data including profile, orders, and activity history.
                  </p>
                  <button class="btn-secondary">Request Data Export</button>
                </div>
              </div>

              <div class="panel__actions">
                <button class="btn-ghost" @click="resetPrivacyDraft">Cancel</button>
                <button class="btn-primary" @click="savePrivacy">Save Changes</button>
              </div>
            </div>
          </section>

          <!-- ============ APPEARANCE ============ -->
          <section v-else-if="activeSection === 'appearance'" class="panel">
            <header class="panel__header">
              <h2 class="panel__title">Appearance &amp; Region</h2>
              <p class="panel__subtitle">
                Theme is shared across the app — managed by the global theme system.
              </p>
            </header>

            <div class="space-y-8">
              <!-- Theme mode -->
              <div>
                <h3 class="subsection-title">Mode</h3>
                <div class="grid grid-cols-2 gap-3 max-w-md">
                  <button @click="setDark(false)" :class="[
                    'flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-medium border transition-colors',
                    !isDark
                      ? 'bg-primary text-primary-foreground border-transparent'
                      : 'bg-muted text-muted-foreground border-border hover:bg-secondary hover:text-foreground'
                  ]">
                    <Sun class="w-4 h-4" /> Light
                  </button>
                  <button @click="setDark(true)" :class="[
                    'flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-medium border transition-colors',
                    isDark
                      ? 'bg-primary text-primary-foreground border-transparent'
                      : 'bg-muted text-muted-foreground border-border hover:bg-secondary hover:text-foreground'
                  ]">
                    <Moon class="w-4 h-4" /> Dark
                  </button>
                </div>
              </div>

              <!-- Accent club -->
              <div>
                <h3 class="subsection-title">Accent Club</h3>
                <div class="grid grid-cols-3 gap-3 max-w-md">
                  <button v-for="club in clubs" :key="club.hue" @click="setAccent(club.hue)" :title="club.label"
                    :style="{ backgroundColor: club.color }" :class="[
                      'h-12 rounded-xl border-2 transition-all duration-150 flex items-center justify-center',
                      accentHue === club.hue
                        ? 'border-foreground shadow-md scale-105'
                        : 'border-transparent hover:scale-105'
                    ]">
                    <Check v-if="accentHue === club.hue" class="w-4 h-4 text-white drop-shadow" />
                  </button>
                </div>
                <div class="grid grid-cols-3 gap-3 max-w-md mt-2">
                  <span v-for="club in clubs" :key="club.hue" class="text-center text-[11px] text-muted-foreground">
                    {{ club.label }}
                  </span>
                </div>
              </div>

              <div class="divider" />

              <!-- Region -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label class="field-label">Language</label>
                  <select v-model="appDraft.language" class="field">
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="it">Italiano</option>
                  </select>
                </div>
                <div>
                  <label class="field-label">Currency</label>
                  <select v-model="appDraft.currency" class="field">
                    <option value="USD">USD — US Dollar</option>
                    <option value="EUR">EUR — Euro</option>
                    <option value="GBP">GBP — British Pound</option>
                    <option value="CAD">CAD — Canadian Dollar</option>
                    <option value="AUD">AUD — Australian Dollar</option>
                  </select>
                </div>
              </div>

              <div class="panel__actions">
                <button class="btn-ghost" @click="resetAppDraft">Cancel</button>
                <button class="btn-primary" @click="saveApp">Save Changes</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { User, Shield, Bell, Lock, Palette, Check, Sun, Moon } from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'
import {
  useSettingsStore,
  type NotificationSettings,
  type PrivacySettings,
  type UserProfile,
  type AppSettings
} from '@/stores/settings'

const settings = useSettingsStore()
const { isDark, accentHue, setDark, setAccent, load: loadTheme } = useTheme()

type SectionKey = 'profile' | 'account' | 'notifications' | 'privacy' | 'appearance'
const activeSection = ref<SectionKey>('profile')

const sections: { key: SectionKey; label: string; icon: any }[] = [
  { key: 'profile', label: 'Profile', icon: User },
  { key: 'account', label: 'Account', icon: Shield },
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'privacy', label: 'Privacy', icon: Lock },
  { key: 'appearance', label: 'Appearance', icon: Palette }
]

const clubs = [
  { label: 'Quantum', hue: 220, color: 'oklch(0.55 0.18 220)' },
  { label: 'Elegance', hue: 300, color: 'oklch(0.55 0.22 300)' },
  { label: 'NextStop', hue: 160, color: 'oklch(0.55 0.20 160)' }
]
const activeClub = computed(() => clubs.find(c => c.hue === accentHue.value) ?? clubs[0]!)

const profileDraft = reactive<UserProfile>({ ...settings.profile })
const notificationsDraft = reactive<NotificationSettings>({ ...settings.notifications })
const privacyDraft = reactive<PrivacySettings>({ ...settings.privacy })
const appDraft = reactive<AppSettings>({ ...settings.app })

function syncDraftsFromStore() {
  Object.assign(profileDraft, settings.profile)
  Object.assign(notificationsDraft, settings.notifications)
  Object.assign(privacyDraft, settings.privacy)
  Object.assign(appDraft, settings.app)
}

const profileInitials = computed(() => {
  const f = profileDraft.firstName?.[0] ?? ''
  const l = profileDraft.lastName?.[0] ?? ''
  return (f + l).toUpperCase() || 'U'
})

const notificationCategories: {
  key: string
  title: string
  items: { key: keyof NotificationSettings; title: string; description: string }[]
}[] = [
    {
      key: 'orders',
      title: 'Orders & Shipping',
      items: [
        { key: 'orderUpdates', title: 'Order Updates', description: 'Get notified about order status changes.' },
        { key: 'shippingUpdates', title: 'Shipping Updates', description: 'Receive shipping and delivery notifications.' }
      ]
    },
    {
      key: 'marketing',
      title: 'Marketing & Promotions',
      items: [
        { key: 'promotions', title: 'Promotional Emails', description: 'Receive emails about sales and special offers.' },
        { key: 'productRecommendations', title: 'Product Recommendations', description: 'Get personalized product suggestions.' }
      ]
    },
    {
      key: 'account',
      title: 'Account Activity',
      items: [
        { key: 'securityAlerts', title: 'Security Alerts', description: 'Important security and login notifications.' },
        { key: 'accountUpdates', title: 'Account Updates', description: 'Changes to your account settings.' }
      ]
    }
  ]

function saveProfile() {
  settings.updateProfile(profileDraft)
  settings.saveToLocalStorage()
}
function saveNotifications() {
  settings.updateNotifications(notificationsDraft)
  settings.saveToLocalStorage()
}
function savePrivacy() {
  settings.updatePrivacy(privacyDraft)
  settings.saveToLocalStorage()
}
function saveApp() {
  settings.updateApp(appDraft)
  settings.saveToLocalStorage()
}

function resetProfileDraft() { Object.assign(profileDraft, settings.profile) }
function resetNotificationsDraft() { Object.assign(notificationsDraft, settings.notifications) }
function resetPrivacyDraft() { Object.assign(privacyDraft, settings.privacy) }
function resetAppDraft() { Object.assign(appDraft, settings.app) }

onMounted(() => {
  settings.loadFromLocalStorage()
  syncDraftsFromStore()
  loadTheme()
})
</script>

<style scoped>
.panel {
  position: relative;
  background: color-mix(in oklch, var(--card) 80%, transparent);
  backdrop-filter: blur(8px);
  border: 1px solid color-mix(in oklch, var(--border) 60%, transparent);
  border-radius: 1.25rem;
  padding: 1.25rem;
}

@media (min-width: 640px) {
  .panel {
    padding: 1.75rem;
  }
}

.panel__header {
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid color-mix(in oklch, var(--border) 50%, transparent);
}

.panel__title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--foreground);
  letter-spacing: -0.01em;
}

.panel__subtitle {
  margin-top: 0.25rem;
  font-size: 0.8125rem;
  color: var(--muted-foreground);
}

.panel__actions {
  display: flex;
  flex-direction: column-reverse;
  gap: 0.5rem;
  padding-top: 0.75rem;
}

@media (min-width: 640px) {
  .panel__actions {
    flex-direction: row;
    justify-content: flex-end;
    gap: 0.75rem;
  }
}

.subsection-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--foreground);
  margin-bottom: 0.875rem;
}

.divider {
  height: 1px;
  background: color-mix(in oklch, var(--border) 60%, transparent);
}

.field-label {
  display: block;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--foreground);
  margin-bottom: 0.5rem;
}

.field {
  width: 100%;
  padding: 0.75rem 0.875rem;
  background: var(--background);
  color: var(--foreground);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.field::placeholder {
  color: var(--muted-foreground);
}

.field:focus {
  border-color: var(--ring);
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--ring) 18%, transparent);
}

.field--compact {
  padding: 0.5rem 0.75rem;
  border-radius: 0.625rem;
}

textarea.field {
  resize: vertical;
  line-height: 1.55;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem 1.25rem;
  background: var(--primary);
  color: var(--primary-foreground);
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.875rem;
  transition: filter 0.2s ease, transform 0.15s ease;
}

.btn-primary:hover {
  filter: brightness(1.05);
}

.btn-primary:active {
  transform: translateY(1px);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background: var(--secondary);
  color: var(--secondary-foreground);
  border: 1px solid var(--border);
  border-radius: 0.625rem;
  font-weight: 500;
  font-size: 0.875rem;
  transition: background 0.2s ease;
}

.btn-secondary:hover {
  background: var(--muted);
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem 1.25rem;
  color: var(--muted-foreground);
  border-radius: 0.75rem;
  font-weight: 500;
  font-size: 0.875rem;
  transition: color 0.2s ease, background 0.2s ease;
}

.btn-ghost:hover {
  color: var(--foreground);
  background: var(--muted);
}

.row-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  background: color-mix(in oklch, var(--muted) 60%, transparent);
  border: 1px solid color-mix(in oklch, var(--border) 50%, transparent);
  border-radius: 0.875rem;
}

@media (min-width: 640px) {
  .row-card {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }
}

.row-card__title {
  font-weight: 500;
  color: var(--foreground);
  font-size: 0.9375rem;
}

.row-card__desc {
  font-size: 0.8125rem;
  color: var(--muted-foreground);
  margin-top: 0.125rem;
}

.switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  flex-shrink: 0;
}

.switch__track {
  width: 2.75rem;
  height: 1.5rem;
  background: var(--muted);
  border: 1px solid var(--border);
  border-radius: 9999px;
  transition: background 0.2s ease;
  position: relative;
}

.switch__track::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 1.125rem;
  height: 1.125rem;
  background: var(--background);
  border-radius: 9999px;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.15);
  transition: transform 0.2s ease;
}

.switch :where(input):checked~.switch__track {
  background: var(--primary);
  border-color: transparent;
}

.switch :where(input):checked~.switch__track::after {
  transform: translateX(1.25rem);
  background: var(--primary-foreground);
}

.switch :where(input):focus-visible~.switch__track {
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--ring) 25%, transparent);
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(20px);
  pointer-events: none;
}

.orb--a {
  width: 420px;
  height: 420px;
  top: -160px;
  right: -120px;
  background: radial-gradient(circle, oklch(0.55 0.18 220 / 0.07), transparent 70%);
  animation: drift 18s ease-in-out infinite;
}

.orb--b {
  width: 380px;
  height: 380px;
  bottom: -140px;
  left: -100px;
  background: radial-gradient(circle, oklch(0.55 0.22 300 / 0.06), transparent 70%);
  animation: drift 22s ease-in-out infinite reverse;
}

.orb--c {
  width: 280px;
  height: 280px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, oklch(0.55 0.20 160 / 0.05), transparent 70%);
  animation: drift 16s ease-in-out infinite 4s;
}

@keyframes drift {

  0%,
  100% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(20px, -30px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .orb {
    animation: none !important;
  }

  * {
    transition-duration: 0.01ms !important;
  }
}
</style>
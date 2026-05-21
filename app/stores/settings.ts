import { defineStore } from 'pinia'

export interface UserProfile {
  firstName: string
  lastName: string
  email: string
  phone: string
  bio: string
}

export interface NotificationSettings {
  orderUpdates: boolean
  shippingUpdates: boolean
  promotions: boolean
  productRecommendations: boolean
  securityAlerts: boolean
  accountUpdates: boolean
}

export type ProfileVisibility = 'public' | 'friends' | 'private'

export interface PrivacySettings {
  profileVisibility: ProfileVisibility
  showActivity: boolean
  dataCollection: boolean
}

export interface AppSettings {
  language: string
  currency: string
}

interface SettingsState {
  profile: UserProfile
  notifications: NotificationSettings
  privacy: PrivacySettings
  app: AppSettings
}

const PERSIST_KEY = 'rh-settings'

const DEFAULT_STATE: SettingsState = {
  profile: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Premium e-commerce enthusiast and tech lover.'
  },
  notifications: {
    orderUpdates: true,
    shippingUpdates: true,
    promotions: false,
    productRecommendations: true,
    securityAlerts: true,
    accountUpdates: true
  },
  privacy: {
    profileVisibility: 'public',
    showActivity: true,
    dataCollection: false
  },
  app: {
    language: 'en',
    currency: 'USD'
  }
}

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsState => structuredClone(DEFAULT_STATE),

  actions: {
    updateProfile(payload: Partial<UserProfile>) {
      Object.assign(this.profile, payload)
    },
    updateNotifications(payload: Partial<NotificationSettings>) {
      Object.assign(this.notifications, payload)
    },
    updatePrivacy(payload: Partial<PrivacySettings>) {
      Object.assign(this.privacy, payload)
    },
    updateApp(payload: Partial<AppSettings>) {
      Object.assign(this.app, payload)
    },

    saveToLocalStorage() {
      if (typeof localStorage === 'undefined') return
      const payload: SettingsState = {
        profile: this.profile,
        notifications: this.notifications,
        privacy: this.privacy,
        app: this.app
      }
      try {
        localStorage.setItem(PERSIST_KEY, JSON.stringify(payload))
      } catch {}
    },

    loadFromLocalStorage() {
      if (typeof localStorage === 'undefined') return
      try {
        const raw = localStorage.getItem(PERSIST_KEY)
        if (!raw) return
        const saved = JSON.parse(raw) as Partial<SettingsState>
        if (saved.profile)       Object.assign(this.profile, saved.profile)
        if (saved.notifications) Object.assign(this.notifications, saved.notifications)
        if (saved.privacy)       Object.assign(this.privacy, saved.privacy)
        if (saved.app)           Object.assign(this.app, saved.app)
      } catch {}
    },

    resetDefaults() {
      const fresh = structuredClone(DEFAULT_STATE)
      this.profile = fresh.profile
      this.notifications = fresh.notifications
      this.privacy = fresh.privacy
      this.app = fresh.app
      this.saveToLocalStorage()
    }
  }
})

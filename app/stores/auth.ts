import { defineStore } from "pinia"
import { ref } from "vue"

export const useAuthStore = defineStore("auth", () => {
  const isLoggedIn = ref(false)
  const user = ref<{
    name: string
    email: string
    initials: string
  } | null>(null)

  function login(email: string, password: string) {
    // Mock login - in real app, this would call an API
    isLoggedIn.value = true
    user.value = {
      name: "Rakibul H. Rabbi",
      email: email,
      initials: "RH",
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("user", JSON.stringify(user.value))
    }
  }

  function logout() {
    isLoggedIn.value = false
    user.value = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("isLoggedIn")
      localStorage.removeItem("user")
    }
  }

  function checkAuth() {
    if (typeof window !== "undefined") {
      const savedAuth = localStorage.getItem("isLoggedIn")
      const savedUser = localStorage.getItem("user")
      if (savedAuth === "true" && savedUser) {
        isLoggedIn.value = true
        user.value = JSON.parse(savedUser)
      }
    }
  }

  return {
    isLoggedIn,
    user,
    login,
    logout,
    checkAuth,
  }
})

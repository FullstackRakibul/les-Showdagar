import { defineStore } from "pinia"
import { ref, computed } from "vue"

/**
 * Calcifer Layout Store
 * Minimalist state management for a single-product experience
 */
export const useLayoutStore = defineStore("layout", () => {
  const isMobile = ref(false)
  const mobileMenuOpen = ref(false)
  const headerScrolled = ref(false)

  function closeMobileMenu() {
    mobileMenuOpen.value = false
  }

  function toggleMobileMenu() {
    mobileMenuOpen.value = !mobileMenuOpen.value
  }

  function checkMobile() {
    if (typeof window !== "undefined") {
      const wasMobile = isMobile.value
      isMobile.value = window.innerWidth < 1024

      if (!wasMobile && isMobile.value) {
        closeMobileMenu()
      }
    }
  }

  function updateHeaderScroll(scrollPosition: number) {
    headerScrolled.value = scrollPosition > 50
  }

  let boundResize: any = null
  
  function init() {
    if (typeof window === "undefined") return
    checkMobile()
    mobileMenuOpen.value = false
    boundResize = () => checkMobile()
    window.addEventListener("resize", boundResize)
  }

  function destroy() {
    if (typeof window !== "undefined" && boundResize) {
      window.removeEventListener("resize", boundResize)
      boundResize = null
    }
  }

  return {
    isMobile,
    mobileMenuOpen,
    headerScrolled,
    closeMobileMenu,
    toggleMobileMenu,
    checkMobile,
    updateHeaderScroll,
    init,
    destroy,
  }
})

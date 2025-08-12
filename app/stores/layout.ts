import { defineStore } from "pinia"
import { ref } from "vue"

export const useLayoutStore = defineStore("layout", () => {
  const leftSidebarOpen = ref(false)
  const rightSidebarOpen = ref(false)
  const isMobile = ref(false)

  function closeLeftSidebar() {
    leftSidebarOpen.value = false
  }
  function closeRightSidebar() {
    rightSidebarOpen.value = false
  }
  function closeBothSidebars() {
    leftSidebarOpen.value = false
    rightSidebarOpen.value = false
  }

  function toggleLeftSidebar() {
    if (isMobile.value) {
      if (!leftSidebarOpen.value) rightSidebarOpen.value = false
      leftSidebarOpen.value = !leftSidebarOpen.value
    } else {
      leftSidebarOpen.value = !leftSidebarOpen.value
    }
  }

  function toggleRightSidebar() {
    if (isMobile.value) {
      if (!rightSidebarOpen.value) leftSidebarOpen.value = false
      rightSidebarOpen.value = !rightSidebarOpen.value
    } else {
      rightSidebarOpen.value = !rightSidebarOpen.value
    }
  }

  function checkMobile() {
    if (typeof window !== "undefined") {
      const wasMobile = isMobile.value
      isMobile.value = window.innerWidth < 1024

      if (!wasMobile && isMobile.value) {
        closeBothSidebars()
      } else if (wasMobile && !isMobile.value) {
        leftSidebarOpen.value = true
        rightSidebarOpen.value = true
      }
    }
  }

  let boundResize: any = null
  function init() {
    if (typeof window === "undefined") return
    checkMobile()
    // Open both on desktop by default
    if (!isMobile.value) {
      leftSidebarOpen.value = true
      rightSidebarOpen.value = true
    }
    boundResize = () => checkMobile()
    window.addEventListener("resize", boundResize)
  }

  function destroy() {
    if (typeof window !== "undefined" && boundResize) {
      window.removeEventListener("resize", boundResize)
      boundResize = null
    }
  }

  // For SSR safety, components can call init() onMounted and destroy() onUnmounted.
  return {
    leftSidebarOpen,
    rightSidebarOpen,
    isMobile,
    toggleLeftSidebar,
    toggleRightSidebar,
    closeLeftSidebar,
    closeRightSidebar,
    closeBothSidebars,
    checkMobile,
    init,
    destroy,
  }
})

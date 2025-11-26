import { ref, onMounted, onUnmounted } from "vue"

export const useLayout = () => {
  const leftSidebarOpen = ref(false)
  const rightSidebarOpen = ref(false)
  const isMobile = ref(false)

  const toggleLeftSidebar = () => {
    if (isMobile.value) {
      // On mobile, close right sidebar when opening left
      

      if (!leftSidebarOpen.value) {
        rightSidebarOpen.value = false
      }
      leftSidebarOpen.value = !leftSidebarOpen.value

    } else {
      // On desktop, just toggle left sidebar
      leftSidebarOpen.value = !leftSidebarOpen.value
      console.log("side bar open tarpor , ", leftSidebarOpen.value)
    }
  }

  const toggleRightSidebar = () => {
    if (isMobile.value) {
      // On mobile, close left sidebar when opening right
      if (!rightSidebarOpen.value) {
        leftSidebarOpen.value = false
      }
      rightSidebarOpen.value = !rightSidebarOpen.value
    } else {
      // On desktop, just toggle right sidebar
      rightSidebarOpen.value = !rightSidebarOpen.value
    }
  }

  const closeLeftSidebar = () => {
    leftSidebarOpen.value = false
  }

  const closeRightSidebar = () => {
    rightSidebarOpen.value = false
  }

  const closeBothSidebars = () => {
    leftSidebarOpen.value = false
    rightSidebarOpen.value = false
  }

  const checkMobile = () => {
    if (typeof window !== "undefined") {
      const wasMobile = isMobile.value
      isMobile.value = window.innerWidth < 1024

      // When switching from desktop to mobile, close both sidebars
      if (!wasMobile && isMobile.value) {
        closeBothSidebars()
      }
      // When switching from mobile to desktop, open left sidebar by default
      else if (wasMobile && !isMobile.value) {
        leftSidebarOpen.value = true
        rightSidebarOpen.value = true // Open right sidebar by default on desktop
      }
    }
  }

  onMounted(() => {
    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Set initial state based on screen size
    if (!isMobile.value) {
      leftSidebarOpen.value = false
      rightSidebarOpen.value = false // Default open on desktop
    }
  })

  onUnmounted(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", checkMobile)
    }
  })

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
  }
}

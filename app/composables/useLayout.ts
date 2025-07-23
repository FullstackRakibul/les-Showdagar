import { ref, onMounted, onUnmounted } from "vue"

export const useLayout = () => {
  const leftSidebarOpen = ref(true)
  const rightSidebarOpen = ref(true)
  const isMobile = ref(false)

  const toggleLeftSidebar = () => {
    leftSidebarOpen.value = !leftSidebarOpen.value
  }

  const toggleRightSidebar = () => {
    rightSidebarOpen.value = !rightSidebarOpen.value
  }

  const checkMobile = () => {
    if (typeof window !== "undefined") {
      isMobile.value = window.innerWidth < 1024
      if (isMobile.value) {
        leftSidebarOpen.value = false
        rightSidebarOpen.value = false
      } else {
        leftSidebarOpen.value = true
        rightSidebarOpen.value = true
      }
    }
  }

  const closeLeftSidebar = () => {
    leftSidebarOpen.value = false
  }

  const closeRightSidebar = () => {
    rightSidebarOpen.value = false
  }

  onMounted(() => {
    checkMobile()
    window.addEventListener("resize", checkMobile)
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
    checkMobile,
  }
}

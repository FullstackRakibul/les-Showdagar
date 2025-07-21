import { ref } from "vue"

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
    isMobile.value = window.innerWidth < 1024
    if (isMobile.value) {
      leftSidebarOpen.value = false
      rightSidebarOpen.value = false
    }
  }

  return {
    leftSidebarOpen,
    rightSidebarOpen,
    isMobile,
    toggleLeftSidebar,
    toggleRightSidebar,
    checkMobile,
  }
}

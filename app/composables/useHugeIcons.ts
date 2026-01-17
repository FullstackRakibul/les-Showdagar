/**
 * HugeIcons Vue Integration
 * Re-exports commonly used icons for easy imports across the app
 * 
 * Usage: 
 * import { HugeiconsIcon } from '@hugeicons/vue'
 * import { Home01Icon, ShoppingCart01Icon } from '@hugeicons/core-free-icons'
 * 
 * <HugeiconsIcon :icon="Home01Icon" :size="24" />
 */

// Re-export the main component
export { HugeiconsIcon } from '@hugeicons/vue'

// Re-export commonly used icons for convenience
export {
  // Navigation
  Home01Icon,
  Menu01Icon,
  Menu09Icon,
  ArrowDown01Icon,
  ArrowRight01Icon,
  ArrowLeft01Icon,
  SidebarRight01Icon,
  
  // E-commerce
  ShoppingCart01Icon,
  Package01Icon,
  Store01Icon,
  PercentIcon,
  Delete01Icon,
  
  // User
  UserIcon,
  Logout01Icon,
  Settings01Icon,
  
  // Communication
  Notification03Icon,
  Mail01Icon,
  Sent02Icon,
  
  // Actions
  Search01Icon,
  Cancel01Icon,
  CheckmarkCircle01Icon,
  FavouriteIcon,
  StarIcon,
  PlayIcon,
  
  // Technology
  CpuIcon,
  SmartPhoneIcon,
  HeadphonesIcon,
  WatchIcon,
  
  // Fashion/Lifestyle
  DiamondIcon,
  
  // Travel
  Airplane01Icon,
} from '@hugeicons/core-free-icons'

# RH Business Club

[![Nuxt](https://img.shields.io/badge/Nuxt-3.17-00DC82?logo=nuxt.js&logoColor=white)](https://nuxt.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Pinia](https://img.shields.io/badge/Pinia-3.0-FFD75E?logo=pinia&logoColor=black)](https://pinia.vuejs.org)

**RH Business Club** is a premium e-commerce and business networking platform built with a modern web stack. It provides a seamless experience for users to explore products, join specialized business clubs, and manage their orders.

## ✨ Features

- 🛒 **Advanced E-commerce**: Product catalog, wishlist, shopping cart, and secure checkout.
- 🏢 **Business Clubs**: Specialized clubs for professional networking and exclusive benefits.
- 💬 **Messaging System**: Integrated messaging for communication between users and clubs.
- 🔔 **Notifications**: Real-time updates for orders, deals, and messages.
- 🎨 **Modern UI/UX**: Sleek design powered by Tailwind CSS 4, Radix Vue, and Lucide icons.
- 🚀 **Performance**: Smooth scrolling with Lenis and efficient state management with Pinia.
- 🌗 **Theme Support**: Fully customizable theme settings with dark/light modes.

## 🛠️ Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com/) (Vue 3)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **UI Components**: [Shadcn Vue](https://www.shadcn-vue.com/) & [Radix Vue](https://www.radix-vue.com/)
- **Icons**: [HugeIcons](https://hugeicons.com/) & [Lucide Vue Next](https://lucide.dev/)
- **Utilities**: [VueUse](https://vueuse.org/), [Lenis](https://lenis.darkroom.engineering/) (Smooth Scroll)

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/FullstackRakibul/les-Showdagar.git

# Navigate to project directory
cd Club

# Install dependencies
npm install
```

### Development

Start the development server with Hot Module Replacement:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 📂 Project Structure

- `app/` - Main Vue application (Pages, Components, Stores, Assets)
- `server/` - Nitro server routes and API logic
- `public/` - Static assets
- `nuxt.config.ts` - Nuxt configuration
- `components.json` - Shadcn configuration

## 🐳 Docker Support

The project includes Docker configuration for easy deployment:

```bash
docker compose up -d
```

---

Built with ❤️ by [FullstackRakibul](https://github.com/FullstackRakibul)

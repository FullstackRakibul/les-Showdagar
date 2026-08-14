<template>
  <section class="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden bg-background">

    <!-- Static art-line image background -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <img src="../../assets/img/dashboard/rhbusinessclub-art-line-bg-.avif"
        class="absolute inset-0 w-full h-full object-cover" alt="" fetchpriority="high" />
      <div class="absolute inset-0 bg-background/55 dark:bg-background/65" />
    </div>

    <!-- Particle canvas -->
    <canvas ref="particleCanvas" class="absolute inset-0 z-10 pointer-events-none" aria-hidden="true" />

    <!-- Main content -->
    <div class="relative z-20 w-full max-w-2xl mx-auto px-4 pt-20 flex flex-col items-center gap-7">

      <!-- Brand label -->
      <div class="flex items-center gap-2">
        <div class="h-px w-8 bg-quantum-500/60" />
        <p class="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">RH Business Club</p>
        <div class="h-px w-8 bg-quantum-500/60" />
      </div>

      <!-- Headline -->
      <div class="text-center">
        <h1 class="text-4xl sm:text-6xl font-bold text-foreground leading-tight tracking-tight">
          Find what you
        </h1>
        <h1 class="text-4xl sm:text-6xl font-bold leading-tight tracking-tight text-transparent bg-clip-text"
          style="background-image: linear-gradient(90deg, oklch(0.55 0.18 220), oklch(0.55 0.22 300), oklch(0.55 0.20 160));">
          truly desire
        </h1>
      </div>

      <!-- Search bar -->
      <div class="w-full">
        <div
          class="flex items-center gap-2 px-4 py-3 rounded-2xl bg-card/80 backdrop-blur-md border border-border shadow-2xl transition-all duration-300 focus-within:border-quantum-500/60 focus-within:shadow-[0_0_0_4px_oklch(0.55_0.18_220/0.08)]">

          <HugeiconsIcon :icon="Search01Icon" :size="20" class="shrink-0 text-muted-foreground" />

          <input v-model="searchQuery" type="text" placeholder="Search products, brands, categories..."
            class="flex-1 min-w-0 bg-transparent text-foreground placeholder:text-muted-foreground text-base outline-none"
            @keydown.enter="handleSearch" @focus="showSuggestions = true" @blur="schedulehideSuggestions" />

          <div class="w-px h-5 bg-border shrink-0" />

          <!-- Image search -->
          <button
            class="shrink-0 p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            title="Search by image" @click="triggerImageUpload">
            <HugeiconsIcon :icon="Camera01Icon" :size="18" />
          </button>
          <input ref="imageInput" type="file" accept="image/*" class="hidden" @change="handleImageUpload" />

          <!-- Voice search -->
          <button class="shrink-0 p-1.5 rounded-lg hover:bg-muted transition-colors"
            :class="isListening ? 'text-quantum-500' : 'text-muted-foreground hover:text-foreground'"
            title="Voice search" @click="handleVoiceSearch">
            <HugeiconsIcon :icon="Mic01Icon" :size="18" :class="{ 'animate-pulse': isListening }" />
          </button>

          <button
            class="shrink-0 px-4 py-1.5 rounded-xl bg-primary hover:bg-primary/40 active:scale-95 text-white text-sm font-semibold transition-all duration-150"
            @click="handleSearch">
            Search
          </button>
        </div>

        <!-- Suggestions dropdown -->
        <Transition name="suggestions">
          <div v-if="showSuggestions" class="mt-2 rounded-xl bg-card border border-border shadow-xl overflow-hidden">
            <div class="px-4 py-2 border-b border-border">
              <p class="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Recent searches</p>
            </div>
            <ul>
              <li v-for="s in recentSearches" :key="s">
                <button
                  class="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-muted text-sm text-foreground transition-colors text-left"
                  @mousedown.prevent="fillSearch(s)">
                  <HugeiconsIcon :icon="Clock01Icon" :size="15" class="text-muted-foreground shrink-0" />
                  {{ s }}
                </button>
              </li>
            </ul>
          </div>
        </Transition>
      </div>

      <!-- Category chips -->
      <div class="flex flex-wrap justify-center gap-2">
        <button v-for="cat in categories" :key="cat.label"
          class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border border-border bg-card/60 backdrop-blur-sm text-muted-foreground hover:text-foreground hover:border-quantum-500/50 hover:bg-card/90 active:scale-95 transition-all duration-200"
          @click="fillSearch(cat.label)">
          <HugeiconsIcon :icon="cat.icon" :size="13" />
          {{ cat.label }}
        </button>
      </div>
    </div>

    <!-- Stats row -->
    <div class="relative z-20 mt-16 mb-24 w-full max-w-sm mx-auto px-4">
      <div class="grid grid-cols-3 gap-6">
        <div v-for="stat in stats" :key="stat.label" class="text-center group cursor-default">
          <p class="text-3xl font-bold text-foreground group-hover:text-quantum-500 transition-colors duration-300">
            {{ stat.display }}
          </p>
          <p class="text-xs text-muted-foreground mt-1">{{ stat.label }}</p>
          <div
            class="h-0.5 w-0 group-hover:w-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto mt-2 transition-all duration-500 rounded-full" />
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-center cursor-pointer group"
      @click="scrollToClips">
      <div
        class="w-7 h-12 border-2 border-muted-foreground/20 rounded-full flex items-start justify-center p-1.5 backdrop-blur-sm bg-card/20 hover:border-quantum-500/50 transition-colors duration-300 mx-auto">
        <div
          class="w-1.5 h-3 bg-muted-foreground/40 group-hover:bg-quantum-500 rounded-full transition-colors duration-300 animate-scroll-bounce" />
      </div>
      <p class="text-[10px] text-muted-foreground/50 mt-2 tracking-widest uppercase">Scroll</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Search01Icon,
  Camera01Icon,
  Mic01Icon,
  Clock01Icon,
  CpuIcon,
  ShoppingBag01Icon,
  Airplane01Icon,
  Home01Icon,
} from '@hugeicons/core-free-icons'

const router = useRouter()

const searchQuery = ref('')
const showSuggestions = ref(false)
const isListening = ref(false)
const imageInput = ref<HTMLInputElement | null>(null)
const particleCanvas = ref<HTMLCanvasElement | null>(null)

// ── Particle system ────────────────────────────────────────────────────────────
// E-commerce glyphs drawn as simple Unicode paths on canvas
const GLYPHS = ['🛍', '🏷', '🛒', '📦', '💳', '⭐', '🎁', '✨']

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  glyph: string
  alpha: number
  alphaDir: number
  rotation: number
  rotSpeed: number
}

let animId = 0
let particles: Particle[] = []

function initParticles(w: number, h: number) {
  particles = Array.from({ length: 38 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.35,
    vy: -(Math.random() * 0.4 + 0.15),
    size: Math.random() * 14 + 10,
    glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
    alpha: Math.random() * 0.4 + 0.05,
    alphaDir: Math.random() > 0.5 ? 1 : -1,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.012,
  }))
}

function tick(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.clearRect(0, 0, w, h)
  for (const p of particles) {
    p.x += p.vx
    p.y += p.vy
    p.rotation += p.rotSpeed
    p.alpha += p.alphaDir * 0.003
    if (p.alpha >= 0.45) p.alphaDir = -1
    if (p.alpha <= 0.04) p.alphaDir = 1

    if (p.y < -p.size * 2) { p.y = h + p.size; p.x = Math.random() * w }
    if (p.x < -p.size * 2) p.x = w + p.size
    if (p.x > w + p.size * 2) p.x = -p.size

    ctx.save()
    ctx.globalAlpha = p.alpha
    ctx.translate(p.x, p.y)
    ctx.rotate(p.rotation)
    ctx.font = `${p.size}px serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(p.glyph, 0, 0)
    ctx.restore()
  }
  animId = requestAnimationFrame(() => tick(ctx, w, h))
}

function startParticles() {
  const canvas = particleCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const resize = () => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    initParticles(canvas.width, canvas.height)
  }
  resize()
  window.addEventListener('resize', resize)
  tick(ctx, canvas.width, canvas.height)

  onUnmounted(() => {
    cancelAnimationFrame(animId)
    window.removeEventListener('resize', resize)
  })
}

onMounted(() => {
  if (import.meta.client) startParticles()
})
// ──────────────────────────────────────────────────────────────────────────────

const recentSearches = [
  'wireless headphones',
  'summer dress',
  'leather backpack',
  'smart watch',
  'running shoes',
]

const categories = [
  { label: 'Electronics', icon: CpuIcon },
  { label: 'Fashion', icon: ShoppingBag01Icon },
  { label: 'Travel', icon: Airplane01Icon },
  { label: 'Home', icon: Home01Icon },
]

const stats = [
  { display: '500+', label: 'Products' },
  { display: '3', label: 'Business Clubs' },
  { display: '24/7', label: 'Support' },
]

const handleSearch = () => {
  const q = searchQuery.value.trim()
  if (!q) return
  showSuggestions.value = false
  router.push(`/products?search=${encodeURIComponent(q)}`)
  searchQuery.value = ''
}

const fillSearch = (term: string) => {
  searchQuery.value = term
  showSuggestions.value = false
}

const schedulehideSuggestions = () => {
  setTimeout(() => { showSuggestions.value = false }, 150)
}

const triggerImageUpload = () => imageInput.value?.click()

const handleImageUpload = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) console.log('[HeroSearch] image search:', file.name)
}

const handleVoiceSearch = () => {
  if (!import.meta.client) return
  const SR = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition
  if (!SR) {
    alert('Voice search: not supported in this browser')
    return
  }
  const recognition = new SR()
  recognition.lang = 'en-US'
  recognition.continuous = false
  recognition.interimResults = false
  recognition.onstart = () => { isListening.value = true }
  recognition.onend = () => { isListening.value = false }
  recognition.onresult = (e: any) => {
    searchQuery.value = e.results[0][0].transcript
  }
  recognition.onerror = () => { isListening.value = false }
  recognition.start()
}

const scrollToClips = () => {
  document.querySelector('#clip-section')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
/* Particle canvas fills the section */
canvas {
  width: 100%;
  height: 100%;
}

/* Suggestions transition */
.suggestions-enter-active,
.suggestions-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.suggestions-enter-from,
.suggestions-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* Scroll bounce */
@keyframes scroll-bounce {

  0%,
  100% {
    transform: translateY(0);
    opacity: 0.4;
  }

  50% {
    transform: translateY(8px);
    opacity: 1;
  }
}

.animate-scroll-bounce {
  animation: scroll-bounce 2s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .animate-scroll-bounce {
    animation: none !important;
    opacity: 1 !important;
  }
}
</style>
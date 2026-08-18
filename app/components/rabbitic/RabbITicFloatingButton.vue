<template>
  <ClientOnly>
    <!-- Launcher -->
    <button
      v-show="!store.isOpen"
      class="rabbitic-launcher group"
      aria-label="Ask RabbITic"
      @click="store.open()"
    >
      <HugeiconsIcon :icon="AiChat01Icon" :size="22" />
      <span class="rabbitic-tooltip">Ask RabbITic <kbd>Ctrl K</kbd></span>
    </button>

    <!-- Panel -->
    <Teleport to="body">
      <Transition name="panel">
        <div v-if="store.isOpen" class="rabbitic-layer">
          <!-- Backdrop only on mobile, where the panel is full-screen -->
          <div v-if="layout.isMobile" class="rabbitic-backdrop" @click="store.close()" />

          <div
            class="rabbitic-panel"
            role="dialog"
            aria-modal="true"
            aria-label="RabbITic assistant"
            data-lenis-prevent
          >
            <RabbITicChat @close="store.close()" />
          </div>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import { useRabbITicStore } from '@/stores/rabbitic'
import { useLayoutStore } from '@/stores/layout'
import { HugeiconsIcon } from '@hugeicons/vue'
import { AiChat01Icon } from '@hugeicons/core-free-icons'

const store = useRabbITicStore()
const layout = useLayoutStore()

function onKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    store.toggle()
    return
  }
  if (e.key === 'Escape' && store.isOpen) store.close()
}

// Full-screen on mobile means the page behind must not scroll with it.
watch(() => store.isOpen && layout.isMobile, (locked) => {
  document.body.style.overflow = locked ? 'hidden' : ''
})

onMounted(() => window.addEventListener('keydown', onKeydown))

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* ── Launcher ── */
.rabbitic-launcher {
  position: fixed;
  right: 1.25rem;
  bottom: 5.5rem; /* clears ThemeToggleButton, which owns the corner */
  z-index: 60;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background: var(--primary);
  color: var(--primary-foreground);
  border: none;
  cursor: pointer;
  box-shadow: 0 8px 24px -6px color-mix(in oklch, var(--primary) 50%, transparent);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.rabbitic-launcher:hover {
  transform: scale(1.08);
  box-shadow: 0 12px 32px -6px color-mix(in oklch, var(--primary) 60%, transparent);
}

.rabbitic-launcher:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 3px;
}

.rabbitic-tooltip {
  position: absolute;
  right: calc(100% + 0.65rem);
  white-space: nowrap;
  padding: 0.35rem 0.6rem;
  border-radius: 0.5rem;
  background: var(--popover);
  color: var(--popover-foreground);
  border: 1px solid var(--border);
  font-size: 0.7rem;
  font-weight: 500;
  box-shadow: 0 4px 12px -4px rgba(0, 0, 0, 0.25);
  opacity: 0;
  transform: translateX(6px);
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.rabbitic-launcher:hover .rabbitic-tooltip,
.rabbitic-launcher:focus-visible .rabbitic-tooltip {
  opacity: 1;
  transform: translateX(0);
}

.rabbitic-tooltip kbd {
  margin-left: 0.3rem;
  padding: 0.05rem 0.3rem;
  border-radius: 0.25rem;
  background: var(--muted);
  border: 1px solid var(--border);
  font-size: 0.62rem;
  font-family: inherit;
}

/* ── Panel ── */
.rabbitic-layer {
  position: fixed;
  inset: 0;
  z-index: 70;
  pointer-events: none;
}

.rabbitic-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(2px);
  pointer-events: auto;
}

.rabbitic-panel {
  position: absolute;
  right: 1.25rem;
  bottom: 1.25rem;
  width: 400px;
  height: min(620px, calc(100dvh - 2.5rem));
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 1rem;
  background: var(--background);
  box-shadow: 0 24px 60px -12px rgba(0, 0, 0, 0.35);
  pointer-events: auto;
}

/* Full-screen below the lg breakpoint the layout store uses for isMobile */
@media (max-width: 1023px) {
  .rabbitic-panel {
    inset: 0;
    width: 100%;
    height: 100dvh;
    border-radius: 0;
    border: none;
  }
  .rabbitic-launcher {
    right: 1rem;
    bottom: 5rem;
  }
}

/* ── Transition ── */
.panel-enter-active,
.panel-leave-active {
  transition: opacity 0.22s ease;
}
.panel-enter-active .rabbitic-panel,
.panel-leave-active .rabbitic-panel {
  transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.22s ease;
}
.panel-enter-from,
.panel-leave-to {
  opacity: 0;
}
.panel-enter-from .rabbitic-panel,
.panel-leave-to .rabbitic-panel {
  opacity: 0;
  transform: translateY(16px) scale(0.97);
}

@media (prefers-reduced-motion: reduce) {
  .rabbitic-launcher,
  .rabbitic-tooltip,
  .panel-enter-active,
  .panel-leave-active,
  .panel-enter-active .rabbitic-panel,
  .panel-leave-active .rabbitic-panel {
    transition: none !important;
  }
}
</style>

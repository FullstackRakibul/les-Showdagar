<template>
  <footer class="footer relative bg-card/95 backdrop-blur-sm border-t border-border/60">
    <!-- Subtle gradient orbs -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div class="orb orb--footer-1" />
      <div class="orb orb--footer-2" />
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <!-- Brand Column -->
        <div class="lg:col-span-1 space-y-4">
          <NuxtLink to="/" class="inline-block group">
            <img src="../assets/img/globalUse/RH-Business-Club-logo-trsns-vvv.png" alt="RH Business Club"
              class="h-10 w-auto transition-transform duration-300 group-hover:scale-105" />
          </NuxtLink>
          <p class="text-muted-foreground text-sm leading-relaxed max-w-xs">
            Your premier commercial hub for sourcing, importing, and distributing
            high-quality specialized products across exclusive sectors.
          </p>
        </div>

        <!-- Business Clubs -->
        <div>
          <h3 class="text-foreground font-semibold text-sm uppercase tracking-wider mb-4">
            Business Clubs
          </h3>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/products?club=quantum"
                class="club-link group flex items-center gap-2 text-muted-foreground hover:text-quantum-500 text-sm transition-all duration-200">
                <span class="w-5 flex justify-center">
                  <HugeiconsIcon :icon="CpuIcon" :size="14"
                    class="transition-transform duration-200 group-hover:scale-110" />
                </span>
                <span>Quantum Club</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/products?club=elegance"
                class="club-link group flex items-center gap-2 text-muted-foreground hover:text-elegance-500 text-sm transition-all duration-200">
                <span class="w-5 flex justify-center">
                  <HugeiconsIcon :icon="DiamondIcon" :size="14"
                    class="transition-transform duration-200 group-hover:scale-110" />
                </span>
                <span>Elegance Club</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/products?club=nextstop"
                class="club-link group flex items-center gap-2 text-muted-foreground hover:text-nextstop-500 text-sm transition-all duration-200">
                <span class="w-5 flex justify-center">
                  <HugeiconsIcon :icon="Airplane01Icon" :size="14"
                    class="transition-transform duration-200 group-hover:scale-110" />
                </span>
                <span>NextStop Club</span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h3 class="text-foreground font-semibold text-sm uppercase tracking-wider mb-4">
            Support
          </h3>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/about"
                class="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200 inline-flex items-center gap-1 group">
                <span class="w-0 group-hover:w-3 transition-all duration-200 overflow-hidden">→</span>
                About Us
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact"
                class="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200 inline-flex items-center gap-1 group">
                <span class="w-0 group-hover:w-3 transition-all duration-200 overflow-hidden">→</span>
                Contact
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/faq"
                class="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200 inline-flex items-center gap-1 group">
                <span class="w-0 group-hover:w-3 transition-all duration-200 overflow-hidden">→</span>
                FAQ
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/shipping"
                class="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200 inline-flex items-center gap-1 group">
                <span class="w-0 group-hover:w-3 transition-all duration-200 overflow-hidden">→</span>
                Shipping Info
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Connect -->
        <div>
          <h3 class="text-foreground font-semibold text-sm uppercase tracking-wider mb-4">
            Connect
          </h3>
          <div class="flex items-center gap-3 mb-5">
            <a href="#"
              class="social-icon group w-9 h-9 bg-muted/60 rounded-xl flex items-center justify-center text-muted-foreground hover:text-white transition-all duration-300 hover:scale-110">
              <i class="fab fa-facebook-f text-sm transition-transform group-hover:scale-110"></i>
            </a>
            <a href="#"
              class="social-icon group w-9 h-9 bg-muted/60 rounded-xl flex items-center justify-center text-muted-foreground hover:text-white transition-all duration-300 hover:scale-110">
              <i class="fab fa-instagram text-sm transition-transform group-hover:scale-110"></i>
            </a>
            <a href="#"
              class="social-icon group w-9 h-9 bg-muted/60 rounded-xl flex items-center justify-center text-muted-foreground hover:text-white transition-all duration-300 hover:scale-110">
              <i class="fab fa-twitter text-sm transition-transform group-hover:scale-110"></i>
            </a>
          </div>
          <div class="flex items-center gap-3 text-muted-foreground text-sm group">
            <HugeiconsIcon :icon="Mail01Icon" :size="16"
              class="transition-transform duration-200 group-hover:scale-110" />
            <a href="mailto:support@rhbusinessclub.com" class="hover:text-foreground transition-colors">
              support@rhbusinessclub.com
            </a>
          </div>
        </div>
      </div>

      <!-- Gradient Divider -->
      <div class="my-8 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent" />

      <!-- Bottom Bar -->
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        <p class="text-muted-foreground text-xs tracking-wide">
          © 2026 RH Business Club. All rights reserved.
        </p>
        <div class="flex items-center gap-6">
          <NuxtLink to="/privacy"
            class="text-muted-foreground hover:text-foreground text-xs transition-colors duration-200">
            Privacy Policy
          </NuxtLink>
          <NuxtLink to="/terms"
            class="text-muted-foreground hover:text-foreground text-xs transition-colors duration-200">
            Terms of Service
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  CpuIcon,
  DiamondIcon,
  Airplane01Icon,
  Mail01Icon,
} from '@hugeicons/core-free-icons'
</script>

<style scoped>
/* Background orbs (consistent with ProductRequestSection) */
.orb--footer-1,
.orb--footer-2 {
  position: absolute;
  border-radius: 50%;
  filter: blur(64px);
  pointer-events: none;
}

.orb--footer-1 {
  width: 300px;
  height: 300px;
  bottom: -100px;
  left: -80px;
  background: radial-gradient(circle, oklch(0.55 0.18 220 / 0.08), transparent 70%);
  animation: drift 24s ease-in-out infinite;
}

.orb--footer-2 {
  width: 280px;
  height: 280px;
  top: -80px;
  right: -60px;
  background: radial-gradient(circle, oklch(0.55 0.22 300 / 0.06), transparent 70%);
  animation: drift 20s ease-in-out infinite reverse;
}

@keyframes drift {

  0%,
  100% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(20px, -20px);
  }
}

/* Footer links hover effect */
.club-link {
  position: relative;
  display: inline-flex;
  width: fit-content;
}

.club-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: currentColor;
  transition: width 0.2s ease;
}

.club-link:hover::after {
  width: 100%;
}

/* Social icons gradient on hover */
.social-icon {
  background: var(--muted);
  transition: all 0.2s ease;
}

.social-icon:hover {
  background: linear-gradient(135deg, oklch(0.55 0.18 220), oklch(0.55 0.22 300));
  box-shadow: 0 4px 12px oklch(0.55 0.18 220 / 0.3);
}

/* Reduce motion */
@media (prefers-reduced-motion: reduce) {

  .orb--footer-1,
  .orb--footer-2,
  .club-link::after,
  .social-icon {
    animation: none !important;
    transition: none !important;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .footer {
    backdrop-filter: blur(4px);
  }
}
</style>
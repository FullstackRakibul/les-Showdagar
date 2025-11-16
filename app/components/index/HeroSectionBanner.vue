<template>
  <section class="w-full py-12 md:py-20 px-4 sm:px-6 lg:px-8"
    style="background: linear-gradient(135deg, #181C27 0%, #232931 100%);">
    <div class="max-w-7xl mx-auto">
      <!-- Grid Container with Responsive Layout -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-stretch">

        <!-- Category Box 1: Mobile & Tech -->
        <div
          class="group h-32 sm:h-40 md:h-48 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer bg-white flex items-center justify-center">
          <div class="relative w-full h-full flex items-center justify-center p-4">
            <img src="../../assets/img/globalUse/RH-Business-Club-logo-trsns-black.png" alt="Mobile & Tech"
              class="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>


        <!-- Center Logo - Spans full row on mobile/tablet, positioned in grid on desktop -->
        <div class="col-span-1 sm:col-span-2 lg:col-span-1 lg:row-span-2 h-32 sm:h-40 md:h-full rounded-full shadow-lg overflow-hidden flex items-center justify-center 
           order-3 sm:order-none lg:order-none">
          <div class="relative w-full h-full flex items-center justify-center">
            <div class="text-center flex flex-col items-center justify-center">
              <img src="../../assets/img/globalUse/RH-Business-Club-logo-trsns.png" alt="RH Business Club Logo"
                class="w-96 h-96 md:w-96 md:h-56 object-contain mb-2 md:mb-4" />
              <!-- <h2 class="text-yellow-400 font-bold text-sm md:text-lg text-center">RH Business Club</h2>
              <p class="text-white text-xs md:text-sm mt-1">Let's go ahead.</p> -->
            </div>
          </div>
        </div>

        <!-- Category Box 3: Watches -->
        <div
          class="group h-32 sm:h-40 md:h-48 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer bg-white flex items-center justify-center">
          <div class="relative w-full h-full flex items-center justify-center p-4">
            <img src="@/assets/img/globalUse/rhbusinessclub-logo.png" alt="Watches"
              class="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>

        <!-- Category Box 4: Computers -->
        <div
          class="group h-32 sm:h-40 md:h-48 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer bg-white flex items-center justify-center">
          <div class="relative w-full h-full flex items-center justify-center p-4">
            <img src="@/assets/img/globalUse/rhbusinessclub-logo.png" alt="Computers"
              class="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>

        <!-- Category Box 7: Beauty -->
        <div
          class="group h-32 sm:h-40 md:h-48 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer bg-white flex items-center justify-center">
          <div class="relative w-full h-full flex items-center justify-center p-4">
            <img src="@/assets/img/globalUse/rhbusinessclub-logo.png" alt="Beauty"
              class="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
// Responsive hero banner with category boxes and central logo
// Mobile: 1 column layout
// Tablet: 2 columns with logo spanning
// Desktop: 3 columns with logo in center
</script>

<style scoped>
/* Smooth color transitions and hover effects */
.group {
  transition: all 0.3s ease;
}

/* Grid gap adjustments for different screen sizes */
@media (max-width: 640px) {
  :deep(.grid) {
    gap: 1rem;
  }
}
</style>
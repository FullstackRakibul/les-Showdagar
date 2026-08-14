<template>
  <div class="bg-background text-foreground">

    <!-- Hero -->
    <section class="relative overflow-hidden border-b border-border">
      <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div class="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-quantum-500/8 blur-3xl" />
        <div class="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-elegance-500/8 blur-3xl" />
      </div>
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <div class="flex items-center gap-2 mb-6">
          <div class="h-px w-8 bg-quantum-500/60" />
          <span class="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">RH Business
            Club</span>
          <div class="h-px w-8 bg-quantum-500/60" />
        </div>
        <h1 class="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-foreground mb-5">
          Better Products.<br />
          Better Value.<br />
          <span class="text-transparent bg-clip-text"
            style="background-image: linear-gradient(90deg, oklch(0.55 0.18 220), oklch(0.55 0.22 300), oklch(0.55 0.20 160));">
            Delivered with Confidence.
          </span>
        </h1>
        <p class="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          RH Business Club is a premium e-commerce experience focused on quality, value, and reliable delivery across
          Bangladesh.
          We believe online shopping should be simple, trustworthy, and rewarding.
        </p>
        <div class="flex flex-wrap gap-3 mt-8">
          <NuxtLink to="/products"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all">
            Explore Products
          </NuxtLink>
          <NuxtLink to="/DealsAndOffers"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border bg-background text-foreground text-sm font-semibold hover:bg-secondary active:scale-[0.98] transition-all">
            Shop Deals &amp; Offers
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Mission intro -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 py-14">
      <div class="grid sm:grid-cols-2 gap-8 items-center">
        <div>
          <h2 class="text-2xl font-bold text-foreground mb-4">More Than an Online Store</h2>
          <p class="text-muted-foreground leading-relaxed mb-4">
            RH Business Club was created with a simple belief: shopping online should feel less complicated and more
            trustworthy.
          </p>
          <p class="text-muted-foreground leading-relaxed">
            Too many choices can make shopping harder. That's why we focus on products that offer a meaningful balance
            of
            <span class="text-foreground font-medium">quality, value, practicality, style, and reliability</span> —
            rather than simply filling a catalog.
          </p>
        </div>
        <blockquote class="relative rounded-lg border border-border bg-card p-6">
          <div class="absolute top-4 left-4 text-5xl leading-none text-quantum-500/20 font-serif select-none"
            aria-hidden="true">"</div>
          <p class="relative text-foreground font-medium leading-relaxed pl-4 text-[15px]">
            Shopping online should feel less complicated and more trustworthy. Every product has a reason to be here.
          </p>
          <div class="mt-4 flex items-center gap-2 pl-4">
            <div class="h-px w-6 bg-quantum-500/60" />
            <span class="text-xs text-muted-foreground uppercase tracking-widest">RH Business Club</span>
          </div>
        </blockquote>
      </div>
    </section>

    <!-- Pillars -->
    <section class="border-y border-border bg-muted/30">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        <h2 class="text-2xl font-bold text-foreground mb-2 text-center">What We Stand For</h2>
        <p class="text-muted-foreground text-center mb-10 text-sm">Three principles behind every decision we make.</p>
        <div class="grid sm:grid-cols-3 gap-5">
          <div v-for="pillar in pillars" :key="pillar.title"
            class="rounded-lg border border-border bg-card p-6 flex flex-col gap-3">
            <div class="w-10 h-10 rounded-md flex items-center justify-center text-lg" :class="pillar.iconBg">
              {{ pillar.icon }}
            </div>
            <h3 class="font-semibold text-foreground">{{ pillar.title }}</h3>
            <p class="text-sm text-muted-foreground leading-relaxed">{{ pillar.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Delivery -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 py-14">
      <div class="flex flex-col sm:flex-row gap-10 items-start">
        <div class="flex-1">
          <div class="inline-flex items-center gap-2 mb-4">
            <span class="text-nextstop-500 text-xl">📦</span>
            <h2 class="text-2xl font-bold text-foreground">Reliable Delivery Across Bangladesh</h2>
          </div>
          <p class="text-muted-foreground leading-relaxed mb-4">
            A great shopping experience doesn't end when you click <strong class="text-foreground">Place Order</strong>.
            It ends when your order arrives safely at your doorstep.
          </p>
          <p class="text-muted-foreground leading-relaxed">
            Whether you're ordering from Dhaka or another part of Bangladesh, we're working toward making online
            shopping
            more convenient, dependable, and accessible for everyone.
          </p>
        </div>
        <div class="w-full sm:w-64 rounded-lg border border-border bg-card p-5 shrink-0">
          <p class="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Platform features</p>
          <ul class="space-y-2.5">
            <li v-for="feat in features" :key="feat" class="flex items-center gap-2.5 text-sm text-foreground">
              <span class="text-nextstop-500 shrink-0">✓</span>
              {{ feat }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Why Business Club -->
    <section class="border-t border-border bg-muted/30">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        <h2 class="text-2xl font-bold text-foreground mb-2">Why "Business Club"?</h2>
        <p class="text-muted-foreground leading-relaxed mb-6 max-w-2xl">
          The name <span class="text-foreground font-medium">RH Business Club</span> represents where we want this
          platform to go.
          We don't want to remain just another online shop. Our vision is to build a broader ecosystem around commerce —
          one where customers can discover products, access exclusive value, and benefit from a more personalized
          shopping experience.
        </p>
        <div class="rounded-lg border border-border bg-card p-6">
          <p class="text-sm text-muted-foreground mb-4">Today we're focused on getting the fundamentals right:</p>
          <div class="flex flex-wrap gap-3">
            <span v-for="tag in clubTags" :key="tag.label"
              class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold border"
              :class="tag.classes">
              {{ tag.label }}
            </span>
          </div>
          <p class="text-sm text-muted-foreground mt-4">
            Tomorrow, the club can become much more.
          </p>
        </div>
      </div>
    </section>

    <!-- Promise -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 py-14">
      <h2 class="text-2xl font-bold text-foreground mb-2">Our Promise</h2>
      <p class="text-muted-foreground mb-8 leading-relaxed max-w-2xl">
        We don't promise perfection. We promise to keep improving. We listen to our customers, learn from every order,
        and continuously improve the products and experience we provide.
      </p>
      <div class="grid sm:grid-cols-2 gap-4">
        <div v-for="promise in promises" :key="promise"
          class="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3.5">
          <span class="text-quantum-500 mt-0.5 shrink-0 text-base">◆</span>
          <span class="text-sm font-medium text-foreground">{{ promise }}</span>
        </div>
      </div>
    </section>

    <!-- Built for Bangladesh + CTA -->
    <section class="border-t border-border">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        <div class="rounded-lg border border-border bg-card p-7 sm:p-10 text-center">
          <div class="text-3xl mb-4">🇧🇩</div>
          <h2 class="text-2xl font-bold text-foreground mb-3">Built for Bangladesh</h2>
          <p class="text-muted-foreground leading-relaxed max-w-xl mx-auto mb-2">
            From product selection to pricing and delivery, we're focused on creating an e-commerce experience that
            works
            for the realities of shopping in Bangladesh.
          </p>
          <blockquote class="my-6 text-foreground font-semibold text-[15px] italic">
            "To become a trusted destination for quality products and dependable online shopping across Bangladesh."
          </blockquote>
          <p class="text-muted-foreground text-sm mb-8">
            Every great marketplace starts with a few products and a simple idea. Ours started with the belief that
            online shopping in Bangladesh can be <span class="text-foreground font-medium">better, simpler, and more
              trustworthy.</span>
          </p>
          <p class="text-lg font-semibold text-foreground mb-6">
            Shop with confidence. Discover with curiosity. Stay for the value.
          </p>
          <div class="flex flex-wrap justify-center gap-3">
            <NuxtLink to="/products"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all">
              Explore Products
            </NuxtLink>
            <NuxtLink to="/DealsAndOffers"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border bg-background text-foreground text-sm font-semibold hover:bg-secondary active:scale-[0.98] transition-all">
              Deals &amp; Offers
            </NuxtLink>
            <NuxtLink to="/messages"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border bg-background text-foreground text-sm font-semibold hover:bg-secondary active:scale-[0.98] transition-all">
              Contact Us
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'About RH Business Club | Premium Online Shopping in Bangladesh',
  meta: [
    {
      name: 'description',
      content: 'Learn about RH Business Club, a premium e-commerce platform focused on quality products, great value, and reliable delivery across Bangladesh.',
    },
  ],
})

const pillars = [
  {
    icon: '⭐',
    iconBg: 'bg-quantum-500/10 text-quantum-500',
    title: 'Quality Comes First',
    body: "Every product earns its place. We're not interested in selling something simply because we can — we want you to come back because you trusted your first purchase.",
  },
  {
    icon: '💎',
    iconBg: 'bg-elegance-500/10 text-elegance-500',
    title: 'Value Without Compromise',
    body: "Premium doesn't always mean expensive. Value means getting the right product at a fair price — because a successful e-commerce experience is built around long-term trust.",
  },
  {
    icon: '🚚',
    iconBg: 'bg-nextstop-500/10 text-nextstop-500',
    title: 'Reliable Delivery',
    body: "A great experience doesn't end when you place your order. It ends when it arrives safely. Reliable delivery is a core part of what we promise.",
  },
]

const features = [
  'Discover products',
  'Compare your options',
  'Find valuable offers',
  'Save products for later',
  'Place orders conveniently',
  'Track your purchases',
  'Return to products you love',
]

const clubTags = [
  { label: 'Great Products', classes: 'bg-quantum-500/10 text-quantum-500 border-quantum-500/20' },
  { label: 'Fair Value', classes: 'bg-elegance-500/10 text-elegance-500 border-elegance-500/20' },
  { label: 'Reliable Service', classes: 'bg-nextstop-500/10 text-nextstop-500 border-nextstop-500/20' },
]

const promises = [
  'Quality products',
  'Fair value',
  'Reliable delivery',
  'Honest service',
  'A better shopping experience',
  'Continuous improvement',
]
</script>
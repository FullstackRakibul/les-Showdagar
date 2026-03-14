# Calcifer.shop - Quick Reference Guide

## New Features at a Glance

### 1. AppHeader Enhancements

#### Theme Settings (Popover)
```
Click: Theme Icon (Sun/Moon) → Popover Menu
├─ Light (Light theme)
├─ Dark (Dark theme)
└─ System (Use OS preference)
```

#### Font Selector
```
In same Popover below theme:
├─ Ubuntu (Premium - Google Font)
└─ System (Fallback)
```

#### Sign In Button
```
New button in header with User icon
→ Routes to /login
```

---

### 2. Ubuntu Font

**Loaded from Google Fonts**
- Default weight: 400 (Regular)
- Available weights: 300, 400, 500, 600, 700
- Fallback: System fonts (Apple → Segoe UI → Roboto)

**Applied to:**
- Entire HTML document
- Body element in CSS
- User can toggle back to system fonts

---

### 3. Checkout Flow

#### CartDropdown
```
Display: Product image + name + tagline
Controls: 
  ├─ Quantity: [-] [number] [+]
  ├─ Subtotal: Auto-calculated
  └─ Proceed to Checkout (button)
```

#### Checkout Page Layout
```
┌─────────────────────────────────┐
│        Complete Your Order      │ (Header)
├──────────────────┬──────────────┤
│                  │              │
│  Left (2/3):     │  Right (1/3):│
│  ├─ Order Review │  ├─ Summary  │
│  ├─ Delivery     │  ├─ Items    │
│  │   Form        │  ├─ Totals   │
│  └─ Payment      │  └─ CTA      │
│                  │   (sticky)   │
└──────────────────┴──────────────┘
```

#### Form Fields (Delivery)
```
Row 1: [Full Name] [Email]
Row 2: [Phone Number]
Row 3: [Street Address]
Row 4: [City] [Postal Code]
Row 5: [Country] [State/Province]
Row 6: [Delivery Notes] (textarea)
```

#### Payment Options
```
○ Credit/Debit Card
○ PayPal
```

#### Order Summary (Sticky)
```
Product: Calcifer
Quantity: 1
─────────────────
Subtotal: $1,299.99
Shipping: FREE (or $15)
Tax: $103.99
═════════════════
TOTAL: $1,403.98

[Complete Purchase] (button)
```

---

## Code Snippets

### Using Theme in Components
```typescript
// In AppHeader.vue (already done)
const theme = ref<'light' | 'dark' | 'system'>('dark')

const setTheme = (newTheme) => {
  theme.value = newTheme
  const html = document.documentElement
  if (newTheme === 'light') {
    html.classList.remove('dark')
  } else if (newTheme === 'dark') {
    html.classList.add('dark')
  }
  localStorage.setItem('theme', newTheme)
}
```

### Using Font in Components
```typescript
const setFont = (newFont) => {
  selectedFont.value = newFont
  const html = document.documentElement
  if (newFont === 'ubuntu') {
    html.style.fontFamily = '"Ubuntu", -apple-system, ...'
  }
  localStorage.setItem('font', newFont)
}
```

### Cart Operations
```typescript
// In any component
import { useProductStore } from '@/stores/products'
const productStore = useProductStore()

// Add to cart
productStore.addToCart(1)

// Remove from cart
productStore.removeFromCart(1)

// Get quantity
const qty = productStore.cartQuantity // computed

// Get total
const total = productStore.cartTotal // computed
```

---

## Files Modified

| File | Changes |
|------|---------|
| `app/components/AppHeader.vue` | Added theme popover, font selector, sign-in button |
| `nuxt.config.ts` | Added @nuxtjs/google-fonts, Ubuntu font config |
| `app/assets/css/tailwind.css` | Updated body font to Ubuntu |
| `app/components/CartDropdown.vue` | ✅ No changes (already optimized) |
| `app/pages/checkout.vue` | ✅ No changes (already optimized) |

---

## Keyboard Shortcuts (Future)

These can be added later:
```
Ctrl/Cmd + K  → Open theme settings
Ctrl/Cmd + L  → Toggle light mode
Ctrl/Cmd + D  → Toggle dark mode
Ctrl/Cmd + P  → Go to pre-order
```

---

## Browser Support

- **Theme Toggle**: All modern browsers (uses localStorage)
- **Google Fonts**: All modern browsers
- **Checkout Form**: All modern browsers with form validation
- **Popover**: shadcn-nuxt Popover component (cross-browser compatible)

---

## Mobile Experience

### Header (Mobile)
```
[Calcifer] [🌙] [🛒] [≡]
          ↓ (Theme popover)
```

### Checkout (Mobile)
```
[Delivery Form - Full Width]
[Payment Options - Full Width]
[Order Summary - Full Width Below]
```

---

## Performance Notes

- **Ubuntu Font**: Preloaded via Google Fonts (font-display: swap)
- **Theme localStorage**: ~100 bytes per user
- **Font localStorage**: ~50 bytes per user
- **No impact on Lenis smooth scroll** (maintained)

---

## Next Steps (Optional Enhancements)

1. Add "Clear preferences" button
2. Add keyboard shortcuts for theme toggle
3. Add font size adjuster
4. Add color contrast tester
5. Add terms & conditions checkbox on checkout
6. Add promo code field on checkout
7. Add order tracking after purchase


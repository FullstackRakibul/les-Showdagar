export function useClipAnimation() {
  function showToast(message: string) {
    if (typeof document === 'undefined') return
    const toast = document.createElement('div')
    toast.textContent = message
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      padding: 10px 16px;
      border-radius: 16px;
      background: rgba(15,23,42,0.95);
      color: white;
      font-size: 0.9rem;
      z-index: 10000;
      box-shadow: 0 12px 35px rgba(0,0,0,0.25);
      opacity: 0;
      transition: opacity 0.2s ease;
    `
    document.body.appendChild(toast)
    requestAnimationFrame(() => { toast.style.opacity = '1' })
    setTimeout(() => {
      toast.style.opacity = '0'
      setTimeout(() => toast.remove(), 250)
    }, 1600)
  }

  function flyToCart(sourceEl: HTMLElement) {
    if (typeof document === 'undefined') return
    const target = document.querySelector('[data-cart-target]')
    if (!target) {
      showToast('Added to cart')
      return
    }

    const src = sourceEl.getBoundingClientRect()
    const dst = target.getBoundingClientRect()
    if (!src.width || !dst.width) {
      showToast('Added to cart')
      return
    }

    const dot = document.createElement('div')
    dot.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: oklch(0.55 0.18 220);
      z-index: 9999;
      pointer-events: none;
      left: ${src.left + src.width / 2 - 10}px;
      top: ${src.top + src.height / 2 - 10}px;
      box-shadow: 0 2px 8px oklch(0.55 0.18 220 / 0.5);
    `
    document.body.appendChild(dot)

    requestAnimationFrame(() => {
      dot.style.transition = 'left 0.55s cubic-bezier(0.22,1,0.36,1), top 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.2s 0.35s, transform 0.2s 0.4s'
      dot.style.left = `${dst.left + dst.width / 2 - 10}px`
      dot.style.top = `${dst.top + dst.height / 2 - 10}px`
      dot.style.opacity = '0'
      dot.style.transform = 'scale(0.3)'
    })

    setTimeout(() => dot.remove(), 650)
  }

  return { flyToCart }
}

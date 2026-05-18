import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Category } from '@/types/index'

export const useCategoryStore = defineStore('categories', () => {
  const categories = ref<Category[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchCategories() {
    loading.value = true
    error.value = null
    try {
      const api = useApi()
      categories.value = await api<Category[]>('/categories')
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to load categories'
    } finally {
      loading.value = false
    }
  }

  function getCategoryBySlug(slug: string): Category | undefined {
    return categories.value.find(c => c.slug === slug)
  }

  return { categories, loading, error, fetchCategories, getCategoryBySlug }
})

// stores/items.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useItemsStore = defineStore('items', () => {
  // State
  const items = ref([])
  const item = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Actions
  const fetchItems = async (tableName) => {
    loading.value = true
    error.value = null

    try {
      const { $supabase } = useNuxtApp()
      const { data, error: supabaseError } = await $supabase
        .from(tableName)
        .select('*')

      if (supabaseError) {
        throw new Error(supabaseError.message)
      }

      items.value = data
      return data
    } catch (err) {
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }

  const fetchItem = async (tableName, id) => {
    loading.value = true
    error.value = null

    try {
      const { $supabase } = useNuxtApp()
      const { data, error: supabaseError } = await $supabase
        .from(tableName)
        .select('*')
        .eq('id', id)
        .single()

      if (supabaseError) {
        throw new Error(supabaseError.message)
      }

      item.value = data
      return data
    } catch (err) {
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    items,
    item,
    loading,
    error,
    fetchItems,
    fetchItem
  }
})
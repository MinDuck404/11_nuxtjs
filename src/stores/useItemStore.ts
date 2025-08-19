// stores/useItemStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useItemStore = defineStore('items', () => {
  // State
  const items = ref<any[]>([])
  const item = ref<any | null>(null)
  const groupedItems = ref<Record<string, any[]>>({})
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Danh sách các table được phép truy cập
  const ALLOWED_TABLES = ['homepage_sections', 'homepage_items']

  // Hàm kiểm tra table hợp lệ
  const validateTable = (table: string) => {
    if (!ALLOWED_TABLES.includes(table)) {
      throw new Error(`Table '${table}' is not allowed. Allowed tables: ${ALLOWED_TABLES.join(', ')}`)
    }
  }

  // Lấy danh sách records
  const fetchItems = async (table: string, options: any = {}) => {
    const { 
      onlyReturn = false, 
      orderBy = 'id', 
      ascending = true, 
      limit,
      offset,
      filters = {},
      range 
    } = options

    validateTable(table)
    
    loading.value = true
    error.value = null

    try {
      const { $supabase } = useNuxtApp()
      
      let query = $supabase
        .from(table)
        .select('*')
        .order(orderBy, { ascending })

      // Áp dụng filters nếu có
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          query = query.eq(key, value)
        }
      })

      // Áp dụng range hoặc limit
      if (range) {
        query = query.range(range.from, range.to)
      } else if (limit) {
        query = query.limit(limit)
        if (offset) {
          query = query.range(offset, offset + limit - 1)
        }
      } else {
        // Mặc định lấy nhiều hơn nếu không chỉ định limit
        query = query.limit(1000)
      }

      const { data, error: err } = await query

      if (err) {
        error.value = err.message
        console.error('Fetch items error:', err)
        return onlyReturn ? null : undefined
      }

      const result = data || []

      if (onlyReturn) {
        return result
      }

      items.value = result
      return result

    } catch (err: any) {
      error.value = err.message || 'An unexpected error occurred'
      console.error('Fetch items error:', err)
      return onlyReturn ? null : undefined
    } finally {
      loading.value = false
    }
  }

  // Lấy chi tiết 1 record theo ID
  const fetchItem = async (table: string, id: number | string, options: any = {}) => {
    const { onlyReturn = false, select = '*' } = options

    validateTable(table)
    
    if (!id) {
      error.value = 'ID is required'
      return onlyReturn ? null : undefined
    }

    loading.value = true
    error.value = null

    try {
      const { $supabase } = useNuxtApp()
      
      const { data, error: err } = await $supabase
        .from(table)
        .select(select)
        .eq('id', id)
        .single()

      if (err) {
        error.value = err.message
        console.error('Fetch item error:', err)
        return onlyReturn ? null : undefined
      }

      if (onlyReturn) {
        return data
      }

      item.value = data
      return data

    } catch (err: any) {
      error.value = err.message || 'An unexpected error occurred'
      console.error('Fetch item error:', err)
      return onlyReturn ? null : undefined
    } finally {
      loading.value = false
    }
  }

  // Lấy danh sách records và group theo field
  const fetchItemsGroupBy = async (table: string, groupByField: string, options: any = {}) => {
    const { 
      onlyReturn = false, 
      orderBy = 'order_index', 
      ascending = true, 
      filters = {} 
    } = options

    validateTable(table)
    
    loading.value = true
    error.value = null

    try {
      const { $supabase } = useNuxtApp()
      
      let query = $supabase
        .from(table)
        .select('*')
        .order(orderBy, { ascending })

      // Áp dụng filters nếu có
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          query = query.eq(key, value)
        }
      })

      // Lấy tất cả không giới hạn
      query = query.limit(1000)

      const { data, error: err } = await query

      if (err) {
        error.value = err.message
        console.error('Fetch items group by error:', err)
        return onlyReturn ? null : undefined
      }

      const result = data || []

      // Group by field sử dụng reduce (không cần lodash)
      const grouped = result.reduce((acc: Record<string, any[]>, item: any) => {
        const key = item[groupByField] || 'uncategorized'
        if (!acc[key]) {
          acc[key] = []
        }
        acc[key].push(item)
        return acc
      }, {})

      if (onlyReturn) {
        return grouped
      }

      items.value = result
      groupedItems.value = grouped
      return grouped

    } catch (err: any) {
      error.value = err.message || 'An unexpected error occurred'
      console.error('Fetch items group by error:', err)
      return onlyReturn ? null : undefined
    } finally {
      loading.value = false
    }
  }

  // Reset state
  const resetState = () => {
    items.value = []
    item.value = null
    groupedItems.value = {}
    loading.value = false
    error.value = null
  }

  // Clear error
  const clearError = () => {
    error.value = null
  }

  return {
    // State
    items,
    item,
    groupedItems,
    loading,
    error,
    
    // Actions
    fetchItems,
    fetchItem,
    fetchItemsGroupBy,
    resetState,
    clearError,
    
    // Getters (computed)
    hasItems: computed(() => items.value.length > 0),
    hasGroupedItems: computed(() => Object.keys(groupedItems.value).length > 0),
    hasError: computed(() => !!error.value),
    isLoading: computed(() => loading.value),
    groupedItemsCount: computed(() => Object.keys(groupedItems.value).length)
  }
})
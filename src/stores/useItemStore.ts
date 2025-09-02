// stores/useItemStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { PerformanceMonitor } from '@/utils/performance'

export const useItemStore = defineStore('items', () => {
  // State
  const items = ref<any[]>([])
  const item = ref<any | null>(null)
  const groupedItems = ref<Record<string, any[]>>({})
  const loading = ref(false)
  const error = ref<string | null>(null)
    // Homepage data cache
    const homepageSections = ref<any[]>([])
    const homepageItems = ref<any[]>([])
    const homepageLoaded = ref(false)

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
      homepageSections.value = []
      homepageItems.value = []
      homepageLoaded.value = false
  }

  // Clear error
  const clearError = () => {
    error.value = null
  }
  
  // Fetch multiple tables with Promise.all
  const fetchMultipleTables = async (tableQueries: Array<{table: string, options?: any}>) => {
    loading.value = true;
    error.value = null;
    
    try {
      const { $supabase } = useNuxtApp();
      
      // Validate all tables first
      tableQueries.forEach(query => validateTable(query.table));
      
      // Create promise array for parallel execution
      const promises = tableQueries.map(({table, options = {}}) => {
        const { 
          orderBy = 'id', 
          ascending = true, 
          limit = 1000,
          filters = {},
          select = '*'
        } = options;
        
        let query = $supabase
          .from(table)
          .select(select)
          .order(orderBy, { ascending })
          .limit(limit);

        // Apply filters
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            query = query.eq(key, value);
          }
        });

        return query;
      });

      // Execute all queries in parallel with Promise.all
      const results = await Promise.all(promises);
      
      // Process results and check for errors
      const processedResults: Record<string, any[]> = {};
      results.forEach((result, index) => {
        const queryInfo = tableQueries[index];
        if (!queryInfo) return;
        
        if (result.error) {
          throw new Error(`Error in table ${queryInfo.table}: ${result.error.message}`);
        }
        processedResults[queryInfo.table] = result.data || [];
      });
      
      console.log('✅ Multiple tables fetched successfully with Promise.all:', 
        Object.keys(processedResults).map(table => `${table}: ${processedResults[table]?.length || 0} records`).join(', ')
      );
      
      return processedResults;
      
    } catch (err: any) {
      error.value = err.message || 'An unexpected error occurred';
      console.error('Fetch multiple tables error:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // Optimized homepage data fetch with additional data
  const fetchAllHomepageData = async () => {
    const monitor = PerformanceMonitor.getInstance();
    
    if (homepageLoaded.value) return {
      sections: homepageSections.value,
      items: homepageItems.value
    };
    
    monitor.startTimer('fetchAllHomepageData');
    
    try {
      const results = await fetchMultipleTables([
        { 
          table: 'homepage_sections',
          options: { orderBy: 'id', ascending: true }
        },
        { 
          table: 'homepage_items',
          options: { orderBy: 'order_index', ascending: true }
        }
      ]);
      
      homepageSections.value = results.homepage_sections || [];
      homepageItems.value = results.homepage_items || [];
      homepageLoaded.value = true;
      
      const duration = monitor.endTimer('fetchAllHomepageData');
      monitor.logApiCall('fetchAllHomepageData', duration);
      
      return {
        sections: homepageSections.value,
        items: homepageItems.value
      };
      
    } catch (err: any) {
      monitor.endTimer('fetchAllHomepageData');
      console.error('Failed to fetch all homepage data:', err);
      throw err;
    }
  }

  return {
    // State
    items,
    item,
    groupedItems,
    loading,
    error,
      homepageSections,
      homepageItems,
      homepageLoaded,
    
    // Actions
    fetchItems,
    fetchItem,
    fetchItemsGroupBy,
    resetState,
    clearError,
    fetchMultipleTables,
    fetchAllHomepageData,    // Getters (computed)
    hasItems: computed(() => items.value.length > 0),
    hasGroupedItems: computed(() => Object.keys(groupedItems.value).length > 0),
    hasError: computed(() => !!error.value),
    isLoading: computed(() => loading.value),
    groupedItemsCount: computed(() => Object.keys(groupedItems.value).length)
  }
})
<template>
  <div class="container">
    <h1>Items List by Section</h1>
    
    <!-- Loading State -->
    <div v-if="itemStore.isLoading" class="loading">
      <p>Loading...</p>
    </div>
    
    <!-- Error State -->
    <div v-else-if="itemStore.hasError" class="error">
      <p>Error: {{ itemStore.error }}</p>
      <button @click="itemStore.clearError">Clear Error</button>
      <button @click="refreshItems">Retry</button>
    </div>
    
    <!-- Grouped Items -->
    <div v-else-if="itemStore.hasGroupedItems" class="grouped-items">
      <div class="controls">
        <button @click="refreshItems">Refresh</button>
        <button @click="itemStore.resetState">Reset</button>
        <span class="stats">
          Total: {{ itemStore.items.length }} items in {{ itemStore.groupedItemsCount }} sections
        </span>
      </div>

      <!-- Loop through each section -->
      <div 
        v-for="(sectionItems, sectionKey) in itemStore.groupedItems" 
        :key="sectionKey"
        class="section-group"
      >
        <h2 class="section-title">
          {{ sectionNames[sectionKey] || sectionKey || 'Uncategorized' }} 
          <span class="section-count">({{ sectionItems.length }} items)</span>
        </h2>
        
        <div class="section-items">
          <div 
            v-for="item in sectionItems" 
            :key="item.id"
            @click="fetchItemDetail(item.id)"
            class="item-card"
          >
            <div class="item-header">
              <h3>{{ item.title || item.name || `Item #${item.id}` }}</h3>
              <span class="item-status" :class="`status-${item.status}`">
                Status: {{ item.status }}
              </span>
            </div>
            
            <p class="item-subtitle">{{ item.subtitle || 'No subtitle' }}</p>
            <p class="item-description">{{ item.description || 'No description available' }}</p>
            
            <div class="item-meta">
              <small>Order: {{ item.order_index || 0 }}</small>
              <small v-if="item.created_at">
                Created: {{ formatDate(item.created_at) }}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Empty State -->
    <div v-else class="empty-state">
      <p>No items found</p>
      <button @click="refreshItems">Load Items</button>
    </div>

    <!-- Item Detail Modal -->
    <div v-if="selectedItem" class="modal-overlay" @click="selectedItem = null">
      <div class="modal-content" @click.stop>
        <h2>Item Detail</h2>
        <div class="item-detail">
          <p><strong>ID:</strong> {{ selectedItem.id }}</p>
          <p><strong>Section:</strong> {{ sectionNames[selectedItem.section_id] || selectedItem.section_id || 'Uncategorized' }}</p>
          <p><strong>Title:</strong> {{ selectedItem.title }}</p>
          <p><strong>Subtitle:</strong> {{ selectedItem.subtitle }}</p>
          <p><strong>Order:</strong> {{ selectedItem.order_index }}</p>
          <p><strong>Status:</strong> {{ selectedItem.status }}</p>
          <p><strong>Created:</strong> {{ selectedItem.created_at }}</p>
        </div>
        <details class="raw-data">
          <summary>Raw JSON Data</summary>
          <pre>{{ JSON.stringify(selectedItem, null, 2) }}</pre>
        </details>
        <button @click="selectedItem = null">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const itemStore = useItemStore()
const selectedItem = ref<any | null>(null)
const sectionNames = ref<Record<string, string>>({})

const tableName = 'homepage_items'

// Fetch section names
const fetchSectionNames = async () => {
  try {
    const sections = await itemStore.fetchItems('homepage_sections', { onlyReturn: true })
    if (sections) { // Add null check
      sectionNames.value = sections.reduce((acc: Record<string, string>, section: any) => {
        acc[section.id] = section.name || `Section ${section.id}` // Assuming 'name' is the field for section name
        return acc
      }, {})
    } else {
      sectionNames.value = {} // Set to empty object if sections is null or undefined
    }
  } catch (error) {
    console.error('Failed to fetch section names:', error)
    sectionNames.value = {} // Handle error by setting to empty object
  }
}

// Load items and section names when component mounts
onMounted(async () => {
  await Promise.all([fetchSectionNames(), refreshItems()])
})

// Hàm refresh items với group by section_id
const refreshItems = async () => {
  try {
    console.log('Fetching items grouped by section_id...')
    
    await itemStore.fetchItemsGroupBy(tableName, 'section_id', {
      orderBy: 'order_index',
      ascending: true
    })
    
    console.log('Grouped items:', itemStore.groupedItems)
    console.log('Total items:', itemStore.items.length)
    
  } catch (error) {
    console.error('Failed to fetch items:', error)
  }
}

// Hàm lấy chi tiết item
const fetchItemDetail = async (id: number) => {
  try {
    const item = await itemStore.fetchItem(tableName, id, { onlyReturn: true })
    selectedItem.value = item
  } catch (error) {
    console.error('Failed to fetch item detail:', error)
  }
}

// Hàm format date
const formatDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString()
  } catch (error) {
    return 'Invalid date'
  }
}

// Watch for errors
watch(() => itemStore.error, (newError) => {
  if (newError) {
    console.error('Store error:', newError)
  }
})

// Cleanup khi component unmount
onUnmounted(() => {
  itemStore.resetState()
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.loading, .error, .empty-state {
  text-align: center;
  padding: 40px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  margin: 20px 0;
}

.error {
  border-color: #e74c3c;
  background-color: #fdf2f2;
}

.error button {
  margin: 0 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #e74c3c;
  color: white;
  cursor: pointer;
}

.controls {
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.controls button {
  padding: 8px 16px;
  border: 1px solid #3498db;
  background-color: #3498db;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.controls button:hover {
  background-color: #2980b9;
}

.stats {
  font-weight: bold;
  color: #666;
}

.section-group {
  margin-bottom: 40px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.section-title {
  background-color: #f8f9fa;
  padding: 15px 20px;
  margin: 0;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section-count {
  font-size: 0.8em;
  color: #666;
  font-weight: normal;
}

.section-items {
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.item-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: white;
}

.item-card:hover {
  border-color: #3498db;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

.item-header h3 {
  margin: 0;
  font-size: 1.1em;
  color: #333;
}

.item-status {
  font-size: 0.8em;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: bold;
}

.status-1 {
  background-color: #d4edda;
  color: #155724;
}

.status-0 {
  background-color: #f8d7da;
  color: #721c24;
}

.item-subtitle {
  font-weight: 600;
  color: #666;
  margin: 5px 0;
  font-size: 0.9em;
}

.item-description {
  color: #888;
  font-size: 0.85em;
  line-height: 1.4;
  margin: 10px 0;
}

.item-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.75em;
  color: #999;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #f0f0f0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  margin: 20px;
}

.item-detail {
  margin: 15px 0;
}

.item-detail p {
  margin: 8px 0;
  padding: 5px 0;
  border-bottom: 1px solid #f0f0f0;
}

.raw-data {
  margin: 15px 0;
}

.raw-data summary {
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 10px;
}

.raw-data pre {
  background-color: #f4f4f4;
  padding: 15px;
  border-radius: 4px;
  font-size: 12px;
  overflow-x: auto;
  max-height: 300px;
  overflow-y: auto;
}

.modal-content button {
  margin-top: 15px;
  padding: 8px 16px;
  border: none;
  background-color: #e74c3c;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
</style>
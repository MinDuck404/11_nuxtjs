<template>
  <div class="container">
    <h1>Items List</h1>
    
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
    
    <!-- Items List -->
    <div v-else-if="itemStore.hasItems" class="items-list">
      <div class="controls">
        <button @click="refreshItems">Refresh</button>
        <button @click="itemStore.resetState">Reset</button>
      </div>
      
      <ul>
        <li 
          v-for="item in itemStore.items" 
          :key="item.id"
          @click="fetchItemDetail(item.id)"
          class="item"
        >
          <strong>{{ item.name || item.title || `Item #${item.id}` }}</strong>
          <p>{{ item.description || 'No description available' }}</p>
        </li>
      </ul>
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
        <pre>{{ JSON.stringify(selectedItem, null, 2) }}</pre>
        <button @click="selectedItem = null">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const itemStore = useItemStore()
const selectedItem = ref<any | null>(null)

// Tên table
const tableName = 'homepage_sections'

// Load items khi component mount
onMounted(async () => {
  await refreshItems()
})

// Hàm refresh items
const refreshItems = async () => {
  try {
    await itemStore.fetchItems(tableName, {
      orderBy: 'created_at',
      ascending: false
      // limit: 50 
    })
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

// Watch for errors
watch(() => itemStore.error, (newError) => {
  if (newError) {
    console.error('Store error:', newError)
    // Có thể show toast notification ở đây
  }
})

// Cleanup khi component unmount
onUnmounted(() => {
  itemStore.resetState()
})
</script>

<style scoped>
.container {
  max-width: 800px;
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
  margin-bottom: 20px;
}

.controls button {
  margin-right: 10px;
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

.items-list ul {
  list-style: none;
  padding: 0;
}

.item {
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.item:hover {
  background-color: #f8f9fa;
  border-color: #3498db;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
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
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-content pre {
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 4px;
  font-size: 12px;
  overflow-x: auto;
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
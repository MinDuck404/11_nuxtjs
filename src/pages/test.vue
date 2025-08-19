<script setup>
import { useItemsStore } from '@/stores/useItemstore'

// Khởi tạo store
const itemsStore = useItemsStore()

// State từ store
const { items, item, loading, error } = itemsStore

// Hàm để lấy danh sách
const loadItems = async () => {
  await itemsStore.fetchItems('homepage_sections')
}

// Hàm để lấy chi tiết theo ID
const loadItem = async (id) => {
  await itemsStore.fetchItem('homepage_sections', id)
}

// Gọi lấy danh sách khi component được mount
onMounted(() => {
  loadItems()
})

// Ví dụ ID để lấy chi tiết (có thể thay đổi động)
const testId = ref(1)

// Hàm để gọi lấy chi tiết khi click button
const handleFetchItem = () => {
  loadItem(testId.value)
}
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Test Supabase with Pinia</h1>

    <!-- Trạng thái loading -->
    <div v-if="loading" class="text-center">
      <p>Loading...</p>
    </div>

    <!-- Hiển thị lỗi nếu có -->
    <div v-if="error" class="text-red-500 mb-4">
      <p>Error: {{ error }}</p>
    </div>

    <!-- Danh sách items -->
    <div v-if="items.length" class="mb-8">
      <h2 class="text-xl font-semibold mb-2">Items List</h2>
      <ul class="list-disc pl-5">
        <li v-for="item in items" :key="item.id" class="mb-2">
          {{ item.name || item.id }} <!-- Thay 'name' bằng trường thực tế trong bảng -->
        </li>
      </ul>
    </div>
    <div v-else-if="!loading && !error" class="mb-8">
      <p>No items found.</p>
    </div>

    <!-- Form để lấy chi tiết item -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-2">Fetch Item by ID</h2>
      <input
        v-model="testId"
        type="number"
        placeholder="Enter item ID"
        class="border p-2 mr-2"
      />
      <button
        @click="handleFetchItem"
        :disabled="loading"
        class="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        Fetch Item
      </button>
    </div>

    <!-- Hiển thị chi tiết item -->
    <div v-if="item" class="border p-4">
      <h2 class="text-xl font-semibold mb-2">Item Detail</h2>
      <p><strong>ID:</strong> {{ item.id }}</p>
      <p><strong>Name:</strong> {{ item.name || 'N/A' }}</p> <!-- Thay 'name' bằng trường thực tế -->
    </div>
    <div v-else-if="!loading && !error && testId" class="border p-4">
      <p>No item found for ID {{ testId }}.</p>
    </div>
  </div>
</template>

<!-- PerformanceDebug.vue - Component để debug performance -->
<template>
  <div v-if="showDebug" class="performance-debug" @click="toggleReport">
    <div class="debug-icon">⚡</div>
    <div v-if="showReport" class="debug-panel">
      <h3>Performance Monitor</h3>
      <div class="stats">
        <div class="stat">
          <span class="label">Total API Calls:</span>
          <span class="value">{{ stats.totalCalls }}</span>
        </div>
        <div class="stat">
          <span class="label">Total Time:</span>
          <span class="value">{{ stats.totalTime.toFixed(2) }}ms</span>
        </div>
        <div class="stat">
          <span class="label">Average Time:</span>
          <span class="value">{{ stats.averageTime.toFixed(2) }}ms</span>
        </div>
        <div class="stat">
          <span class="label">Data Loaded:</span>
          <span class="value" :class="{ 'success': isDataLoaded }">
            {{ isDataLoaded ? '✅' : '⏳' }}
          </span>
        </div>
      </div>
      <div class="calls-list">
        <h4>Recent API Calls:</h4>
        <div v-for="call in recentCalls" :key="call.timestamp" class="call-item">
          <span class="call-name">{{ call.name }}</span>
          <span class="call-duration">{{ call.duration.toFixed(2) }}ms</span>
        </div>
      </div>
      <button @click="clearStats" class="clear-btn">Clear Stats</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { PerformanceMonitor } from '@/utils/performance'
import { useHomepageData } from '@/composables/useHomepageData'

// Props
const props = defineProps({
  enabled: {
    type: Boolean,
    default: process.env.NODE_ENV === 'development'
  }
})

const showDebug = ref(props.enabled)
const showReport = ref(false)
const monitor = PerformanceMonitor.getInstance()
const { isDataLoaded } = useHomepageData()

// Reactive stats
const stats = ref(monitor.getApiCallStats())
const recentCalls = computed(() => stats.value.calls.slice(-5).reverse())

const toggleReport = () => {
  showReport.value = !showReport.value
  updateStats()
}

const updateStats = () => {
  stats.value = monitor.getApiCallStats()
}

const clearStats = () => {
  monitor.clear()
  updateStats()
}

// Update stats periodically
onMounted(() => {
  const interval = setInterval(updateStats, 1000)
  
  onUnmounted(() => {
    clearInterval(interval)
  })
})
</script>

<style scoped>
.performance-debug {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  font-family: monospace;
}

.debug-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  animation: pulse 2s infinite;
}

.debug-panel {
  position: absolute;
  top: 50px;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  min-width: 300px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  font-size: 12px;
}

.debug-panel h3 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 14px;
}

.debug-panel h4 {
  margin: 15px 0 5px 0;
  color: #666;
  font-size: 12px;
}

.stats {
  display: grid;
  gap: 8px;
  margin-bottom: 15px;
}

.stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 8px;
  background: #f8f9fa;
  border-radius: 4px;
}

.label {
  color: #666;
  font-weight: 500;
}

.value {
  color: #333;
  font-weight: bold;
}

.value.success {
  color: #28a745;
}

.calls-list {
  max-height: 120px;
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 8px;
  background: #fafafa;
}

.call-item {
  display: flex;
  justify-content: space-between;
  padding: 3px 0;
  border-bottom: 1px solid #eee;
  font-size: 11px;
}

.call-item:last-child {
  border-bottom: none;
}

.call-name {
  color: #495057;
  flex: 1;
  margin-right: 10px;
}

.call-duration {
  color: #007bff;
  font-weight: bold;
}

.clear-btn {
  width: 100%;
  padding: 8px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 11px;
  margin-top: 10px;
}

.clear-btn:hover {
  background: #c82333;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .debug-panel {
    background: #2d3748;
    border-color: #4a5568;
    color: #e2e8f0;
  }
  
  .stat {
    background: #4a5568;
  }
  
  .calls-list {
    background: #4a5568;
    border-color: #718096;
  }
  
  .call-item {
    border-bottom-color: #718096;
  }
}
</style>

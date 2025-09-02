<template>
  
    <Navbar/>
    <main>
      <slot />  
    </main>
    <Footer/>
    
    <!-- Performance Debug trong development mode -->
    <PerformanceDebug v-if="$config.public.DEV_MODE" />
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import PerformanceDebug from '@/components/PerformanceDebug.vue'
import { useItemStore } from '@/stores/useItemStore'

export default {
  components: { Navbar, Footer, PerformanceDebug },
  async mounted() {
    try {
      const itemStore = useItemStore();
      console.log('Starting homepage data fetch...');
      await itemStore.fetchAllHomepageData();
      console.log('All homepage data loaded successfully');
    } catch (error) {
      console.error('Failed to load homepage data:', error);
    }
  }
}
</script>


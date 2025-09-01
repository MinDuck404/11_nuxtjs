<template>
  
    <Navbar/>
    <main>
      <slot />  
    </main>
    <Footer/>
</template>

<script >
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { useItemStore } from '@/stores/useItemStore'

export default {
  components: { Navbar, Footer },
  mounted() {
    const itemStore = useItemStore();
    itemStore.fetchHomepageData();
  }
}
</script>


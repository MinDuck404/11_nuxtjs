// composables/useHomepageData.ts
import { computed } from 'vue'
import { useItemStore } from '@/stores/useItemStore'

export const useHomepageData = () => {
  const itemStore = useItemStore()

  // Computed values for different sections
  const heroSection = computed(() => itemStore.homepageSections.find(s => s.id === 3))
  const heroItem = computed(() => itemStore.homepageItems.find(i => i.section_id === 3))
  
  const clientsSection = computed(() => itemStore.homepageSections.find(s => s.id === 4))
  
  const servicesSection = computed(() => itemStore.homepageSections.find(s => s.id === 5))
  const serviceItems = computed(() => itemStore.homepageItems.filter(i => i.section_id === 5))
  
  const wedoSection = computed(() => itemStore.homepageSections.find(s => s.id === 6))
  const wedoItems = computed(() => itemStore.homepageItems.filter(i => i.section_id === 6))
  
  const whyUsSection = computed(() => itemStore.homepageSections.find(s => s.id === 7))
  const whyUsItems = computed(() => itemStore.homepageItems.filter(i => i.section_id === 7))
  const teamSection = computed(() => itemStore.homepageSections.find(s => s.id === 8))
  const teamItems = computed(() => itemStore.homepageItems.filter(i => i.section_id === 8))
  
  const projectsSection = computed(() => itemStore.homepageSections.find(s => s.id === 9))
  const projectItems = computed(() => itemStore.homepageItems.filter(i => i.section_id === 9))
  
  const testimonialsSection = computed(() => itemStore.homepageSections.find(s => s.id === 10))
  const testimonialItems = computed(() => itemStore.homepageItems.filter(i => i.section_id === 10))
  
  const faqSection = computed(() => itemStore.homepageSections.find(s => s.id === 11))
  const faqItems = computed(() => itemStore.homepageItems.filter(i => i.section_id === 11))

  // Loading and error states
  const isLoading = computed(() => itemStore.loading)
  const hasError = computed(() => !!itemStore.error)
  const error = computed(() => itemStore.error)
  const isDataLoaded = computed(() => itemStore.homepageLoaded)

  // Helper functions for checking data availability
  const hasData = (items: any[]) => items && items.length > 0
  
  return {
    // Section data
    heroSection,
    heroItem,
    clientsSection,
    servicesSection,
    serviceItems,
    wedoSection,
    wedoItems,
    whyUsSection,
    whyUsItems,
    teamSection,
    teamItems,
    projectsSection,
    projectItems,
    testimonialsSection,
    testimonialItems,
    faqSection,
    faqItems,
    // States
    isLoading,
    hasError,
    error,
    isDataLoaded,
    
    // Helpers
    hasData,
    
    // Store actions if needed
    store: itemStore
  }
}

<!-- FAQs.vue -->
<template>
  <section class="wrapper bg-light">
    <div class="container pt-6 pb-14 pb-md-16">
      <div class="row gx-lg-8 gx-xl-12 gy-10">
        <div class="col-lg-6 mb-0">
          <h2 class="fs-16 text-uppercase text-primary mb-4">FAQ</h2>
          <h3 v-if="section" class="display-3 mb-4">{{ section.title }}</h3>
          <h3 v-else class="display-3 mb-4">If you don't see an answer to your question, you can send us an email from our contact form.</h3>
          <p class="mb-6">Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Nullam quis risus eget urna mollis ornare.</p>
          <a href="#" class="btn btn-primary rounded-pill">All FAQ</a>
        </div>
        <!--/column -->
        <div class="col-lg-6">
          <ClientOnly>
            <div v-if="isLoading" class="text-center">Loading...</div>
            <div v-else-if="hasError" class="text-center text-danger">{{ error }}</div>
            <div v-else-if="!hasItems" class="text-center">No FAQs available.</div>
            <div v-else id="accordion-3" class="accordion-wrapper">
              <div v-for="(faq, index) in items" :key="faq.id" class="card accordion-item shadow-lg">
                <div class="card-header" :id="`accordion-heading-3-${index + 1}`">
                  <button 
                    :class="{ 'collapsed': activeAccordion !== index + 1 }" 
                    @click="toggleAccordion(index + 1)"
                    :aria-expanded="activeAccordion === index + 1"
                    :aria-controls="`accordion-collapse-3-${index + 1}`">
                    <span>{{ faq.title }}</span>
                    <span class="icon">+</span>
                  </button>
                </div>
                <!-- /.card-header -->
                <div 
                  :id="`accordion-collapse-3-${index + 1}`" 
                  :class="{ 'collapse': true, 'show': activeAccordion === index + 1 }" 
                  :aria-labelledby="`accordion-heading-3-${index + 1}`">
                  <div class="card-body">
                    <p>{{ faq.description }}</p>
                  </div>
                  <!-- /.card-body -->
                </div>
                <!-- /.collapse -->
              </div>
              <!-- /.card -->
            </div>
            <!-- /.accordion-wrapper -->
            <template #fallback>
              <!-- SSR fallback content -->
              <div class="text-center">Loading FAQs...</div>
            </template>
          </ClientOnly>
        </div>
        <!--/column -->
      </div>
      <!--/.row -->
    </div>
    <!-- /.container -->
    <div class="overflow-hidden">
      <div class="divider text-navy mx-n2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
          <path fill="currentColor"
            d="M1260,1.65c-60-5.07-119.82,2.47-179.83,10.13s-120,11.48-180,9.57-120-7.66-180-6.42c-60,1.63-120,11.21-180,16a1129.52,1129.52,0,0,1-180,0c-60-4.78-120-14.36-180-19.14S60,7,30,7H0v93H1440V30.89C1380.07,23.2,1319.93,6.15,1260,1.65Z">
          </path>
        </svg>
      </div>
    </div>
    <!-- /.overflow-hidden -->
  </section>
</template>

<script>
import { useItemStore } from '@/stores/useItemStore';

export default {
  name: 'FAQs',
  setup() {
    const itemStore = useItemStore();
    return { itemStore };
  },
  data() {
    return {
      activeAccordion: null,
      isTransitioning: false,
      section: null,
      // Add local state to handle SSR safely
      mounted: false
    };
  },
  computed: {
    items() {
      // Add null checks for SSR safety
      return this.itemStore?.items || [];
    },
    isLoading() {
      // Use 'loading' property from store, not 'isLoading'
      return this.mounted && (this.itemStore?.loading || false);
    },
    hasError() {
      return this.mounted && (this.itemStore?.hasError || false);
    },
    error() {
      return this.itemStore?.error || '';
    },
    hasItems() {
      return this.mounted && (this.itemStore?.hasItems || false);
    }
  },
  async mounted() {
    // Move API calls to mounted hook for client-side only execution
    this.mounted = true;
    
    try {
      // Fetch section data
      const sectionData = await this.itemStore.fetchItem('homepage_sections', 11, { onlyReturn: true });
      if (sectionData) {
        this.section = sectionData;
      }

      // Fetch FAQ items
      await this.itemStore.fetchItems('homepage_items', {
        filters: { section_id: 11 },
        orderBy: 'order_index',
        ascending: true
      });
    } catch (error) {
      console.error('Error fetching FAQ data:', error);
    }
  },
  methods: {
    toggleAccordion(index) {
      if (this.isTransitioning) return;
      
      if (this.activeAccordion === index) {
        this.closeAccordion();
        return;
      }
      
      if (this.activeAccordion !== null) {
        this.switchAccordion(index);
      } else {
        this.openAccordion(index);
      }
    },
    openAccordion(index) {
      this.isTransitioning = true;
      this.activeAccordion = index;
      
      this.$nextTick(() => {
        this.smoothOpen(index);
        setTimeout(() => {
          this.isTransitioning = false;
        }, 500);
      });
    },
    closeAccordion() {
      if (this.activeAccordion === null) return;
      
      this.isTransitioning = true;
      const currentIndex = this.activeAccordion;
      
      this.smoothClose(currentIndex);
      
      setTimeout(() => {
        this.activeAccordion = null;
        this.isTransitioning = false;
      }, 500);
    },
    switchAccordion(newIndex) {
      this.isTransitioning = true;
      const oldIndex = this.activeAccordion;
      
      this.smoothClose(oldIndex);
      
      setTimeout(() => {
        this.activeAccordion = newIndex;
        this.$nextTick(() => {
          this.smoothOpen(newIndex);
          setTimeout(() => {
            this.isTransitioning = false;
          }, 500);
        });
      }, 300);
    },
    smoothOpen(index) {
      const element = document.getElementById(`accordion-collapse-3-${index}`);
      if (element) {
        element.style.maxHeight = '0px';
        element.style.opacity = '0';
        
        element.offsetHeight;
        
        element.style.maxHeight = element.scrollHeight + 'px';
        element.style.opacity = '1';
        
        setTimeout(() => {
          if (this.activeAccordion === index) {
            element.style.maxHeight = 'none';
          }
        }, 500);
      }
    },
    smoothClose(index) {
      const element = document.getElementById(`accordion-collapse-3-${index}`);
      if (element) {
        element.style.maxHeight = element.scrollHeight + 'px';
        element.style.opacity = '1';
        
        element.offsetHeight;
        
        element.style.maxHeight = '0px';
        element.style.opacity = '0';
      }
    }
  },
  beforeUnmount() {
    this.isTransitioning = false;
    this.itemStore?.resetState?.(); // Safe call with optional chaining
  }
};
</script>

<style scoped>
/* Keep your existing styles */
.accordion-wrapper {
  all: initial;
  font-family: inherit;
}

.accordion-wrapper * {
  all: unset;
  display: revert;
  box-sizing: border-box;
}

.collapse {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transform: translateY(-10px);
}

.collapse.show {
  max-height: 1000px;
  opacity: 1;
  transform: translateY(0);
}

.card-body {
  transition: padding 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 1rem 1.25rem;
}

.card-header button {
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  background: transparent;
  width: 100%;
  text-align: left;
  padding: 0.75rem 1.25rem;
  font-weight: 500;
  border-radius: 0.375rem;
  font-size: 0.95rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  outline: none;
  box-shadow: none;
}

.card-header button::before,
.card-header button::after {
  display: none !important;
  content: none !important;
}

.card-header button[type],
.card-header button input {
  display: none !important;
}

.card-header button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(63, 120, 224, 0.2);
}

.card-header button:hover {
  background-color: #f8f9fa;
  transform: translateX(3px);
}

.card-header button:not(.collapsed) {
  color: #3f78e0;
  background-color: #f8f9fa;
  transform: translateX(3px);
}

.card-header button .icon {
  font-weight: bold;
  font-size: 1.1rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: rotate(0deg);
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-header button:not(.collapsed) .icon {
  transform: rotate(45deg);
  color: #3f78e0;
}

.card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  overflow: hidden;
}

.card-header {
  background: transparent;
  border: none;
  padding: 0;
}

.accordion-wrapper * {
  list-style: none;
}

.accordion-wrapper *::before,
.accordion-wrapper *::after {
  box-sizing: border-box;
}

.card:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.08) !important;
}

.card-body p {
  transition: all 0.3s ease 0.1s;
  line-height: 1.6;
}

@media (prefers-reduced-motion: reduce) {
  .collapse,
  .card-header button,
  .card-header button::after,
  .card {
    transition: none;
  }
}
</style>
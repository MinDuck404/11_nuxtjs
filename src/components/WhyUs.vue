<!-- WhyUs.vue -->
<template>
  <section class="wrapper bg-gradient-reverse-primary">
    <div class="container pb-14 pb-md-16">
      <div class="row gx-lg-8 gx-xl-12 gy-10 align-items-center">
        <div class="col-lg-7">
          <figure v-if="whyUsImage">
            <img
              class="img-auto"
              :src="whyUsImage.image_url"
              :srcset="whyUsImage.image_url + ' 2x'"
              :alt="whyUsImage.title || 'Why Us Illustration'"
            />
          </figure>
          <figure v-else>
            <img
              class="img-auto"
              src="/img/i22.png"
              srcset="/img/i22.png 2x"
              alt="Illustration"
            />
          </figure>
        </div>
        <div class="col-lg-5">
          <h2 class="fs-15 text-uppercase text-primary mb-3">Why Choose Us?</h2>
          <h3 v-if="solutionsSection" class="display-3 mb-7">
            {{ solutionsSection.title }}
          </h3>
          <h3 v-else class="display-3 mb-7">
            We bring solutions to make life easier.
          </h3>
          <div class="accordion accordion-wrapper" id="accordionExample">
            <div
              v-for="(item, index) in accordionItems"
              :key="index"
              class="card plain accordion-item"
            >
              <div class="card-header" :id="`heading${index}`">
                <button
                  class="accordion-button"
                  :class="{ collapsed: !item.isOpen }"
                  @click="toggleAccordion(index)"
                  :aria-expanded="item.isOpen"
                  :aria-controls="`collapse${index}`"
                >
                  {{ item.title }}
                </button>
              </div>
              <div
                :id="`collapse${index}`"
                class="accordion-collapse collapse"
                :class="{ show: item.isOpen }"
                :aria-labelledby="`heading${index}`"
                data-bs-parent="#accordionExample"
              >
                <div class="card-body">
                  <p>{{ item.content }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="overflow-hidden">
      <div class="divider text-light mx-n2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
          <path
            fill="currentColor"
            d="M1260,1.65c-60-5.07-119.82,2.47-179.83,10.13s-120,11.48-180,9.57-120-7.66-180-6.42c-60,1.63-120,11.21-180,16a1129.52,1129.52,0,0,1-180,0c-60-4.78-120-14.36-180-19.14S60,7,30,7H0v93H1440V30.89C1380.07,23.2,1319.93,6.15,1260,1.65Z"
          ></path>
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useItemStore } from '@/stores/useItemStore';

// Store instance
const itemStore = useItemStore();

// State for solutions section and image
const solutionsSection = ref(null);
const whyUsImage = ref(null);

// Dữ liệu cho accordion (tạm thời tĩnh)
const accordionItems = ref([
  {
    title: 'Professional Design',
    content:
      'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras mattis consectetur purus sit amet fermentum. Praesent commodo cursus magna, vel.',
    isOpen: true,
  },
  {
    title: 'Top-Notch Support',
    content:
      'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras mattis consectetur purus sit amet fermentum. Praesent commodo cursus magna, vel.',
    isOpen: false,
  },
  {
    title: 'Header and Slider Options',
    content:
      'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras mattis consectetur purus sit amet fermentum. Praesent commodo cursus magna, vel.',
    isOpen: false,
  },
]);

// Hàm toggle trạng thái accordion
const toggleAccordion = (index) => {
  accordionItems.value = accordionItems.value.map((item, i) => ({
    ...item,
    isOpen: i === index ? !item.isOpen : false,
  }));
};

// Fetch data
const fetchData = async () => {
  try {
    // Fetch solutions section
    const solutionsSectionData = await itemStore.fetchItem('homepage_sections', 7, { onlyReturn: true });
    if (solutionsSectionData) {
      solutionsSection.value = solutionsSectionData;
    }

    // Fetch why us image
    const imageData = await itemStore.fetchItems('homepage_items', {
      filters: { section_id: 7 },
      orderBy: 'order_index',
      ascending: true,
      onlyReturn: true,
      limit: 1 // Chỉ lấy 1 item vì hiện tại chỉ có 1 hình ảnh
    });
    if (imageData && imageData.length > 0) {
      whyUsImage.value = imageData[0];
    }
  } catch (error) {
    console.error('Failed to load solutions section or image:', error);
  }
};

// Khởi tạo khi component được mounted
onMounted(() => {
  fetchData();
});

// Dọn dẹp khi component bị unmounted
onUnmounted(() => {
  itemStore.resetState();
});
</script>

<style scoped>
.accordion-button {
  background: transparent;
  border: none;
  width: 100%;
  text-align: left;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 500;
  transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out, transform 0.2s ease;
}

.accordion-button:not(.collapsed) {
  color: #007bff;
  background-color: rgba(0, 123, 255, 0.05);
}

.accordion-button:hover {
  transform: translateX(5px);
}

.accordion-collapse {
  transition: height 0.6s ease-in-out, opacity 0.6s ease-in-out; /* Tăng thời gian lên 0.6s */
  opacity: 0;
}

.accordion-collapse.show {
  opacity: 1;
}

.card-body {
  padding: 1rem;
  transition: opacity 0.6s ease-in-out; /* Tăng thời gian lên 0.6s */
}
</style>
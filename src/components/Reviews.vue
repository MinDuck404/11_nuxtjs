<!-- Reviews.vue -->
<template>
    <section class="wrapper bg-gradient-primary">
        <div class="container pt-12 pt-lg-8 pb-14 pb-md-17">
            <div class="row text-center">
                <div class="col-lg-8 offset-lg-2">
                    <h2 class="fs-16 text-uppercase text-primary mb-3">Happy Customers</h2>
                    <h3 v-if="testimonialsSection" class="display-3 mb-10 px-xxl-10">
                        {{ testimonialsSection.title }}
                    </h3>
                    <h3 v-else class="display-3 mb-10 px-xxl-10">
                        Don't take our word for it. See what customers are saying about us.
                    </h3>
                </div>
            </div>
            
            <!-- Improved Grid Layout -->
            <div v-if="isLoadingReviews" class="text-center">Loading reviews...</div>
            <div v-else-if="hasErrorReviews" class="text-center text-danger">{{ errorReviews }}</div>
            <div v-else-if="!hasReviews" class="text-center">No reviews available.</div>
            <div v-else class="row gy-4 gx-4">
                <div class="col-md-6 col-lg-4" v-for="review in reviewItems" :key="review.id">
                    <div class="card shadow-lg h-100">
                        <div class="card-body d-flex flex-column">
                            <div class="ratings-stars mb-3">
                                <i class="star-icon">★</i>
                                <i class="star-icon">★</i>
                                <i class="star-icon">★</i>
                                <i class="star-icon">★</i>
                                <i class="star-icon">★</i>
                            </div>
                            <blockquote class="border-0 mb-0 flex-grow-1">
                                <p class="mb-4">"{{ review.description }}"</p>
                                <div class="blockquote-details mt-auto">
                                    <img class="rounded-circle avatar-img" 
                                         :src="review.image_url" 
                                         :srcset="review.image_url + ' 2x'" 
                                         :alt="review.title">
                                         
                                    <div class="info">
                                        <h5 class="mb-1">{{ review.title }}</h5>
                                        <p class="mb-0">{{ review.position || 'Customer' }}</p>
                                    </div>
                                </div>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useItemStore } from '@/stores/useItemStore';

// Store instance
const itemStore = useItemStore();

// State for testimonials section and items
const testimonialsSection = ref(null);
const reviewItems = ref([]);
const isLoadingReviews = ref(false);
const hasErrorReviews = ref(false);
const errorReviews = ref(null);
const hasReviews = computed(() => reviewItems.value.length > 0);

// Fetch data
const fetchData = async () => {
  try {
    // Fetch testimonials section
    isLoadingReviews.value = true;
    const testimonialsSectionData = await itemStore.fetchItem('homepage_sections', 10, { onlyReturn: true });
    if (testimonialsSectionData) {
      testimonialsSection.value = testimonialsSectionData;
    }

    // Fetch review items
    const reviewsData = await itemStore.fetchItems('homepage_items', {
      filters: { section_id: 10 },
      orderBy: 'order_index',
      ascending: true,
      onlyReturn: true
    });
    if (reviewsData) {
      reviewItems.value = reviewsData;
    } else {
      hasErrorReviews.value = true;
      errorReviews.value = itemStore.error || 'Failed to load reviews';
    }
  } catch (error) {
    hasErrorReviews.value = true;
    errorReviews.value = error.message || 'An error occurred';
  } finally {
    isLoadingReviews.value = false;
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
.card {
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.card:hover {
    transform: translateY(-2px);
    box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.15) !important;
}

/* Stars styling */
.ratings-stars {
    display: flex;
    gap: 2px;
}

.star-icon {
    color: #ffc107;
    font-size: 1.1rem;
    font-style: normal;
}

/* Avatar styling */
.avatar-img {
    width: 48px;
    height: 48px;
    object-fit: cover;
    flex-shrink: 0;
}

.blockquote-details {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.blockquote-details .info h5 {
    font-weight: 600;
    color: #343a40;
}

.blockquote-details .info p {
    color: #6c757d;
    font-size: 0.875rem;
}

/* Quote styling */
blockquote p {
    font-style: italic;
    color: #495057;
    line-height: 1.6;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .col-md-6 {
        margin-bottom: 1.5rem;
    }
    
    .avatar-img {
        width: 40px;
        height: 40px;
    }
}

@media (min-width: 992px) {
    .row.gy-4 {
        --bs-gutter-y: 2rem;
    }
}
</style>
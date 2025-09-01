<!-- Wedo.vue -->
<template>
  <!-- Section: What We Do -->
  <section class="wrapper bg-gradient-primary">
    <div class="container pt-12 pt-lg-8 pb-14 pb-md-17">
      <div class="row text-center">
        <div class="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
          <h2 class="fs-16 text-uppercase text-primary mb-3">What We Do?</h2>
          <h3 v-if="servicesSection" class="display-3 mb-10 px-xxl-10">
            {{ servicesSection.title }}
          </h3>
          <h3 v-else class="display-3 mb-10 px-xxl-10">
            The service we offer is specifically designed to meet your needs.
          </h3>
        </div>
      </div>
      <div v-if="isLoadingServices" class="text-center">Loading services...</div>
      <div v-else-if="hasErrorServices" class="text-center text-danger">{{ errorServices }}</div>
      <div v-else-if="!hasServices" class="text-center">No services available.</div>
      <div v-else class="row gx-lg-8 gx-xl-12 gy-11 px-xxl-5 text-center d-flex align-items-end">
        <div class="col-lg-4" v-for="service in serviceItems" :key="service.id">
          <div class="px-md-15 px-lg-3">
            <figure class="mb-6">
              <img class="img-fluid" :src="service.image_url" :srcset="service.image_url + ' 2x'" :alt="service.title" />
            </figure>
            <h3>{{ service.title }}</h3>
            <p class="mb-2">{{ service.description }}</p>
            <a :href="service.link_url" class="more hover">Learn More</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section: Our Strategy -->
  <section class="wrapper bg-light">
    <div class="container pb-14 pb-md-17">
      <div class="row gx-md-8 gx-xl-12 gy-10 align-items-center">
        <div class="col-lg-6 order-lg-2">
          <div v-if="isLoadingStrategy" class="text-center">Loading strategy...</div>
          <div v-else-if="hasErrorStrategy" class="text-center text-danger">{{ errorStrategy }}</div>
          <div v-else-if="!hasStrategySteps" class="text-center">No strategy steps available.</div>
          <div v-else class="card shadow-lg"
            :class="{ 'me-lg-6': index === 0, 'ms-lg-13 mt-6': index === 1, 'mx-lg-6 mt-6': index === 2 }"
            v-for="(step, index) in strategyItems" :key="step.id">
            <div class="card-body p-6">
              <div class="d-flex flex-row">
                <div>
                  <span class="icon btn btn-circle btn-lg btn-soft-primary pe-none me-4">
                    <span class="number">{{ String(index + 1).padStart(2, '0') }}</span>
                  </span>
                </div>
                <div>
                  <h4 class="mb-1">{{ step.title }}</h4>
                  <p class="mb-0">{{ step.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <h2 class="fs-16 text-uppercase text-primary mb-3">Our Strategy</h2>
          <h3 v-if="strategySection" class="display-3 mb-4">
            {{ strategySection.title }}
          </h3>
          <h3 v-else class="display-3 mb-4">
            Here are 3 working steps to organize our projects.
          </h3>
          <p>
            Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Etiam porta sem malesuada
            magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam quis risus eget urna
            mollis.
          </p>
          <p class="mb-6">
            Nullam id dolor id nibh ultricies vehicula ut id elit. Vestibulum id ligula porta felis euismod semper.
            Aenean lacinia bibendum nulla sed consectetur.
          </p>
          <a href="https://sandbox.elemisthemes.com/demo21.html#" class="btn btn-primary rounded-pill mb-0">Learn
            More</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const itemStore = useItemStore();
// Services section
const servicesSection = computed(() => itemStore.homepageSections.find(s => s.id === 5));
const serviceItems = computed(() => itemStore.homepageItems.filter(i => i.section_id === 5));
const isLoadingServices = computed(() => itemStore.loading);
const hasErrorServices = computed(() => !!itemStore.error);
const errorServices = computed(() => itemStore.error);
const hasServices = computed(() => serviceItems.value.length > 0);
// Strategy section
const strategySection = computed(() => itemStore.homepageSections.find(s => s.id === 6));
const strategyItems = computed(() => itemStore.homepageItems.filter(i => i.section_id === 6));
const isLoadingStrategy = computed(() => itemStore.loading);
const hasErrorStrategy = computed(() => !!itemStore.error);
const errorStrategy = computed(() => itemStore.error);
const hasStrategySteps = computed(() => strategyItems.value.length > 0);
</script>

<style scoped>
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.more.hover {
  transition: color 0.3s ease;
}

.more.hover:hover {
  color: var(--bs-primary);
}

.btn-primary {
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
}
</style>
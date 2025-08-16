<template>
  <!-- Section: What We Do -->
  <section class="wrapper bg-gradient-primary">
    <div class="container pt-12 pt-lg-8 pb-14 pb-md-17">
      <div class="row text-center">
        <div class="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
          <h2 class="fs-16 text-uppercase text-primary mb-3">What We Do?</h2>
          <h3 class="display-3 mb-10 px-xxl-10">
            The service we offer is specifically designed to meet your needs.
          </h3>
        </div>
      </div>
      <div class="row gx-lg-8 gx-xl-12 gy-11 px-xxl-5 text-center d-flex align-items-end">
        <div class="col-lg-4" v-for="(service, index) in services" :key="index">
          <div class="px-md-15 px-lg-3">
            <figure class="mb-6">
              <img
                class="img-fluid"
                :src="service.image"
 intra                :srcset="service.imageSrcset"
                :alt="service.title"
              />
            </figure>
            <h3>{{ service.title }}</h3>
            <p class="mb-2">{{ service.description }}</p>
            <a :href="service.link" class="more hover">Learn More</a>
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
          <div
            class="card shadow-lg"
            :class="{ 'me-lg-6': index === 0, 'ms-lg-13 mt-6': index === 1, 'mx-lg-6 mt-6': index === 2 }"
            v-for="(step, index) in strategySteps"
            :key="index"
          >
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
          <h3 class="display-3 mb-4">Here are 3 working steps to organize our projects.</h3>
          <p>
            Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam quis risus eget urna mollis.
          </p>
          <p class="mb-6">
            Nullam id dolor id nibh ultricies vehicula ut id elit. Vestibulum id ligula porta felis euismod semper. Aenean lacinia bibendum nulla sed consectetur.
          </p>
          <a href="https://sandbox.elemisthemes.com/demo21.html#" class="btn btn-primary rounded-pill mb-0">Learn More</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

// Dữ liệu cho services
const services = ref([
  {
    title: 'Web Design',
    description:
      'Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget. Fusce dapibus tellus.',
    image: '/img/i24.png',
    imageSrcset: '/img/i24.png 2x',
    link: 'https://sandbox.elemisthemes.com/demo21.html#',
  },
  {
    title: 'Graphic Design',
    description:
      'Maecenas faucibus mollis interdum. Vivamus sagittis lacus vel augue laoreet. Sed posuere consectetur.',
    image: '/img/i19.png',
    imageSrcset: '/img/i19.png 2x',
    link: 'https://sandbox.elemisthemes.com/demo21.html#',
  },
  {
    title: '3D Animation',
    description:
      'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Praesent commodo cursus magna scelerisque.',
    image: '/img/i18.png',
    imageSrcset: '/img/i18.png 2x',
    link: 'https://sandbox.elemisthemes.com/demo21.html#',
  },
]);

// Dữ liệu cho strategy steps
const strategySteps = ref([
  {
    title: 'Collect Ideas',
    description: 'Nulla vitae elit libero pharetra augue dapibus.',
  },
  {
    title: 'Data Analysis',
    description: 'Vivamus sagittis lacus vel augue laoreet.',
  },
  {
    title: 'Finalize Product',
    description: 'Cras mattis consectetur purus sit amet.',
  },
]);
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
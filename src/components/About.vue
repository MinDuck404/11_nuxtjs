<template>
  <section class="wrapper bg-light">
    <div class="container pt-12 pt-lg-8 pb-14 pb-md-16">
      <!-- Company Facts Section -->
      <div class="row gx-lg-8 gx-xl-12 gy-10 gy-lg-0 mb-11">
        <div class="col-lg-4 text-center text-lg-start">
          <h2 class="fs-16 text-uppercase text-primary mb-3">Company Facts</h2>
          <h3 class="display-3 mb-4 pe-xxl-5">We are proud of our design team</h3>
          <p class="mb-0 pe-xxl-11">
            Just sit back and relax while we take care of your business needs for you.
          </p>
        </div>

        <div class="col-lg-8 mt-lg-2">
          <div class="row align-items-center counter-wrapper gy-6 text-center">
            <div class="col-md-4">
              <div class="icon btn btn-circle btn-lg btn-soft-primary pe-none mb-4">
                <i class="uil uil-presentation-check"></i>
              </div>
              <h3 class="counter" style="visibility: visible;">1000+</h3>
              <p>Completed Projects</p>
            </div>

            <div class="col-md-4">
              <div class="icon btn btn-circle btn-lg btn-soft-primary pe-none mb-4">
                <i class="uil uil-user-check"></i>
              </div>
              <h3 class="counter" style="visibility: visible;">50K+</h3>
              <p>Happy Customers</p>
            </div>

            <div class="col-md-4">
              <div class="icon btn btn-circle btn-lg btn-soft-primary pe-none mb-4">
                <i class="uil uil-trophy"></i>
              </div>
              <h3 class="counter" style="visibility: visible;">20+</h3>
              <p>Awards Won</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Team Members Section -->
      <div class="row grid-view gy-6 gy-xl-0">
        <div class="col-md-6 col-xl-3" v-for="member in teamMembers" :key="member.id">
          <div class="card shadow-lg">
            <div class="card-body">
              <img 
                class="rounded-circle w-15 mb-4"
                :src="member.image"
                :srcset="member.imageSrcset"
                :alt="member.name"
              />
              <h4 class="mb-1">{{ member.name }}</h4>
              <div class="meta mb-2">{{ member.position }}</div>
              <p class="mb-2">{{ member.description }}</p>
              <nav class="nav social mb-0">
                <a 
                  v-for="social in member.socialLinks" 
                  :key="social.platform"
                  :href="social.url" 
                  @click.prevent="handleSocialClick(social.url)"
                >
                  <i :class="social.icon"></i>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Projects Section -->
    <div class="overflow-hidden">
      <div class="container pt-12 pt-lg-7 pb-14 pb-md-16">
        <div class="row">
          <div class="col-lg-10 col-xl-9 col-xxl-8 mx-auto text-center">
            <h2 class="fs-16 text-uppercase text-primary mb-3">Latest Projects</h2>
            <h3 class="display-3 mb-10">
              Check out some of our awesome projects with creative ideas and great design.
            </h3>
          </div>
        </div>

        <!-- Projects Carousel -->
        <div class="swiper-container grid-view nav-bottom nav-color mb-14">
          <div class="swiper overflow-visible" ref="projectsSwiper">
            <div class="swiper-wrapper">
              <div 
                class="swiper-slide" 
                v-for="project in projects" 
                :key="project.id"
                :style="{ width: '630px', marginRight: '30px' }"
              >
                <figure class="rounded mb-7">
                  <a :href="project.link" @click.prevent="handleProjectClick(project)">
                    <img 
                      :src="project.image"
                      :srcset="project.imageSrcset"
                      :alt="project.title"
                    />
                  </a>
                </figure>
                <div class="project-details d-flex justify-content-center flex-column">
                  <div class="post-header">
                    <h2 class="post-title h3">
                      <a 
                        :href="project.link" 
                        class="link-dark"
                        @click.prevent="handleProjectClick(project)"
                      >
                        {{ project.title }}
                      </a>
                    </h2>
                    <div class="post-category text-ash">{{ project.category }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation Controls -->
          <div class="swiper-controls">
            <div class="swiper-navigation">
              <div 
                class="swiper-button swiper-button-prev"
                :class="{ 'swiper-button-disabled': currentSlide === 0 }"
                @click="prevSlide"
                tabindex="0"
                role="button"
                aria-label="Previous slide"
              ></div>
              <div 
                class="swiper-button swiper-button-next"
                :class="{ 'swiper-button-disabled': currentSlide >= maxSlide }"
                @click="nextSlide"
                tabindex="0"
                role="button"
                aria-label="Next slide"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Decorative Divider -->
      <div class="divider text-soft-primary mx-n2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
          <path 
            fill="currentColor"
            d="M1260,1.65c-60-5.07-119.82,2.47-179.83,10.13s-120,11.48-180,9.57-120-7.66-180-6.42c-60,1.63-120,11.21-180,16a1129.52,1129.52,0,0,1-180,0c-60-4.78-120-14.36-180-19.14S60,7,30,7H0v93H1440V30.89C1380.07,23.2,1319.93,6.15,1260,1.65Z"
          />
        </svg>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'About',
  
  data() {
    return {
      currentSlide: 0,
      slidesPerView: 2, // Number of slides visible at once
      slideWidth: 660, // Width of each slide including margin
      
      // Team members data
      teamMembers: [
        {
          id: 1,
          name: 'Coriss Ambady',
          position: 'Financial Analyst',
          description: 'Fermentum massa justo sit amet risus morbi leo.',
          image: '/img/te1.jpg',
          imageSrcset: '/img/te1.jpg 2x',
          socialLinks: [
            { platform: 'twitter', url: '#', icon: 'uil uil-twitter' },
            { platform: 'facebook', url: '#', icon: 'uil uil-facebook-f' },
            { platform: 'dribbble', url: '#', icon: 'uil uil-dribbble' }
          ]
        },
        {
          id: 2,
          name: 'Cory Zamora',
          position: 'Marketing Specialist',
          description: 'Fermentum massa justo sit amet risus morbi leo.',
          image: '/img/te2.jpg',
          imageSrcset: '/img/te2.jpg 2x',
          socialLinks: [
            { platform: 'twitter', url: '#', icon: 'uil uil-twitter' },
            { platform: 'facebook', url: '#', icon: 'uil uil-facebook-f' },
            { platform: 'dribbble', url: '#', icon: 'uil uil-dribbble' }
          ]
        },
        {
          id: 3,
          name: 'Nikolas Brooten',
          position: 'Sales Manager',
          description: 'Fermentum massa justo sit amet risus morbi leo.',
          image: '/img/te3.jpg',
          imageSrcset: '/img/te3.jpg 2x',
          socialLinks: [
            { platform: 'twitter', url: '#', icon: 'uil uil-twitter' },
            { platform: 'facebook', url: '#', icon: 'uil uil-facebook-f' },
            { platform: 'dribbble', url: '#', icon: 'uil uil-dribbble' }
          ]
        },
        {
          id: 4,
          name: 'Jackie Sanders',
          position: 'Investment Planner',
          description: 'Fermentum massa justo sit amet risus morbi leo.',
          image: '/img/te4.jpg',
          imageSrcset: '/img/te4.jpg 2x',
          socialLinks: [
            { platform: 'twitter', url: '#', icon: 'uil uil-twitter' },
            { platform: 'facebook', url: '#', icon: 'uil uil-facebook-f' },
            { platform: 'dribbble', url: '#', icon: 'uil uil-dribbble' }
          ]
        }
      ],

      // Projects data
      projects: [
        {
          id: 1,
          title: 'Cras Fermentum Sem',
          category: 'Mobile Design',
          image: '/img/sp1.jpg',
          imageSrcset: '/img/sp1.jpg 2x',
          link: 'https://sandbox.elemisthemes.com/single-project.html'
        },
        {
          id: 2,
          title: 'Venenatis Euismod Vehicula',
          category: 'Web Design',
          image: '/img/sp2.jpg',
          imageSrcset: '/img/sp2.jpg 2x',
          link: 'https://sandbox.elemisthemes.com/single-project.html'
        },
        {
          id: 3,
          title: 'Tortor Tellus Cursus',
          category: 'Stationary',
          image: '/img/sp3.jpg',
          imageSrcset: '/img/sp3.jpg 2x',
          link: 'https://sandbox.elemisthemes.com/single-project.html'
        },
        {
          id: 4,
          title: 'Ridiculus Sem Parturient',
          category: 'Web Application',
          image: '/img/sp4.jpg',
          imageSrcset: '/img/sp4.jpg 2x',
          link: 'https://sandbox.elemisthemes.com/single-project.html'
        },
        {
          id: 5,
          title: 'Cursus Sollicitudin Adipiscing',
          category: 'Web Design',
          image: '/img/sp5.jpg',
          imageSrcset: '/img/sp5.jpg 2x',
          link: 'https://sandbox.elemisthemes.com/single-project.html'
        },
        {
          id: 6,
          title: 'Fringilla Quam Vulputate',
          category: 'Stationary',
          image: '/img/sp6.jpg',
          imageSrcset: '/img/sp6.jpg 2x',
          link: 'https://sandbox.elemisthemes.com/single-project.html'
        }
      ]
    }
  },

  computed: {
    maxSlide() {
      return Math.max(0, this.projects.length - this.slidesPerView);
    }
  },

  methods: {
    nextSlide() {
      if (this.currentSlide < this.maxSlide) {
        this.currentSlide++;
        this.updateSliderPosition();
      }
    },

    prevSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
        this.updateSliderPosition();
      }
    },

    updateSliderPosition() {
      const wrapper = this.$refs.projectsSwiper?.querySelector('.swiper-wrapper');
      if (wrapper) {
        const translateX = -this.currentSlide * this.slideWidth;
        wrapper.style.transform = `translate3d(${translateX}px, 0px, 0px)`;
      }
    },

    handleProjectClick(project) {
      // Handle project click - you can navigate to project detail or emit an event
      console.log('Project clicked:', project);
      this.$emit('project-selected', project);
      // If you want to navigate to the actual link:
      // window.open(project.link, '_blank');
    },

    handleSocialClick(url) {
      // Handle social media link clicks
      if (url !== '#') {
        window.open(url, '_blank');
      }
    },

    // Handle keyboard navigation
    handleKeydown(event) {
      if (event.key === 'ArrowLeft') {
        this.prevSlide();
      } else if (event.key === 'ArrowRight') {
        this.nextSlide();
      }
    }
  },

  methods: {
    nextSlide() {
      if (this.currentSlide < this.maxSlide) {
        this.currentSlide++;
        this.updateSliderPosition();
      }
    },

    prevSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
        this.updateSliderPosition();
      }
    },

    updateSliderPosition() {
      const wrapper = this.$refs.projectsSwiper?.querySelector('.swiper-wrapper');
      if (wrapper) {
        const translateX = -this.currentSlide * this.slideWidth;
        wrapper.style.transform = `translate3d(${translateX}px, 0px, 0px)`;
      }
    },

    handleProjectClick(project) {
      // Handle project click - you can navigate to project detail or emit an event
      console.log('Project clicked:', project);
      this.$emit('project-selected', project);
      // If you want to navigate to the actual link:
      // window.open(project.link, '_blank');
    },

    handleSocialClick(url) {
      // Handle social media link clicks
      if (url !== '#') {
        window.open(url, '_blank');
      }
    },

    // Handle keyboard navigation
    handleKeydown(event) {
      if (event.key === 'ArrowLeft') {
        this.prevSlide();
      } else if (event.key === 'ArrowRight') {
        this.nextSlide();
      }
    },

    addTouchSupport() {
      const slider = this.$refs.projectsSwiper;
      if (!slider) return;

      let startX = 0;
      let isDragging = false;

      slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
      });

      slider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
      });

      slider.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        
        if (Math.abs(diffX) > 50) { // Minimum swipe distance
          if (diffX > 0) {
            this.nextSlide();
          } else {
            this.prevSlide();
          }
        }
        
        isDragging = false;
      });

      // Mouse support for desktop
      slider.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isDragging = true;
        slider.style.cursor = 'grabbing';
      });

      document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
      });

      document.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        
        const endX = e.clientX;
        const diffX = startX - endX;
        
        if (Math.abs(diffX) > 50) {
          if (diffX > 0) {
            this.nextSlide();
          } else {
            this.prevSlide();
          }
        }
        
        isDragging = false;
        slider.style.cursor = 'grab';
      });
    }
  },

  mounted() {
    // Add keyboard event listener
    document.addEventListener('keydown', this.handleKeydown);
    
    // Initialize slider position
    this.$nextTick(() => {
      this.updateSliderPosition();
    });

    // Optional: Add touch/swipe support
    this.$nextTick(() => {
      this.addTouchSupport();
    });
  },

  beforeUnmount() {
    // Clean up event listener
    document.removeEventListener('keydown', this.handleKeydown);
  }
}
</script>

<style scoped>
.swiper-wrapper {
  transition: transform 0.3s ease;
  cursor: grab;
}

.swiper-wrapper:active {
  cursor: grabbing;
}

.swiper-button {
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.swiper-button:hover:not(.swiper-button-disabled) {
  opacity: 0.8;
}

.swiper-button-disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
}

.social a {
  transition: color 0.3s ease;
}

.social a:hover {
  color: var(--bs-primary);
}

.project-details a:hover {
  color: var(--bs-primary) !important;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .swiper-slide {
    width: 100% !important;
    margin-right: 15px !important;
  }
}
</style>
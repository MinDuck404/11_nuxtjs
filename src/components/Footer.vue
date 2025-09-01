<template>
  <footer class="bg-navy text-inverse">
    <div class="container pt-12 pt-lg-6 pb-13 pb-md-15">
      <div class="d-lg-flex flex-row align-items-lg-center">
        <h3 class="display-3 mb-6 mb-lg-0 pe-lg-20 pe-xl-22 pe-xxl-25 text-white">Join our community by using our
          services and grow your business.</h3>
        <a href="https://sandbox.elemisthemes.com/demo21.html#"
          class="btn btn-primary rounded-pill mb-0 text-nowrap">Try It For Free</a>
      </div>
      <!--/div -->
      <hr class="mt-11 mb-12">
      <div class="row gy-6 gy-lg-0">
        <div class="col-md-4 col-lg-3">
          <div class="widget">
            <img class="mb-4" src="../assets/img/logo-light.png"
              srcset="../assets/img/logo-light.png 2x" alt="">
            <p class="mb-4">© {{ currentYear }} Sandbox. <br class="d-none d-lg-block">All rights reserved.</p>
            <nav class="nav social social-white">
              <a 
                v-for="social in socialLinks" 
                :key="social.platform"
                :href="social.url"
                @click.prevent="handleSocialClick(social.url)"
              >
                <FontAwesomeIcon :icon="social.icon" />
              </a>
            </nav>
            <!-- /.social -->
          </div>
          <!-- /.widget -->
        </div>
        <!-- /column -->
        <div class="col-md-4 col-lg-3">
          <div class="widget">
            <h4 class="widget-title text-white mb-3">Get in Touch</h4>
            <address class="pe-xl-15 pe-xxl-17">{{ contactInfo.address }}</address>
            <a :href="`mailto:${contactInfo.email}`">{{ contactInfo.email }}</a><br> 
            {{ contactInfo.phone }}
          </div>
          <!-- /.widget -->
        </div>
        <!-- /column -->
        <div class="col-md-4 col-lg-3">
          <div class="widget">
            <h4 class="widget-title text-white mb-3">Learn More</h4>
            <ul class="list-unstyled mb-0">
              <li v-for="link in learnMoreLinks" :key="link.text">
                <a :href="link.url" @click.prevent="handleNavClick(link)">{{ link.text }}</a>
              </li>
            </ul>
          </div>
          <!-- /.widget -->
        </div>
        <!-- /column -->
        <div class="col-md-12 col-lg-3">
          <div class="widget">
            <h4 class="widget-title text-white mb-3">Our Newsletter</h4>
            <p class="mb-5">Subscribe to our newsletter to get our news &amp; deals delivered to you.</p>
            <div class="newsletter-wrapper">
              <!-- Newsletter Form -->
              <div id="newsletter-signup">
                <form @submit.prevent="handleNewsletterSubmit" class="validate dark-fields">
                  <div class="newsletter-form">
                    <div class="mc-field-group input-group form-floating">
                      <input 
                        type="email" 
                        v-model="newsletterEmail"
                        class="form-control"
                        placeholder="Email Address" 
                        id="newsletter-email"
                        required
                      >
                      <label for="newsletter-email">Email Address</label>
                      <button 
                        type="submit" 
                        class="btn btn-primary"
                        :disabled="isSubmitting"
                      >
                        {{ isSubmitting ? 'Joining...' : 'Join' }}
                      </button>
                    </div>
                    <div v-if="newsletterMessage" class="newsletter-message mt-2">
                      <div :class="messageClass">{{ newsletterMessage }}</div>
                    </div>
                  </div>
                </form>
              </div>
              <!--End newsletter signup-->
            </div>
            <!-- /.newsletter-wrapper -->
          </div>
          <!-- /.widget -->
        </div>
        <!-- /column -->
      </div>
      <!--/.row -->
    </div>
    <!-- /.container -->
  </footer>
  
  <!-- Back to Top Button -->
  <div class="progress-wrap" v-show="showBackToTop" @click="scrollToTop">
    <svg class="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
      <path 
        d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
        :style="progressStyle"
      ></path>
    </svg>
  </div>
</template>

<!-- Xóa <script> thường, chỉ giữ <script setup> -->

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

// Reactive data
const currentYear = new Date().getFullYear()
const newsletterEmail = ref('')
const isSubmitting = ref(false)
const newsletterMessage = ref('')
const showBackToTop = ref(false)
const scrollProgress = ref(0)

// Contact information
const contactInfo = ref({
  address: 'Moonshine St. 14/05 Light City, London, United Kingdom',
  email: 'info@email.com',
  phone: '00 (123) 456 78 90'
})

// Social media links
const socialLinks = ref([
  { 
    platform: 'twitter', 
    url: 'https://twitter.com/ttrgroup', 
    icon: ['fab', 'twitter'] 
  },
  { 
    platform: 'facebook', 
    url: 'https://facebook.com/ttrgroup', 
    icon: ['fab', 'facebook-f'] 
  },
  { 
    platform: 'dribbble', 
    url: 'https://dribbble.com/ttrgroup', 
    icon: ['fab', 'dribbble'] 
  },
  { 
    platform: 'instagram', 
    url: 'https://instagram.com/ttrgroup', 
    icon: ['fab', 'instagram'] 
  },
  { 
    platform: 'youtube', 
    url: 'https://youtube.com/ttrgroup', 
    icon: ['fab', 'youtube'] 
  }
])

// Learn more navigation links
const learnMoreLinks = ref([
  { text: 'About Us', url: '/about' },
  { text: 'Our Story', url: '/story' },
  { text: 'Projects', url: '/projects' },
  { text: 'Terms of Use', url: '/terms' },
  { text: 'Privacy Policy', url: '/privacy' }
])

// Computed properties
const messageClass = computed(() => {
  return newsletterMessage.value.includes('Success') ? 'text-success' : 'text-danger'
})

const progressStyle = computed(() => {
  const circumference = 307.919
  const offset = circumference - (scrollProgress.value / 100) * circumference
  return {
    'transition': 'stroke-dashoffset 10ms linear',
    'stroke-dasharray': `${circumference}, ${circumference}`,
    'stroke-dashoffset': offset
  }
})

// Methods
const handleSocialClick = (url) => {
  if (url && url !== '#') {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}

const handleNavClick = (link) => {
  // Navigate to internal route or external URL
  if (link.url.startsWith('http')) {
    window.open(link.url, '_blank', 'noopener,noreferrer')
  } else {
    // Use Vue Router for internal navigation
    // navigateTo(link.url) // Nuxt 3
    // or this.$router.push(link.url) // Vue Router
    console.log('Navigate to:', link.url)
  }
}

const handleNewsletterSubmit = async () => {
  if (!newsletterEmail.value) {
    newsletterMessage.value = 'Please enter a valid email address.'
    return
  }

  isSubmitting.value = true
  newsletterMessage.value = ''

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Here you would typically call your newsletter API
    // const response = await $fetch('/api/newsletter/subscribe', {
    //   method: 'POST',
    //   body: { email: newsletterEmail.value }
    // })
    
    newsletterMessage.value = 'Success! Thank you for subscribing to our newsletter.'
    newsletterEmail.value = ''
  } catch (error) {
    newsletterMessage.value = 'Error: Unable to subscribe. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

const updateScrollProgress = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
  const progress = (scrollTop / scrollHeight) * 100
  
  scrollProgress.value = Math.min(progress, 100)
  showBackToTop.value = scrollTop > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress)
  updateScrollProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress)
})
</script>

<style scoped>
.newsletter-form .input-group {
  position: relative;
}

.newsletter-form .form-control {
  padding-right: 80px;
}

.newsletter-form .btn {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.newsletter-message {
  font-size: 0.875rem;
}

.text-success {
  color: #28a745 !important;
}

.text-danger {
  color: #dc3545 !important;
}

.progress-wrap {
  position: fixed;
  right: 30px;
  bottom: 30px;
  height: 46px;
  width: 46px;
  cursor: pointer;
  display: block;
  border-radius: 50px;
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.2);
  z-index: 1000;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.progress-wrap:hover {
  opacity: 1;
}

.progress-wrap svg {
  transform: rotate(-90deg);
}

.progress-wrap svg path {
  fill: none;
  stroke: #fff;
  stroke-width: 4;
  stroke-miterlimit: 10;
}

.social a {
  transition: color 0.3s ease, transform 0.2s ease;
}

.social a:hover {
  transform: translateY(-2px);
  opacity: 0.8;
}

/* Dark theme adjustments */
.dark-fields .form-control {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.dark-fields .form-control:focus {
  background-color: rgba(255, 255, 255, 0.15);
  border-color: var(--bs-primary);
  color: #fff;
  box-shadow: 0 0 0 0.2rem rgba(var(--bs-primary-rgb), 0.25);
}

.dark-fields .form-control::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.dark-fields label {
  color: rgba(255, 255, 255, 0.8);
}
</style>
<template>
  <div>
    <DefaultLayout>
      <div class="wrapper bg-light">
        <div class="container pt-10 pt-md-14 pb-14 pb-md-16 text-center">
          <div class="row">
            <div class="col-12">
              <h1 class="display-1 mb-6">Test Page</h1>
              <p class="lead fs-lg mb-7">
                Đây là trang test cho Nuxt 4 với routing tự động
              </p>
              
              <!-- Test Components -->
              <div class="row gy-6 mt-10">
                <div class="col-md-6">
                  <div class="card shadow-lg">
                    <div class="card-body">
                      <div class="icon btn btn-circle btn-lg btn-soft-primary pe-none mb-4">
                        <i class="uil uil-rocket"></i>
                      </div>
                      <h4>Nuxt 4 Features</h4>
                      <p>Testing auto-routing và server components</p>
                    </div>
                  </div>
                </div>
                
                <div class="col-md-6">
                  <div class="card shadow-lg">
                    <div class="card-body">
                      <div class="icon btn btn-circle btn-lg btn-soft-primary pe-none mb-4">
                        <i class="uil uil-setting"></i>
                      </div>
                      <h4>Performance</h4>
                      <p>Improved performance với Nitro engine</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="mt-8">
                <NuxtLink to="/" class="btn btn-primary rounded-pill me-2">
                  Về trang chủ
                </NuxtLink>
                <button @click="testFunction" class="btn btn-outline-primary rounded-pill">
                  Test Function
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  </div>
</template>

<script setup>
import DefaultLayout from '@/layout/DefaultLayout.vue'

// Metadata cho trang với Nuxt 4
useSeoMeta({
  title: 'Test Page - Nuxt 4',
  description: 'Trang test cho ứng dụng Nuxt 4',
  ogTitle: 'Test Page',
  ogDescription: 'Testing Nuxt 4 routing capabilities'
})

// Test function
const testFunction = () => {
  console.log('Test function executed in Nuxt 4!')
  alert('Nuxt 4 routing đang hoạt động!')
}
</script>

<style scoped>
.container {
  min-height: 50vh;
}
</style>
<!-- Navbar.vue -->
<template>
  <nav class="navbar navbar-expand-lg classic transparent navbar-light">
    <div class="container flex-lg-row flex-nowrap align-items-center">
      <div class="navbar-brand w-100">
        <a href="#">
          <img src="/images/logo-dark.png"  alt="">
        </a>
      </div>
      <div class="navbar-collapse offcanvas offcanvas-nav offcanvas-start">
        <div class="offcanvas-header d-lg-none">
          <h3 class="text-white fs-30 mb-0">Sandbox</h3>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body ms-lg-auto d-flex flex-column h-100">
          <ul class="navbar-nav">
            <!-- Demos Section (Grid Layout) -->
            <li class="nav-item dropdown dropdown-mega" v-if="demos.length > 0">
              <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Demos</a>
              <ul class="dropdown-menu mega-menu mega-menu-dark mega-menu-img">
                <li class="mega-menu-content mega-menu-scroll">
                  <ul class="row row-cols-1 row-cols-lg-6 gx-0 gx-lg-4 gy-lg-2 list-unstyled">
                    <li class="col" v-for="demo in demos" :key="demo.id">
                      <a class="dropdown-item" :href="demo.link_url || '#'">
                        <figure class="rounded lift d-none d-lg-block">
                          <img :src="demo.image_url" :srcset="demo.image_url + ' 2x'" :alt="demo.description">
                        </figure>
                        <span class="d-lg-none">{{ demo.description || `Demo ${demo.id}` }}</span>
                      </a>
                    </li>
                  </ul>
                  <span class="d-none d-lg-flex">
                    <i class="uil uil-direction"></i><strong>Scroll to view more</strong>
                  </span>
                </li>
              </ul>
            </li>

            <!-- Pages Section (Nested Dropdowns) -->
            <li class="nav-item dropdown" v-if="pages.length > 0">
              <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Pages</a>
              <ul class="dropdown-menu">
                <template v-for="pageGroup in pageGroups" :key="pageGroup.description">
                  <li class="dropdown dropdown-submenu dropend">
                    <a class="dropdown-item dropdown-toggle" href="#" data-bs-toggle="dropdown">{{ pageGroup.title }}</a>
                    <ul class="dropdown-menu">
                      <li class="nav-item" v-for="item in pageGroup.items" :key="item.id">
                        <a class="dropdown-item" :href="item.link_url || '#'">{{ item.position || item.description || item.title }}</a>
                      </li>
                    </ul>
                  </li>
                </template>
              </ul>
            </li>

            <!-- Projects Section (Two-Column Layout) -->
            <li class="nav-item dropdown" v-if="projects.length > 0">
              <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Projects</a>
              <div class="dropdown-menu dropdown-lg">
                <div class="dropdown-lg-content">
                  <div>
                    <h6 class="dropdown-header">Project Pages</h6>
                    <ul class="list-unstyled">
                      <li v-for="item in projectPages" :key="item.id">
                        <a class="dropdown-item" :href="item.link_url || '#'">{{ item.position || item.description || item.title }}</a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h6 class="dropdown-header">Single Projects</h6>
                    <ul class="list-unstyled">
                      <li v-for="item in singleProjects" :key="item.id">
                        <a class="dropdown-item" :href="item.link_url || '#'">{{ item.position || item.description || item.title }}</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>

            <!-- Blog Section (Flat and Nested Items) -->
            <li class="nav-item dropdown" v-if="blogs.length > 0">
              <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Blog</a>
              <ul class="dropdown-menu">
                <li class="nav-item" v-for="blog in blogs" :key="blog.id">
                  <a class="dropdown-item" :href="blog.link_url || '#'">{{ blog.position || blog.description || blog.title }}</a>
                </li>
                <li class="dropdown dropdown-submenu dropend" v-if="blogPosts.length > 0">
                  <a class="dropdown-item dropdown-toggle" href="#" data-bs-toggle="dropdown">Blog Posts</a>
                  <ul class="dropdown-menu">
                    <li class="nav-item" v-for="post in blogPosts" :key="post.id">
                      <a class="dropdown-item" :href="post.link_url || '#'">{{ post.position || post.description || post.title }}</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <!-- Blocks Section (Grid with SVG Icons) -->
            <li class="nav-item dropdown dropdown-mega" v-if="blocks.length > 0">
              <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Blocks</a>
              <ul class="dropdown-menu mega-menu mega-menu-dark mega-menu-img">
                <li class="mega-menu-content">
                  <ul class="row row-cols-1 row-cols-lg-6 gx-0 gx-lg-6 gy-lg-4 list-unstyled">
                    <li class="col" v-for="block in blocks" :key="block.id">
                      <a class="dropdown-item" :href="block.link_url || '#'">
                        <div class="rounded img-svg d-none d-lg-block p-4 mb-lg-2">
                          <img class="rounded-0" :src="block.image_url || '/images/block1.svg'" :alt="block.description || block.title">
                
                          
                        </div>
                        <span>{{ block.description || block.title }}</span>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <!-- Documentation Section (Two-Column Layout) -->
            <li class="nav-item dropdown dropdown-mega" v-if="documentation.length > 0">
              <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Documentation</a>
              <ul class="dropdown-menu mega-menu">
                <li class="mega-menu-content">
                  <div class="row gx-0 gx-lg-3">
                    <div class="col-lg-4">
                      <h6 class="dropdown-header">Usage</h6>
                      <ul class="list-unstyled cc-2 pb-lg-1">
                        <li v-for="item in usageItems" :key="item.id">
                          <a class="dropdown-item" :href="item.link_url || '#'">{{ item.position || item.description || item.title }}</a>
                        </li>
                      </ul>
                      <h6 class="dropdown-header mt-lg-6">Styleguide</h6>
                      <ul class="list-unstyled cc-2">
                        <li v-for="item in styleguideItems" :key="item.id">
                          <a class="dropdown-item" :href="item.link_url || '#'">{{ item.position || item.description || item.title }}</a>
                        </li>
                      </ul>
                    </div>
                    <div class="col-lg-8">
                      <h6 class="dropdown-header">Elements</h6>
                      <ul class="list-unstyled cc-3">
                        <li v-for="item in elementsItems" :key="item.id">
                          <a class="dropdown-item" :href="item.link_url || '#'">{{ item.position || item.description || item.title }}</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
          <!-- /.navbar-nav -->
          <div class="offcanvas-footer d-lg-none">
            <div>
              <a href="mailto:first.last@email.com" class="link-inverse">info@email.com</a>
              <br> 00 (123) 456 78 90 <br>
              <nav class="nav social social-white mt-4">
                <a href="#"><i class="uil uil-twitter"></i></a>
                <a href="#"><i class="uil uil-facebook-f"></i></a>
                <a href="#"><i class="uil uil-dribbble"></i></a>
                <a href="#"><i class="uil uil-instagram"></i></a>
                <a href="#"><i class="uil uil-youtube"></i></a>
              </nav>
            </div>
          </div>
          <!-- /.offcanvas-footer -->
        </div>
        <!-- /.offcanvas-body -->
      </div>
      <!-- /.navbar-collapse -->
      <div class="navbar-other ms-lg-4">
        <ul class="navbar-nav flex-row align-items-center ms-auto">
          <li class="nav-item d-none d-md-block">
            <a href="./contact.html" class="btn btn-sm btn-primary rounded-pill">Contact</a>
          </li>
          <li class="nav-item d-lg-none">
            <button class="hamburger offcanvas-nav-btn"><span></span></button>
          </li>
        </ul>
        <!-- /.navbar-nav -->
      </div>
      <!-- /.navbar-other -->
    </div>
    <!-- /.container -->
  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useItemStore } from '@/stores/useItemStore';

// Store instance
const itemStore = useItemStore();

// State for navigation items
const navItems = ref([]);
const isLoadingNav = ref(false);
const hasErrorNav = ref(false);
const errorNav = ref(null);

// Computed properties to separate items by category
const demos = computed(() => navItems.value.filter(item => item.title === 'Demos'));
const pages = computed(() => navItems.value.filter(item => ['Pages', 'Services', 'About', 'Shop', 'Contact', 'Career', 'Utility'].includes(item.title)));
const projects = computed(() => navItems.value.filter(item => item.title === 'Projects'));
const blogs = computed(() => navItems.value.filter(item => item.title === 'Blog' && !item.description?.includes('Posts')));
const blogPosts = computed(() => navItems.value.filter(item => item.title === 'Blog' && item.description?.includes('Posts')));
const blocks = computed(() => navItems.value.filter(item => item.title === 'Blocks'));
const documentation = computed(() => navItems.value.filter(item => item.title === 'Documentation' || item.title === 'Elements'));

// Pages grouped by category
const pageGroups = computed(() => {
  const groups = {};
  pages.value.forEach(item => {
    const groupTitle = item.title;
    if (!groups[groupTitle]) groups[groupTitle] = { title: groupTitle, items: [] };
    groups[groupTitle].items.push(item);
  });
  return Object.values(groups).map(group => ({
    title: group.title === 'Pages' ? group.items[0].description || group.title : group.title,
    items: group.items
  }));
});

// Projects split into Project Pages and Single Projects
const projectPages = computed(() => projects.value.filter(item => item.description === 'Project Pages'));
const singleProjects = computed(() => projects.value.filter(item => item.description === 'Single Projects'));

// Documentation split into Usage, Styleguide, and Elements
const usageItems = computed(() => documentation.value.filter(item => item.position === 'Get Started' || item.description === 'Usage'));
const styleguideItems = computed(() => documentation.value.filter(item => ['Colors', 'Fonts', 'Icons SVG', 'Icons Font', 'Illustrations', 'Backgrounds', 'Misc'].some(desc => item.description?.includes(desc))));
const elementsItems = computed(() => documentation.value.filter(item => item.description === 'Elements'));

// Fetch navigation items
const fetchNavItems = async () => {
  try {
    isLoadingNav.value = true;
    const data = await itemStore.fetchItems('homepage_items', {
      filters: { section_id: 1 },
      orderBy: 'order_index',
      ascending: true,
      onlyReturn: true
    });
    if (data) {
      navItems.value = data;
    } else {
      hasErrorNav.value = true;
      errorNav.value = itemStore.error || 'Failed to load navigation items';
    }
  } catch (error) {
    hasErrorNav.value = true;
    errorNav.value = error.message || 'An error occurred';
  } finally {
    isLoadingNav.value = false;
  }
};

// Initialize on component mount
onMounted(() => {
  fetchNavItems();
});


</script>

<style scoped>
.dropdown-item img {
  height: 100px;
  object-fit: cover;
}
.img-svg img {
  width: 50px;
  height: 50px;
}

.dropdown-item img {
  height: 100px;
  width: 100%;
  object-fit: contain; /* hoặc object-fit: cover nếu muốn cắt ảnh */
  display: block;
}
.img-svg img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* hoặc cover */
  display: block;
}
</style>
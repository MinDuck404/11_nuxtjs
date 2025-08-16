<template>
    <section class="wrapper bg-light">
        <div class="container pt-6 pb-14 pb-md-16">
            <div class="row gx-lg-8 gx-xl-12 gy-10">
                <div class="col-lg-6 mb-0">
                    <h2 class="fs-16 text-uppercase text-primary mb-4">FAQ</h2>
                    <h3 class="display-3 mb-4">If you don't see an answer to your question, you can send us an email
                        from our contact form.</h3>
                    <p class="mb-6">Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio
                        sem nec elit. Nullam quis risus eget urna mollis ornare.</p>
                    <a href="#" class="btn btn-primary rounded-pill">All FAQ</a>
                </div>
                <!--/column -->
                <div class="col-lg-6">
                    <div id="accordion-3" class="accordion-wrapper">
                        <div class="card accordion-item shadow-lg">
                            <div class="card-header" id="accordion-heading-3-1">
                                <button 
                                    :class="{ 'collapsed': activeAccordion !== 1 }" 
                                    @click="toggleAccordion(1)"
                                    :aria-expanded="activeAccordion === 1"
                                    aria-controls="accordion-collapse-3-1">
                                    <span>How do I get my subscription receipt?</span>
                                    <span class="icon">+</span>
                                </button>
                            </div>
                            <!-- /.card-header -->
                            <div 
                                id="accordion-collapse-3-1" 
                                :class="{ 'collapse': true, 'show': activeAccordion === 1 }" 
                                aria-labelledby="accordion-heading-3-1">
                                <div class="card-body">
                                    <p>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut
                                        fermentum massa justo sit amet risus. Cras mattis consectetur purus sit amet
                                        fermentum. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                                        Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus
                                        mus. Donec sed odio dui. Cras justo odio, dapibus ac facilisis.</p>
                                </div>
                                <!-- /.card-body -->
                            </div>
                            <!-- /.collapse -->
                        </div>
                        <!-- /.card -->
                        
                        <div class="card accordion-item shadow-lg">
                            <div class="card-header" id="accordion-heading-3-2">
                                <button 
                                    :class="{ 'collapsed': activeAccordion !== 2 }" 
                                    @click="toggleAccordion(2)"
                                    :aria-expanded="activeAccordion === 2"
                                    aria-controls="accordion-collapse-3-2">
                                    <span>Are there any discounts for people in need?</span>
                                    <span class="icon">+</span>
                                </button>
                            </div>
                            <!-- /.card-header -->
                            <div 
                                id="accordion-collapse-3-2" 
                                :class="{ 'collapse': true, 'show': activeAccordion === 2 }" 
                                aria-labelledby="accordion-heading-3-2">
                                <div class="card-body">
                                    <p>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut
                                        fermentum massa justo sit amet risus. Cras mattis consectetur purus sit amet
                                        fermentum. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                                        Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus
                                        mus. Donec sed odio dui. Cras justo odio, dapibus ac facilisis.</p>
                                </div>
                                <!-- /.card-body -->
                            </div>
                            <!-- /.collapse -->
                        </div>
                        <!-- /.card -->
                        
                        <div class="card accordion-item shadow-lg">
                            <div class="card-header" id="accordion-heading-3-3">
                                <button 
                                    :class="{ 'collapsed': activeAccordion !== 3 }" 
                                    @click="toggleAccordion(3)"
                                    :aria-expanded="activeAccordion === 3"
                                    aria-controls="accordion-collapse-3-3">
                                    <span>Do you offer a free trial edit?</span>
                                    <span class="icon">+</span>
                                </button>
                            </div>
                            <!-- /.card-header -->
                            <div 
                                id="accordion-collapse-3-3" 
                                :class="{ 'collapse': true, 'show': activeAccordion === 3 }" 
                                aria-labelledby="accordion-heading-3-3">
                                <div class="card-body">
                                    <p>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut
                                        fermentum massa justo sit amet risus. Cras mattis consectetur purus sit amet
                                        fermentum. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                                        Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus
                                        mus. Donec sed odio dui. Cras justo odio, dapibus ac facilisis.</p>
                                </div>
                                <!-- /.card-body -->
                            </div>
                            <!-- /.collapse -->
                        </div>
                        <!-- /.card -->
                        
                        <div class="card accordion-item shadow-lg">
                            <div class="card-header" id="accordion-heading-3-4">
                                <button 
                                    :class="{ 'collapsed': activeAccordion !== 4 }" 
                                    @click="toggleAccordion(4)"
                                    :aria-expanded="activeAccordion === 4"
                                    aria-controls="accordion-collapse-3-4">
                                    <span>How do I reset my Account password?</span>
                                    <span class="icon">+</span>
                                </button>
                            </div>
                            <!-- /.card-header -->
                            <div 
                                id="accordion-collapse-3-4" 
                                :class="{ 'collapse': true, 'show': activeAccordion === 4 }" 
                                aria-labelledby="accordion-heading-3-4">
                                <div class="card-body">
                                    <p>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut
                                        fermentum massa justo sit amet risus. Cras mattis consectetur purus sit amet
                                        fermentum. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                                        Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus
                                        mus. Donec sed odio dui. Cras justo odio, dapibus ac facilisis.</p>
                                </div>
                                <!-- /.card-body -->
                            </div>
                            <!-- /.collapse -->
                        </div>
                        <!-- /.card -->
                    </div>
                    <!-- /.accordion-wrapper -->
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
export default {
  name: 'FAQs',
  data() {
    return {
      activeAccordion: null, // Theo dõi accordion nào đang mở
      isTransitioning: false // Tránh click liên tục khi đang animation
    }
  },
  methods: {
    toggleAccordion(index) {
      // Tránh click liên tục khi đang transition
      if (this.isTransitioning) return;
      
      // Nếu click vào accordion đang mở thì đóng nó
      if (this.activeAccordion === index) {
        this.closeAccordion();
        return;
      }
      
      // Nếu có accordion khác đang mở, đóng nó trước
      if (this.activeAccordion !== null) {
        this.switchAccordion(index);
      } else {
        // Không có accordion nào mở, mở cái mới
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
      
      // Đóng accordion cũ
      this.smoothClose(oldIndex);
      
      // Đợi animation đóng hoàn tất, sau đó mở cái mới
      setTimeout(() => {
        this.activeAccordion = newIndex;
        this.$nextTick(() => {
          this.smoothOpen(newIndex);
          setTimeout(() => {
            this.isTransitioning = false;
          }, 500);
        });
      }, 300); // Thời gian đóng accordion cũ
    },
    
    smoothOpen(index) {
      const element = document.getElementById(`accordion-collapse-3-${index}`);
      if (element) {
        // Reset styles trước
        element.style.maxHeight = '0px';
        element.style.opacity = '0';
        
        // Force reflow
        element.offsetHeight;
        
        // Animate mở
        element.style.maxHeight = element.scrollHeight + 'px';
        element.style.opacity = '1';
        
        // Sau khi animation xong, set maxHeight về auto để responsive
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
        // Set chiều cao hiện tại
        element.style.maxHeight = element.scrollHeight + 'px';
        element.style.opacity = '1';
        
        // Force reflow
        element.offsetHeight;
        
        // Animate đóng
        element.style.maxHeight = '0px';
        element.style.opacity = '0';
      }
    }
  },
  
  // Cleanup khi component bị hủy
  beforeUnmount() {
    this.isTransitioning = false;
  }
}
</script>

<style scoped>
/* Reset toàn bộ để tránh conflicts */
.accordion-wrapper {
  all: initial;
  font-family: inherit;
}

.accordion-wrapper * {
  all: unset;
  display: revert;
  box-sizing: border-box;
}

/* Animation mượt cho accordion */
.collapse {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transform: translateY(-10px);
}

.collapse.show {
  max-height: 1000px; /* Tăng để đảm bảo đủ không gian */
  opacity: 1;
  transform: translateY(0);
}

/* Animation cho card body */
.card-body {
  transition: padding 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 1rem 1.25rem;
}

/* Style cho button khi mở/đóng */
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

/* Reset tất cả pseudo-elements và input styles */
.card-header button::before,
.card-header button::after {
  display: none !important;
  content: none !important;
}

/* Reset any checkbox/input styling */
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

/* Icon mũi tên với animation mượt */
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

/* Animation cho card */
.card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  overflow: hidden;
}

/* Đảm bảo card-header không có bất kỳ styling lạ nào */
.card-header {
  background: transparent;
  border: none;
  padding: 0;
}

/* Reset bất kỳ list styling nào */
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

/* Fade in animation cho nội dung */
.card-body p {
  transition: all 0.3s ease 0.1s;
  line-height: 1.6;
}

/* Responsive animation */
@media (prefers-reduced-motion: reduce) {
  .collapse,
  .card-header button,
  .card-header button::after,
  .card {
    transition: none;
  }
}
</style>
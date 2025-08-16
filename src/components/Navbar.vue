<template>
  
    <nav class="navbar navbar-expand-lg classic transparent navbar-light navbar-clone fixed navbar-unstick">
    <div class="container flex-lg-row flex-nowrap align-items-center">
      <div class="navbar-brand w-100">
        <a href="https://sandbox.elemisthemes.com/index.html">
          <img src="../assets/img/logo-dark.png" alt="">
        </a>
      </div>
      <div class="navbar-collapse offcanvas offcanvas-nav offcanvas-start">
        <div class="offcanvas-body ms-lg-auto d-flex flex-column h-100">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#">Demos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Pages</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Projects</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Blog</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Blocks</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Documentation</a>
            </li>
          </ul>
          <!-- /.navbar-nav -->
        </div>
        <!-- /.offcanvas-body -->
      </div>
      <!-- /.navbar-collapse -->
      <div class="navbar-other ms-lg-4">
        <ul class="navbar-nav flex-row align-items-center ms-auto">
          <li class="nav-item d-none d-md-block">
            <a href="#" class="btn btn-sm btn-primary rounded-pill">Contact</a>
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
  <div class="content-wrapper">
    <header class="wrapper bg-light">
      <nav class="navbar navbar-expand-lg classic transparent navbar-light">
        <div class="container flex-lg-row flex-nowrap align-items-center">
          <div class="navbar-brand w-100">
            <a href="https://sandbox.elemisthemes.com/index.html">
              <img src="../assets/img/logo-dark.png"
                srcset="../assets/img/logo-dark.png 2x" alt="">
            </a>
          </div>
          <div class="navbar-collapse offcanvas offcanvas-nav offcanvas-start">
            <div class="offcanvas-header d-lg-none">
              <h3 class="text-white fs-30 mb-0">Sandbox</h3>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"
                aria-label="Close"></button>
            </div>
            <div class="offcanvas-body ms-lg-auto d-flex flex-column h-100">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" href="#">Demos</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Pages</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Projects</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Blog</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Blocks</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Documentation</a>
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
                  <!-- /.social -->
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
                <a href="#" class="btn btn-sm btn-primary rounded-pill">Contact</a>
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
      <!-- /.navbar -->
    </header>
    <!-- /header -->
  </div>

  
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'Navbar'
}
</script>
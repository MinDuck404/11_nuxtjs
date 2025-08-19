<template>
    <DefaultLayout>
    <Header />
    <Wedo />
    <WhyUs />
    <About />
    <Reviews />
    <FAQs />
    </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layout/DefaultLayout.vue';
import FAQs from '@/components/FAQs.vue';
import Reviews from "@/components/Reviews.vue";
import About from '@/components/About.vue';  
import WhyUs from '@/components/WhyUs.vue';
import Wedo from '@/components/Wedo.vue';
import Header from '@/components/Header.vue';

export default {
  components: {
    DefaultLayout,
    Header,
    Wedo,
    WhyUs,
    About,
    Reviews,
    FAQs,
  },
  name: 'Home'
}

</script>
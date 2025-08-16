<template>
    <DefaultLayout>
    <Reviews />
    
    <FAQs />
    </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layout/DefaultLayout.vue';
import FAQs from '@/components/FAQs.vue';
import Reviews from "@/components/Reviews.vue";

export default {
  components: {
    DefaultLayout,
    Reviews,
    FAQs,
  },
  name: 'Home'
}

</script>
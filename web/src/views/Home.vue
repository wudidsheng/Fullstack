<template>
  <div class="home">
    <swiper :options="swiperconifg">
      <swiperSlide>1</swiperSlide>
      <swiperSlide>2</swiperSlide>
      <swiperSlide>13</swiperSlide>
      <swiperSlide>15</swiperSlide>
      <div class="swiper-scrollbar"></div>
    </swiper>
  </div>
  
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperconifg:{
       autoplay:300,
        speed: 1000,
      }
    }
  }
};
</script>

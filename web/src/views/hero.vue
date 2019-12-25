<template>
  <div v-if="module">
    <div
      class="top d-flex ai-end mup"
      :style="{'background-image':`url(http://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/107/107-bigskin-1.jpg)`}"
    >
      <div class="titinfo d-flex d-x ml-1 pb-1" style="width:100%">
        <div class="color-white text-11 mb-0">{{module.title}}</div>
        <div class="color-white text-md fontweit">{{module.name}}</div>
        <div class="color-white text-11 mt-0">{{(module.position.map(v=>v.name)).join('/')}}</div>
        <div class="color-white text-11 mt-0 d-flex" v-if="module.Difficult">
          <span>难度:</span>
          <div class="sguer mr-0 bg-primary">{{module.Difficult.skill}}</div>
          <span>技能:</span>
          <div class="sguer mr-0 bg-blue">{{module.Difficult.attack}}</div>
          <span>生存:</span>
          <div class="sguer mr-0 bg-black">{{module.Difficult.save}}</div>
          <router-link tag="div" to="/" class="flex-1 pifu mr-1 color-grey">皮肤数 &gt; 1</router-link>
        </div>
      </div>
    </div>
    <!-- endtop -->
  <div class='bg-white d-flex  js-center'>
      <div class="mx-4 borderboto d-flex js-around  mt-1 pb-0 ai-center flex-1">
          <div class="text-13 color-grey-1 active pb-0">英雄初识</div>
          <div class="text-13 color-grey-1">进阶攻略</div>
      </div>
  </div>   
  <swiper>  
       <swiperSlide>
        <div class="px-1 py-1 bg-white">
            <div class="d-flex js-around">
                <div class="text-13 bg-grey p-0">英雄介绍视频</div>
                <div class="text-13 bg-grey ">一图识英雄</div>
            </div>
        </div> 
        </swiperSlide> 
       <swiperSlide>2</swiperSlide>
  </swiper>
  </div>
</template>
<script>
import imgss from "../assets/img/sw2.jpg";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  props: { id: String },
 components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      active:0,
      module: null,
      imgss: imgss
    };
  },
  created() {
    this.$http.get(`/hero/${this.id}`).then(data => {
      this.module = data.data;
    });
  }
};
</script>
<style lang="scss" scoped>
  .borderboto{
    border-bottom: 0.0385rem solid rgb(197, 196, 196); 
    &>div{
      border-bottom: 0.1538rem solid transparent;
      &.active{
          border-bottom: 0.1538rem solid #db9e3f;
      } 
    }
  }
.top {
  height: 50vw;
  background: #fff no-repeat center center;
  background-size: auto 100%;
  .titinfo {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  }
  .sguer {
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    border-radius: 0.5rem;
  }
  .pifu {
    text-align: right;
  }
}
</style>
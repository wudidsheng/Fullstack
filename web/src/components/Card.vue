<template>
  <div class="bg-white px-0">
    <div class="haed py-1 px-1 d-flex ai-center">
      <div :class="['iconfont mr-0',icon]"></div>
      <div class="flex-1 text-16 color-black">{{title}}</div>
      <div class="icon-more iconfont"></div>
    </div>
    <slot name="headr"></slot>
    <div>
      <!-- //导航 -->
      <div
        :key="icon"
        class="d-flex py-1 text-13 color-black fontweit js-around ai-center navsw"
        @click.capture="goswiper"
      >
        <span
          :class="['text-12 color-grey fontweit',active==i? 'active' : '',]"
          :data-index="i"
          v-for="(item,i) in  swipernav"
          :key="i"
        >{{item.name}}</span>
      </div>
      <!-- swipre -->
      <swiper :options="swiperconifg" ref="mySwiper">
        <swiperSlide v-for="(item,i) in swipernav" :key="i">
          <!-- <div class="d-flex d-x">
            <div class="d-flex px-1 ai-center" v-for="(item,ii) in item.list" :key="ii">
              <div
                class="flex-1 text-14 color-cont content pr-1"
              >{{item.carory}}{{item.content}}</div>
              <div class="color-cont text-12">{{item.time}}</div>
          </div>-->
          <slot :value="item" name="items"></slot>
          <!-- </div> -->
        </swiperSlide>
      </swiper>
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  props: {
    icon: String,
    title: String,
    swipernav: Array
  },
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      active: 0,
      swiperconifg: {
        autoHeight:true,
        on: {
          slideChangeTransitionEnd: () => {
            //this.swiper取到swiper对象
            this.setindex(this.swiper.activeIndex);
            // alert(this.activeIndex); //切换结束时，告诉我现在是第几个slide
          }
        }
        //   pagination: {
        //     this: this,
        //     el: ".navsw",
        //     type: "custom",
        //     renderCustom: function(swiper, current, total) {
        //       var customPaginationHtml = "";
        //       for (var i = 0; i < total; i++) {
        //         //判断哪个分页器此刻应该被激活
        //         if (i == current - 1) {
        //           customPaginationHtml +=
        //             '<span kye='+i+' class="swiper-pagination-customs pb-0 active" data-index=' +
        //             i +
        //             ">" +
        //             this.this.swipernav[i].name +
        //             "</span>";
        //         } else {
        //           customPaginationHtml +=
        //             '<span kye='+i+' class="swiper-pagination-customs pb-0" data-index=' +
        //             i +
        //             ">" +
        //             this.this.swipernav[i].name +
        //             "</span>";
        //         }
        //       }

        //       return customPaginationHtml;
        //     }
        //   }
      }
    };
  },
  mounted() {},
  methods: {
    setindex(i) {
      this.active = i;
    },
    goswiper(e) {
      console.log(e.target);
      if (e.target.dataset.index != undefined) {
        this.active = e.target.dataset.index;
        this.swiper.slideTo(e.target.dataset.index, 1000, false);
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  }
};
</script>

<style lang='scss'>
.haed {
  border-bottom: 0.1538rem solid #f3f3f3;
}
.navsw {
  & > span {
    display: inline-block;
    border-bottom: 0.1538rem solid transparent;
    &.active {
      color: rgb(219, 158, 63) !important;
      border-color: rgb(219, 158, 63) !important;
      background-color: transparent !important;
    }
  }
}
.content {
  line-height: 2.5em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
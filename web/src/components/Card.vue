<template>
  <div class="bg-white px-0">
    <div class="haed py-1 px-1 d-flex ai-center">
      <div class="icon-icon-- iconfont mr-0"></div>
      <div class="flex-1 text-16 color-black">新闻资讯</div>
      <div class="icon-more iconfont"></div>
    </div>
    <div>
      <!-- //导航 -->
      <div
        class="d-flex py-1 text-13 color-black fontweit js-around ai-center navsw"
        @click="goswiper"
      >
        <!-- <div class="pb-0 active">热门</div>
        <div class="pb-0">新闻</div>
        <div class="pb-0">活动</div>
        <div class="pb-0">赛事</div>
        <div class="pb-0">公告</div>-->
      </div>
      <!-- swipre -->
      <swiper :options="swiperconifg" ref="mySwiper">
        <swiperSlide>
          <div class="d-flex d-x">
            <div class="d-flex px-1 ai-center" v-for="i in 6" :key="i">
              <div
                class="flex-1 text-14 color-cont content pr-1"
              >[公告]1111211213123213213213122月3日全服不停机更新公告</div>
              <div class="color-cont text-12">12-01</div>
            </div>
          </div>
        </swiperSlide>
        <swiperSlide>
          <div class="d-flex d-x">
            <div class="d-flex px-1 ai-center" v-for="i in 6" :key="i">
              <div
                class="flex-1 text-14 color-cont content pr-1"
              >[公告]1111211213123213213213122月3日全服不停机更新公告</div>
              <div class="color-cont text-12">12-01</div>
            </div>
          </div>
        </swiperSlide>
        <swiperSlide>
          <div class="d-flex d-x">
            <div class="d-flex px-1 ai-center" v-for="i in 6" :key="i">
              <div
                class="flex-1 text-14 color-cont content pr-1"
              >[公告]1111211213123213213213122月3日全服不停机更新公告</div>
              <div class="color-cont text-12">12-01</div>
            </div>
          </div>
        </swiperSlide>
        <swiperSlide>
          <div class="d-flex d-x">
            <div class="d-flex px-1 ai-center" v-for="i in 6" :key="i">
              <div
                class="flex-1 text-14 color-cont content pr-1"
              >[公告]1111211213123213213213122月3日全服不停机更新公告</div>
              <div class="color-cont text-12">12-01</div>
            </div>
          </div>
        </swiperSlide>
        <swiperSlide>
          <div class="d-flex d-x">
            <div class="d-flex px-1 ai-center" v-for="i in 6" :key="i">
              <div
                class="flex-1 text-14 color-cont content pr-1"
              >[公告]1111211213123213213213122月3日全服不停机更新公告</div>
              <div class="color-cont text-12">12-01</div>
            </div>
          </div>
        </swiperSlide>
      </swiper>
    </div>
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
  data() {
    return {
      swiperconifg: {
        pagination: {
          el: ".navsw",
          type: "custom",
          renderCustom: function(swiper, current, total) {
            //cl当前页,total总共页面
            let swpiertab = ["热门", "新闻", "公告", "活动", "赛事"];
            var customPaginationHtml = "";
            for (var i = 0; i < total; i++) {
              //判断哪个分页器此刻应该被激活
              if (i == current - 1) {
                customPaginationHtml +=
                  '<span class="swiper-pagination-customs pb-0 swiper-pagination-bullet-active" data-index=' +
                  i +
                  ">" +
                  swpiertab[i] +
                  "</span>";
              } else {
                customPaginationHtml +=
                  '<span class="swiper-pagination-customs pb-0" data-index=' +
                  i +
                  ">" +
                  swpiertab[i] +
                  "</span>";
              }
            }
            return customPaginationHtml;
          }
        }
      }
    };
  },
  mounted() {
    document.querySelectorAll(".swiper-pagination")[1].onclick = function() {
      console.log(1);
    };
  },
  methods: {
    goswiper(e) {
      if (e.target.dataset.index != undefined) {
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
    &.swiper-pagination-bullet-active {
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
<template>
  <div class="home">
    <swiper :options="swiperconifg">
      <swiperSlide>
        <img src="../assets/img/sw1.jpg" alt srcset class="swpeir" />
      </swiperSlide>
      <swiperSlide>
        <img src="../assets/img/sw2.jpg" alt srcset class="swpeir" />
      </swiperSlide>
      <swiperSlide>
        <img src="../assets/img/sw3.jpg" alt srcset class="swpeir" />
      </swiperSlide>
      <swiperSlide>
        <img src="../assets/img/sw4.jpg" alt srcset class="swpeir" />
      </swiperSlide>
      <div class="swiper-pagination pr-1" slot="pagination"></div>
    </swiper>
    <!-- 精靈圖 -->
    <div class="mt-1 pt-1 bg-white d-flex f-wrap px-1 text-10 fontweit">
      <div
        v-for="(i,index) in sprite"
        :key="i"
        class="d-flex d-x sprititem js-betwen ai-center mb-2"
      >
        <div v-bind:class="['sprit' ,`sprit-${index+1}`, 'mb-0']"></div>
        <div class="color-grey">{{i}}</div>
      </div>
    </div>
    <div class="p-1 bg-f9 text-10 fontweit color-grey-1 d-flex ai-center js-center mb-1">
      <i class="iconfont icon-z045 text-10 mr-0"></i>
      收起
    </div>
    <!-- card -->
    <Card title="新闻资讯" icon="icon-icon--" :swipernav="swipernav" :key="1">
         <template #items='{value}'>
        <div class="d-flex d-x">
          <router-link
           tag="div"
        :to="`/detal/${item._id}`"
           class="d-flex px-1 ai-center" v-for="(item,ii) in value.newslist" :key="ii">
            <div class="flex-1 text-14 color-cont content pr-1">[{{item.carory}}]{{item.title}}</div>
            <div class="color-cont text-12">{{item.updatedAt| getday}}</div>
          </router-link>
        </div>
      </template>
    </Card>
    <Card title="英雄列表" icon="icon-icon--" :swipernav="herolist" class="mt-1" >
      <template v-slot:headr>
          <div class="py-1">
            <img src="https://ossweb-img.qq.com/upload/webplat/info/yxzj/20191128/56183621913905.jpg" alt="" style="height:8.8462rem;width:100%">
          </div>
      </template>
         <template #items='{value}'>
        <div class="d-flex f-wrap px-1" style="margin:0 -0.5em">
              <router-link tag="div" :to="`/hero/${item._id}`" class="d-flex ai-center js-center d-x p-0" v-for="(item,key) in value.newslist" :key='key' style="width:20%;">
                <img  style="width:100%" :src="item.icon" alt="" >
                <div class="pt-0 text-12 color-cont">{{item.name}}</div>
              </router-link>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import Card from "../components/Card";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import dayjs from 'dayjs'
export default {
  components: {
    swiper,
    swiperSlide,
    Card
  },
  filters: {
      getday(year){
        return dayjs(year).format('MM/DD')
      }
  },
  data() {
    return {
      herolist: [{ name: "战士" }, { name: "法师" }, { name: "射手" }],
      swipernav:[],
      //sprite
      sprite: [
        "爆料站",
        "故事会",
        "周边商城",
        "体验服务",
        "新人专区",
        "荣耀 传承",
        "模拟资料库",
        "王者营地",
        "公众号",
        "版本介绍",
        "对局环境",
        "无限王者"
      ],
      //輪播圖配置
      swiperconifg: {
        autoplay: 1000, // 自動切換
        speed: 300, //時間
        pagination: {
          el: ".swiper-pagination"
        },
        // 切换效果
        effect: "slide"
        //點
      }
    };
  },
  created () {
      this.$http.get('/list').then(data=>{
        this.swipernav=data.data;
      }),
      this.$http.get('/hero/list').then(data=>{
        this.herolist=data.data;
      })
  }
};
</script>
<style lang="scss">
.swpeir {
  width: 100%;
  height: 12.6923rem;
}
.swiper-pagination {
  text-align: right !important;
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.0769rem;
    background-color: white;
  }
  .swiper-pagination-bullet-active {
    background-color: blue !important;
  }
}
//精靈圖
.sprititem:nth-child(4n) {
  border-right: none;
}
.sprititem {
  width: 25%;
  border-right: 0.0769rem solid rgb(153, 153, 153);
  .sprit {
    background: url("../assets/img/sprite.png") no-repeat 0 0;
    background-size: 28.8462rem;
    display: inline-block;
    &.sprit-1 {
      background-position: 63.546% 15.517%;
      width: 2.3846rem;
      height: 1.9231rem;
    }
    &.sprit-2 {
      background-position: 90.483% 15.614%;
      width: 2.3846rem;
      height: 1.9231rem;
    }
    &.sprit-3 {
      background-position: 36.746% 0.924%;
      width: 2.3846rem;
      height: 1.9231rem;
    }
    &.sprit-4 {
      background-position: 10.408% 15.517%;
      width: 2.3846rem;
      height: 1.9231rem;
    }
    &.sprit-5 {
      background-position: 36.467% 15.287%;
      width: 2.3846rem;
      height: 1.9231rem;
    }
    &.sprit-6 {
      background-position: 9.302% 0.813%;
      width: 2.3846rem;
      height: 1.9231rem;
    }
    &.sprit-7 {
      background-position: 63.3% 0.927%;
      width: 2.3846rem;
      height: 1.9231rem;
    }
    &.sprit-8 {
      background-position: 89.733% 1.266%;
      width: 1.5385rem;
      height: 1.6154rem;
    }
    &.sprit-9 {
      background-position: 0 96.207%;
      width: 2.3846rem;
      height: 1.9231rem;
    }
    &.sprit-10 {
      background-position: 89.733% 1.266%;
      width: 2.3846rem;
      height: 1.9231rem;
    }
    &.sprit-11 {
      background-position: 63.3% 0.927%;
      width: 2.3846rem;
      height: 1.9231rem;
    }
    &.sprit-12 {
      background: url("http://game.gtimg.cn/images/yxzj/m/m201706/images/bg/wxwzt.png")
        no-repeat;
      width: 2.3846rem;
      height: 1.9231rem;
    }
  }
}
</style>
<template>
  <div v-if="news">
    <div class="d-flex py-1 ai-center px-0 boreb texth">
      <div class="pr-0 iconfont icon-fanhui color-blue"></div>
      <div class="color-blue flex-1 textover text-12 fontweit">{{news.title}}</div>
      <div>{{news.updatedAt|gtetime}}</div>
    </div>
    <div v-html="news.body" class="px-1 pt-2"></div>
    <div class="d-flex px-2 ai-center py-1">
      <div class="iconfont icon-lianjie-tianchong"></div>
      <div class="fontweit text-14 color-blue ml-1">相关资讯</div>
    </div>
    <router-link class="mx-1 mt-1 d-flex texth ai-center" tag="div" :to="`/detal/${item._id}`" v-for="item in news.realtive" :key='item._id'>
      <div class="flex-1 textover text-14">{{item.title}}</div>
      <div >{{item.updatedAt|gtetime}}</div>
    </router-link>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  filters: {
    gtetime(value) {
      return dayjs(value).format("YYYY-MM-DD");
    }
  },
  watch: {
      id:function(){
        this.fetch()
      }
  },
  props: {
    id: String
  },
  data() {
    return {
      news: null
    };
  },
  methods: {
    fetch(){
       this.$http.get(`/news/${this.id}`).then(data => {
      this.news = data.data;
    });
    }
  },
  created() {
    this.fetch()
  }
};
</script>

<style lang="scss" scoped>
.boreb {
  border-bottom: 0.0769rem solid rgb(0, 0, 0);
}
video {
  width: 100%;
  height: auto;
}
.texth{
  line-height: 1.35rem;
}
</style>
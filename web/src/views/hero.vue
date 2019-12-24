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
  </div>
</template>
<script>
import imgss from "../assets/img/sw2.jpg";
export default {
  props: { id: String },
  data() {
    return {
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
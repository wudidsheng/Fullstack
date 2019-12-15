<template>
  <div class="navcs">
    <div class="bg-black p-0 d-flex nav ai-center ">
      <img src="../assets/img/logo.png" style="max-height:2.5rem" class="mx-1" />
      <div class="d-flex d-x flex-1 js-center">
        <div class="text-13 color-white">王者荣耀</div>
        <div class="text-9.6 color-grey-1 my-0">团队成就更多</div>
      </div>
      <button class="bg-primary prbut m-0 text-xxs color-black">立即下载</button>
    </div>
    <div class="bg-primary p-1 ai-center d-flex js-around">
      <router-link to="/" active-class="border-bottm" class="color-white text-xxs pb-0">首页</router-link>
      <router-link to="/gonlin" active-class="border-bottm" class="color-white text-xxs pb-0">攻略中心</router-link>
      <router-link to="/sazi" class="color-white text-xxs pb-0" active-class="border-bottm">赛事中心</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
  .navcs{
    position: sticky;  //吸顶
     top: 0;
     z-index: 9999;
  }
</style>
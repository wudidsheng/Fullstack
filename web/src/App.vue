<template>
  <div id="app">
    <Nav></Nav>
    <router-view />
  </div>
</template>
<script>
import Nav from '../src/components/nav'
export default {
  components: {
    Nav 
  }
}
</script>


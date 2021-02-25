<template>
  <div class="home">
    <img class="w-10 mr-2" alt="Agola logo" src="../assets/img/agola-logo-circle.svg">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>

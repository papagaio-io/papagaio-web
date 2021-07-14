<template>
  <div id="app">
    <label v-show="false">{{ userLoggedIn }}</label>
    <NavigationMenu v-if="this.$store.getters.getLoginState"> </NavigationMenu>
  </div>
  <router-view />
</template>

<script>
import NavigationBar from "./components/NavigationBar";
import NavigationMenu from "./components/NavigationMenu.vue";

export default {
  components: {
    NavigationBar,
    NavigationMenu,
  },
  data() {
    return {};
  },
  computed: {
    currentUserToken() {
      return this.$store.getters.getAuthToken;
    },
    userLoggedIn() {
      return this.$store.getters.getLoginState;
    },
    currentUsername() {
      return this.$store.getters.getUserName;
    },
  },
};
</script>

<style src="./assets/styles/tailwind.css">
</style>
<template>
  <div id="app">
     <label v-show="false">{{ userLoggedIn }}</label>
    <NavigationMenu v-if="$keycloak.authenticated"> </NavigationMenu>
    <!-- <nav class="text-white bg-papaDark-800 py-3">
      <div class="container flex items-center flex-wrap">
        <div class="mr-auto ml-36">
          <router-link
            class="
              font-semibold
              flex
              items-center
              flex-shrink-0
              text-xl
              tracking-tight
              text-
            "
            to="/dashboard"
          >
            <img class="w-10 mr-2" src="./assets/img/papagaioIcon.png" />
            Papagaio
          </router-link>
        </div>
       
      </div>
    </nav> -->
  </div>
  <router-view />

  <!-- <NavigationBar v-if="$keycloak.authenticated"> </NavigationBar> -->
  <!-- <p >{{currentUserToken }}</p> -->
</template>

<script>
import NavigationBar from "./components/NavigationBar";
import NavigationMenu from "./components/NavigationMenu.vue"

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
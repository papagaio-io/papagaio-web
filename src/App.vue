<template>
  <div id="app">
    <nav class="text-white bg-papaDark-800 p-3">
      <div class="container flex items-center justify-between flex-wrap">
        <div class="ml-10">
          <router-link
            class="
              font-semibold
              flex
              items-center
              flex-shrink-0
              text-xl
              tracking-tight
              text-white
            "
            to="/dashboard"
          >
            <img class="w-10 mr-2" src="./assets/img/papagaioIcon.png" />
            Papagaio
          </router-link>
        </div>
        <label v-show="false">{{ userLoggedIn }}</label>
      </div>
    </nav>
  </div>

  <router-view />

  <NavigationBar v-if="$keycloak.authenticated"> </NavigationBar>
  <!-- <p >{{currentUserToken }}</p> -->
</template>

<script>
import NavigationBar from "./components/NavigationBar";
export default {
  components: {
    NavigationBar,
  },
  data() {
    return {};
  },
  onUpdate() {
    this.userAuthenticated();
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
  methods: {
    userAuthenticated() {
      
      if (this.$keycloak.authenticated === false) {
        this.$store.commit("setLoginState", "false");
        console.log("I checked if user is authenticated. Answer is no");
      } 
      else if (this.$keycloak.authenticated === true) {
        console.log("seems like the user is authenticated");
      }

    
    },
  },
};
</script>

<style src="./assets/styles/tailwind.css">
</style>
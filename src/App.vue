<template>
  <div id="app">
    <nav class="text-white bg-papaOrange-600 p-3">
      <div class="container flex items-center justify-between flex-wrap">
        <div class="mr-6">
          <router-link
            class="font-semibold flex items-center flex-shrink-0 text-xl tracking-tight text-black"
            to="/"
          >
            <img
              class="w-10 mr-2"
              src="./assets/img/papagaio-logo-circle.png"
            />
            Papagaio
          </router-link>
        </div>

        <div class="navbar-item">
          
          <div v-if="$keycloak.authenticated">
          <label>{{currentUsername }}</label>

            <button
              class="ml-5 btn bg-papaDark-700 hover:bg-papaOrange-600 border-solid border-2 border-white"
              @click="$keycloak.logout()"
            >
              Logout
            </button>
          </div>

          <!-- <div v-else>
            <button
              class="ml-5 btn bg-papaDark-700 hover:bg-papaOrange-600 border-solid border-2 border-white"
              @click="$keycloak.login()"
              
            >
              Log In
            </button>
          </div>
          -->
        </div>
     <label v-show="false">{{userLoggedIn }}</label>
      
      </div>
    </nav>
  </div>
  <router-view />
   <!-- <p >{{currentUserToken }}</p> -->
</template>

<script>


export default {
  data() {
    return {
     
    };
  },
  mounted() {},
  computed: {
    currentUserToken() {
      return this.$store.state.currentTokenId;
    },
    userLoggedIn(){
      return this.$store.state.loggedIn;
    },
    currentUsername(){
      
    return this.$store.state.currentUserName;
    },
    
  },
  methods: {
    
  },
};
</script>

<style src="./assets/styles/tailwind.css">
</style>
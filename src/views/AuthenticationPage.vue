<template>
  <div class="flex h-screen">
    <div class="m-auto text-3xl font-extrabold tracking-tight sm:text-4xl">
      Hello from the authentication page
      <br />
      <div class="text-sm">
        {{ currentURL }}
      </div>
      <br />

      <div class="text-s">
        {{ userDetailsResponse }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  name: "neworaganization",
  props: {},
  data() {
    return {
      currentURL: "",
      userDetailsResponse: "",
    };
  },
  mounted() {
    this.onSuccessfulAuthentication();
  },
  methods: {
    onSuccessfulAuthentication() {
      this.currentURL = this.$route.fullPath;

      this.$store.state.userTokenUrlPath = this.$route.fullPath;

      this.$store.dispatch("getUserTokenDetails").then((response) => {

        this.$store.commit("currentUserSession", {
        tempLoggedIn: true,
        tempCurrentAuthToken: response['token'],
        tempCurrentUserName: response['userInfo']['login'],
        tempUserAvatar: response['userInfo']['avatar_url'],
        tempUserIsAdmin: response['userInfo']['is_admin'],
        
      });
      this.$store.dispatch('organizationsDefaultTriggerTimeInDb');

        this.userDetailsResponse = response['token'];
       
      });
      
      //this.$store.dispatch("getAllOrganizationDashboard");
      //this.$router.push("/dashboard");
        this.reloadData();
    },

    reloadData() {
      
      let self = this;
      setTimeout(function () {
            self.$store.dispatch("getAllOrganizationDashboard");
            this.$router.push("/dashboard");
          }, 500);
    }
  },
};
</script>

<style>
</style>
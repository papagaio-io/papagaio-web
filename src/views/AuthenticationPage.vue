<template>
  <div class="flex h-screen">
    <div class="container mx-auto">

       <img
      class="w-full  mx-auto"
      alt="Papagaio logo"
      src="../assets/img/papagaioMainLogo.jpg"
    />
      <!-- Hello from the authentication page
      <br />
      <div class="text-sm">
        {{ currentURL }}
      </div>
      <br />

      <div class="text-s">
        {{ userDetailsResponse }}
      </div> -->
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
        console.log(response);
        this.$store.commit("currentUserSession", {
          tempLoggedIn: true,
          tempCurrentAuthToken: response["token"],
          tempCurrentUserName: response["userInfo"]["login"],
          tempUserAvatar: response["userInfo"]["avatar_url"],
          tempUserIsAdmin: response["userInfo"]["is_admin"],
          tempUserGitSourceLink: response["userInfo"]['user_page_url'],
        });
        this.$store.dispatch("organizationsDefaultTriggerTimeInDb");

        this.userDetailsResponse = response["token"];
      });

      let self = this;
      setTimeout(function () {
        self.$store.dispatch("getAllOrganizationDashboard");
        self.$router.push("/dashboard");
        
      }, 1000);

      

      //this.$store.dispatch("getAllOrganizationDashboard");
      //this.$router.push("/dashboard");
    },
  },
};
</script>

<style>
</style>
<template>
  
    <div class="flex h-screen">
  <div class="m-auto text-3xl font-extrabold tracking-tight sm:text-4xl">

      Hello from the authentication page
      <br>
<div class="bg-red-900 text-xs">
      {{currentURL}}
</div>
<br>

<div class="bg-blue-900 text-xs">
      {{userDetailsResponse['login']}}
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

  }
  },
  mounted(){
    this.getURL();
  },
  methods: {

    getURL() {
      this.currentURL = this.$route.fullPath;

      this.$store.state.userTokenUrlPath = this.$route.fullPath;

      this.$store.dispatch("getUserTokenDetails").then((response) => {
        this.userDetailsResponse = response['userInfo'];
        console.log(response);
      });



    }

  },


}
</script>

<style>

</style>
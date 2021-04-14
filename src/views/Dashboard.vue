<template>
 
  <p>from store.getters: {{ this.$store.getters.showdashBoardData }}</p>

<div v-for='currentView in getDashboard' :key='currentView.id'>
  <h3>Post Title: /h3>  {{currentView.name}} </h3>
      <h3>Post Body: /h3>{{currentView.visibility}} </h3>
    </div>
     <button
          class="px-10 py-3 font-medium rounded-md bg-papaOrange-600 hover:bg-papaDark-700 text-white font-bold py-2 px-4 rounded float-right mt-5 border-solid border-2 border-white"
        @click= "getCurrentResponse"
        >
          Create
        </button>


</template>

<script>
import {mapActions} from "vuex";

export default {
  components: {},
  name: "neworaganization",
  props: {},
  data() {
    return {
      userToken: this.$store.getters.getAuthToken,
      responseTest: "",
    };
  },
  
  // mounted() {
  //   this.$store.dispatch('getCurrentResponse');
    
  // },

  methods: {
    ...mapActions([
      'getCurrentResponse'
    ])
   
    
  },
};
</script>

<style>
</style>
<template>
  <!-- OrganizationDashboard  -->
  <p class="text-lg text-center font-bold m-5">Organizations Dashboard Beta</p>
  <hr />
  <table class="m-5 w-5/6 mx-auto bg-gray-200 text-gray-800">
    <tr class="text-left border-b-2 border-gray-300">
      <th class="px-4 py-3">Status</th>
      <th class="px-4 py-3">Project name</th>
      <th class="px-4 py-3">Failed runs</th>
      <th class="px-4 py-3">Total runs</th>
   
    </tr>

    <tr
      class="bg-gray-100 border-b border-gray-200 cursor-pointer "
      v-for="currentView in getOrganizationsDashboard().projects"
      :key="currentView.id"
        @click="iWasClicked(currentView.projectName)" 
    >
      <td class="px-4 py-3">
        {{ showProjectSuccessRunPercentage(currentView)}}
      </td>
      <td class="px-4 py-3">
        {{ currentView["projectName"] }}
      </td>
      <td class="px-4 py-3">
        {{showProjectFailedRuns(currentView) }}
      </td>
      <td class="px-4 py-3">
          {{showProjectTotalRuns(currentView) }}
      </td>
   
    </tr>
  </table>
</template>

<script>
import moment from "moment";
import { mapActions } from "vuex";

export default {
  components: {},
  name: "neworaganization",
  props: {},
  data() {
    return {
      responseTest: "",
    };
  },
  mounted() {},

  methods: {
    ...mapActions(["getOrganizationDashboard"]),

    getOrganizationsDashboard() {
      this.responseTest = this.$store.getters.showOrganizationDashboardData;
      return this.responseTest;
    },
  //function to use.
    dealWithObject(received) {
      if (received == null) return "N/A";
      return received;
    },
    formatLastRunDuration(received) {
      if (received == null) return "N/A";
      return received;
    },
    showProjectSuccessRunPercentage(recieved) {
      if (typeof recieved === "object" && recieved["worstReport"] !== null ) {
        return recieved["worstReport"]["successRunsPercentage"];
      } else return "N/A";
      // return recieved;
    },

    showProjectName(recieved) {
      if (typeof recieved === "object" && recieved != null) {
        return recieved["projectName"];
      } else return "N/A";
      // return recieved;
    },
    showProjectFailedRuns(recieved){
       if (typeof recieved === "object" && recieved["worstReport"] !== null ) {
        return recieved["worstReport"]["failedRuns"];
      } else return "N/A";
      // return recieved;
    },
    showProjectTotalRuns(recieved){

        if (typeof recieved === "object" && recieved["worstReport"] !== null ) {
        return recieved["worstReport"]["totalRuns"];
      } else return "N/A";
    },
    iWasClicked(id){
       this.$store.commit("setProjectURL",id);
       this.$store.dispatch('getProjectDashboard');
      //  console.log(this.$store.state.organizationURL)
    },
  },
};
</script>

<style>
</style>
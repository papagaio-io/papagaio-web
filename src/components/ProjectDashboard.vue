<template>
  <!-- OrganizationDashboard  -->
  <p class="text-lg text-center font-bold m-5">Project in Organization</p>
  <hr />
  <table class="m-5 w-5/6 mx-auto bg-gray-200 text-gray-800">
    <tr class="text-left border-b-2 border-gray-300">
      <th class="px-4 py-3">Name</th>
      <th class="px-4 py-3">State</th>
      <th class="px-4 py-3">Last success run date</th>
      <th class="px-4 py-3">Last failed run date</th>
      <th class="px-4 py-3">Last run duration</th>
      <th class="px-4 py-3">Last success run URL</th>
      <th class="px-4 py-3">Last failed run URL</th>
    </tr>

    <tr class="bg-gray-100 border-b border-gray-200"
     v-for="currentView in getOrganizationsDashboard().branchs"
      :key="currentView.id"
    >
      <td class="px-4 py-3">{{currentView["name"]}}</td>
      <td class="px-4 py-3">{{currentView["state"]}}</td>
      <td class="px-4 py-3">{{calculateDateIntervels (currentView["lastSuccessRunDate"])}}</td>
      <td class="px-4 py-3">{{calculateDateIntervels(currentView["lastFailedRunDate"])}}</td>
      <td class="px-4 py-3">{{calculateLastDurationIntervels (currentView["lastRunDuration"])}}</td>
      <td class="px-4 py-3">{{currentView["lastSuccessRunURL"]}}</td>
      <td class="px-4 py-3">{{currentView["lastFailedRunURL"]}}</td>
    </tr>
  </table>
</template>

<script>
import moment from "moment";
import { mapActions } from "vuex";

export default {
  
  data() {
    return {
      responseTest: "",
    };
  },
  mounted() {

     
  },

  methods: {
    ...mapActions(["getProjectDashboard"]),

    getOrganizationsDashboard() {
      this.responseTest = this.$store.getters.showProjectDashboardData;
   
      return this.responseTest;
    },
    calculateDateIntervels(received) {
      if (received == null) return "N/A";
      return moment(received).fromNow();
    },
    calculateLastDurationIntervels(received) {
      if (received == null) return "N/A";
      received = received / 1000000;
      var date = new Date(null);
      date.setMilliseconds(received); // specify value for SECONDS here
      var result = date.toISOString().substr(11, 8);
      return result;
    },

    // dealWithObject(received) {
    //   if (received == null) return "N/A";
    //   return received;
    // },
    // formatLastRunDuration(received) {
    //   if (received == null) return "N/A";
    //   return received;
    // },
  },
};
</script>

<style>
</style>
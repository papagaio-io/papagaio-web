<template>
  <div class="container mx-auto">
    <h4 class="mt-2 mb-2 text-3xl font-bold">Dashboard</h4>
    <h4 class="mt-2 mb-6 text-xl font-bold text-gray-400">
      <a class="cursor-pointer">All Organizations</a> 
    
    </h4>
    <!-- Body  -->
    <div class="bg-white">
      <table class="w-11/12 mx-auto text-dark border">
        <tr class="text-center">
          <th class="px-4 py-3"></th>
          <th class="px-4 py-3">Status</th>
          <th class="px-4 py-3">Name</th>
          <th class="px-4 py-3">Last success</th>
          <th class="px-4 py-3">Last failure</th>
          <th class="px-4 py-3">Last run duration</th>
            <th class="px-4 py-3">On Agola</th>
        </tr>

        <tr
          class="bg-gray-100 text-dark text-center cursor-pointer  hover:bg-gray-300 "
          v-for="currentView in getDashboard()"
          :key="currentView.id"
          @click="navigateForward(currentView.organizationName)"
        >
          <td class="px-4 py-3 border-b-2 border-dark">
            <img
              class="w-10"
              :src="currentView.avatarUrl"
              alt="Organization Icon"
            />
          </td>
          <td class="border-b-2 border-dark">
            <img
              class="w-10 inline-block align-middle"
              :src="showSuccessPercentage(currentView.worstReport)"
              alt="Organization Icon"
            />

            <!-- {{ showSuccessPercentage(currentView.worstReport) }} -->
          </td>
          <td class="px-4 py-3 border-b-2 border-dark">
            {{ currentView.organizationName }}
          </td>
          <td class="px-4 py-3 border-b-2 border-dark">
            {{ calculateDateIntervels(currentView.lastSuccessRunDate) }}
          </td>
          <td class="px-4 py-3 border-b-2 border-dark">
            {{ calculateDateIntervels(currentView.lastFailedRunDate) }}
          </td>
          <td class="px-4 py-3 border-b-2 border-dark">
            {{ calculateLastDurationIntervels(currentView.lastRunDuration) }}
          </td>
          <td class="px-4 py-3 border-b-2 border-dark">
            <a
              @click.stop
              :href="
               currentView['organizationURL']
              "
              target="_blank"
              ><img
                class="inline-block w-12"
                alt="Papagaio logo"
                src="../assets/img/agola-logo-name.svg"
            /></a>
          </td>
        </tr>
      </table>
    </div>
  </div>
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
      userToken: this.$store.getters.getAuthToken,
      responseTest: "",
    };
  },

  methods: {
    ...mapActions(["getAllOrganizationDashboard"]),

    getDashboard() {
      this.responseTest = this.$store.getters.showdashBoardData;

      // console.log(this.responseTest[1].name);
      return this.responseTest;
    },
    showSuccessPercentage(recieved) {
      if (typeof recieved === "object" && recieved != null) {
        if (recieved["successRunsPercentage"] <= 20) {
          return require("../assets/img/5.png");
        } else if (recieved["successRunsPercentage"] <= 40) {
          return require("../assets/img/4.png");
        } else if (recieved["successRunsPercentage"] <= 60) {
          return require("../assets/img/3.png");
        } else if (recieved["successRunsPercentage"] <= 80) {
          return require("../assets/img/2.png");
        } else if (recieved["successRunsPercentage"] <= 100) {
          return require("../assets/img/1.png");
        }
        // return recieved["successRunsPercentage"] + "%";
      } else return require("../assets/img/1.png");
      // return recieved;
    },

    calculateDateIntervels(received) {
      if (received == null) return "N/A";
      return moment(received).fromNow();
    },
    //converting to nano seconds and showing a full time duration.
    calculateLastDurationIntervels(received) {
      if (received == null) return "N/A";
      received = received / 1000000;
      var date = new Date(null);
      date.setMilliseconds(received); // specify value for SECONDS here
      var result = date.toISOString().substr(11, 8);
      return result;
    },
    navigateForward(id) {
      this.openedOrganization(id);
      this.$store.commit("setcurrentDashboardToShow", "ProjectDashboard");
      this.$store.commit("setOrganizationURL", id);
      this.$store.dispatch("getOrganizationDashboard");

      //  console.log(this.$store.state.organizationURL)
    },
    openedOrganization(temp) {
      temp = this.$store.commit("setCurrentOpenOrganizationInDashboard", temp);
    },
  },
};
</script>

<style>
</style>
<template>
  <div class="container mx-auto">
    <h4 class="mt-2 mb-2 text-3xl font-bold">Organizations</h4>
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
        </tr>

        <tr
          class="bg-gray-100 text-dark text-center cursor-pointer border-l-8 border-cerise-600"
          v-for="currentView in getDashboard()"
          :key="currentView.id"
          @click="iWasClicked(currentView.organizationName)"
        >
          <td class="px-4 py-3 border-b-2 border-dark">
            <img
              class="w-10"
              :src="currentView.avatarUrl"
              alt="Organization Icon"
            />
          </td>
          <td class="px-4 py-3 border-b-2 border-dark">
            <img
              class="w-10"
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
    // showAvatarImg(recieved){
    //   return require(recieved);
    // },

    showSuccessPercentage(recieved) {
      if (typeof recieved === "object" && recieved != null) {
        if (recieved["successRunsPercentage"] <= 20) {
          return require("../assets/img/thunder.png");
        } else if (recieved["successRunsPercentage"] <= 40) {
          return require("../assets/img/rainy.png");
        } else if (recieved["successRunsPercentage"] <= 60) {
          return require("../assets/img/MuchCloudy.png");
        } else if (recieved["successRunsPercentage"] <= 80) {
          return require("../assets/img/cloudy.png");
        } else if (recieved["successRunsPercentage"] <= 100) {
          return require("../assets/img/sunny.png");
        }
        // return recieved["successRunsPercentage"] + "%";
      } else return require("../assets/img/sunny.png");
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
    iWasClicked(id) {
      this.$store.commit("setcurrentDashboardToShow", "OrganizationDashboard");

      this.$store.commit("setOrganizationURL", id);
      this.$store.dispatch("getOrganizationDashboard");

      //  console.log(this.$store.state.organizationURL)
    },
  },
};
</script>

<style>
</style>
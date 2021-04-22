<template>
  <div class="w-full container mx-auto">
    <h4 class="mt-2 mb-2 text-3xl font-bold">
      Organizations >> Projects >> Repositories
    </h4>

    <!-- Body  -->
    <div class="flex bg-white">
      <button class="" @click="goBack()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <table class="w-11/12 mx-auto text-dark border mr-16">
        <tr class="text-center border-b-2 border-gray-300">
          <th class="px-4 py-3">Name</th>
          <th class="px-4 py-3">Status</th>
          <th class="px-4 py-3">Last success run date</th>
          <th class="px-4 py-3">Last failed run date</th>
          <th class="px-4 py-3">Last run duration</th>
          <th class="px-4 py-3">Last success run URL</th>
          <th class="px-4 py-3">Last failed run URL</th>
        </tr>

        <tr
          class="bg-gray-100 text-dark text-center border-l-8 border-cerise-600"
          v-for="currentView in getOrganizationsDashboard().branchs"
          :key="currentView.id"
        >
          <td class="px-4 py-3 border-b-2 border-dark">
            {{ currentView["name"] }}
          </td>
          <td class="px-4 py-3 border-b-2 border-dark">
            <!-- {{ currentView["report"]["successRunsPercentage"] }} -->
            <img
              class="w-10 inline-block align-middle"
              :src="showSuccessPercentage(currentView)"
              alt="Organization Icon"
            />
          </td>
          <td class="px-4 py-3 border-b-2 border-dark">
            {{ calculateDateIntervels(currentView["lastSuccessRunDate"]) }}
          </td>
          <td class="px-4 py-3 border-b-2 border-dark">
            {{ calculateDateIntervels(currentView["lastFailedRunDate"]) }}
          </td>
          <td class="px-4 py-3 border-b-2 border-dark">
            {{ calculateLastDurationIntervels(currentView["lastRunDuration"]) }}
          </td>
          <td class="px-4 py-3 border-b-2 border-dark">
            {{ currentView["lastSuccessRunURL"] }}
          </td>
          <td class="px-4 py-3 border-b-2 border-dark">
            {{ currentView["lastFailedRunURL"] }}
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
  data() {
    return {
      responseTest: "",
    };
  },
  mounted() {},

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
    showSuccessPercentage(recieved) {
      if (typeof recieved === "object" && recieved != null) {
          console.log(recieved["report"]["successRunsPercentage"] )
        if (recieved["report"]["successRunsPercentage"] <= 20) {
          return require("../assets/img/thunder.png");
        } else if (recieved["report"]["successRunsPercentage"] <= 40) {
          return require("../assets/img/rainy.png");
        } else if (recieved["report"]["successRunsPercentage"] <= 60) {
          return require("../assets/img/MuchCloudy.png");
        } else if (recieved["report"]["successRunsPercentage"] <= 80) {
          return require("../assets/img/cloudy.png");
        } else if (recieved["report"]["successRunsPercentage"] <= 100) {
          return require("../assets/img/sunny.png");
        }
        // return recieved["successRunsPercentage"] + "%";
      } else return require("../assets/img/sunny.png");
      // return recieved;
    },

    goBack() {
      this.$store.commit("setcurrentDashboardToShow", "OrganizationDashboard");
    },
  },
};
</script>

<style>
</style>
<template>
  <div class="w-full container mx-auto">
    <h4 class="mt-2 mb-2 text-3xl font-bold">Organizations >> Projects</h4>

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
        <tr class="text-center border-gray-300 border-l-5 border-cerise-600">
          <th class="px-4 py-3">Status</th>
          <th class="px-4 py-3">Project name</th>
          <!-- <th class="px-4 py-3">Failed runs</th>
          <th class="px-4 py-3">Total runs</th> -->
        </tr>

        <tr
          class="bg-gray-100 text-dark text-center cursor-pointer border-l-5 border-cerise-600"
          v-for="currentView in getOrganizationsDashboard().projects"
          :key="currentView.id"
          @click="iWasClicked(currentView.projectName)"
        >
          <td class="px-4 py-3 border-b-2 border-dark">
            <!-- {{ showProjectSuccessRunPercentage(currentView)}} -->
            <img
              class="w-10 inline-block align-middle"
              :src="showProjectSuccessRunPercentage(currentView)"
              alt="Organization Icon"
            />
          </td>
          <td class="px-4 py-3 border-b-2 border-dark">
            {{ currentView["projectName"] }}
          </td>
          <!-- <td class="px-4 py-3 border-b-2 border-dark">
            {{ showProjectFailedRuns(currentView) }}
          </td>
          <td class="px-4 py-3 border-b-2 border-dark">
            {{ showProjectTotalRuns(currentView) }}
          </td> -->
        </tr>
      </table>
    </div>
  </div>
</template>


<script>

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
      if (typeof recieved === "object" && recieved["worstReport"] !== null) {
        if (recieved["worstReport"]["successRunsPercentage"] <= 20) {
          return require("../assets/img/thunder.png");
        } else if (recieved["worstReport"]["successRunsPercentage"] <= 40) {
          return require("../assets/img/rainy.png");
        } else if (recieved["worstReport"]["successRunsPercentage"] <= 60) {
          return require("../assets/img/MuchCloudy.png");
        } else if (recieved["worstReport"]["successRunsPercentage"] <= 80) {
          return require("../assets/img/cloudy.png");
        } else if (recieved["worstReport"]["successRunsPercentage"] <= 100) {
          return require("../assets/img/sunny.png");
        }
      } else return require("../assets/img/sunny.png");
      // return recieved;
    },

    showProjectName(recieved) {
      if (typeof recieved === "object" && recieved != null) {
        return recieved["projectName"];
      } else return "N/A";
      // return recieved;
    },
    showProjectFailedRuns(recieved) {
      if (typeof recieved === "object" && recieved["worstReport"] !== null) {
        return recieved["worstReport"]["failedRuns"];
      } else return "N/A";
      // return recieved;
    },
    showProjectTotalRuns(recieved) {
      if (typeof recieved === "object" && recieved["worstReport"] !== null) {
        return recieved["worstReport"]["totalRuns"];
      } else return "N/A";
    },
    iWasClicked(id) {
      this.$store.commit("setcurrentDashboardToShow", "ProjectDashboard");
      this.$store.commit("setProjectURL", id);
      this.$store.dispatch("getProjectDashboard");
      //  console.log(this.$store.state.organizationURL)
    },
    goBack() {
      this.$store.commit(
        "setcurrentDashboardToShow",
        "AllOrganizationDashboard"
      );
    },
  },
};
</script>

<style>
</style>
<template>
  <div class="w-full container mx-auto">
    <h4 class="mt-2 mb-2 text-3xl font-bold">Repositories</h4>
    <h4 class="mt-2 mb-6 text-xl font-bold text-gray-400">
      <a class="cursor-pointer" @click="navigateBackToOrganizations"
        >All Organizations</a
      >
      /
      <a class="cursor-pointer" @click="navigateBack">{{
        this.$store.getters.getcurrentOpenOrganizationInDashboard
      }}</a>
      /
      {{ this.$store.getters.getcurrentOpenProjectInDashboard }}
    </h4>

    <!-- Body  -->
    <div class="flex bg-white">
      <button class="" @click="navigateBack()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-20 w-30"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <table class="w-11/12 mx-auto text-dark border mr-16">
        <tr class="text-center border-b-2 border-gray-300">
          <th class="px-4 py-3">Name</th>
          <th class="px-4 py-3">Status</th>
          <th class="px-4 py-3">Last success run</th>
          <th class="px-4 py-3">Last failed run</th>
          <th class="px-4 py-3">Last run duration</th>
          <th class="px-4 py-3">Last success run URL</th>
          <th class="px-4 py-3">Last failed run URL</th>
        </tr>

        <tr
          class="bg-gray-100 text-dark text-center hover:bg-gray-300"
          v-for="currentView in getOrganizationsDashboard().branchs"
          :key="currentView.id"
        >
          <td class="px-4 py-3 border-b-2 border-dark">
            {{ currentView["name"] }}
          </td>
          <td class="px-4 py-3 border-b-2 border-dark">
            <img
              class="w-12 inline-block align-middle"
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
          <!-- if exist a success URL show it-->
          <td
            v-show="currentView['lastSuccessRunDate'] != null"
            class="px-4 py-3 border-b-2 border-dark"
          >
            <!-- {{ currentView["lastSuccessRunURL"] }} -->
            <a
              @click.stop
              :href="currentView['lastSuccessRunURL']"
              target="_blank"
              ><img
                class="inline-block w-12"
                alt="Papagaio logo"
                src="../assets/img/agola-logo-name.svg"
            /></a>
          </td>
          <!-- Show N/A if no success URL -->
          <td
            v-show="currentView['lastSuccessRunDate'] == null"
            class="px-4 py-3 border-b-2 border-dark"
          >
            N/A
          </td>
          <!-- if exist a failed URL show it-->
          <td
            v-show="currentView['lastFailedRunDate'] != null"
            class="px-4 py-3 border-b-2 border-dark"
          >
            <!-- {{ currentView["lastFailedRunURL"] }} -->

            <a
              @click.stop
              :href="currentView['lastFailedRunURL']"
              target="_blank"
              ><img
                class="inline-block w-12"
                alt="Papagaio logo"
                src="../assets/img/agola-logo-name.svg"
            /></a>

            <!-- Show N/A if no failed URL  -->
          </td>
          <td
            v-show="currentView['lastFailedRunDate'] == null"
            class="px-4 py-3 border-b-2 border-dark"
          >
            N/A
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
        if (recieved["report"]["successRunsPercentage"] <= 20) {
          return require("../assets/img/1.png");
        } else if (recieved["report"]["successRunsPercentage"] <= 40) {
          return require("../assets/img/2.png");
        } else if (recieved["report"]["successRunsPercentage"] <= 60) {
          return require("../assets/img/3.png");
        } else if (recieved["report"]["successRunsPercentage"] <= 80) {
          return require("../assets/img/4.png");
        } else if (recieved["report"]["successRunsPercentage"] <= 100) {
          return require("../assets/img/5.png");
        }
        // return recieved["successRunsPercentage"] + "%";
      } else return require("../assets/img/5.png");
      // return recieved;
    },

    navigateBack() {
      this.$store.commit("setcurrentDashboardToShow", "ProjectDashboard");
    },
    navigateBackToOrganizations() {
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
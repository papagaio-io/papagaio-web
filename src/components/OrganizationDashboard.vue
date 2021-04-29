<template>
  <div class="w-full container mx-auto">
    <h4 class="mt-2 mb-2 text-3xl font-bold">Projects</h4>
    <h4 class="mt-2 mb-6 text-xl font-bold text-gray-400">
      <a class="cursor-pointer" @click="navigateBack">All Organizations</a> /
      {{ this.$store.getters.getcurrentOpenOrganizationInDashboard }}
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
        <tr class="text-center border-gray-300">
          <th class="px-4 py-3">Status</th>
          <th class="px-4 py-3">Name</th>
          <th class="px-4 py-3">On Agola</th>
          <!--  <th class="px-4 py-3">Total runs</th> -->
        </tr>

        <tr
          class="bg-gray-100 text-dark text-center cursor-pointer hover:bg-gray-300"
          v-for="currentView in getOrganizationsDashboard().projects"
          :key="currentView.id"
          @click="navigateForward(currentView.projectName)"
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
          <td class="px-4 py-3 border-b-2 border-dark">
            <a @click.stop :href="currentView['projectURL']" target="_blank"
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
          return require("../assets/img/5.png");
        } else if (recieved["worstReport"]["successRunsPercentage"] <= 40) {
          return require("../assets/img/4.png");
        } else if (recieved["worstReport"]["successRunsPercentage"] <= 60) {
          return require("../assets/img/3.png");
        } else if (recieved["worstReport"]["successRunsPercentage"] <= 80) {
          return require("../assets/img/2.png");
        } else if (recieved["worstReport"]["successRunsPercentage"] <= 100) {
          return require("../assets/img/1.png");
        }
      } else return require("../assets/img/1.png");
      // return recieved;
    },
    navigateForward(id) {
      console.log(id);
      this.openedOrganization(id);
      this.$store.commit("setcurrentDashboardToShow", "RepositoryDashboard");
      this.$store.commit("setProjectURL", id);
      this.$store.dispatch("getProjectDashboard");
    },
    //store to preview the breadcrumb
    openedOrganization(temp) {
      temp = this.$store.commit("setcurrentOpenProjectInDashboard", temp);
    },

    navigateBack() {
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
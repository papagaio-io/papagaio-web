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
          <th class="px-4 py-3">Agola reference</th>
          <th class="px-4 py-3">Last success</th>
          <th class="px-4 py-3">Last failure</th>
          <th class="px-4 py-3">Last run duration</th>
          <th class="px-4 py-3">On Agola</th>
          <th class="px-4 py-3">Delete from</th>
        </tr>

        <tr
          class="bg-gray-100 text-dark text-center cursor-pointer hover:bg-gray-300"
          v-for="currentView in $store.getters.showdashBoardData"
          :key="currentView.id"
          @click="navigateForward(currentView.agolaRef)"
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
            {{ currentView.agolaRef }}
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
          <td class="px-4 py-3 border-b-2 border-dark" @click.stop>
            <a
              @click.stop
              :href="currentView['organizationURL']"
              target="_blank"
              ><img
                class="inline-block w-12"
                alt="Papagaio logo"
                src="../assets/img/agola-logo-name.svg"
            /></a>
          </td>

          <td @click.stop class="px-4 py-3 border-b-2 border-dark">
      
            <el-dropdown>
              <el-button size="small" type="danger">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  />
                </svg>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    @click="deleteFromPapagaio(currentView.agolaRef)"
                  >
                    Papagaio
                  </el-dropdown-item>
                  <el-dropdown-item
                    @click="deleteFromAgola(currentView.agolaRef)"
                  >
                    Papagaio & Agola
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
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
      // currentDashboardData: "",
      dropdownOpen: false,
    };
  },
  mounted() {
    this.checkforUpdates();
  },

  methods: {
    ...mapActions(["getAllOrganizationDashboard"]),

    // getDashboard() {
    //   this.currentDashboardData = this.$store.getters.showdashBoardData;
    //   return this.currentDashboardData;
    // },
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

    deleteFromPapagaio(organization) {
      let self = this;
      this.$store.commit("setOrganizationToDelete", organization);
      this.$store.dispatch("deleteOrganizationFromPapagaio", organization);
      setTimeout(function () {
        self.$store.dispatch("getAllOrganizationDashboard");
      }, 1000);
    },
    deleteFromAgola(organization) {
      let self = this;
      this.$store.commit("setOrganizationToDelete", organization);
      this.$store.dispatch("deleteOrganizationFromAgola", organization);
      setTimeout(function () {
        self.$store.dispatch("getAllOrganizationDashboard");
      }, 1000);
    },
    checkforUpdates() {
      this.$store.dispatch("getAllOrganizationDashboard");
    },
  },
};
</script>

<style>
</style>
<template>
  <p class="text-lg text-center font-bold m-5">
    All Organizations Dashboard Beta
  </p>
  <hr />
  <table class="m-5 w-5/6 mx-auto bg-gray-200 text-gray-800">
    <tr class="text-left border-b-2 border-gray-300">
      <th class="px-4 py-3"></th>
      <th class="px-4 py-3">Status</th>
      <th class="px-4 py-3">Name</th>
      <th class="px-4 py-3">Last success</th>
      <th class="px-4 py-3">Last failure</th>
      <th class="px-4 py-3">Last run duration</th>
    </tr>

    <tr
      class="bg-gray-100 border-b border-gray-200 cursor-pointer"
      v-for="currentView in getDashboard()"
      :key="currentView.id"
      @click="iWasClicked(currentView.organizationName)" 
    >
      <td class="px-4 py-3">
        <img class= "w-10" :src="currentView.avatarUrl" alt="Organization Icon" />
       
      </td>
      <td class="px-4 py-3">
        {{ showSuccessPercentage(currentView.worstReport) }}
      </td>
      <td class="px-4 py-3">{{ currentView.organizationName }}</td>
      <td class="px-4 py-3">
        {{ calculateDateIntervels(currentView.lastSuccessRunDate) }}
      </td>
      <td class="px-4 py-3">
        {{ calculateDateIntervels(currentView.lastFailedRunDate) }}
      </td>
      <td class="px-4 py-3">
        {{ calculateLastDurationIntervels(currentView.lastRunDuration) }}
      </td>
    </tr>
    <!-- each row -->

    <!-- <tr class="bg-gray-100 border-b border-gray-200">
      <td class="px-4 py-3"> </td>
      <td class="px-4 py-3"></td>
      <td class="px-4 py-3"></td>
      <td class="px-4 py-3"></td>
      <td class="px-4 py-3"></td>
      <td class="px-4 py-3"></td>
    </tr>  -->
    <!-- each row -->
    <!-- <tr class="bg-gray-100 border-b border-gray-200">
      <td class="px-4 py-3">-</td>
      <td class="px-4 py-3">-</td>
      <td class="px-4 py-3">-</td>
      <td class="px-4 py-3">-</td>
    </tr> -->
    <!-- each row -->

  </table>

  <!-- Scaffold  -->
  <!-- <hr />
  Catching the data
  <div id="ID1">
    <ul>
      <li v-for="currentView in getDashboard()" :key="currentView.id">
        1 {{ currentView.name }} - {{ currentView.visibility }} 

        <ul>
          <li v-for="subTask in currentView.projects" :key="subTask.id">
          2  {{ subTask.name }} - {{ subTask.branchs }}
            <ul>
              <li v-for="subTask2 in subTask.branchs" :key="subTask2.id">
             3   {{ subTask2.name }} - {{ subTask2.state }}
                <ul>
                  <li v-for="subTask3 in subTask2" :key="subTask3.id">
                    {{ subTask3.branchName }} {{ subTask3.projectName }}
                    {{ subTask3.organizationName }} {{ subTask3.failedRuns }}
                    {{ subTask3.failedRuns }}
                    {{ subTask3.successRunsPercentage }}
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div> -->
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

  // mounted() {
  //   this.$store.dispatch('getCurrentResponse');

  // },

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
        return recieved["successRunsPercentage"];
      } else return "N/A";
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
    iWasClicked(id){
       this.$store.commit("setOrganizationURL",id);
       this.$store.dispatch('getOrganizationDashboard');
      //  console.log(this.$store.state.organizationURL)
    },
  },
};
</script>

<style>
</style>
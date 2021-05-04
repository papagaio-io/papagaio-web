<template>
  <div class="container mx-auto">
    <div class="float-right mb-2">
      <el-popover
        placement="top-start"
        title="Dashboard"
        :width="1400"
        trigger="hover"
        content="All organizations available on Agola are shown here, with summarized and detialed status reports. Tab an organization to expand its project(s) and repo(s). 
        (On Agola) will assist you to check the organization on Agola."
      >
        <template #reference>
          <el-button>?</el-button>
        </template>
      </el-popover>
    </div>

    <component v-bind:is="showDashboard"> </component>
    <!-- <AllOrganizationDashboard />
  <OrganizationDashboard />
  <RepositoryDashboard /> -->

    <!-- <button
      class="float-right px-3 py-3 font-medium rounded-md bg-papaOrange-600 hover:bg-papaDark-700 text-white mt-5 border-solid border-2 border-white"
      @click="this.$router.push('http://localhost:8081/neworganization')"
    >
      Add Organization
    </button> -->
  </div>
</template>

<script>
import AllOrganizationDashboard from "../components/AllOrganizationDashboard";
import ProjectDashboard from "../components/ProjectDashboard";
import RepositoryDashboard from "../components/RepositoryDashboard";
export default {
  components: {
    AllOrganizationDashboard,
    ProjectDashboard,
    RepositoryDashboard,
  },
  data() {
    return {
      // showDashboard: this.$store.getters.getcurrentDashboardToShow,
    };
  },
  computed: {
    showDashboard() {
      return this.$store.getters.getcurrentDashboardToShow;
    },
  },
};
</script>

<style>
</style>
<template>
  <div class="container mx-auto">
    <div class="float-right mb-2">
      <el-popover
        placement="top-start"
        title="Dashboard"
        :width="600"
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
  </div>
   {{this.$store.state.loggedIn}}
  {{this.$store.state.currentAuthToken}}
   {{this.$store.state.currentUserName}}
    {{this.$store.state.userAvatar}}
     {{this.$store.state.userIsAdmin}}
     {{this.$store.state.userGitSourceLink}}
<br>
<br>

{{this.$store.state.gitSourceAuthenticationChoice}}
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
  mounted() {
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
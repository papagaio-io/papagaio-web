<template>
  <div class="container mx-auto">
    <div class="float-right mb-2">
      <el-popover
        placement="top-start"
        title="Setting a new organization"
        :width="300"
        trigger="hover"
        content="this is content, this is content, this is content"
      >
        <template #reference>
          <el-button>?</el-button>
        </template>
      </el-popover>
    </div>

    <component v-bind:is="showDashboard"> </component>
    <!-- <AllOrganizationDashboard />
  <OrganizationDashboard />
  <ProjectDashboard /> -->

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
import OrganizationDashboard from "../components/OrganizationDashboard";
import ProjectDashboard from "../components/ProjectDashboard";
export default {
  components: {
    AllOrganizationDashboard,
    OrganizationDashboard,
    ProjectDashboard,
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
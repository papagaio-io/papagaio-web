<template>
  <form @submit.prevent="checkForm" action="" method="post">
    <div class="body">
      <h4 class="mb-2 text-3xl font-bold">New Organization</h4>
      <!-- Beginning of form -->
      <div class="ProjectSetupForm">
        <div class="panel">
          <div class="p-4 border-t">
            <table style="width: 100%">
              <tr>
                <div class="float-right">
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
                <h5 class="mb-3 text-xl">Organization name</h5>

                <center>
                  <input
                    class="mb-4 focus:border-papaDark-700 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline projectSetupTextField"
                    type="text"
                    placeholder="Type/paste an existing organization name"
                    v-model="orgName"
                  />
                </center>
              </tr>

              <tr>
                <h5 class="mb-3 text-xl">Private/Public</h5>

                <div class="mb-4 ml-1">
                  <label>
                    <input type="checkbox" v-model="orgIsPrivate" />
                    Private
                  </label>
                </div>
              </tr>
              <tr>
                <h5 class="mb-3 text-xl">Source ID</h5>
                <div class="flex mb-3 relative w-64">
                  <select
                    v-model="selectedSourceID"
                    class="block appearance-none w-full bg-white border focus:border-papaDark-700 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline px-4 py-2 pr-8"
                  >
                   <option value="" disabled selected hidden display>
                      Select from list
                    </option>

                   
                    <option v-for="item in getSourcesList" v-bind:key="item.id">
                    
                      {{ item.name }}
                    </option>
                      <option v-for="item in getSourcesList" v-bind:key="item.id">
                    
                      {{ item.id }}
                    </option>
                  </select>

                  <div
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2"
                  >
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <p v-if="errors.length">
        <el-alert
          title="Error. Please check and following(s) :"
          type="error"
          :closable="false"
          show-icon
        >
          <ul>
            <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
          </ul>
        </el-alert>
      </p>

      <div class="sm:mt-0 sm:ml-3">
        <button
          class="px-10 py-3 border border-transparent text-base font-medium rounded-md bg-papaOrange-600 hover:bg-papaDark-700 text-white font-bold py-2 px-4 rounded buttonRight"
        >
          Create
        </button>
      </div>

      <div
        v-if="createOrgError"
        class="mb-10 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <span class="block sm:inline">{{ createOrgError }}</span>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";
export default {
  components: {},
  name: "neworaganization",
  props: {},
  data() {
    return {
      createOrgError: null,
      orgIsPrivate: false,
      orgName: "",
      selectedRemoteSource: "",
      selectedSourceID: "",
      getSourcesList: [],
      getRemoteSourcesList: [],
      createOrganizationResponse: null,
      errors: [],
    };
  },

  mounted() {
    this.getGitSources();
    this.getRemoteSources();
  },

  methods: {
    checkForm: function (e) {
      if (this.orgName && this.orgIsPrivate != null) {
        return this.submitForm();
        
      }

      this.errors = [];

      if (!this.orgName) {
        this.errors.push("Organization name is empty");
      }
       if (!this.selectedSourceID) {
        this.errors.push("Please select a source ID");
      }
  

      e.preventDefault();
    },

    submitForm() {
      this.errors = [];

      axios
        .post("http://localhost:8080/createorganization", {
          name: this.orgName,
          visibility: this.orgIsPrivate.toString(),
          gitSourceId: this.selectedSourceID,
        })
        .then((response) => {
          this.createOrganizationResponse = response;
          this.$router.push("http://localhost:8080/organizationsetup");
        })
        .catch((error) => {
          this.createOrganizationResponse = error.response.data;
          this.errors.push(error.response.data);
          console.log(error);
        });
    },

    getGitSources() {
      axios.get("http://localhost:8080/gitsources").then((response) => {
        this.getSourcesList = response.data;
        console.log(response.data);

        // this.formatgetGitSources(response.data);
      });
    },
    getRemoteSources() {
      axios.get("http://localhost:8080/remotesources").then((response) => {
        this.getRemoteSourcesList = response.data;
        console.log(response.data);

        // this.formatgetGitSources(response.data);
      });
    },

    // formatgetGitSources(sourceOnGitSources){

    //   for(let key in sourceOnGitSources){
    //     this.getSourcesList.push({ ...sourceOnGitSources[key], id: key });
    //   }
    //   console.log(this.getSourcesList)

    // },
    //remove
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },

    resetErrors() {
      this.createOrgError = null;
    },
    async createOrg() {
      this.resetErrors();

      let visibility = "public";
      if (this.orgIsPrivate) {
        visibility = "private";
      }

      let { error } = await createOrganization(this.orgName, visibility);
      if (error) {
        this.createOrgError = error;
        return;
      }

      this.$router.push(ownerLink("org", this.orgName));
    },
  },
  created: async function () {},
};
</script>

<style scoped lang="scss">
</style>



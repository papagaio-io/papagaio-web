<template>
  <form @submit.prevent="checkForm"
  action= ""
  method="post"
  >
    <div class="body">
      <h4 class="mb-4 text-3xl font-bold">New organization</h4>
      <!-- Beginning of form -->
      <div class="ProjectSetupForm">
        <div class="panel">
          <div class="p-4 border-t">
            <table style="width: 100%">
              <tr>
                <h5 class="mb-3 text-xl">Organization Name</h5>

                <center>
                  <input
                    class="mb-4 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline projectSetupTextField"
                    type="text"
                    placeholder="Create your new organization "
                    v-model="orgName"
                  />
                </center>
                
              </tr>
              <tr>
                <h5 class="mb-3 text-xl ">Organization Url</h5>
                <center>
                  <input
                    class="mb-4 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline projectSetupTextField"
                    type="text"
                    placeholder="Copy and paste your organization's url"
                    v-model="orgURL"
                  />
                </center>
              </tr>
              <tr>
                <h5 class="mb-3 text-xl ">Private/Public</h5>
               
                  <div class="mb-4 ml-1">
                    <label>
                      <input type="checkbox" v-model="orgIsPrivate" />
                      Private
                    </label>
                  </div>
             
              </tr>
              <tr>
                <h5 class="mb-3 text-xl">Select required repository</h5>
                <div class="flex mb-3 relative w-64">
                  <select
                    v-model="selectedRepo"
                    class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option disabled value="">Select Repository</option>
                    <option>Gitea</option>
                    <option>Github</option>
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
              <tr>
                    <p v-if="errors.length">
                        <b>Please correct the following error(s):</b>
                        <ul>
                        <li v-for="error in errors" v-bind:key="error"> {{ error }}</li>
                        </ul>
                    </p>
              </tr>

            </table>
          </div>
        </div>
      </div>

        
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
      orgURL: "",
      selectedRepo: "",
      errors: [],
      //   githubImageSrc: require("@/assets/img/folder.png"),
    };
  },

  methods: {
    checkForm: function (e) {
      if (
        this.orgName &&
        this.orgURL &&
        this.orgIsPrivate &&
        this.selectedRepo
      ) {
        return this.submitForm();
      }

      this.errors = [];

      if (!this.orgName) {
        this.errors.push("OrgName required.");
      }
      if (!this.orgURL) {
        this.errors.push("OrgUrl required.");
      }
    //   if (!this.orgIsPrivate) {
    //     this.errors.push("OrgVisibility required.");
    //   }
      if (!this.selectedRepo) {
        this.errors.push("SelectRepo required.");
      }

      e.preventDefault();
    },

    submitForm() {
      axios
        .post("http://localhost:8080/saveorganization", {
          name: this.orgName,
          url: this.orgURL,
          type: this.selectedRepo,
          username: this.orgIsPrivate.toString(),
        })
        .then((response) => {
          //   console.log(response);
          this.$router.push("http://localhost:8080/organizationsetup");
        })
        .catch((error) => {
          console.log(error);
        });
    },
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



<template>
  <form @submit.prevent="submitForm">
    <div class="body">
      <h4 class="mb-4 text-xl font-bold">New Organization</h4>
      <div class="field">
        <div class="control">
          <input
            class="mb-4 appearance-none border rounded py-2 px-10 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Organization name"
            v-model="orgName"
          />
          <br />
          <input
            class="mb-4 appearance-none border rounded py-2 px-10 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Organization url"
            v-model="orgURL"
          />
        </div>
      </div>

      <div class="mb-4">
        <label>
          <input type="checkbox" v-model="orgIsPrivate" />
          Private
        </label>
      </div>

      <select
        v-model="selectedRepo"
        class="block appearance-none w-50 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        <option disabled value="">Please select a repo</option>
        <option>Gitea</option>
        <option>Github</option>
      </select>
      <span>Selected: {{ selectedRepo }}</span>
      <br />
      <br />

      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Organization
      </button>
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
      //   githubImageSrc: require("@/assets/img/folder.png"),
    };
  },

  methods: {
    submitForm() {
      axios
        .post("http://localhost:8080/saveorganization", {
          name: this.orgName,
          url: this.orgURL,
          type: this.selectedRepo,
          username: this.orgIsPrivate,
        })
        .then((response) => {
        //   console.log(response);
        this.$router.push('http://localhost:8080/organizationsetup');
        }).catch(error => {
            console.log(error)
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



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
                <h5 class="mb-3 text-xl">Git Source</h5>
                <div class="flex mb-3 relative w-64">
                  <select
                    v-model="selectedSourceID"
                    class="block appearance-none w-full bg-white border focus:border-papaDark-700 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline px-4 py-2 pr-8"
                  >
                    <option value="null" disabled selected hidden display>
                      Select from list
                    </option>

                    <option
                      v-for="item in getSourceListId"
                      v-bind:key="item.name"
                      :value="item.id"
                    >
                      {{ item.name }}
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

              <div
                class="mt-2 mb-3 text-xl text-papaDark-700"
                v-if="selectedSourceID != null"
              >
                <tr>
                  Corresponding URL:

                  <p
                    class="inline mt-2 text-lg text-papaOrange-600"
                    v-for="item in getSourceListId"
                    v-bind:key="item.id"
                  >
                    {{ item.gitApiUrl }}
                  </p>
                </tr>
              </div>
            </table>
          </div>
        </div>

        <!-- Behaviour Section -->
        <div class="panel">
          <p class="panel-title text-white bg-papaDark-700">Behavior</p>

          <div class="p-4 border-t">
            <button
              class="btn text-white bg-papaOrange-600 hover:bg-papaDark-700"
              @click="addRepositoriesField()"
              v-if="showBehaviorAddButton"
            >
              Add
            </button>
            <div class="float-right">
              <el-popover
                placement="top-start"
                title="Behaviour section"
                :width="200"
                trigger="hover"
                content="In this section you should do everything and anything no matter how hard it is. if you believe life is underrated then you should rate it.Yea why not?.Unless you believe it is overrated then you should also rate it.Yea why not? So what do you think of this section"
              >
                <template #reference>
                  <el-button>?</el-button>
                </template>
              </el-popover>
            </div>
          </div>

          <div
            class="p-4"
            v-for="(repositoriesField, counter) in repositoriesTable"
            v-bind:key="counter"
          >
            <table style="width: 100%">
              <button
                class="btn btn-red buttonRight"
                @click="deleteRepositoriesField(counter)"
              >
                Delete
              </button>
              <h5 class="mb-3 text-xl">Repositories</h5>
              <label class="block font-bold mb-2 subtitleLabel"
                >Filter by name</label
              >
              <tr>
                <span class="font-bold subtitleLabelDescription">Include</span>

                <center>
                  <input
                    class="mb-4 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline projectSetupTextField"
                    v-model="repositoriesField.repositoriesInclude"
                    type="text"
                    placeholder="Type"
                  />
                </center>
              </tr>

              <tr>
                <span class="font-bold subtitleLabelDescription">Exclude</span>

                <center>
                  <input
                    class="mb-4 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline projectSetupTextField"
                    v-model="repositoriesField.repositoriesExclude"
                    type="text"
                    placeholder="Type"
                  />
                </center>
              </tr>
              <tr>
                <h5 class="mb-3 text-xl">Behaviour Type</h5>
                <label class="ml-1">
                  <input
                    type="radio"
                    value="wildcard"
                    v-model="behaviorTypepicked"
                  />
                  wildcard</label
                >
                <label class="ml-1">
                  <input
                    type="radio"
                    value="regex"
                    v-model="behaviorTypepicked"
                  />
                  regex</label
                >
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
      <!-- to be removed -->
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
      orgName: null,
      selectedSourceID: null,
      getSourceListId: [],
      createOrganizationResponse: null,
      errors: [],
      key: "",
      showBehaviorAddButton: false,

      repositoriesTable: [
        {
          repositoriesInclude: "",
          repositoriesExclude: "",
        },
      ],

      behaviorTypepicked: "",

      behaviorIncludeTest: "",
      behaviorExcludeTest: "",
      behaviourTypeTest: "none",
    };
  },

  mounted() {
    this.getSourceId();
  },

  methods: {
    checkForm: function (e) {
      this.errors = [];

      if (!this.orgName) {
        this.errors.push("A valid existing organization name must be provided");
      }
      if (!this.selectedSourceID) {
        this.errors.push("Please select a source ID");
      }

      if (this.orgName && this.selectedSourceID != null) {
        //in-case behaviorAddButton is off. Then assign the fields to be sent to BE
        if (this.showBehaviorAddButton == false) {
          this.behaviorIncludeTest = this.repositoriesTable[0].repositoriesInclude;
          this.behaviorExcludeTest = this.repositoriesTable[0].repositoriesExclude;
          this.behaviourTypeTest = this.behaviorTypepicked;
          this.submitForm();
        } else this.showBehaviorAddButton == true;

        this.submitForm();
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
          behaviourInclude: this.behaviorIncludeTest,
          behaviourExclude: this.behaviorExcludeTest,
          behaviourType: this.behaviourTypeTest,
        })
        .then((response) => {
          this.createOrganizationResponse = response;
          this.$router.push("http://localhost:8080/");
        })
        .catch((error) => {
          this.createOrganizationResponse = error.response.data;
          this.errors.push(error.response.data);
          console.log(error);
        });
    },

    getSourceId() {
      axios.get("http://localhost:8080/gitsources").then((response) => {
        this.getSourceListId = response.data;
      });
    },

    addRepositoriesField() {
      this.repositoriesTable.push({
        repositoriesInclude: "",
        repositoriesExclude: "",
      });
      this.showBehaviorAddButton = false;
    },

    deleteRepositoriesField(counter) {
      this.repositoriesTable.splice(counter, 1);
      this.showBehaviorAddButton = true;
    },

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



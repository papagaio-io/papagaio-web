<template>
  <form @submit.prevent="checkForm" action="" method="post">
    <div class="w-3/4 container mx-auto">
     
      <h4 class="mt-2 mb-2 text-3xl font-bold">Add a New Organization</h4>
      <!-- Beginning of form -->
      <div class="bg-gray-100">
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
                  class="mb-4 border-l-8 focus:border-papaOrange-600 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none w-3/4"
                  type="text"
                  placeholder="Type/paste an existing organization name"
                  v-model="orgName"
                />
              </center>
            </tr>

            <tr>
              <h5 class="mb-3 text-xl">Visibility</h5>

              <label class="mb-4 flex justify-start items-start">
                <div
                  class="bg-white border-2 rounded border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500"
                >
                  <input
                    type="checkbox"
                    v-model="orgIsPrivate"
                    class="opacity-0 absolute"
                  />
                  <svg
                    class="fill-current hidden w-4 h-4 text-papaOrange-600 pointer-events-none"
                    viewBox="0 0 20 20"
                  >
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                  </svg>
                </div>
                <div>Private</div>
              </label>
            </tr>
            <!-- Git source -->
            <tr>
              <h5 class="mb-3 text-xl">Git source</h5>
              <div class="flex mb-3 relative w-64">
                <select
                  v-model="selectedSourceID"
                  class="block appearance-none w-full bg-white border focus:border-papaDark-700 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline px-4 py-2 pr-8"
                >
                  <option value="null" disabled selected hidden display>
                    Select from list
                  </option>

                  <option
                    v-for="item in gitSourceResponse"
                    v-bind:key="item.name"
                    :value="item.name"
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

            <!-- Showing corresponding URL-->
            <tr>
              <div class="" v-if="selectedSourceID != null">
                <div class="p-1 bg-grey-200  shadow-xl font-medium">
                  Corresponding URL
                  <h2
                    class="border-l-8 border-papaDark-400 bg-white text-dark p-1 font-medium"
                    v-for="item in gitSourceResponse"
                    v-bind:key="item.id"
                  >
                    {{ item.gitApiUrl }}
                  </h2>
                </div>
              </div>
            </tr>
          </table>
        </div>

        <!-- Behavior Section -->
        <p class="panel-title text-white bg-papaDark-700">Behavior</p>

        <div class="p-4">
          <button
            class="btn text-white bg-papaOrange-600 hover:bg-papaDark-700 border-solid border-2 border-white"
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
          <tr>
            <h5 class="mb-3 text-xl">Repositories</h5>
          </tr>
          <table style="width: 100%">
            <button
              class="btn btn-red text-white float-right mt-3 hover:bg-papaDark-700 border-solid border-2 border-white"
              @click="deleteRepositoriesField(counter)"
            >
              X
            </button>

            <label class="font-bold ml-2">Filter by name</label>
            <tr>
              <span class="font-bold ml-3">Include</span>
              <center>
                <input
                  class="mb-4 border-l-8 focus:border-papaOrange-600 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none w-3/4"
                  v-model="repositoriesField.repositoriesInclude"
                  type="text"
                  placeholder="*"
                />
              </center>
            </tr>

            <tr>
              <span class="font-bold ml-3">Exclude</span>

              <center>
                <input
                  class="mb-4 border-l-8 focus:border-papaOrange-600 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none w-3/4"
                  v-model="repositoriesField.repositoriesExclude"
                  type="text"
                  placeholder=""
                />
              </center>
            </tr>

            <tr>
              <h5 class="mb-3 text-xl">Behavior type</h5>
              <div class="radioButton radioButtonText">
                <label class="radio orange">
                  <input
                    type="radio"
                    value="wildcard"
                    v-model="behaviorTypepicked"
                  />
                  <span>Wildcard</span>
                </label>
              </div>
              <div class="radioButton radioButtonText">
                <label class="radio orange">
                  <input
                    type="radio"
                    value="regex"
                    v-model="behaviorTypepicked"
                  />
                  <span>Regex</span>
                </label>
              </div>
            </tr>
          </table>
        </div>
      </div>
      <p class="mt-1" v-if="errors.length">
        <el-alert
          title="Please check the following error(s) and try again :"
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
          class="px-10 py-3 font-medium rounded-md bg-papaOrange-600 hover:bg-papaDark-700 text-white font-bold py-2 px-4 rounded float-right mt-5 border-solid border-2 border-white"
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
  <!-- <p> test usertoken from new org {{userToken}} </p> -->
</template>

<script>
import axios from "axios";
export default {
  components: {},
  name: "neworaganization",
  props: {},
  data() {
    return {
      userToken: this.$store.getters.getAuthToken,
      createOrgError: null,
      orgIsPrivate: "false",
      orgName: null,
      selectedSourceID: null,
      gitSourceResponse: [],
      createOrganizationResponse: null,
      errors: [],
      key: "",
      showBehaviorAddButton: false,

      repositoriesTable: [
        {
          repositoriesInclude: "*",
          repositoriesExclude: "",
        },
      ],

      behaviorTypepicked: "wildcard",

      behaviorIncludeTempValue: "",
      behaviorExcludeTempValue: "",
      behaviorTypeTempValue: "none",
    };
  },

  mounted() {
    this.getSourceId();
  },

  methods: {
    checkBehavior() {
      this.errors = [];

      if (!this.behaviorTypepicked) {
        this.errors.push(
          "Choose a 'behavior type', or remove the behavior section"
        );
      }

      //'behavior include' must have parameter if default is changed
      if (this.repositoriesTable[0].repositoriesInclude === "") {
        this.errors.push(
          "Provide an 'include parameter' for the behavior, or remove the behavior section "
        );
      }

      if (!this.errors.length) {
        this.behaviorIncludeTempValue = this.repositoriesTable[0].repositoriesInclude;
        this.behaviorExcludeTempValue = this.repositoriesTable[0].repositoriesExclude;
        this.behaviorTypeTempValue = this.behaviorTypepicked;
        this.submitForm();
      }
    },

    checkForm: function (e) {
      this.errors = [];

      if (!this.orgName) {
        this.errors.push("- Provide an existing organization name");
      }
      if (!this.selectedSourceID) {
        this.errors.push("- Select a git source");
      }

      if (this.orgIsPrivate === "false" || this.orgIsPrivate == false) {
        this.orgIsPrivate = "public";
      } else if (this.orgIsPrivate === "true" || this.orgIsPrivate == true) {
        this.orgIsPrivate = "private";
      }

      if (this.orgName && this.selectedSourceID != null) {
        //in-case behaviorAddButton is off. Then assign the fields to be sent to BE
        if (this.showBehaviorAddButton == false) {
          this.checkBehavior();
        } else if (this.showBehaviorAddButton == true) {
          this.submitForm();
        }
      }

      e.preventDefault();
    },

    submitForm() {
      this.errors = [];

      axios
        .post(
          "https://papagaio-api.sorintdev.it/api/createorganization",
          {
            name: this.orgName,
            visibility: this.orgIsPrivate,
            gitSourceName: this.selectedSourceID,
            behaviourInclude: this.behaviorIncludeTempValue,
            behaviourExclude: this.behaviorExcludeTempValue,
            behaviourType: this.behaviorTypeTempValue,
          },
          { headers: { Authorization: `Bearer ${this.userToken}` } }
        )
        .then((response) => {
          // this.createOrganizationResponse = response;
          this.$store.state.createOrganizationBeResponse = response.data;
          this.$router.push("http://localhost:8080/confirmation");
        })
        .catch((error) => {
          this.createOrganizationResponse = error.response.data;
          this.errors.push(error.response.data);
        });
    },

    getSourceId() {
      axios
        .get("https://papagaio-api.sorintdev.it/api/gitsources", {
          headers: { Authorization: `Bearer ${this.userToken}` },
        })
        .then((response) => {
          this.gitSourceResponse = response.data;
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
  },
};
</script>

<style scoped lang="scss">
</style>



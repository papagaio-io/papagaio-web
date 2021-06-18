<template>
  <form @submit.prevent="checkForm" action="" method="post">
    <div class="w-full sm:w-3/4 container mx-auto">
      <h4 class="mt-2 mb-2 text-3xl font-bold">Add a New Organization</h4>

      <!-- Beginning of form -->
      <div class="bg-gray-100 p-4">
        <!-- Git source -->
        <div class="float-right">
          <el-popover
            placement="top-start"
            title="Adding a new organization"
            :width="920"
            trigger="hover"
            content="Fill this form to build your project on Agola, using Papagaio. As of today, 
                  Papagaio can only help you run projects on gitea and wecode repos. 
                   "
          >
            <template #reference>
              <el-button>?</el-button>
            </template>
          </el-popover>
        </div>

        <div class="flex">
          <div >
            <h5 class="mb-3 text-xl font-medium">Git source</h5>

            <el-select
              v-model="selectedSourceID"
              @change="getAvailableOrganizationInGitSource"
              placeholder="Select"
              class="
                inline-input
                mb-3
                border-l-8 border-papaOrange-600
                px-1
                w-3/5
              "
            >
              <el-option value="null" label="Select"> Select </el-option>
              <el-option
                v-for="item in gitSourceResponse"
                :key="item.value"
                :label="item.name"
                :value="item.name"
              >
                {{ item.name }}
              </el-option>
            </el-select>
            <!-- error message-->
            <h6 class="text-red-600" v-if="errorGitSourceSelect.length">
              Please specify the Git source
            </h6>
          </div>

          <!-- Showing corresponding URL-->
          <div
            v-if="selectedSourceID != null && selectedSourceID != 'null'"
            class="w-2/3 mt-5 ml-4"
          >
            <div class="p-1 bg-grey-200 shadow-lg font-medium">
              Corresponding URL
              <h2
                class="
                  border-l-8 border-papaDark-400
                  bg-white
                  text-dark
                  p-1
                  font-medium
                "
                v-for="item in gitSourceResponse"
                v-bind:key="item.id"
              >
                {{ item.gitApiUrl }}
              </h2>
            </div>
          </div>
        </div>

        <!-- Organization Name-->
        <table style="width: 100%">
          <tr>
            <h5 class="mb-3 mt-10 text-xl font-medium">Organization name</h5>
            <div class="flex justify-center">
              <el-select
                v-model="orgName"
                filterable
                placeholder="Select"
                class="
                  inline-input
                  mb-3
                  border-l-8 border-papaOrange-600
                  px-1
                  w-3/4
                "
                @change="AgolaReferenceNameSuggestion()"
              >
                <el-option value="null" label="Select"> Select </el-option>
                <el-option
                  v-for="item in availableOrganizationInGitSource"
                  :key="item.value"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </div>
            <!-- Error  message for Organization Name-->
            <h6 class="text-red-600" v-if="errorOrganizationName.length">
              Please select the organization required to run
            </h6>
          </tr>

          <!-- Agola reference name section -->
          <tr>
            <h5 class="mb-3 mt-10 text-xl font-medium">Agola reference name</h5>
            <!-- Create new checkbox -->
            <label class="mb-4 flex justify-start items-start">
              <div
                class="
                  bg-white
                  border-2
                  rounded-full
                  border-gray-400
                  w-5
                  h-5
                  flex flex-shrink-0
                  justify-center
                  items-center
                  mr-2
                  focus-within:border-blue-500
                "
              >
                <input
                  type="checkbox"
                  v-model="createNewAgolaReferenceName"
                  class="opacity-0 absolute"
                  @change="
                    selectFromExistingAgolaReferenceName =
                      !selectFromExistingAgolaReferenceName
                  "
                />
                <svg
                  class="
                    fill-current
                    hidden
                    w-4
                    h-4
                    text-papaOrange-600
                    pointer-events-none
                  "
                  viewBox="0 0 20 20"
                >
                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                </svg>
              </div>
              <div>Create new</div>
            </label>

            <!-- Agola ref. input field-->
            <div class="flex justify-center">
              <div class="w-3/4">
                <el-input
                  :disabled="!createNewAgolaReferenceName"
                  class="mb-4 border-l-8 border-papaOrange-600 px-1 w-11/12"
                  placeholder="Auto-generated name"
                  v-model="agolaRefName"
                  @change="checkIfAgolaRefNameExists()"
                ></el-input>

                <label class="flex inline-block mb-4">
                  <div
                    class="
                      bg-white
                      border-2
                      rounded
                      border-gray-400
                      w-5
                      h-5
                      flex flex-shrink-0
                      justify-center
                      items-center
                      mr-2
                      focus-within:border-blue-500
                    "
                  >
                    <input
                      type="checkbox"
                      v-model="orgIsPrivate"
                      class="opacity-0 absolute"
                    />
                    <svg
                      class="
                        fill-current
                        hidden
                        w-4
                        h-4
                        text-papaOrange-600
                        pointer-events-none
                      "
                      viewBox="0 0 20 20"
                    >
                      <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                  </div>
                  Set private on Agola
                </label>
              </div>
            </div>
            <!-- Info alerts message-->
            <p class="mt-1 mb-3" v-if="infos.length">
              <el-alert
                title="Warning"
                type="warning"
                effect="dark"
                :closable="false"
                show-icon
              >
                <ul>
                  <li
                    class="text-sm mb-1"
                    v-for="info in infos"
                    v-bind:key="info"
                  >
                    {{ info }}
                  </li>
                </ul>
              </el-alert>
            </p>
          </tr>

          <!-- Existing Agola ref. -->
          <tr>
            <label class="mb-4 flex justify-start items-start">
              <div
                class="
                  bg-white
                  border-2
                  rounded-full
                  border-gray-400
                  w-5
                  h-5
                  flex flex-shrink-0
                  justify-center
                  items-center
                  mr-2
                  focus-within:border-blue-500
                "
              >
                <input
                  type="checkbox"
                  v-model="selectFromExistingAgolaReferenceName"
                  class="opacity-0 absolute"
                  @change="
                    createNewAgolaReferenceName = !createNewAgolaReferenceName
                  "
                />
                <svg
                  class="
                    fill-current
                    hidden
                    w-4
                    h-4
                    text-papaOrange-600
                    pointer-events-none
                  "
                  viewBox="0 0 20 20"
                >
                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                </svg>
              </div>
              <div>Select from existing</div>
            </label>

            <div class="flex justify-center">
              <el-select
                v-model="ExistingAgolaRefName"
                :disabled="!selectFromExistingAgolaReferenceName"
                filterable
                placeholder="Select"
                class="
                  inline-input
                  mb-4
                  border-l-8 border-papaOrange-600
                  px-1
                  w-3/4
                "
              >
                <el-option value="null" label="Select"> Select </el-option>
                <el-option
                  v-for="item in existingAgolaReferenceNameInDB"
                  :key="item.value"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </div>
          </tr>
        </table>
      </div>

      <!-- Behavior Section -->
      <p class="panel-title text-white bg-papaDark-700">Behavior</p>
      <div class="bg-gray-100">
        <div class="p-4">
          <button
            class="
              btn
              text-white
              bg-papaDark-800
              hover:bg-papaDark-700
              border-solid border-2 border-white
            "
            @click="addRepositoriesField()"
            v-if="showBehaviorAddButton"
          >
            Add
          </button>

          <div class="float-right">
            <el-popover
              placement="top-start"
              title="Behavior section"
              :width="600"
              trigger="hover"
              content="If required, use the Behavior section to specify a behavior type using wildcard or regex."
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
            <el-button
              size="small"
              type="danger"
              key=""
              @click="deleteRepositoriesField(counter)"
              class="float-right"
            >
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

            <label class="font-bold ml-2">Filter by name</label>
            <tr>
              <span class="font-bold ml-3">Include</span>
              <div class="flex justify-center">
                <input
                  class="
                    mb-4
                    border-l-8
                    focus:border-papaOrange-600
                    appearance-none
                    border
                    rounded
                    py-2
                    px-3
                    leading-tight
                    focus:outline-none
                    w-3/4
                  "
                  v-model="repositoriesField.repositoriesInclude"
                  type="text"
                  placeholder="*"
                />
              </div>
            </tr>

            <tr>
              <span class="font-bold ml-3">Exclude</span>

              <div class="flex justify-center">
                <input
                  class="
                    mb-4
                    border-l-8
                    focus:border-papaOrange-600
                    appearance-none
                    border
                    rounded
                    py-2
                    px-3
                    leading-tight
                    focus:outline-none
                    w-3/4
                  "
                  v-model="repositoriesField.repositoriesExclude"
                  type="text"
                  placeholder=""
                />
              </div>
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
      <!-- General error alerts message-->
      <p class="mt-1" v-if="errors.length">
        <el-alert
          title="Please check the following error(s) and try again :"
          type="error"
          effect="dark"
          :closable="false"
          show-icon
        >
          <ul>
            <li
              class="text-base mb-1"
              v-for="error in errors"
              v-bind:key="error"
            >
              {{ error }}
            </li>
          </ul>
        </el-alert>
      </p>

      <div class="sm:mt-0 sm:ml-3">
        <button
          class="
            mt-5
            px-10
            py-3
            font-medium
            bg-papaDark-800
            hover:bg-papaDark-700
            text-white
            float-right
            border-solid border-2 border-white
          "
        >
          Create
        </button>
      </div>
    </div>
  </form>
  <el-dialog
    title="Organization already exists on Agola"
    v-model="dialogVisible"
    width="30%"
  >
    <span
      >This reference name is already used for an organization on Agola.<br />
      Do you want to override?
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="forceSubmitForm()">Yes</el-button>
        <el-button @click="dialogVisible = false">Cancel</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- <p>I have {{ availableOrganizationInGitSource }}</p> -->
  <!-- <p>I have2 {{ orgName }}</p> -->
  <!-- <p>Current Agola references names in DB {{ existingAgolaReferenceNameInDB }}</p> -->
  <!-- <p>New checkbox {{ createNewAgolaReferenceName }}</p> -->
  <!-- <p>Existing checkbox {{ selectFromExistingAgolaReferenceName }}</p> -->
  <!-- <p>The user choosed an Existing {{ ExistingAgolaRefName }}</p> -->
  <!-- <br /> -->
  <!-- <br /> -->
  <!-- <p>Agola reference that we deal with {{ agolaRefName }}</p> -->
  <!-- <p>Private/Public {{ orgIsPrivate }}</p> -->
</template>

<script>
import { ElLoading } from "element-plus";

export default {
  components: {},
  name: "neworaganization",
  props: {},
  data() {
    return {
      userToken: this.$store.getters.getAuthToken,

      availableOrganizationInGitSource: [],
      existingAgolaReferenceNameInDB: [],

      createNewAgolaReferenceName: true,
      selectFromExistingAgolaReferenceName: false,

      orgIsPrivate: false,
      orgName: "",
      agolaRefName: "",
      ExistingAgolaRefName: "",
      selectedSourceID: null,
      gitSourceResponse: [],
      createOrganizationResponse: null,
      errors: [], //array of errors to users
      infos: [], //array of info to users
      errorOrganizationName: [],
      errorGitSourceSelect: [],
      key: "",
      showBehaviorAddButton: true,
      dialogVisible: false,

      repositoriesTable: [
        // {
        //   repositoriesInclude: "*",
        //   repositoriesExclude: "",
        // },
      ],

      behaviorTypepicked: "wildcard",

      behaviorIncludeTempValue: "",
      behaviorExcludeTempValue: "",
      behaviorTypeTempValue: "none",
    };
  },

  mounted() {
    this.gitSource();
    // this.currentAvailableAgolaReferenceNames();

    if(this.$keycloak.authenticated === false) {
      window.location.reload()
    }
  },
  computed: {
    randomName() {
      let randomNumber = Math.floor(Math.random() * 100);
      return randomNumber;
    },
  },

  watch: {
    agolaRefName: "checkIfAgolaRefNameExists",
  },

  methods: {
    gitSource() {
      this.$store.dispatch("getGitSourceId").then((response) => {
        this.gitSourceResponse = response;
      });
    },

    getAvailableOrganizationInGitSource() {
      this.$store.state.GitSourceToGetOrganizationFrom = this.selectedSourceID;

      this.$store
        .dispatch("getOrganizationsFromSpecificGitSource")
        .then((response) => {
          this.availableOrganizationInGitSource = response;
        });
    },

    AgolaReferenceNameSuggestion() {
      // loop and make sure the name doesn't exist before proposing it

      if (this.orgName !== "null" || !this.orgName) {
        this.$store
          .dispatch("getExistingAgolaReferenceNames")
          .then((response) => {
            this.existingAgolaReferenceNameInDB = response;
          });

        this.agolaRefName = this.orgName + this.randomName;
        return this.agolaRefName;
      } else this.agolaRefName = "";
      return this.agolaRefName;
    },
    checkIfAgolaRefNameExists() {
      if (this.createNewAgolaReferenceName == true) {
        this.infos = [];
        if (
          this.existingAgolaReferenceNameInDB.indexOf(this.agolaRefName) > -1
        ) {
          this.infos.push(
            "This reference name is already in use. Please compose another one, or choose from existing names."
          );
        } else {
          //Not in the array. Name doesn't exist
        }
      }
    },

    checkForm: function (e) {
      //checks which agolaRefName to use
      if (this.selectFromExistingAgolaReferenceName == true) {
        this.agolaRefName = this.ExistingAgolaRefName;
      }

      this.errors = [];
      this.errorOrganizationName = [];
      this.errorGitSourceSelect = [];

      if (!this.orgName || this.orgName === "null") {
        this.errorOrganizationName.push("");
      }
      if (!this.selectedSourceID) {
        this.errorGitSourceSelect.push(
          "Please select the required git source in which the organization exists"
        );
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
        this.behaviorIncludeTempValue =
          this.repositoriesTable[0].repositoriesInclude;
        this.behaviorExcludeTempValue =
          this.repositoriesTable[0].repositoriesExclude;
        this.behaviorTypeTempValue = this.behaviorTypepicked;
        this.submitForm();
      }
    },

    submitForm() {
      //directly force submit in-case users chooses an existing Agola Ref. Name
      if (this.selectFromExistingAgolaReferenceName == true) {
        this.forceSubmitForm();
      }

      let loadingInstance = ElLoading.service({
        text: "Adding Organization",
        spinner: "el-icon-loading",
        background: "rgba(44, 96, 80,0.1)",
      });
      this.errors = [];

      this.$store.commit("setNewOrganizationData", {
        tempName: this.orgName,
        tempAgolaRef: this.agolaRefName,
        tempVisibility: this.orgIsPrivate,
        tempGitSourceName: this.selectedSourceID,
        tempBehaviourInclude: this.behaviorIncludeTempValue,
        tempBehaviorInclude: this.behaviorExcludeTempValue,
        tempBehaviorType: this.behaviorTypeTempValue,
      });

      this.$store
        .dispatch("newOrganization")
        .then((response) => {
          loadingInstance.close();
          if (response.data["errorCode"] === "AGOLA_REF_NOT_VALID") {
            this.errors.push("Invalid Agola reference name");
          } else if (response.data["errorCode"] === "NO_ERROR") {
            this.$store.state.createOrganizationBeResponse =
              response.data["organizationURL"];
            this.$router.push("http://localhost:8080/confirmation");
          } else if (response.data["errorCode"] === "ORG_GIT_NOT_FOUND") {
            this.createOrganizationResponse = response.data["errorCode"];
            this.errors.push("Organization's git could not be found");
          } else if (response.data["errorCode"] === "ORG_AGOLA_EXISTS") {
            this.forceSubmitConfirmation();
          } else if (response.data["errorCode"] === "ORG_PAPAGAIO_EXISTS") {
            this.errors.push("Organization already exists in Papagaio");
          } else {
            this.errors.push(response.data["errorCode"]);
          }
        })
        .catch((error) => {
          this.createOrganizationResponse = error.response.data;
          this.errors.push(error.response.data);
        });
    },

    forceSubmitConfirmation() {
      this.dialogVisible = true;
    },

    forceSubmitForm() {
      // close confirmation dialog
      this.dialogVisible = false;
      let loadingInstance = ElLoading.service({
        text: "Adding Organization",
        spinner: "el-icon-loading",
        background: "rgba(44, 96, 80,0.1)",
      });
      this.errors = [];

      this.$store.commit("setNewOrganizationData", {
        tempName: this.orgName,
        tempAgolaRef: this.agolaRefName,
        tempVisibility: this.orgIsPrivate,
        tempGitSourceName: this.selectedSourceID,
        tempBehaviourInclude: this.behaviorIncludeTempValue,
        tempBehaviorInclude: this.behaviorExcludeTempValue,
        tempBehaviorType: this.behaviorTypeTempValue,
      });
      this.$store
        .dispatch("forceNewOrganization")
        .then((response) => {
          loadingInstance.close();
          console.log(response);
          this.$store.state.createOrganizationBeResponse =
            response.data["organizationURL"];
          this.$router.push("http://localhost:8080/confirmation");
        })
        .catch((error) => {
          this.createOrganizationResponse = error.response.data;
          this.errors.push(error.response.data);
        });
    },

    addRepositoriesField() {
      this.repositoriesTable.push({
        repositoriesInclude: "*",
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



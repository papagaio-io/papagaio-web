<template>
  <div class="w-3/4 container mx-auto">
    <h4 class="mt-2 mb-2 text-3xl font-bold">Scan Duration</h4>
    <div class="bg-gray-100">
      <div class="p-4 border-t">
        <div class="float-right">
          <el-popover
            placement="top-start"
            title="Scan Interval"
            :width="850"
            trigger="hover"
            content="Here you can reconfigure the desired default interval runs for the organizations.
             Plus, the intervals for runs after fails occur."
          >
            <template #reference>
              <el-button>?</el-button>
            </template>
          </el-popover>
        </div>
        <div class="flex mb-3">
          <h5 class="text-xl">Current trigger durations</h5>
          <button class="float-right ml-2" @click="editSectionVisibility()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
              />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
          </button>
        </div>
        <div  class="flex justify-around">
          <div class="p-1 w-1/3 bg-red shadow-lg font-medium">
            Default runs
            <h2
              class="border-l-8 border-papaDark-400 bg-white text-dark p-1 font-medium"
            >
              {{
                formatMinutesRecievedFromBE(
                  $store.getters.getorganizationsDefaultTriggerTime
                )
              }}
            </h2>
          </div>

          <div class="p-1 w-1/3 bg-grey-200 shadow-lg font-medium">
            Failed runs
            <h2
              class="border-l-8 border-papaDark-400 bg-white text-dark p-1 font-medium"
            >
              {{
                formatMinutesRecievedFromBE(
                  $store.getters.getrunFailedDefaultTriggerTime
                )
              }}
            </h2>
          </div>
        </div>

        <!-- The editable section -->
        <div v-show="editIntervels">
          <h5 class="mt-5 mb-3 text-xl text-papaOrange-600">Edit intervals</h5>
          <hr class="mt-5 mb-3"/>
          <div class="flex justify-around">
            <div class="p-1 w-1/4 bg-red shadow-lg font-medium">
              Default runs
              <h2
                class="border-l-8 border-papaOrange-600 bg-white text-dark p-1 font-medium"
              >
                <!-- {{ $store.getters.getorganizationsDefaultTriggerTime }} -->
                {{ tempNumericDefaultRunInterval }}
                {{ tempDefaultRunIntervelIdentifier }}
              </h2>
              <div class="flex justify-around mt-4">
                <div class="flex mb-3 relative">
                  <select
                    class="block appearance-none w-full bg-white border focus:border-papaDark-700 rounded py-2 px-5 leading-tight focus:outline-none focus:shadow-outline"
                    v-model="tempDefaultRunIntervelIdentifier"
                  >
                    <option value="null" disabled selected hidden display>
                      Select
                    </option>
                    <option value="minute">Minute</option>
                    <option value="hour">Hour</option>
                    <option value="day">Day</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
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
                <div class="sm:mt-0 sm:ml-3">
                  <button
                    class="px-5 py-1 font-medium rounded-md bg-papaOrange-600 hover:bg-papaDark-700 text-white border-solid border-2 border-white"
                    @click="decreaseOneDefaultIntervel()"
                  >
                    -
                  </button>
                </div>

                <div class="sm:mt-0 sm:ml-3">
                  <button
                    class="px-5 py-1 font-medium rounded-md bg-papaOrange-600 hover:bg-papaDark-700 text-white border-solid border-2 border-white"
                    @click="addOneDefaultIntervel()"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div class="p-1 w-1/4 bg-red shadow-lg font-medium">
              Failed Runs
              <h2
                class="border-l-8 border-papaOrange-600 bg-white text-dark p-1 font-medium"
              >
                <!-- {{ $store.getters.getrunFailedDefaultTriggerTime }} -->
                {{ tempNumericFailedRunInterval }}
                {{ tempFailedRunIntervelIdentifier }}
              </h2>
              <div class="flex justify-around mt-4">
                <div class="flex mb-3 relative">
                  <select
                    class="block appearance-none w-full bg-white border focus:border-papaDark-700 rounded py-2 px-5 leading-tight focus:outline-none focus:shadow-outline"
                    v-model="tempFailedRunIntervelIdentifier"
                  >
                    <option value="null" disabled selected hidden display>
                      Select
                    </option>
                    <option value="minute">Minute</option>
                    <option value="hour">Hour</option>
                    <option value="day">Day</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
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
                <div class="sm:mt-0 sm:ml-3">
                  <button
                    class="px-5 py-1 font-medium rounded-md bg-papaOrange-600 hover:bg-papaDark-700 text-white border-solid border-2 border-white"
                    @click="decreaseOneFailedIntervel()"
                  >
                    -
                  </button>
                </div>

                <div class="sm:mt-0 sm:ml-3">
                  <button
                    class="px-5 py-1 font-medium rounded-md bg-papaOrange-600 hover:bg-papaDark-700 text-white border-solid border-2 border-white"
                    @click="addOneFailedIntervel()"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sm:mt-0 sm:ml-3" v-show="editIntervels">
      <button
        class="px-10 py-3 font-medium rounded-md bg-papaOrange-600 hover:bg-papaDark-700 text-white font-bold py-2 px-4 rounded float-right mt-5 border-solid border-2 border-white"
        @click="checkForm()"
      >
        Save
      </button>
    </div>
  </div>
  <el-dialog
    title="Ops, no adminstration privilege"
    v-model="dialogVisible"
    width="30%"
  >
    <span
      >Account has no adminstration privilege to perform an edit.<br />
      Please contact the adminstator for more details on this.</span
    >
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Okay</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      editIntervels: false,
      userAdministratorPrivilege: "",
      dialogVisible: false,

      tempNumericDefaultRunInterval: null,
      tempNumericFailedRunInterval: null,

      tempDefaultRunIntervelIdentifier: "minute",
      tempFailedRunIntervelIdentifier: "minute",

      convertedNewDefaultRunIntervel: null,
      convertedNewFailedRunIntervel: null,
    };
  },

  computed: {},
  mounted() {
    this.checkForUpdates();
    this.isAdminstrator();
  },
  methods: {
    checkForm() {
      //flush numeric values to store, and then check the period identifier to convert to minutes
      this.$store.commit(
        "setorganizationsDefaultTriggerTime",
        this.tempNumericDefaultRunInterval
      );
      this.$store.commit(
        "setrunFailedDefaultTriggerTime",
        this.tempNumericFailedRunInterval
      );

      if (
        this.tempDefaultRunIntervelIdentifier === "minute" &&
        this.tempFailedRunIntervelIdentifier === "minute"
      ) {
        this.convertedNewDefaultRunIntervel = this.$store.getters.getorganizationsDefaultTriggerTime;
        this.convertedNewFailedRunIntervel = this.$store.getters.getrunFailedDefaultTriggerTime;

      } else if (this.tempDefaultRunIntervelIdentifier == "hour") {
        this.convertedNewDefaultRunIntervel =
          this.$store.getters.getorganizationsDefaultTriggerTime * 60;
      
      } else if (this.tempDefaultRunIntervelIdentifier == "day") {
        this.convertedNewDefaultRunIntervel =
          this.$store.getters.getorganizationsDefaultTriggerTime * 1440;
       
      } else if (this.tempDefaultRunIntervelIdentifier == "week") {
        this.convertedNewDefaultRunIntervel =
          this.$store.getters.getorganizationsDefaultTriggerTime * 10080;
     
      } else if (this.tempDefaultRunIntervelIdentifier == "month") {
        this.convertedNewDefaultRunIntervel =
          this.$store.getters.getorganizationsDefaultTriggerTime * 43800;
       
      }
      if (this.tempFailedRunIntervelIdentifier == "hour") {
        this.convertedNewFailedRunIntervel =
          this.$store.getters.getrunFailedDefaultTriggerTime * 60;
       
      } else if (this.tempFailedRunIntervelIdentifier == "day") {
        this.convertedNewFailedRunIntervel =
          this.$store.getters.getrunFailedDefaultTriggerTime * 1440;
      
      } else if (this.tempFailedRunIntervelIdentifier == "week") {
        this.convertedNewFailedRunIntervel =
          this.$store.getters.getrunFailedDefaultTriggerTime * 10080;
     
      } else if (this.tempFailedRunIntervelIdentifier == "month") {
        this.convertedNewFailedRunIntervel =
          this.$store.getters.getrunFailedDefaultTriggerTime * 43800;
      
      } else {
        console.log("values are not clear");
      }

      this.$store.commit(
        "setorganizationsDefaultTriggerTime",
        this.convertedNewDefaultRunIntervel
      );
      this.$store.commit(
        "setrunFailedDefaultTriggerTime",
        this.convertedNewFailedRunIntervel
      );
      this.$store.dispatch("setNewOrganizationsDefaultTriggerTimeInDb");
      //response to be handled here
      this.editIntervels = false;
      //clear temp values
      this.tempNumericDefaultRunInterval = null;
      this.tempNumericFailedRunInterval = null;
    },

    addOneDefaultIntervel() {
      this.tempNumericDefaultRunInterval++;
    },
    decreaseOneDefaultIntervel() {
      if (this.tempNumericDefaultRunInterval > 0) {
        this.tempNumericDefaultRunInterval--;
      }
    },
    addOneFailedIntervel() {
      this.tempNumericFailedRunInterval++;
    },
    decreaseOneFailedIntervel() {
      if (this.tempNumericFailedRunInterval > 0) {
        this.tempNumericFailedRunInterval--;
      }
    },

    //a function the formats the minutes recieved from BE.
    formatMinutesRecievedFromBE(n) {
      var value = n * 60;

      var units = {
        day: 24 * 60 * 60,
        hour: 60 * 60,
        minute: 60,
        second: 1,
      };

      var result = [];

      for (var name in units) {
        var p = Math.floor(value / units[name]);
        if (p == 1) result.push(" " + p + " " + name);
        if (p >= 2) result.push(" " + p + " " + name + "s");
        value %= units[name];
      }

      return result[0];
    },

    checkForUpdates() {
      this.$store.dispatch("organizationsDefaultTriggerTimeInDb");
    },

    //checks to give edit privileges
    isAdminstrator() {
      this.$store
        .dispatch("getAdministratorPrivilegesForIntervelEditInDb")
        .then((response) => {
          this.userAdministratorPrivilege = response["isAdministrator"];
        });

      // return false;
      return this.userAdministratorPrivilege;
    },
    
    editSectionVisibility() {
      if (this.isAdminstrator() == true) {
        return (this.editIntervels = !this.editIntervels);
      } else if (this.isAdminstrator() == false) {
        return (this.dialogVisible = true);
      }
    },
  },
};
</script>

<style>
</style>
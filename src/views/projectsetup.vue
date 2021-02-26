<template>
  <div>
    <!-- <h1 class="workingItemsTitle">Working Items</h1>

    <div class="headSummaryStyle">
      <input class="headTextFieldStyleLong" type="text" placeholder="Type" />
      <input class="headTextFieldStyleLong" type="text" placeholder="Name" />
      <input class="headTextFieldStyleShort" type="text" placeholder="#Users" />
      <input
        class="headTextFieldStyleShort"
        type="text"
        placeholder="#Projects"
      />
      <input
        class="headTextFieldStyleShort"
        type="text"
        placeholder="#Status"
      />
    </div>

    <div class="workingItemNavigationTable">
      <scroll-table
        :headers="headers"
        :data="rows"
        :hasScroll="true"
        :limits="[5, 10, 15]"
        :styles="styles"
        :classes="classes"
      >
        <template slot="icon" slot-scope="{ data }">
          <center><img :src="data.attributes.avatarUrl" width="40px" /></center>
          <span>
            {{ data.value }}
          </span>
        </template>
        <template slot="favorite color" slot-scope="{ data }">
          <center>
            <svg width="20" height="20">
              <rect width="20" height="20" :style="`fill:${data};`"></rect>
            </svg>
          </center>
        </template>
      </scroll-table>
    </div> -->

    <h4 class="mb-4 text-xl font-bold">Gitea Organization</h4>
    <!-- Beginning of form -->
    <div class="ProjectSetupForm">
      <div class="panel">
        <div class="p-4 border-t">
          <table style="width: 100%">
            <tr>
              <h5 class="mb-3 text-xl">Server URL</h5>

              <center>
                <input
                  class="mb-4 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline projectSetupTextField"
                  type="text"
                  placeholder="Type"
                />
              </center>
            </tr>
            <tr>
              <h5 class="mb-3 text-xl">Authentication Token</h5>
              <center>
                <input
                  class="mb-4 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline projectSetupTextField"
                  type="text"
                  placeholder="Type"
                />
              </center>
            </tr>
            <tr>
              <h5 class="mb-3 text-xl">Organization</h5>
              <center>
                <input
                  class="mb-4 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline projectSetupTextField"
                  type="text"
                  placeholder="Type"
                />
              </center>
            </tr>
          </table>
        </div>
      </div>

      <!-- Behaviour Section -->

      <div class="panel">
        <p class="panel-title">Behavior</p>
<div class="p-4 border-t">
        <div class="inline-block">
          <div class="flex mb-3 relative w-64">
            <select
              name="AddingToBehaviourSection"
              @change="addRequiredBehaviour"
              class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="" disabled selected hidden display>Add</option>

              <optgroup label="Repositories">
                <option value="1">Filter by name(with wildcards)</option>
              </optgroup>

              <optgroup label="Within repositories">
                <option value="2">Discovery branch</option>
              </optgroup>
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
        </div>
      </div>
        <div
          class="p-4 border-t"
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
              >Filter by name (with wildcards)</label
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
          </table>
        </div>

        <div
          class="p-4 border-t"
          v-for="(field, counter) in withinRepositoriesTable"
          v-bind:key="counter"
        >
          <table style="width: 100%">
            <button
              class="btn btn-red buttonRight"
              @click="deleteWithinRepositoriesField(index)"
            >
              Delete
            </button>
            <h5 class="mb-3 text-xl">Within-repositories</h5>

            <label class="block font-bold mb-2 subtitleLabel"
              >Discover branches</label
            >
            <tr>
              <span class="font-bold subtitleLabelDescription">Strategy</span>
              <center>
                <select
                  type="text"
                  class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline projectSetupTextField"
                  v-model="field.withinRepositoriesStategy"
                >
                  <option disabled value="">Please select one</option>
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                </select>
              </center>

              <!-- <span>Selected: {{ selected }}</span> -->
            </tr>
          </table>
        </div>
      </div>

      <!-- Build Strategy -->
      <div class="panel">
        <p class="panel-title">Build Strategy</p>
        <div>
          <div class="p-4 border-t">
            <button
              class="btn btn-blue"
              @click="addBuildStategyField()"
              v-if="showBuildStrategyAddButton"
            >
              Add
            </button>

            <div
              class=""
              v-for="(fields, counter) in buildStrategyTable"
              v-bind:key="counter"
            >
              <button
                class="btn btn-red buttonRight"
                @click="deleteBuildStrategyField(counter)"
              >
                Delete
              </button>

              <h5 class="mb-3 text-xl">Named Branches</h5>

              <div class="inline-block">
                <div class="flex mb-3 relative w-64">
                  <select
                    name=""
                    @change="addRequiredBuildStrategy"
                    class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="" disabled selected hidden display>
                      Add
                    </option>
                    <option value="1">Regular expressions</option>
                    <option value="2">Exact name</option>
                    <option value="3">Wildcard</option>
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
              </div>
            </div>
          </div>
          <div
            class="p-4 border-t"
            v-for="(fields, counter) in regularExpressionTable"
            v-bind:key="counter"
          >
            <table style="width: 100%">
              <button
                class="btn btn-red buttonRight"
                @click="deleteRegularExpressionInBuildStrategy(counter)"
              >
                Delete
              </button>
              <label class="block font-bold mb-2 subtitleLabel"
                >Regular Expression</label
              >

              <tr>
                <center>
                  <input
                    class="mb-4 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline projectSetupTextField"
                    type="text"
                    placeholder="Type"
                    v-model="fields.regularExpressionField"
                  />
                </center>
              </tr>
              <center>
                <tr>
                  <input
                    type="checkbox"
                    class="caseSensitiveCheckBox"
                    v-model="checked"
                  />
                  Case sensitive
                </tr>
              </center>
            </table>
          </div>

          <div
            class="p-4 border-t"
            v-for="(fields, counter) in exactNameTable"
            v-bind:key="counter"
          >
            <table style="width: 100%">
              <button
                class="btn btn-red buttonRight"
                @click="deleteExactNameInBuildStrategy(counter)"
              >
                Delete
              </button>
              <label class="block font-bold mb-2 subtitleLabel"
                >Exact Name</label
              >
              <tr>
                <center>
                  <input
                    class="mb-4 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline projectSetupTextField"
                    type="text"
                    placeholder="Type"
                    v-model="fields.exactNameField"
                  />
                </center>
              </tr>
              <center>
                <tr>
                  <input
                    type="checkbox"
                    class="caseSensitiveCheckBox"
                    v-model="checked"
                  />
                  Case sensitive
                </tr>
              </center>
            </table>
          </div>

          <div
            class="p-4 border-t"
            v-for="(fields, counter) in wildcardTable"
            v-bind:key="counter"
          >
            <table style="width: 100%">
              <button
                class="btn btn-red buttonRight"
                @click="deleteWildcardInBuildStrategy(counter)"
              >
                Delete
              </button>
              <label class="block font-bold mb-2 subtitleLabel">Wildcard</label>
              <tr>
                <span class="font-bold subtitleLabelDescription">Include</span>

                <center>
                  <input
                    class="mb-4 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline projectSetupTextField"
                    type="text"
                    placeholder="Type"
                    v-model="fields.wildcardField"
                  />
                </center>
              </tr>
              <tr>
                <span class="font-bold subtitleLabelDescription">Exclude</span>

                <center>
                  <input
                    class="mb-4 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline projectSetupTextField"
                    type="text"
                    placeholder="Type"
                    v-model="fields.wildcardField"
                  />
                </center>
              </tr>
              <center>
                <tr>
                  <input
                    type="checkbox"
                    class="caseSensitiveCheckBox"
                    v-model="checked"
                  />
                  Case sensitive
                </tr>
              </center>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import ScrollTable from "vue-scroll-table";
// import data from "./dataTest.json";

export default {
  components: {
    // ScrollTable,
  },

  name: "projectsetup",
  props: {},
  data() {
    return {
      showBuildStrategyAddButton: false,

      // avatarUrlColumnIndex: 10,
      // headers: data.headers,
      // rows: data.rows,
      // styles: {},
      // classes: {
      //   tableContainer: ["align-text"],
      //   sticky: {
      //     container: ["sticky-column"],
      //     tableHeader: ["header-padding"],
      //     tableData: ["table-cell"],
      //   },
      //   scroll: {
      //     tableHeader: ["header-padding"],
      //     tableData: ["table-cell"],
      //   },
      // },

      key: "",
      repositoriesTable: [
        {
          repositoriesInclude: "",
          repositoriesExclude: "",
        },
      ],

      withinRepositoriesTable: [
        {
          withinRepositoriesStategy: "",
        },
      ],
      buildStrategyTable: [
        {
          nameBranches: "",
        },
      ],
      regularExpressionTable: [
        {
          regularExpressionField: "",
        },
      ],
      exactNameTable: [
        {
          exactNameField: "",
        },
      ],
      wildcardTable: [
        {
          wildcardField: "",
        },
      ],

      selected: "",

      repositoriesAddButtonOptions: [
        { text: "One", key: "A" },
        { text: "Two", key: "B" },
        { text: "Three", key: "C" },
      ],
    };
  },

  methods: {
    addRepositoriesField() {
      this.repositoriesTable.push({
        repositoriesInclude: "",
        repositoriesExclude: "",
      });
    },
    addWithinRepositoriesField() {
      this.withinRepositoriesTable.push({
        withinRepositoriesStategy: "",
      });
    },
    addBuildStategyField() {
      this.buildStrategyTable.push({
        nameBranches: "",
      });
      this.showBuildStrategyAddButton = false;
    },
    addRegularExpressionField() {
      this.regularExpressionTable.push({
        regularExpressionField: "",
      });
    },
    addExactNameField() {
      this.exactNameTable.push({
        exactNameField: "",
      });
    },
    addWildcardField() {
      this.wildcardTable.push({
        wildcardField: "",
      });
    },

    deleteRepositoriesField(counter) {
      this.repositoriesTable.splice(counter, 1);
    },
    deleteWithinRepositoriesField(counter) {
      this.withinRepositoriesTable.splice(counter, 1);
    },
    deleteBuildStrategyField(counter) {
      this.buildStrategyTable.splice(counter, 1);
      this.deleteRegularExpressionInBuildStrategy(counter);
      this.deleteExactNameInBuildStrategy(counter);
      this.deleteWildcardInBuildStrategy(counter);

      this.showBuildStrategyAddButton = true;
    },
    deleteRegularExpressionInBuildStrategy(counter) {
      this.regularExpressionTable.splice(counter, 1);
    },
    deleteExactNameInBuildStrategy(counter) {
      this.exactNameTable.splice(counter, 1);
    },
    deleteWildcardInBuildStrategy(counter) {
      this.wildcardTable.splice(counter, 1);
    },

    addRequiredBehaviour(event) {
      if (event.target.value == 1) {
        this.addRepositoriesField();
      } else if (event.target.value == 2) {
        this.addWithinRepositoriesField();
      }
    },
    addRequiredBuildStrategy(event) {
      if (event.target.value == 1) {
        this.addRegularExpressionField();
      }
      if (event.target.value == 2) {
        this.addExactNameField();
      }
      if (event.target.value == 3) {
        this.addWildcardField();
      }
    },
  },
};
</script>

<style scoped lang="scss">
input {
  text-align: left;
  padding-left: 5px;
}
::-webkit-input-placeholder {
  text-align: left;
  padding-left: 5px;
}

:-ms-input-placeholder {
  text-align: left;
  padding-left: 5px;
}

.workingItemsTitle {
  background-color: #2d3748;
  color: white;
  padding-left: 5px;
  padding-top: 2px;
}

.headSummaryStyle {
  background-color: #2d3748;
  width: 100%;
  padding: 5px;
  text-align: center;
}

.headTextFieldStyleLong {
  width: 260px;
  height: 40px;
  display: inline-block;
  margin: 5px;
  border-radius: 5px;
}
.headTextFieldStyleLong:hover {
  border: 2px solid#93C5FD;
}
.headTextFieldStyleLong:focus {
  outline: none !important;
  border: 3px solid #93c5fd;
}

.headTextFieldStyleShort {
  width: 150px;
  height: 40px;
  display: inline-block;
  margin: 5px;
  border-radius: 5px;
}
.headTextFieldStyleShort:hover {
  border: 2px solid#93C5FD;
}
.headTextFieldStyleShort:focus {
  outline: none !important;
  border: 3px solid #93c5fd;
}
//form
.ProjectSetupForm {
  width: 100%;
  background-color: white;
}
.buttonRight {
  float: right;
  margin-top: 20px;
}

.projectSetupTextField {
  width: 80%;
}

.subtitleLabel {
  margin-left: 10px;
}
.subtitleLabelDescription {
  margin-left: 20px;
}
.caseSensitiveCheckBox {
  background-color: #eee;
}

#workingItemNavigationTable {
  text-align: center;
  color: #2d3748;
  margin-top: 60px;

  border: 1px solid;
  border-color: white;
  box-shadow: 0px 1px 1px 1px rgb(175, 175, 175);
  padding: 5px;
  margin-top: 15px;
  margin-bottom: 15px;
}
.vst_table-container.align-text {
  text-align: left;
}

.vst_table-container .header-padding {
  padding: 2rem 1.5rem 1.5rem 1.5rem;
}

.vst_table-container .table-cell {
  padding: 0.5rem 2rem;
  vertical-align: middle;

  & img {
    vertical-align: middle;
  }
}

.vst_table-container .sticky-column {
  box-shadow: 10px 0px 10px -12px black;
}
</style>
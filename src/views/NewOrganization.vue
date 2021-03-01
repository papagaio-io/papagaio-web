<template>
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
          placeholder="URL"
          v-model="orgName"
        />
      </div>
    </div>

    <div class="mb-4">
      <label>
        <input type="checkbox" v-model="orgIsPrivate" />
        Private
      </label>
    </div>

    <el-select v-model="value" clearable placeholder="Select">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>

    <br />

    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="createOrg()"
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
</template>

<script>
export default {
  components: {},

  name: "neworaganization",
  props: {},
  data() {
    return {
      createOrgError: null,
      orgIsPrivate: false,
      orgName: null,
      selectedType: null,
    //   githubImageSrc: require("@/assets/img/folder.png"),
      options: [
        {
          value: "Gitea",
          label: "Gitea",
        },
        {
          value: "Github",
          label: "Github",
        },
      ],

      value: "",
    };
  },

  methods: {
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



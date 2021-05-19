<template>
  <div class="w-2/3 container mx-auto">
    <h4 class="mt-2 mb-2 text-3xl font-bold">
      Organization has been successfully added
    </h4>

    <div class="p-2 w-full bg-red shadow-lg font-medium bg-gray-100">
      <h1 class = "ml-1 text-lg">View on Agola</h1>
      <h2
        class="bg-white h-9 text-dark p-1 font-medium text-2xl lg:text-center"
      >
        <a v-bind:href="BeResponse" target="_blank"> {{ BeResponse }} </a>
      </h2>
    </div>
    <div class="sm:mt-0 sm:ml-3">
      <button
        class="px-10 py-3 font-medium rounded-md bg-papaOrange-600 hover:bg-papaDark-700 text-white float-right mt-5 border-solid border-2 border-white"
        @click="$router.push('http://localhost:8081/neworganization')"
      >
        +
      </button>
    </div>
  </div>
</template>




<script>
export default {
  data() {
    return {
      projectOnAgole: "",
    };
  },
  mounted() {},
  computed: {
    BeResponse() {
     
      return this.$store.getters.getCreateOrganizationBeURLResponse;
    },
  },
  methods: {},
};
</script>

        

<style scoped lang="scss">
</style>
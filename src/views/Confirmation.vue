<template>
  <div class="w-2/3 container mx-auto">
    <h4 class="mt-2 mb-2 text-3xl font-bold">Confirmation</h4>
    <div class="bg-papaDark-700 p-8">
      <h4 class="text-base font-bold sm:max-w-4xl md:text-xl text-white">
        Organization has been added successfully to Agola
      </h4>

      <!-- Body  -->

      <div class="panel mt-3 mb-2 bg-gray-100">
        <div class="mb-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"></div>
        <div class="lg:text-center">
          <h2 class="text-base xl:inline font-semibold tracking-wide">
            <!-- remove this  -->
            Redirect using this link
          </h2>
          <p
            class="mt-3 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl"
          >
            <a v-bind:href="BeResponse"> {{ BeResponse }} </a>
          </p>

          <p
            class="mt-3 mb-6 text-base font-medium sm:max-w-xl sm:mx-auto md:mt-2 md:text-xl"
          >
            {Test} This is a dummy content for previewing purposes
          </p>
        </div>
      </div>
    </div>

    <div class="sm:mt-0 sm:ml-3">
      <button
        class="px-10 py-3 font-medium rounded-md bg-papaOrange-600 hover:bg-papaDark-700 text-white font-bold py-2 px-4 rounded float-right mt-5 border-solid border-2 border-white"
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
      // this.projectOnAgole = this.$store.state.createOrganizationBeResponse;
      return this.$store.state.createOrganizationBeResponse;
    },
  },
  methods: {},
};
</script>

        

<style scoped lang="scss">
</style>
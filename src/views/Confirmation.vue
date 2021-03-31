<template>
  <div class="flex flex-col items-center">
     <h4 class="mt-2 mb-2 text-3xl font-bold">Confirmation</h4>
    <div class="bg-papaDark-700 p-10">
      <div class="heroBody">
        <p
          class="text-base font-bold sm:max-w-4xl sm:mx-auto  md:text-xl text-white"
        >
          Organization has been added successfully to Agola
        </p>
      </div>

      <!-- Body  -->

      <div class="panel mt-3 mb-2 bg-gray-100">
        <div class="mb-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"></div>
         <div class="lg:text-center">
            <h2 class="text-base xl:inline font-semibold tracking-wide">
             
              <!-- remove this  -->
             Direct using this link 
            </h2>
            <p
              class="mt-3 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl"
            >
          
              <a v-bind:href ="projectOnAgole"> {{projectOnAgole}} </a>

              <a v-bind:href="projectOnAgole"> I am two </a>



            </p>

            <p
              class="mt-3 mb-6 text-base font-medium sm:max-w-xl sm:mx-auto md:mt-2 md:text-xl"
            >
             Add another run or logout and move to Agola. 
            </p>
          </div>
      </div>
 
    </div>
  </div>

  <div>
    <p
      class="flex flex-col items-center mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl"
    >
      Beta page. Organization has been added successfully to Agola
    </p>

    <div class="mt-5 sm:mt-8 sm:flex sm:justify-center">
      <div class="sm:mt-0 sm:ml-3">
        <button
          class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md bg-papaOrange-500 hover:bg-papaDark-700 text-white font-bold py-2 px-4 rounded"
          @click="$router.push('http://localhost:8081/neworganization')"
        >
          Another add
        </button>
      </div>
    </div>
    <p>I got this: {{ BeResponse }}</p>
    <a href="{{BeResponse}}">Visit Agola</a> <br />
    <a href="{{projectOnAgole}}">Visit Agola</a>
    <a v-bind:href="{ projectOnAgole }"> hello</a>
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
      this.projectOnAgole = this.$store.state.createOrganizationBeResponse;
      return this.$store.state.createOrganizationBeResponse;
    },
  },
  methods: {},
};
</script>

        

<style scoped lang="scss">
</style>
<template>
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
    <a href="{{BeResponse}}">Visit Agola</a> <br>
    <a href="{{projectOnAgole}}">Visit Agola</a>
    <a v-bind:href={projectOnAgole}> hello</a>
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
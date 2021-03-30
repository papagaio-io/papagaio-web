<template>
  <div class="flex flex-col items-center ">
    <img
      class="object-cover w-80 h-50 mb-1 "
      alt="Papagaio logo"
      src="../assets/img/papagaioMainLogo.jpg"
    />
   <div class = "bg-papaDark-700 pt-2">
    <div class="heroBody ">

      <h4 class="mb-4 mt-3 text-xl font-bold text-white">
        Extention of
        <a class=" " href="https://agola.io"
          ><img
            class="inline-block w-20"
            alt="Papagaio logo"
            src="../assets/img/agola-logo-name.svg"
        /></a>
      </h4>

      <p
        class="mt-3 mb-4 text-base font-bold sm:max-w-4xl sm:mx-auto md:mt-5 md:text-xl text-white"
      >
        Agola is a CI/CD open source tool under the 2.0 Apache license. Papagaio was developed on top to extend Agola's capabilities and provide a more flexible control on workflow(Runs).    
      </p>

      <div class="mt-5 sm:mt-8 sm:flex sm:justify-center">
        <div class="sm:mt-0 sm:ml-3">
          <button
            class="w-full flex items-center justify-center px-8 py-3 border-solid border-2 border-white font-medium rounded-md bg-papaOrange-600 hover:bg-papaDark-700 text-white font-bold py-2 px-4 "
            @click="this.$router.push('http://localhost:8081/neworganization')"
        
          >
            Try Now
          </button>
       
        </div>
      </div>
</div>


<!-- Body  -->

      <div class="panel mt-5 mb-2 bg-gray-100">
        <div class="mb-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="lg:text-center">
            <h2
              class=" text-base xl:inline font-semibold tracking-wide  "
            >
            <br> <!-- remove this  -->
              Why Papagaio?
            </h2>
            <p
              class="mt-3 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl "
            >
              A convenient way to run your project
            </p>

            <p
              class="mt-3 mb-6 text-base font-medium  sm:max-w-xl sm:mx-auto md:mt-2 md:text-xl"
            >
              Lorem ipsum dolor sit amet consect adipisicing elit. Possimus
              magnam voluptatum cupiditate veritatis in accusamus quisquam.
            </p>
          </div>

          <div class="mt-10">
            <dl
              class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10"
            >
              <div class="flex">
                <div class="flex-shrink-0">
                  <div
                    class="flex items-center justify-center h-12 w-12 rounded-md bg-papaDark-700 text-white"
                  >
                    <!-- Heroicon name: outline/globe-alt -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path
                        fill="#fff"
                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <dt class="text-lg leading-6 font-bold ">
                    Better view of runs
                  </dt>
                  <dd class="mt-2 text-base">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Maiores impedit perferendis suscipit eaque, iste dolor
                    cupiditate blanditiis ratione.
                  </dd>
                </div>
              </div>

              <div class="flex">
                <div class="flex-shrink-0">
                  <div
                    class="flex items-center justify-center h-12 w-12 rounded-md bg-papaDark-700 text-white"
                  >
                    <!-- Heroicon name: outline/scale -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <dt class="text-lg leading-6 font-bold">
                    Organization members
                  </dt>
                  <dd class="mt-2 text-base ">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Maiores impedit perferendis suscipit eaque, iste dolor
                    cupiditate blanditiis ratione.
                  </dd>
                </div>
              </div>

              <div class="flex">
                <div class="flex-shrink-0">
                  <div
                    class="flex items-center justify-center h-12 w-12 rounded-md bg-papaDark-700 text-white"
                  >
                    <!-- Heroicon name: outline/lightning-bolt -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <dt class="text-lg leading-6 font-bold ">
                    Different git sources
                  </dt>
                  <dd class="mt-2 text-base">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Maiores impedit perferendis suscipit eaque, iste dolor
                    cupiditate blanditiis ratione.
                  </dd>
                </div>
              </div>

              <div class="flex">
                <div class="flex-shrink-0">
                  <div
                    class="flex items-center justify-center h-12 w-12 rounded-md bg-papaDark-700 text-white"
                  >
                    <!-- Heroicon name: outline/annotation -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <dt class="text-lg leading-6 font-bold">
                    Efficiency
                  </dt>
                  <dd class="mt-2 text-base">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Maiores impedit perferendis suscipit eaque, iste dolor
                    cupiditate blanditiis ratione.
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <p class= "ml-2 text-white font-medium"> Powered by: Sorint.it </p>
    </div>
  </div>
</template>

<script>

export default {
  components: {
    
  },
};
</script>

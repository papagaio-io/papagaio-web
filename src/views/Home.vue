<template>
  <div class="flex flex-col items-center">
    <img
      class="object-cover w- 2/5 h-40 mb-1"
      alt="Papagaio logo"
      src="../assets/img/papagaioMainLogo.jpg"
    />
    
    <div class="bg-papaDark-700 pt-2">
      <div class="heroBody">
        <h4 class="mt-2 text-xl font-bold text-white">
          Extention of
          <a class=" " href="https://agola.io" target="_blank" 
            ><img
              class="inline-block w-20"
              alt="Papagaio logo"
              src="../assets/img/agola-logo-name.svg"
          /></a>
        </h4>

        <p
          class="mt-3 mb-4 sm:max-w-4xl sm:mx-auto md:mt-5 md:text-xl text-white"
        >
          Agola is a CI/CD open source tool under the 2.0 Apache license.
          Papagaio was developed on top to extend Agola's capabilities and
          provide a more flexible control on the workflow (Runs).
        </p>

        <div
          v-if="userLoggedIn == false"
          class="mt-3 sm:mt-3 sm:flex sm:justify-center"
        >
          <div class="sm:mt-0 sm:ml-3">
            <button
              class="w-full flex items-center justify-center px-8 py-3 border-solid border-2 border-white rounded-md bg-papaOrange-600 hover:bg-papaDark-700 text-white font-bold"
              @click="$keycloak.login()"
            >
              Sign In
            </button>
          </div>
        </div>

        <!-- <div v-else class="mt-3 sm:mt-3 sm:flex sm:justify-center">
          <div class="sm:mt-0 sm:ml-3">
            <button
              class="w-full flex items-center justify-center px-8 py-3 border-solid border-2 border-white rounded-md bg-papaOrange-600 hover:bg-papaDark-700 text-white font-bold"
              @click="
                this.$router.push('http://localhost:8081/dashboard')
              "
            >
              Dashboard
            </button>
          </div>
        </div> -->
      </div>

      <!-- Body  -->
      <div class="mt-2 mb-2 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="lg:text-center">
            <h2 class="text-base xl:inline font-semibold tracking-wide">
              <br />
              Benefits ?
            </h2>
            <p
              class="mt-3 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl"
            >
              Unchallenging way to run/build your project
            </p>

            <p
              class="mt-3 mb-6 text-base font-medium sm:max-w-xl sm:mx-auto md:mt-2 md:text-xl"
            >
              Configure your project using Papagaio and run it on Agola.
            </p>
          </div>

          <div class="mt-10">
            <dl
              class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10"
            >
              <div class="flex">
                <div class="flex-shrink-0">
                  <div
                    class="flex items-center justify-center h-12 w-12 rounded-md bg-white text-papaDark-700"
                  >
                    <!-- Heroicon name: outline/globe-alt -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <dt class="text-lg leading-6 font-bold">
                    Email Notifications
                  </dt>
                  <dd class="mt-2 text-base">
                    Now you will be notified via email when runs (builds) fails.
                    To stay posted!
                  </dd>
                </div>
              </div>

              <div class="flex">
                <div class="flex-shrink-0">
                  <div
                    class="flex items-center justify-center h-12 w-12 rounded-md bg-white text-papaDark-700"
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
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <dt class="text-lg leading-6 font-bold">
                    Organization Members
                  </dt>
                  <dd class="mt-2 text-base">
                    Out-of-the-box, project members are synchronised from the
                    git source.
                  </dd>
                </div>
              </div>

              <div class="flex">
                <div class="flex-shrink-0">
                  <div
                    class="flex items-center justify-center h-12 w-12 rounded-md bg-white text-papaDark-700"
                  >
                    <!-- 2 -->
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
                  <dt class="text-lg leading-6 font-bold">
                    Various Git Sources
                  </dt>
                  <dd class="mt-2 text-base">
                    Papagaio is now compatible with github and gitea, with a
                    roadmap to scale up to other git sources.
                  </dd>
                </div>
              </div>

              <div class="flex">
                <div class="flex-shrink-0">
                  <div
                    class="flex items-center justify-center h-12 w-12 rounded-md bg-white text-papaDark-700"
                  >
                    <!-- 4-->
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
                <div class="ml-4 mb-4">
                  <dt class="text-lg leading-6 font-bold">Ease to Use</dt>
                  <dd class="mt-2 text-base">
                    High usability. Minimum configuration to avoid hustles and
                    save Sorintian priceless time.
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <div>
        <p class="ml-2 mb-3 mt-3 text-sm text-white">
          Powered by
          <a class="pl-1" href="https://sorint.it" target="_blank" 
            ><img
              class="inline-block w-21 h-6"
              alt="Papagaio logo"
              src="../assets/img/SorintLab_spa.png"
          /></a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  computed: {
    userLoggedIn() {
      return this.$store.getters.getLoginState;
    },
  },
};
</script>

<template>
  <div class="flex flex-col container mx-auto mt-2 w-full sm:w-3/4">
    <img
      class="w-full sm:w-2/5 mx-auto"
      alt="Papagaio logo"
      src="../assets/img/papagaioMainLogo.jpg"
    />

    <div class="bg-papaDark-700 pt-1">
      <div class="heroBody">
        <h4 class="mt-2 text-xl font-bold text-white">
          Plugin of
          <a class="" href="https://agola.io" target="_blank"
            ><img
              class="inline-block w-20"
              alt="Papagaio logo"
              src="../assets/img/agola-logo-name.svg"
          /></a>
        </h4>

        <p class="mb-2 sm:max-w-4xl sm:mx-auto md:mt-5 md:text-xl text-white">
          Agola is a CI/CD open source tool under the 2.0 Apache license.
          Papagaio was developed to complement Agola, extend its capabilities, &
          to provide ease-of-use features.
        </p>

        <div class="flex justify-center" v-if="!this.$store.state.loggedIn">
          <div
            class="
              inline
              text-white
              mt-5
              text-4xl
              tracking-tight
              font-medium
              sm:text-2xl
              md:text-3xl
            "
          >
            Login with
          </div>
          <div
            class="ml-4 w-40"
            v-for="currentView in authenticationMethodsAvailable"
            :key="currentView.id"
          >
            <button
              type="button"
              @click="authenticationChoice(currentView['name'])"
              class="
                hover:bg-papaDark-800
                cursor-pointer
                p-1
                w-full
                shadow-2xl shadow-inner
                bg-papaDark-100
              "
            >
              <img
                class="w-10 inline-block"
                :src="showAuthenticationIcon(currentView['gitType'])"
                alt="Organization Icon"
              />
            </button>
            <!-- <h2 class="bg-papaDark-800 text-white p-1 font-medium ">
              {{gitSourceNameCapitalizing(currentView["gitType"])}}
            </h2> -->
            <h2 class="bg-papaDark-800 text-white p-1 text-medium">
              {{ currentView["name"] }}
            </h2>
          </div>
        </div>
      </div>

      <!-- Body  -->
      <div class="mt-2 mb-2 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="lg:text-center">
            <h2 class="text-base xl:inline font-semibold tracking-wide">
              <br />
              What to expect ?
            </h2>
            <p
              class="
                mt-3
                text-3xl
                leading-8
                font-extrabold
                tracking-tight
                sm:text-4xl
              "
            >
              Configure your project using Papagaio & run it on Agola
            </p>

            <!-- <p
              class="mt-3 mb-6 text-base font-medium sm:max-w-xl sm:mx-auto md:mt-2 md:text-xl"
            >
            Unchallenging way to run/build your project
            </p> -->
          </div>

          <div class="mt-10">
            <dl
              class="
                space-y-10
                md:space-y-0
                md:grid md:grid-cols-2
                md:gap-x-8 md:gap-y-10
              "
            >
              <!-- 1 -->

              <div class="flex">
                <div class="flex-shrink-0">
                  <div
                    class="
                      flex
                      items-center
                      justify-center
                      h-12
                      w-12
                      rounded-md
                      bg-white
                      text-papaDark-700
                    "
                  >
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
                  <dt class="text-lg leading-6 font-bold">
                    Speed up your work on Agola
                  </dt>
                  <dd class="mt-2 text-base text-justify">
                    High usability & simple configuration. By automating the
                    process of adding organizations, projects, branches, &
                    members to Agola. Optionally offering the ability to specify
                    a build strategy. Plus, setting intervals for both,
                    synchronizing organization’s projects & members, along with
                    recovering failed runs of projects.
                  </dd>
                </div>
              </div>

              <!-- 2 -->
              <div class="flex">
                <div class="flex-shrink-0">
                  <div
                    class="
                      flex
                      items-center
                      justify-center
                      h-12
                      w-12
                      rounded-md
                      bg-white
                      text-papaDark-700
                    "
                  >
                    <!-- Heroicon name: outline/scale -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-12 w-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                      />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <dt class="text-lg leading-6 font-bold">Dashboard</dt>
                  <dd class="mt-2 text-base text-justify">
                    Friendly previewing of the whole organization structure
                    which helps in monitoring significant information of the
                    projects. e.g. project health. Exclusively, redirect links
                    to view the organization on Agola. Delete/remove
                    organizations from Papagaio only, or Agola & Papagaio.
                  </dd>
                </div>
              </div>

              <!-- 3-->
              <div class="flex">
                <div class="flex-shrink-0">
                  <div
                    class="
                      flex
                      items-center
                      justify-center
                      h-12
                      w-12
                      rounded-md
                      bg-white
                      text-papaDark-700
                    "
                  >
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
                  <dt class="text-lg leading-6 font-bold">Git sources</dt>
                  <dd class="mt-2 mb-2 text-base">Supports Gitea & Github.</dd>
                </div>
              </div>

              <!-- 4-->
              <div class="flex">
                <div class="flex-shrink-0">
                  <div
                    class="
                      flex
                      items-center
                      justify-center
                      h-12
                      w-12
                      rounded-md
                      bg-white
                      text-papaDark-700
                    "
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
                    Email notifications
                  </dt>
                  <dd class="mt-2 mb-2 text-base">
                    Papagaio scans & notifies users for any failed project runs.
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
              class="inline-block w-30 h-7"
              alt="Papagaio logo"
              src="../assets/img/SorintLab_spa.png"
          /></a>
        </p>
      </div>
    </div>
  </div>
  <!-- hello {{ navigationURL }}
  <br />
  hello 2 {{ authenticationMethodsAvailable }} -->
</template>

<script>
export default {
  components: {},
  data() {
    return {
      authenticationMethodsAvailable: "",
      navigationURL: "",
    };
  },
  computed: {
    userLoggedIn() {
      return this.$store.getters.getLoginState;
    },
  },
  mounted() {
    this.authenticationOptions();
  },
  methods: {
    authenticationOptions() {
      this.$store
        .dispatch("gitSourceAuthenticationMethods")
        .then((response) => {
          this.authenticationMethodsAvailable = response;
        });
    },

    showAuthenticationIcon(recieved) {
      if (recieved === "gitea") {
        return require("../assets/img/Gitea_Logo.png");
      } else if (recieved === "github") {
        return require("../assets/img/Github_Logo.png");
      } else if (recieved == 'gitlab') {
        return require("../assets/img/Gitlab_Logo.png");
      } else {
         return require("../assets/img/Gitea_Logo.png");
      }

    },

    authenticationChoice(recieved) {
      this.$store.state.gitSourceAuthenticationChoice = recieved;

      this.$store.dispatch("gitSourceAuthenticationURL").then((response) => {
        this.navigationURL = response["oauth2_redirect"];
        window.location.href = String(this.navigationURL);
      });
    },
    //returns the commerical names of the git source
    gitSourceNameCapitalizing(recieved) {
      if (recieved == "gitea") {
        return "Gitea";
      } else if (recieved == "github") {
        return "GitHub";
      }
    },
  },
};
</script>

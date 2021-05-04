<template>
  <!-- component -->
  <div class="bg-gray-50 text-gray-800">
    <div
      class="fixed flex flex-col top-0 left-0 w-64 bg-papaOrange-600 h-2/2 shadow-lg"
    >
      <div class="justify-evenly flex items-center pl-6 h-16 border-b border-white-800">
        <!-- <img
          src="../assets/img/anonymousUser.png"
          alt=""
          class="rounded-full h-10 w-10 flex items-center justify-center mr-3 border-2 border-papaDark-700"
        /> -->
        <div class="">
          <p
            class="text-md font-medium tracking-wide truncate text-gray-100 font-sans"
          >
            {{ currentUsername }}
          </p>

          <!-- <div class="badge">
            <span
              class="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-800 bg-blue-100 rounded-full"
              >Admin</span
            >
          </div> -->
        </div>
        <button class="float-right ml-4" @click="show = !show">
          <svg
           v-if ="!show"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="white"
            class="bi bi-chevron-double-down"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            />
            <path
              fill-rule="evenodd"
              d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            />
          </svg>
          <svg
          v-if="show"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="white"
            class="bi bi-chevron-double-up"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z"
            />
            <path
              fill-rule="evenodd"
              d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
            />
          </svg>
        </button>
      </div>
      <transition name="bounce">
        <div v-show="show">
          <div class="overflow-y-auto overflow-x-hidden flex-grow">
            <ul class="flex flex-col py-6 space-y-1">
              <li class="px-5">
                <div class="flex flex-row items-center h-8">
                  <div
                    class="flex font-semibold text-sm text-gray-300 my-4 font-sans uppercase"
                  >
                    Panel
                  </div>
                </div>
              </li>
              <li>
                <a
                  @click="this.$router.push('http://localhost:8081/')"
                  href="#"
                  class="relative flex flex-row items-center h-11 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent hover:bg-papaDark-700 text-white hover:text-gray-200 pr-6"
                >
                  <span class="inline-flex justify-center items-center ml-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-lightbulb"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z"
                      />
                    </svg>
                  </span>
                  <span
                    class="ml-2 font-semibold text-sm tracking-wide truncate font-sans"
                    >Overview</span
                  >
                </a>
              </li>
              <li>
                <a
                  @click="
                    this.$router.push('http://localhost:8081/neworganization')
                  "
                  href="#"
                  class="relative flex flex-row items-center h-11 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent hover:bg-papaDark-700 text-white hover:text-gray-200 pr-6"
                >
                  <span class="inline-flex justify-center items-center ml-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-plus-square"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                      />
                      <path
                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                      />
                    </svg>
                  </span>
                  <span
                    class="ml-2 font-semibold text-sm tracking-wide truncate font-sans"
                    >Add Organization</span
                  >
                  <span
                    class="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-500 bg-blue-100 rounded-full"
                    >New</span
                  >
                </a>
              </li>
              <li>
                <a
                  @click="this.$router.push('http://localhost:8081/dashboard')"
                  href="#"
                  class="relative flex flex-row items-center h-11 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent hover:bg-papaDark-700 text-white hover:text-gray-200 pr-6"
                >
                  <span class="inline-flex justify-center items-center ml-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-easel"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M8 0a.5.5 0 0 1 .473.337L9.046 2H14a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1.85l1.323 3.837a.5.5 0 1 1-.946.326L11.092 11H8.5v3a.5.5 0 0 1-1 0v-3H4.908l-1.435 4.163a.5.5 0 1 1-.946-.326L3.85 11H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4.954L7.527.337A.5.5 0 0 1 8 0zM2 3v7h12V3H2z"
                      />
                    </svg>
                  </span>
                  <span
                    class="ml-2 font-semibold text-sm tracking-wide truncate font-sans"
                    >Dashboard</span
                  >
                </a>
              </li>
              <li class="px-5">
                <div class="flex flex-row items-center h-8">
                  <div
                    class="flex font-semibold text-sm text-gray-300 my-4 font-sans uppercase"
                  >
                    Settings
                  </div>
                </div>
              </li>
              <li>
                <a
                  @click="
                    this.$router.push('http://localhost:8081/triggerscan')
                  "
                  href="#"
                  class="relative flex flex-row items-center h-11 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent hover:bg-papaDark-700 text-white hover:text-gray-200 pr-6"
                >
                  <span class="inline-flex justify-center items-center ml-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-stopwatch"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z"
                      />
                      <path
                        d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z"
                      />
                    </svg>
                  </span>
                  <span
                    class="ml-2 font-semibold text-sm tracking-wide truncate font-sans"
                    >Set Scan Interval</span
                  >
                </a>
              </li>

              <li>
                <a
                  @click="$keycloak.logout()"
                  href="#"
                  class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-papaDark-700 text-white hover:text-gray-200 pr-6"
                >
                  <span
                    class="inline-flex justify-center items-center ml-4 text-red-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="white"
                      class="bi bi-box-arrow-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                      />
                    </svg>
                  </span>
                  <span
                    class="ml-2 font-semibold text-sm tracking-wide truncate font-sans"
                    >Logout</span
                  >
                </a>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      show: true,
    };
  },
  mounted() {},
  computed: {
    currentUserToken() {
      return this.$store.getters.getAuthToken;
    },
    userLoggedIn() {
      return this.$store.getters.getLoginState;
    },
    currentUsername() {
      return this.$store.getters.getUserName;
    },
    currentUsernameTest() {
      return this.$store.getters.getAuthToken;
    },
  },
  methods: {},
};
</script>

<style>
.bounce-enter-active {
  animation: bounce-in 0.4s;
}
.bounce-leave-active {
  animation: bounce-in 0.4s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
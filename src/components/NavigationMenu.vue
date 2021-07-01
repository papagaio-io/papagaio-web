<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <Disclosure as="nav" class="bg-papaDark-800" v-slot="{ open }">
    <div class="max-w-14xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="
              inline-flex
              items-center
              justify-center
              p-2
              rounded-md
              text-gray-200
              hover:text-white
              hover:bg-papaDark-700
            "
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div
          class="
            flex-1 flex
            items-center
            justify-center
            sm:items-stretch
            sm:justify-start
          "
        >
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/dashboard">
              <img
                class="block lg:hidden h-8 w-auto"
                src="../assets/img/papagaioIconOnWhite.png"
              />
            </router-link>
            <router-link to="/dashboard">
              <img
                class="hidden lg:block h-8 w-auto"
                src="../assets/img/papagaioIconOnWhite.png"
                alt="Workflow"
              />
            </router-link>
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <a
                @click="this.$router.push('http://localhost:8081/')"
                href="#"
                class="
                  relative
                  flex flex-row
                  items-center
                  h-11
                  hover:bg-papaDark-700
                  text-white
                  hover:text-gray-200
                  pr-6
                "
                :class="
                  $route.name === 'Home' ? 'border-b-6 border-gray-200 ' : ''
                "
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
                  class="
                    ml-2
                    font-semibold
                    text-sm
                    tracking-wide
                    truncate
                    font-sans
                  "
                  >Quick Intro</span
                >
              </a>

              <a
                @click="
                  this.$router.push('http://localhost:8081/neworganization')
                "
                href="#"
                class="
                  relative
                  flex flex-row
                  items-center
                  h-11
                  hover:bg-papaDark-700
                  text-white
                  hover:text-gray-200
                  pr-6
                "
                :class="
                  $route.name === 'NewOrganization'
                    ? 'border-b-6 border-fuchsia-600 '
                    : ''
                "
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
                  class="
                    ml-2
                    font-semibold
                    text-sm
                    tracking-wide
                    truncate
                    font-sans
                  "
                  >Add Organization</span
                >
                <!-- <span
                    class="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-500 bg-blue-100 rounded-full"
                    >New</span
                  > -->
              </a>

              <a
                @click="this.$router.push('http://localhost:8081/dashboard')"
                href="#"
                class="
                  relative
                  flex flex-row
                  items-center
                  h-11
                  hover:bg-papaDark-700
                  text-white
                  hover:text-gray-200
                  pr-6
                "
                :class="
                  $route.name === 'Dashboard'
                    ? 'border-b-6 border-gray-200 '
                    : ''
                "
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
                  class="
                    ml-2
                    font-semibold
                    text-sm
                    tracking-wide
                    truncate
                    font-sans
                  "
                  >Dashboard</span
                >
              </a>

              <a
                @click="this.$router.push('http://localhost:8081/triggerscan')"
                href="#"
                class="
                  relative
                  flex flex-row
                  items-center
                  h-11
                  hover:bg-papaDark-700
                  text-white
                  hover:text-gray-200
                  pr-6
                "
                :class="
                  $route.name === 'Triggerscan'
                    ? 'border-b-6 border-gray-200 '
                    : ''
                "
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
                  class="
                    ml-2
                    font-semibold
                    text-sm
                    tracking-wide
                    truncate
                    font-sans
                  "
                  >Scan Duration</span
                >
              </a>
            </div>
          </div>
        </div>
        <div class="px-0">
          <div
            class="
              absolute
              inset-y-0
              right-0
              flex
              items-center
              pr-2
              sm:static
              sm:inset-auto
              sm:ml-6
              sm:pr-0
            "
          >
            <!-- <button class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button> -->

            <!-- Profile dropdown (logout) -->

            <a
              @click="logout()"
              href="#"
              class="
                relative
                flex flex-row
                text-white
                items-center
                h-11
                hover:bg-papaDark-700
                hover:text-gray-200
                pr-6
              "
            >
              <span
                class="
                  inline-flex
                  justify-center
                  items-center
                  ml-4
                  text-red-400
                "
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
                class="
                  ml-2
                  font-semibold
                  text-sm
                  tracking-wide
                  truncate
                  font-sans
                "
                >Logout</span
              >
            </a>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <a
          @click="this.$router.push('http://localhost:8081/')"
          href="#"
          class="
            relative
            flex flex-row
            items-center
            h-11
            hover:bg-papaDark-700
            text-white
            hover:text-gray-200
            pr-6
          "
          :class="$route.name === 'Home' ? 'border-l-6 border-gray-200 ' : ''"
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
            >Quick Intro</span
          >
        </a>

        <a
          @click="this.$router.push('http://localhost:8081/neworganization')"
          href="#"
          class="
            relative
            flex flex-row
            items-center
            h-11
            hover:bg-papaDark-700
            text-white
            hover:text-gray-200
            pr-6
          "
          :class="
            $route.name === 'NewOrganization'
              ? 'border-l-6 border-fuchsia-600 '
              : ''
          "
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
          <!-- <span
                    class="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-500 bg-blue-100 rounded-full"
                    >New</span
                  > -->
        </a>

        <a
          @click="this.$router.push('http://localhost:8081/dashboard')"
          href="#"
          class="
            relative
            flex flex-row
            items-center
            h-11
            hover:bg-papaDark-700
            text-white
            hover:text-gray-200
            pr-6
          "
          :class="
            $route.name === 'Dashboard' ? 'border-l-6 border-gray-200 ' : ''
          "
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

        <a
          @click="this.$router.push('http://localhost:8081/triggerscan')"
          href="#"
          class="
            relative
            flex flex-row
            items-center
            h-11
            hover:bg-papaDark-700
            text-white
            hover:text-gray-200
            pr-6
          "
          :class="
            $route.name === 'Triggerscan' ? 'border-l-6 border-gray-200 ' : ''
          "
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
            >Scan Duration</span
          >
        </a>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script>
import { ref } from "vue";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/vue/outline";

const navigation = [
  { name: "Quick Into", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    BellIcon,
    MenuIcon,
    XIcon,
  },
  setup() {
    const open = ref(false);

    return {
      navigation,
      open,
    };
  },
  methods: {
    logout() {

       // this.deleteAllCookies;


          this.$store.commit("currentUserSession", {
          tempLoggedIn: false,
          tempCurrentAuthToken: '',
          tempCurrentUserName: '',
          tempUserAvatar: '',
          tempUserIsAdmin: '',
        });

        
       //location.reload();
       //this.$router.push('/');
        
    },

    deleteAllCookies() {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++)
        deleteCookie(cookies[i].split("=")[0]);
    },

    setCookie(name, value, expirydays) {
      var d = new Date();
      d.setTime(d.getTime() + expirydays * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toUTCString();
      document.cookie = name + "=" + value + "; " + expires;

     
    },

    deleteCookie(name) {
      setCookie(name, "", -1);
    },
  },
};
</script>
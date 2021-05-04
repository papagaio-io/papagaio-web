import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    loggedIn: false,
    currentAuthToken: "",
    currentUserName: "",
    createOrganizationBeResponse: "",
    allOrganizationsData: "",
    organizationsData: "",
    projectData: "",
    organizationURL: "",
    projectURL: "",
    currentDashboardToShow: "AllOrganizationDashboard",
    currentOpenOrganizationInDashboard: "",
    currentOpenProjectInDashboard: "",
    organizationsDefaultTriggerTime: "",
    runFailedDefaultTriggerTime: "",
  },
  getters: {
    getLoginState(state) {
      return state.loggedIn;
    },
    getAuthToken(state) {
      return state.currentAuthToken;
    },
    getUserName(state) {

      return state.currentUserName;
    },
    getCreateOrganizationBeURLResponse(state) {
      return state.createOrganizationBeResponse;
    },
    getcurrentDashboardToShow(state) {
      return state.currentDashboardToShow;
    },
    showdashBoardData(state) {
      return state.allOrganizationsData;
    },
    showOrganizationDashboardData(state) {
      return state.organizationsData;
    },
    showProjectDashboardData(state) {
      return state.projectData;
    },
    getcurrentOpenOrganizationInDashboard(state) {
      return state.currentOpenOrganizationInDashboard;
    },
    getcurrentOpenProjectInDashboard(state) {
      return state.currentOpenProjectInDashboard;
    },
    getorganizationsDefaultTriggerTime(state) {
      return state.organizationsDefaultTriggerTime;

    },
    getrunFailedDefaultTriggerTime(state) {
      return state.runFailedDefaultTriggerTime;
    }

  },
  mutations: {

    setcurrentDashboardToShow(state, payload) {
      state.currentDashboardToShow = payload;
    },
    setAllOrganizationsDashboardData(state, result) {
      state.allOrganizationsData = result;
    },
    setOrganizationsDashboardData(state, result) {
      state.organizationsData = result;
    },
    setProjectDashboardData(state, result) {
      state.projectData = result;
    },
    setOrganizationURL(state, payload) {
      state.organizationURL = payload;
    },
    setProjectURL(state, payload) {
      state.projectURL = payload;
    },
    setCurrentOpenOrganizationInDashboard(state, payload) {
      state.currentOpenOrganizationInDashboard = payload;
    },
    setcurrentOpenProjectInDashboard(state, payload) {
      state.currentOpenProjectInDashboard = payload;
    },
    setorganizationsDefaultTriggerTime(state, payload) {
      state.organizationsDefaultTriggerTime = payload;
    },
    setrunFailedDefaultTriggerTime(state, payload) {
      state.runFailedDefaultTriggerTime = payload;
    },
   

  },
  actions: {

    getAllOrganizationDashboard({ commit, state }) {
      axios
        .get("https://papagaio-api.sorintdev.it/api/report", {
          headers: {
            Authorization: `Bearer ${state.currentAuthToken}`,
          },
        })
        .then(response => { commit("setAllOrganizationsDashboardData", response.data) });
    },

    getOrganizationDashboard({ commit, state }) {
      axios
        .get(`https://papagaio-api.sorintdev.it/api/report/${state.organizationURL}`, {
          headers: {
            Authorization: `Bearer ${state.currentAuthToken}`,
          },
        })
        .then(response => {
          commit("setOrganizationsDashboardData", response.data)

        });
    },

    getProjectDashboard({ commit, state }) {
      axios
        .get(`https://papagaio-api.sorintdev.it/api/report/${state.organizationURL}/${state.projectURL}`, {
          headers: {
            Authorization: `Bearer ${state.currentAuthToken}`,
          },
        })
        .then(response => {
          commit("setProjectDashboardData", response.data)

        });
    },

    organizationsDefaultTriggerTimeInDb({ commit, state }) {
      axios
        .get("https://papagaio-api.sorintdev.it/api/gettriggersconfig", {
          headers: {
            Authorization: `Bearer ${state.currentAuthToken}`,
          },
        })
        .then(response => {
          commit("setorganizationsDefaultTriggerTime", response.data.organizationsDefaultTriggerTime)
          commit("setrunFailedDefaultTriggerTime", response.data.runFailedDefaultTriggerTime)

        });
    },

    setNewOrganizationsDefaultTriggerTimeInDb({ state }) {
      axios
        .post(
          "https://papagaio-api.sorintdev.it/api/savetriggersconfig",
          {
            organizationsDefaultTriggerTime: state.organizationsDefaultTriggerTime,
            runFailedDefaultTriggerTime: state.runFailedDefaultTriggerTime,
          },
          {
            headers: {
              Authorization: `Bearer ${state.currentAuthToken}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.data);
        });
    },





  },
  modules: {
  }
})

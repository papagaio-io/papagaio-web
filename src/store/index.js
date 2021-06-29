import { createStore } from 'vuex'
import axios from "axios";
import Config from '../ApiConfig';

export default createStore({
  state: {
    gitSourceAuthenticationChoice: '',
    userTokenUrlPath: '',

    loggedIn: false,
    currentAuthToken: "",
    currentUserName: "",
    userIsAdmin: "",

    GitSourceToGetOrganizationFrom: "", //dynamic variable to access user's Git source to catch all organization available in in there.

    Orgname: "",
    OrgAgolaRef: "",
    OrgVisibility: "",
    OrgGitSourceName: "",
    OrgBehaviorInclude: "",
    OrgBehaviorExclude: "",
    OrgBehaviorType: "",

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
    administratorPrivilegesForIntervelEdit: "",
    deleteThisOrganization: "",
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
    },
    getAdministratorPrivilegesForIntervelEdit(state) {
      return state.administratorPrivilegesForIntervelEdit;
    }

  },
  mutations: {
    currentUserSession(state, payload) {
        state.loggedIn = payload.tempLoggedIn,
        state.currentAuthToken = payload.tempCurrentAuthToken,
        state.currentUserName = payload.tempCurrentUserName,
        state.userAvatar = payload.tempUserAvatar,
        state.userIsAdmin = payload.tempUserIsAdmin

    },

    setNewOrganizationData(state, payload) {

        state.Orgname = payload.tempName,
        state.OrgAgolaRef = payload.tempAgolaRef,
        state.OrgVisibility = payload.tempVisibility,
        state.OrgGitSourceName = payload.tempGitSourceName,
        state.OrgBehaviorInclude = payload.tempBehaviourInclude,
        state.OrgBehaviorExclude = payload.tempBehaviorInclude,
        state.OrgBehaviorType = payload.tempBehaviorType
    },
    setLoginState(state, payload) {
      state.loggedIn = payload;
    },

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
    setAdministratorPrivilegesForIntervelEdit(state, payload) {
      state.administratorPrivilegesForIntervelEdit = payload;
    },
    setOrganizationToDelete(state, payload) {
      state.deleteThisOrganization = payload;

    }


  },
  actions: {

    //authentication API available 
    async gitSourceAuthenticationMethods() {
      return await axios
        .get(`${Config.ApiUrl}/gitsources`)
        .then(response => {
          return response.data
        }).catch((error) => {
          //console.log(error.data)
        });
    },

    //authentication URL based on user's choice 
    async gitSourceAuthenticationURL({ state }) {
      return await axios
        .get(`${Config.ApiUrl}/auth/login/${state.gitSourceAuthenticationChoice}`)
        .then(response => {
          return response.data
        }).catch((error) => {
          //console.log(error.data)
        });
    },

    //extract user's token details from url response. In-case of a valid authentication  
    async getUserTokenDetails({ state }) {
      return await axios
        .get(`${Config.ApiUrl}${state.userTokenUrlPath}`)
        .then(response => {
          return response.data
        }).catch((error) => {
          //console.log(error.data)
        });
    },


    //show the current available git sources when creating an organization
    async getGitSourceId({ state }) {
      return await axios
        .get(`${Config.ApiUrl}/gitsources`, {
          headers: {
            Authorization: `Bearer ${state.currentAuthToken}`,
          },
        })
        .then(response => {
          return response.data
        }).catch((error) => {
          //console.log(error.data)
        });
    },

    //gets all organizations from specific git source
    async getOrganizationsFromSpecificGitSource({ state }) {
      return await axios
        .get(`${Config.ApiUrl}/gitorganizations/${state.GitSourceToGetOrganizationFrom}`, {
          headers: {
            Authorization: `Bearer ${state.currentAuthToken}`,
          },
        })
        .then(response => {
          return response.data
        }).catch((error) => {
          //console.log(error.data)
        });
    },

    //gets all Agola reference names to validate exists
    async getExistingAgolaReferenceNames({ state }) {
      return await axios
        .get(`${Config.ApiUrl}/agolarefs`, {
          headers: {
            Authorization: `Bearer ${state.currentAuthToken}`,
          },
        })
        .then(response => {
          return response.data
        }).catch((error) => {
          //console.log(error.data)
        });
    },


    async newOrganization({ state }) { //<-------- set this function to "async"
      return await axios //<------------ return your axios call here, and await 
        .post(
          `${Config.ApiUrl}/createorganization`,
          {

            name: state.Orgname,
            agolaRef: state.OrgAgolaRef,
            visibility: state.OrgVisibility,
            gitSourceName: state.OrgGitSourceName,
            behaviourInclude: state.OrgBehaviorInclude,
            behaviourExclude: state.OrgBehaviorExclude,
            behaviourType: state.OrgBehaviorType,
          },
          {
            headers: {
              Authorization: `Bearer ${state.currentAuthToken}`,
            },
          }
        )
        .then((response) => {

          return response
        })
        .catch((error) => {
          console.log(error.data);
        });
    },

    //force create organization in case already exists in Agola
    async forceNewOrganization({ state }) {
      return await axios
        .post(
          `${Config.ApiUrl}/createorganization?force`,
          {

            name: state.Orgname,
            agolaRef: state.OrgAgolaRef,
            visibility: state.OrgVisibility,
            gitSourceName: state.OrgGitSourceName,
            behaviourInclude: state.OrgBehaviorInclude,
            behaviourExclude: state.OrgBehaviorExclude,
            behaviourType: state.OrgBehaviorType,
          },
          {
            headers: {
              Authorization: `Bearer ${state.currentAuthToken}`,
            },
          }
        )
        .then((response) => {

          return response
        })
        .catch((error) => {
          console.log(error.data);
        });
    },


    getAllOrganizationDashboard({ commit, state }) {
      axios
        .get(`${Config.ApiUrl}/report`, {
          headers: {
            Authorization: `Bearer ${state.currentAuthToken}`,
          },
        })
        .then(response => { commit("setAllOrganizationsDashboardData", response.data) });
    },

    getOrganizationDashboard({ commit, state }) {
      axios
        .get(`${Config.ApiUrl}/report/${state.organizationURL}`, {
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
        .get(`${Config.ApiUrl}/report/${state.organizationURL}/${state.projectURL}`, {
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
        .get(`${Config.ApiUrl}/gettriggersconfig`, {
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
          `${Config.ApiUrl}/savetriggersconfig`,
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

    async getAdministratorPrivileges({ state }) {
      return await axios
        .get(`${Config.ApiUrl}/userinfo`, {
          headers: {
            Authorization: `Bearer ${state.currentAuthToken}`,
          },
        })
        .then(response => {
          return response.data
        }).catch((error) => {
          console.log(error.data)
        });
    },
    //deletes the organization from Papagaio only
    async deleteOrganizationFromPapagaio({ state }) {
      return await axios
        .delete(`${Config.ApiUrl}/deleteorganization/${state.deleteThisOrganization}?internalonly`, {
          headers: {
            Authorization: `Bearer ${state.currentAuthToken}`,
          },
        })
        .then(response => {
          return response.data

        }).catch((error) => {
          console.log(error.data)
        });
    },
    //deletes the organization from Agola and Papagaio
    async deleteOrganizationFromAgola({ state }) {
      return await axios
        .delete(`${Config.ApiUrl}/deleteorganization/${state.deleteThisOrganization}`, {
          headers: {
            Authorization: `Bearer ${state.currentAuthToken}`,
          },
        })
        .then(response => {
          return response.data
        }).catch((error) => {
          console.log(error.data)
        });
    },


  },
  modules: {
  }
})

import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
import Config from '../ApiConfig';

export default createStore({
  state: {
    
    gitSourceAuthenticationChoice: '',
    userTokenUrlPath: '',

    loggedIn: false,
    currentAuthToken: "",
    currentUserName: "",
    userAvatar: "",
    userIsAdmin: "",
    userGitSourceLink: '',

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
    usersTriggerTime: "",

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
    getUserAvatar(state){
      return state.userAvatar;
    },
    getuserGitSourceLink(state){
      return state.userGitSourceLink

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
    getOrganizationsDefaultTriggerTime(state) {
      return state.organizationsDefaultTriggerTime;

    },
    getRunFailedDefaultTriggerTime(state) {
      return state.runFailedDefaultTriggerTime;
    },
    getUsersTriggerTime(state){
      return state.usersTriggerTime;
    }
   

  },
  mutations: {
    currentUserSession(state, payload) {
        state.loggedIn = payload.tempLoggedIn,
        state.currentAuthToken = payload.tempCurrentAuthToken,
        state.currentUserName = payload.tempCurrentUserName,
        state.userAvatar = payload.tempUserAvatar,
        state.userIsAdmin = payload.tempUserIsAdmin
        state.userGitSourceLink = payload.tempUserGitSourceLink

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
    setOrganizationsDefaultTriggerTime(state, payload) {
      state.organizationsDefaultTriggerTime = payload;
    },
    setRunFailedDefaultTriggerTime(state, payload) {
      state.runFailedDefaultTriggerTime = payload;
    },
    setUsersTriggerTime(state, payload){
      state.usersTriggerTime = payload;
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

    //authentication URL based on user's choice of signIn method
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

    //flush user's session
    signUserOut(context) {

      context.commit("currentUserSession", {
        tempLoggedIn: false,
        tempCurrentAuthToken: '',
        tempCurrentUserName: '',
        tempUserAvatar: '',
        tempUserIsAdmin: '',
        tempUserGitSourceLink: '',
      });

      location.reload();
      this.$router.push('/');

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

    //gets all organizations available through user's token 
    async getOrganizationsFromSpecificGitSource({ state, dispatch }) {
      return await axios
        .get(`${Config.ApiUrl}/gitorganizations`, {
          headers: {
            Authorization: `Bearer ${state.currentAuthToken}`,
          },
        })
        .then(response => {
          return response.data
        }).catch((error) => {
          if(error.response.status === 401 ) {
            dispatch('signUserOut')
          }
         
        });
    },

    //gets all Agola reference names available in db
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

            gitPath: state.Orgname,
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

    //force create an organization 
    async forceNewOrganization({ state }) {
      return await axios
        .post(
          `${Config.ApiUrl}/createorganization?force`,
          {

            gitPath: state.Orgname,
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


    async getAllOrganizationDashboard({ commit, state }) {
      await axios
        .get(`${Config.ApiUrl}/report`, {
          headers: {
            Authorization: `Bearer ${state.currentAuthToken}`,
          },
        })
        .then(response => { commit("setAllOrganizationsDashboardData", response.data) })
        .catch((error) => {
          if(error.response.status === 401 ) {
            dispatch('signUserOut')
          }
         
        });
        
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
          commit("setOrganizationsDefaultTriggerTime", response.data.organizationsTriggerTime)
          commit("setRunFailedDefaultTriggerTime", response.data.runFailedTriggerTime)
          commit("setUsersTriggerTime", response.data.usersTriggerTime)

        }) 
        .catch((error) => {
          if(error.response.status === 401 ) {
            dispatch('signUserOut')
          }
        });
    },

    async setNewOrganizationsDefaultTriggerTimeInDb({ state }) {
      return await axios
        .post(
          `${Config.ApiUrl}/savetriggersconfig`,
          {
            organizationsTriggerTime: state.organizationsDefaultTriggerTime,
            runFailedTriggerTime: state.runFailedDefaultTriggerTime,
            usersTriggerTime: state.usersTriggerTime,
          },
          {
            headers: {
              Authorization: `Bearer ${state.currentAuthToken}`,
            },
          }
        )
        .then((response) => {
          if(response.status == 200)
          {
            return response.status;
          }
          else {
            return 500;
          }
          
        })
        .catch((error) => {
          console.log(error.data);
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
  },
  plugins: [createPersistedState()],
})

import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    loggedIn: false,
    currentAuthToken: "",
    currentUserName: "",
    createOrganizationBeResponse: "",
    allOrganizationsData: "",
    organizationsData:"",
    projectData: "",
    organizationURL: "",
    projectURL: ""
    
  },
  getters:{
    getLoginState(state){
      return state.loggedIn;
    },
    getAuthToken(state){
      return state.currentAuthToken;
    },
    getUserName(state){

      return state.currentUserName;
    },
    getCreateOrganizationBeURLResponse(state){
      return state.createOrganizationBeResponse;
    },
    showdashBoardData(state){
      return state.allOrganizationsData;
    },
    showOrganizationDashboardData(state){
      return state.organizationsData;
    },
    showProjectDashboardData(state){
      return state.projectData;
    }

  },
  mutations: {

    setAllOrganizationsDashboardData(state, result){
      state.allOrganizationsData = result;
      

    },
    setOrganizationsDashboardData(state,result){
      state.organizationsData = result;
    },
    setProjectDashboardData(state,result){
      state.projectData = result;
    },
    setOrganizationURL(state, payload){
      state.organizationURL = payload;
    },
    setProjectURL(state,payload){
      state.projectURL = payload;
    }
    

  },
  actions: {

     getAllOrganizationDashboard({commit, state}) {
        axios
        .get("https://papagaio-api.sorintdev.it/api/report", {
          headers: {
            Authorization: `Bearer ${state.currentAuthToken}`,
          },
        })
        .then(response => {commit("setAllOrganizationsDashboardData",response.data)});
        
       
    },

    getOrganizationDashboard({commit, state}) {
      axios
      .get(`https://papagaio-api.sorintdev.it/api/report/${state.organizationURL}`, {
        headers: {
          Authorization: `Bearer ${state.currentAuthToken}`,
        },
      })
      .then(response => {
        commit("setOrganizationsDashboardData",response.data)
        
      });
      
     
  },

  getProjectDashboard({commit, state}) {
    axios
    .get(`https://papagaio-api.sorintdev.it/api/report/${state.organizationURL}/${state.projectURL}`, {
      headers: {
        Authorization: `Bearer ${state.currentAuthToken}`,
      },
    })
    .then(response => {
      commit("setProjectDashboardData",response.data)
      
    });
    
   
},





  },
  modules: {
  }
})

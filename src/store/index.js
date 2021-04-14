import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    loggedIn: false,
    currentAuthToken: "",
    currentUserName: "",
    createOrganizationBeResponse: "",
    dashBoardData: "",
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
      return state.dashBoardData
    }

  },
  mutations: {
    setDashBoardData(state, result){
      state.dashBoardData = result;

    }
    

  },
  actions: {

     getCurrentResponse({commit, state}) {
        axios
        .get("https://papagaio-api.sorintdev.it/api/report", {
          headers: {
            Authorization: `Bearer ${state.currentAuthToken}`,
          },
        })
        .then(response => {commit("setDashBoardData",response.data)});
        
       
    },


  },
  modules: {
  }
})

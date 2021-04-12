import { createStore } from 'vuex'

export default createStore({
  state: {
    loggedIn: false,
    currentAuthToken: "",
    currentUserName: "",
    createOrganizationBeResponse: "",
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
    }

  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

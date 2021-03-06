import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null
    },
    type_account: null
  },

  getters: {
    user(state){
      return state.user
    }
  },
  
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },

    SET_USER(state, data) {
      state.user.data = data;
    },
    
    SET_TYPE_ACCOUNT(state, value) {
      state.type_account = value
    },

    LOGOUT(state) {
      state.user = {
        loggedIn: false,
        data: null
      }
      state.type_account = null
    }
  },

  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null)

      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email
        });

      } else {
        commit("SET_USER", null);
        
      }
    },

    typeAccount({ commit }, type) {
      commit('SET_TYPE_ACCOUNT', type)
    },

    logout({ commit }) {
      commit('LOGOUT')
    },
  },
  
  modules: {
  }
})

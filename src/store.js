import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      username: '',
      notifications: 0
    }
  },
  mutations: {
    username(state, payload) {
      state.username = payload.val
    },
    notifications(state, payload) {
      state.notifications += payload.val
    }
  }
})

export default store
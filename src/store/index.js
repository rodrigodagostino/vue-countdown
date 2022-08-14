import { reactive } from 'vue'

const state = reactive({
  currentStatus: 'idle',
  initialTime: 0,
  currentTime: 0,
  intervalId: null,
})

const getters = {
  currentStatus() {
    return state.currentStatus
  },
  initialTime() {
    return state.initialTime
  },
  currentTime() {
    return state.currentTime
  },
}

const mutations = {
  setCurrentStatus(value) {
    state.currentStatus = value
  },

  setInitialTime(value) {
    state.initialTime = value
  },
  setCurrentTime(value) {
    state.currentTime = value
  },

  increaseTime(value) {
    mutations.pauseTimer()
    mutations.setInitialTime(state.currentTime + value)
    mutations.setCurrentTime(state.currentTime + value)
  },
  decreaseTime(value) {
    mutations.pauseTimer()
    if (state.currentTime - value < 0) return
    mutations.setInitialTime(state.currentTime - value)
    mutations.setCurrentTime(state.currentTime - value)
  },

  startTimer() {
    if (!state.initialTime || !state.currentTime) {
      return
    }
    mutations.setCurrentStatus('running')
    state.intervalId = setInterval(() => {
      if (state.currentTime <= 0) {
        mutations.pauseTimer()
        return
      }
      state.currentTime -= 1000
    }, 1000)
  },
  pauseTimer() {
    mutations.setCurrentStatus('idle')
    clearInterval(state.intervalId)
  },
  resetTimer() {
    mutations.pauseTimer()
    mutations.setCurrentTime(state.initialTime)
  },
}

export default {
  state,
  getters,
  mutations,
}

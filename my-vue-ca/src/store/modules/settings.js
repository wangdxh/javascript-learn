const mysettingtoken = 'mysettingtoken'

function getlocalsetting() {
  let localsettings = {
    showSettings: false,
    fixedHeader: false,
    sidebarLogo: false,
    sidebar: {
      opened: true,
      withoutAnimation: false
    } 
  }
  let sett = localStorage.getItem(mysettingtoken)
  if (sett) {
    Object.assign(localsettings, JSON.parse(sett))
  }
  localsettings.device = 'desktop'
  localsettings.fixedHeader = true
  localsettings.sidebarLogo = true
  localsettings.showSettings = true
  return localsettings
}

function savelocalsetting() {
  localStorage.setItem(mysettingtoken, JSON.stringify(state))
}

const state = {
  ...getlocalsetting()
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
      savelocalsetting()
    }
  },
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    savelocalsetting()
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
    savelocalsetting()
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
    savelocalsetting()
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


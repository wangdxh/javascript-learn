const getters = {
  sidebar: state => state.settings.sidebar,
  device: state => state.settings.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name
}
export default getters

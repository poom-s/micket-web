export const state = () => ({
  // auth: null,
  alert: [{ color: '', text: '', icon: '' }],
  cart: [],
})

export const mutations = {
  addCoins(state, coins) {
    const addedCoins = state.auth.user.coins + coins
    state.auth.user.coins = addedCoins
  },
  useCoins(state, coins) {
    const usedCoins = state.auth.user.coins - coins
    state.auth.user.coins = usedCoins.toFixed(2)
  },
  setAlert(state, alert) {
    state.alert.unshift(alert)
  },
  addCart(state, movie) {
    state.cart.push(movie)
  },
  deleteCart(state, id) {
    const index = state.cart.findIndex((movie) => movie._id === id)
    state.cart.splice(index, 1)
  },
}

export const actions = {
  addCart(vuexContext, movie) {
    vuexContext.commit('addCart', movie)
  },
  deleteCart(vuexContext, id) {
    vuexContext.commit('deleteCart', id)
  },
}

export const getters = {
  loggedInUser(state) {
    return state.auth.user
  },
  checkItemCart: (state) => (id) => {
    return state.cart.some((movie) => movie._id === id)
  },
}

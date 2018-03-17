export default (initialState, handlers) => (state = initialState, action) => {
  if (!handlers[action.type]) {
    return state
  }

  return handlers[action.type](state, action)
}

export const SET_FILTER = 'SET_FILTER'

export const setFilter = (filter) => ({ type: SET_FILTER, data: { filter: filter }})

const reducer = (state = null, action) => {
  switch(action.type) {
  case SET_FILTER:
    return action.data.filter
  default:
    return state
  }
}

export default reducer

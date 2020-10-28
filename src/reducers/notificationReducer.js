import { CREATE_ANECDOTE, ADD_VOTE } from './anecdoteReducer'

export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION'
export const SET_NOTIFICATION = 'SET_NOTIFICATION'

export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch({
      type: SET_NOTIFICATION,
      data: {
        content,
        timer: setTimeout(() => {
          dispatch({
            type: HIDE_NOTIFICATION
          })
        }, time / 0.001)
      }
    })
  }
}

export const hideNotification = () => ({ type: HIDE_NOTIFICATION })

const reducer = (state = { message: undefined, display: false, timer: undefined }, action) => {
  switch(action.type) {
  case SET_NOTIFICATION:
    if(state.timer) {
      clearTimeout(state.timer)
    }
    return {
      message: action.data.content,
      display: true,
      timer: action.data.timer
    }
  case HIDE_NOTIFICATION:
    return {
      message: undefined,
      display: false,
      timer: undefined
    }
  default:
    return state
  }
}

export default reducer

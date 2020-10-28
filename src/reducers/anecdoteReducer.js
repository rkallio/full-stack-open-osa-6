import _ from 'lodash'
import anecdoteService from '../services/anecdotes'

export const ADD_VOTE = 'ADD_VOTE'
export const CREATE_ANECDOTE = 'CREATE_ANECDOTE'
export const INIT_ANECDOTES = 'INIT_ANECDOTES'

export const upvote = anecdote => {
  const updated = {
    ...anecdote,
    votes: anecdote.votes + 1
  }

  return async dispatch => {
    const response = await anecdoteService.update(updated)
    dispatch({
      type: ADD_VOTE,
      data: response
    })
  }
}


export const createAnecdote = data => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(data)
    dispatch({
      type: CREATE_ANECDOTE,
      data: anecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = (await anecdoteService.getAll())
          .sort((a, b) => ((va, vb) => va < vb ? 1 : va === vb ? 0 : -1)(a.votes, b.votes))
    dispatch({
      type: INIT_ANECDOTES,
      data: anecdotes
    })
  }
}

const reducer = (state = [], action) => {
  switch(action.type) {
  case ADD_VOTE:
    const old = state.find(anecdote => anecdote.id === action.data.id)
    const upvoted = { ...old, votes: old.votes + 1 }
    return _.orderBy(
      state.map(anecdote => anecdote.id === action.data.id ? upvoted : anecdote),
      _.partialRight(_.get, 'votes'),
      'desc')
  case CREATE_ANECDOTE:
    return state.concat(action.data)
  case INIT_ANECDOTES:
    return action.data
  default:
    return state
  }
}

export default reducer

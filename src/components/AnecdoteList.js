// -*- mode: RJSX -*-

import React from 'react'
import { connect } from 'react-redux'
import { upvote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleUpvote }) => (
  <div>
    <div>
      { anecdote.content }
    </div>
    <div>
      has { anecdote.votes }
      <button onClick={() => handleUpvote(anecdote)}>vote</button>
    </div>
  </div>
)

const AnecdoteList = props => {
  return props.anecdotes.map(anecdote => (
    <Anecdote
      key={ anecdote.id }
      anecdote={ anecdote }
      handleUpvote={ props.upvote }
    />))
}

const mapStateToProps = state => {
  const { anecdotes, filter } = state
  if(filter) {
    return {
      anecdotes: anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    }
  } else {
    return { anecdotes }
  }
}

const mapDispatchToProps = dispatch => ({
  upvote: anecdote => {
    dispatch(upvote(anecdote))
    dispatch(setNotification(`voted for '${anecdote.content}'`, 5))
  }
})

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList

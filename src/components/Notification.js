// -*- mode: RJSX -*-

import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  let style
  if(notification.display) {
     style = {
       border: 'solid',
       padding: 10,
       borderWidth: 1
     }
  } else {
    style = {
      display: 'none'
    }
  }

  return (
    <div style={style}>
      { notification.message }
    </div>
  )
}

export default Notification

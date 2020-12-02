import React from 'react'
import { hot } from 'react-hot-loader'

const EventBrito = props => {
  return (
    <div>
      {props.events.map(event => {
        return(
          <div className="event">{event.title}</div>
        )
      })}
    </div>
  )
};

export default hot(module)(EventBrito)

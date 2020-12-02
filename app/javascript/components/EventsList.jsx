import React from 'react'
import Event from './Event'

const EventsList =  props =>
(
  <div>
    {props.events.map((event, index) => {
      return(
        <Event key={event.id} event={event} />
      )
    })}
  </div>
)


export default EventsList

import React from 'react'

const fotmatDate = datetime =>
  new Date(datetime).toDateString()

const Event = props => (
  <div className="event">
    <h2 className="event-title">{props.event.title}</h2>
    <div className="event-datetime">{fotmatDate(props.event.start_datetime)}</div>
    <div className="event-location">{props.event.location}</div>
  </div>
)

export default Event

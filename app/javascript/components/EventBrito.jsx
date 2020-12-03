import React from 'react'
import { hot } from 'react-hot-loader'
import EventForm from './EventForm'

import EventList from './EventsList'

const EventBrito = props => {
  const [events, setEvents] = React.useState(props.events)

  const addNewEvent = (event) => {
    const newEvents = [event, ...events].sort((a, b) =>
      new Date(a.start_datetime) - new Date(b.start_datetime)
    );

    setEvents(newEvents)
  }

  return (
  <div>
    <EventForm handleNewEvent={addNewEvent}/>
    <EventList events={events}  />
  </div>
  )
}

export default hot(module)(EventBrito)

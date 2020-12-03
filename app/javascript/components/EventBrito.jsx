import React from 'react'
import { hot } from 'react-hot-loader'
import EventForm from './EventForm'

import EventList from './EventsList'

const EventBrito = props => (
  <div>
    <EventForm />
    <EventList events={props.events}  />
  </div>
)

export default hot(module)(EventBrito)

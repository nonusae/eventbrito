import React from 'react'
import { hot } from 'react-hot-loader'

import EventList from './EventsList'

const EventBrito = props => (
  <EventList events={props.events}  />
)

export default hot(module)(EventBrito)

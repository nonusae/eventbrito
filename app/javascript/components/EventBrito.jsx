import React from 'react'
import { hot } from 'react-hot-loader'
import axios from 'axios'

import EventForm from './EventForm'
import EventList from './EventsList'

const EventBrito = props => {

  const eventReducer = (state, action) => {
    const value = action.payload
    let isValid = true
    let errors = []
    switch(action.type) {
      case 'title':
        if (value.length <=2 ) {
          isValid = false
          errors.push(["can't be blank"])
        }
        return ({
          ...state, title: { value: value, valid: isValid, errors: errors }
        })
      case 'start_datetime':
        if (value.length === 0) {
          isValid = false
          errors.push(["can't be blank"])
        } else if (Date.parse(value) <= Date.now()) {
          isValid = false
          errors.push(["can't be in the past"])
        }

        return {
          ...state, start_datetime: { value: value, valid: isValid, errors: errors }
        }
      case 'location':
        if (value.length === 0 ) {
          isValid = false
          errors.push(["can't be blank"])
        }

        return {
          ...state, location: { value: value, valid: isValid, errors: errors }
        }
      default:
        throw new Error();
    }
  }

  const [events, setEvents] = React.useState(props.events)

  const [event, dispatchEvent] = React.useReducer(eventReducer, {
    title: {value: '', valid: false, errors: []},
    start_datetime: {value: '', valid: false, errors: []},
    location: {value: '', valid: false, errors: []},
  })

  const [formValid, setFormValid] = React.useState(false);

  const initialRender = React.useRef(true);

  const addNewEvent = (data) => {
    const newEvents = [data, ...events].sort((a, b) =>
      new Date(a.start_datetime) - new Date(b.start_datetime)
    );

    setEvents(newEvents)
  }

  const resetFormErrors = () => {
    setFormErrors({})
  }

  const handleInputChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    dispatchEvent({payload: e.target.value, type: name})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newEvent = {
      title: event.title.value, start_datetime: event.start_datetime.value, location: event.location.value
    }

    axios({
      method: 'POST',
      url: '/events',
      data: { event: newEvent },
      headers: {
        'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
      }
    })
    .then(response => {
      addNewEvent(response.data)
      resetFormErrors();
    })
    .catch(error => {
      setFormErrors(error.response.data)
    })
  }

  const validateForm = () => {
    let formValid = true
    const isValid = event.title.valid && event.location.valid && event.start_datetime.valid
    setFormValid(isValid)
  }

  React.useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      validateForm();
    }
  }, [event])

  return (
  <div>
    <EventForm
      title={event.title}
      start_datetime={event.start_datetime}
      location={event.location}
      handleInput={handleInputChange}
      handleSubmit={handleSubmit}
      formValid={formValid}
    />
    <EventList events={events} />
  </div>
  )
}

export default hot(module)(EventBrito)

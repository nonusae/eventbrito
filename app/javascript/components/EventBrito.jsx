import React from 'react'
import { hot } from 'react-hot-loader'
import axios from 'axios'

import EventForm from './EventForm'
import EventList from './EventsList'
import FormErrors from './FormErrors'

const EventBrito = props => {
  const [events, setEvents] = React.useState(props.events)
  const [event, setEvent] = React.useState({
    title: '',
    start_datetime: '',
    location: ''
  })
  const [formErrors, setFormErrors] = React.useState({});
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
    const newEvent = { ...event }

    newEvent[name] = e.target.value
    setEvent(newEvent)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    axios({
      method: 'POST',
      url: '/events',
      data: { event: event },
      headers: {
        'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
      }
    })
    .then(response => {
      addNewEvent(response.data)
      resetFormErrors();
    })
    .catch(error => {
      console.log(error.response.data)
      setFormErrors(error.response.data)
    })
  }

  const validateForm = () => {
    let formError = {}
    let formValid = true

    if(event.title.length <= 2) {
      formError.title = ["is too short (minimum is 3 characters)"]
      formValid = false
    }

    if(event.location.length === 0) {
      formError.location = ["can't be blank"]
      formValid = false
    }

    if(event.start_datetime.length === 0 ){
      formError.start_datetime = ["can't be blank"]
      formValid = false
    } else if(Date.parse(event.start_datetime) <= Date.now()) {
      formError.start_datetime = ["can't be in the past"]
      formValid = false
    }

    setFormErrors(formError)
    setFormValid(formValid)
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
    <FormErrors formErrors = {formErrors} />
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

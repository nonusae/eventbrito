import React from 'react'

const EventForm = (props) => (
  <div>
    <h4>Create an Event:</h4>
    <form onSubmit={props.handleSubmit}>
      <input
        className={`input ${props.title.errors.length > 0 && 'is-danger'}`}
        type="email"
        name="title"
        placeholder="Title"
        value={props.title.value}
        onChange={props.handleInput}
      />
      {props.title.errors.length > 0 && (<p className="help is-danger">{props.title.errors}</p>)}
      <input
        className={`input ${props.start_datetime.errors.length > 0 && 'is-danger'}`}
        type="text"
        name="start_datetime"
        placeholder="Date"
        value={props.start_datetime.value}
        onChange={props.handleInput}
      />
      {props.start_datetime.errors.length > 0 && (<p className="help is-danger">{props.start_datetime.errors}</p>)}
      <input
        className={`input ${props.location.errors.length > 0 && 'is-danger'}`}
        type="text"
        name="location"
        placeholder="Location"
        value={props.location.value}
        onChange={props.handleInput}
      />
      {props.location.errors.length > 0 && (<p className="help is-danger">{props.location.errors}</p>)}
      <button
        className="button button-primary"
        type="submit"
        disabled={!props.formValid}
      >
        Create Event
      </button>
    </form>
  </div>
)

export default EventForm

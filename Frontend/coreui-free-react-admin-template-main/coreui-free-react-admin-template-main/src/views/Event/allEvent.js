import React, { useState, useRef, useEffect } from 'react'
import '../../scss/allEvent.css'
import EventServieAPI from '../../services/eventServiceAPI'
import eventServiceAPI from '../../services/eventServiceAPI'
function AllEvents() {
  const [events, setEvents] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    console.log('in use effect')
    fetchEvents()
  }, [])
  const fetchEvents = async () => {
    EventServieAPI.getAllEvents()
      .then((responseData) => {
        // console.log('inside then ')
        console.log(responseData)
        if (responseData.data.length === 0) {
          setError('No events Found')
          console.log('fetched 0 events')
        } else {
          const eventsWithImages = responseData.data.map((event) => {
            if (event.bannerData) {
              return {
                ...event,
                bannerData: `data:image/png;base64,${event.bannerData}`,
              }
            } else {
              return {
                ...event,
                bannerData: null,
              }
            }
          })
          console.log('Events with images:', eventsWithImages)
          setEvents(eventsWithImages)
        }
      })
      .catch((errors) => {
        console.log(errors)
      })
  }

  const handleDelete = async (id) => {
    console.log('id to delete')
    console.log(id)
    await eventServiceAPI
      .deleteEvent(id)
      .then((responseData) => {
        console.log(responseData)
        // fetchEvents()
        setEvents(() => events.filter((event) => event.id !== id))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <div className="event-list">
        {events.length > 0 ? (
          events.map((event) => (
            <Event
              key={event.id}
              id={event.id}
              title={event.title}
              description={event.description}
              startDate={event.startDate}
              endDate={event.endDate}
              venue={event.venue}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <h1>No events found</h1>
        )}
      </div>
    </>
  )
}

function Event({ title, description, startDate, endDate, venue, key, handleDelete, id }) {
  console.log('in event component')

  return (
    <div className="event-item">
      <h2>{title}</h2>
      <p>{description}</p>
      <p>Start Date: {startDate}</p>
      <p>End Date: {endDate}</p>
      <p>Venue: {venue}</p>
      {/* <p>Category: {category}</p> */}
      <button className="delete-btn" onClick={() => handleDelete(id)}>
        delete
      </button>
    </div>
  )
}

export default AllEvents

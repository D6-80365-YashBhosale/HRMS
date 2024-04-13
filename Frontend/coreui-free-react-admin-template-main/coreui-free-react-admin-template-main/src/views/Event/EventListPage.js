import React, { useState, useRef, useEffect } from 'react'
import '../../scss/eventList.css'
import EventServieAPI from '../../services/eventServiceAPI'

import Calendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
function EventListPage() {
  const [events, setEvents] = useState([])
  const [SelectedEvent, setSelectedEvent] = useState(null)
  const [error, setError] = useState('')
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
  useEffect(() => {
    fetchEvents()
  }, [])

  const formatDate = (date) => {
    if (!date) return ''
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(date).toLocaleDateString(undefined, options)
  }
  function handleEventClick(e) {
    console.log(e.event)
    setSelectedEvent(e.event)
  }
  const eventArray = events.map((event) => ({
    title: event.title,
    start: event.startDate,
    end: event.endDate,
    venue: event.venue,
    category: event.category,
    ...event,
  }))

  function closeModal() {
    setSelectedEvent(null)
  }
  return (
    <div>
      <h1>hello</h1>

      <Calendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={eventArray}
        eventClick={handleEventClick}
      />
      {SelectedEvent && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={(e) => {
                e.stopPropagation()
                closeModal()
              }}
            >
              &times;
            </span>
            {/* <span>Title:{SelectedEvent.title}</span> */}
            <div className="event-info">
              <h2>{SelectedEvent.title}</h2>
              <p>Description:{SelectedEvent.extendedProps.description}</p>
              <p>Start Date: {SelectedEvent.start && formatDate(SelectedEvent.start)}</p>
              <p>
                End Date:
                {SelectedEvent.extendedProps.endDate &&
                  formatDate(SelectedEvent.extendedProps.endDate)}
              </p>
              <p>Venue:{SelectedEvent.extendedProps.venue}</p>
              <div className="event-image">
                {SelectedEvent.extendedProps.bannerData && (
                  <img
                    src={SelectedEvent.extendedProps.bannerData}
                    alt="Event Banner"
                    className="event-banner-image"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default EventListPage

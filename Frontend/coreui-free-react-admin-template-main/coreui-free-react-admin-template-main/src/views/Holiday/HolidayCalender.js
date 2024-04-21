import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../../scss/HolidayCalender.css' // Importing your custom CSS
import holidayServiceAPI from 'src/services/holidayServiceAPI'
const localizer = momentLocalizer(moment)

const HolidayCalendar = () => {
  const [holidays, setHolidays] = useState([])

  useEffect(() => {
    holidayServiceAPI.fetchAllHolidays().then((data) => {
      const formattedHolidays = data.map((holiday) => ({
        title: holiday.holidayName,
        start: new Date(holiday.holidayFromDate),
        end: new Date(holiday.holidayToDate),
        allDay: true,
        id: holiday.id,
      }))
      setHolidays(formattedHolidays)
    })
  }, [])

  const eventStyleGetter = (event, start, end, isSelected) => {
    return {
      style: {
        className: 'holiday-event', // Using class instead of direct style
      },
    }
  }

  const [selectedHoliday, setSelectedHoliday] = useState(null)

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={holidays}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={(event) => setSelectedHoliday(event.title)}
        className="calendar-container"
      />
      {selectedHoliday && (
        <div className="holiday-details">
          <h2>Holiday Details</h2>
          <p>{selectedHoliday}</p>
        </div>
      )}
    </div>
  )
}

export default HolidayCalendar

import React, { useState, useRef } from 'react'
import employeeServiceAPI from 'src/services/employeeServiceAPI'
import '../../scss/event.css'
function AddEventForm() {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    time: '',
    venue: '',
    category: '',
  })
  const [bannerFile, setBannerFile] = useState(null)

  function handleChange(e) {
    setEventData({ ...eventData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setBannerFile(file)
  }

  const generateTimeSlots = () => {
    const timeSlots = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, '0')
        const formattedMinute = minute.toString().padStart(2, '0')
        const time = `${formattedHour}:${formattedMinute}`
        timeSlots.push(time)
      }
    }
    return timeSlots
  }
  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', eventData.title)
    formData.append('description', eventData.description)
    formData.append('startDate', eventData.startDate)
    formData.append('endDate', eventData.endDate)
    formData.append('eventTime', eventData.time)
    formData.append('venue', eventData.venue)
    formData.append('category', eventData.category)
    formData.append('bannerFile', bannerFile) // Append banner file
    employeeServiceAPI
      .addEmployee(formData)
      .then((responseData) => {
        console.log(responseData)
        console.log('event added successfully')
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <>
      {' '}
      <h1>Hello addevent</h1>
      <div>
        <form className="main-form" onSubmit={handleSubmit}>
          <fieldset className="event-form">
            <h2>Add Event</h2>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={eventData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={eventData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={eventData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate">End Date:</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={eventData.endDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">Event Time:</label>
              <select id="time" name="time" value={eventData.time} onChange={handleChange} required>
                <option value="">Select Time</option>
                {generateTimeSlots().map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="venue">Event Venue:</label>
              <input
                type="text"
                id="venue"
                name="venue"
                value={eventData.venue}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Event Category:</label>
              <input
                type="text"
                id="category"
                name="category"
                value={eventData.category}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bannerFile">Upload Banner:</label>
              <input type="file" id="bannerFile" name="bannerFile" onChange={handleFileChange} />
            </div>
            <button type="submit">Add Event</button>
          </fieldset>
        </form>
      </div>
    </>
  )
}
export default AddEventForm

import axios from 'axios'
class EventServieAPI {
  async deleteEvent(eventId) {
    try {
      const response = await axios.delete(`http://localhost:8080/events/${eventId}`)
      console.log(response)
      console.log('got reponse event deleted ')
      return response.data
    } catch (error) {
      // Log the error to the console or handle it as needed
      console.error(' error deleting event :', error)
      // Return null or throw the error, depending on your error handling strategy
      return null
    }
  }

  async addEvent(formData) {
    try {
      const response = await axios.post(`http://localhost:8080/events/add`, formData)
      console.log(response)
      console.log('got reponse')
    } catch (error) {
      // Log the error to the console or handle it as needed
      console.error(' error Adding event :', error)
      // Return null or throw the error, depending on your error handling strategy
      return null
    }
  }

  async getAllEvents() {
    try {
      const response = await axios.get(`http://localhost:8080/events/all`)
      console.log(response)
      console.log('got reponse in fetching ')
      return response
    } catch (error) {
      // Log the error to the console or handle it as needed
      console.error(' error fetching events :', error)
      // Return null or throw the error, depending on your error handling strategy
      return null
    }
  }
}
export default new EventServieAPI()

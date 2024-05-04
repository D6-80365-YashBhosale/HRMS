import axios from 'axios'
import { StorageService } from './storage.service'

class EventServieAPI {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:8080/events', // Set the base URL for all event-related requests
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  async deleteEvent(eventId) {
    try {
      const token = StorageService.get('token')

      const response = await this.api.delete(`/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
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
      const token = StorageService.get('token')

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await axios.post('http://localhost:8080/events/add', formData, config)
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
      const token = StorageService.get('token')

      const response = await this.api.get('/all', {
        headers: { Authorization: `Bearer ${token}` },
      })
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

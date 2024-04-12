import axios from 'axios'
class EventServieAPI {
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
}
export default new EventServieAPI()

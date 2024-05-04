import axios from 'axios'

class AuthserviceAPI {
  async addloginCredentials(formdata) {
    try {
      // Await the async call to axios.get
      const response = await axios.post('http://localhost:8080/login', formdata)
      // Return the data property from the response

      return response.data
    } catch (error) {
      // Log the error to the console or handle it as needed
      console.error('Logging error:', error)
      // Return null or throw the error, depending on your error handling strategy
      return null
    }
  }
}
export default new AuthserviceAPI()

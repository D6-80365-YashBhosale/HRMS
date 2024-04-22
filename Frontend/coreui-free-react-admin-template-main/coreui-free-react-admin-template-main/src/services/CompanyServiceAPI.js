import axios from 'axios'

class ComapnyServiceAPI {
  async getCompanyList() {
    try {
      // Await the async call to axios.get
      const response = await axios.get('http://localhost:8080/api/companies')
      // Return the data property from the response
      return response.data
    } catch (error) {
      // Log the error to the console or handle it as needed
      console.error('Error fetching company list:', error)
      // Return null or throw the error, depending on your error handling strategy
      return null
    }
  }
}

export default new ComapnyServiceAPI()

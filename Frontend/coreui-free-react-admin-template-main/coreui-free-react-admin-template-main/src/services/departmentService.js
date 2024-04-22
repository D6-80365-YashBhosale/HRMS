import axios from 'axios'

class DepartmentServiceAPI {
  async getDepartmentList() {
    try {
      // Await the async call to axios.get
      const response = await axios.get('http://localhost:8080/department')
      // Return the data property from the response
      return response.data
    } catch (error) {
      // Log the error to the console or handle it as needed
      console.error('Error fetching department list:', error)
      // Return null or throw the error, depending on your error handling strategy
      return null
    }
  }

  async addDepartment(department) {
    try {
      // Await the async call to axios.get
      const response = await axios.post('http://localhost:8080/department', department)
      // Return the data property from the response
      return response.data
    } catch (error) {
      // Log the error to the console or handle it as needed
      console.error('Error adding department:', error)
      // Return null or throw the error, depending on your error handling strategy
      return null
    }
  }
}

export default new DepartmentServiceAPI()

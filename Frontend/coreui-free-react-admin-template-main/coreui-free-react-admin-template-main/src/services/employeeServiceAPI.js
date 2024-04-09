import axios from 'axios'

class EmployeeServiceAPI {
  async updateEmployee(employee) {
    try {
      // Await the async call to axios.get
      const response = await axios.put(`http://localhost:8080/employee/${employee.id}`, employee)
      // Return the data property from the response
      console.log(response)
      return response.data
    } catch (error) {
      // Log the error to the console or handle it as needed
      console.error('Error updating employee:', error)
      // Return null or throw the error, depending on your error handling strategy
      return null
    }
  }

  async getSingleEmployee(empId) {
    try {
      // Await the async call to axios.get
      const response = await axios.get(`http://localhost:8080/employee/${empId}`)
      // Return the data property from the response
      console.log(response)
      return response.data
    } catch (error) {
      // Log the error to the console or handle it as needed
      console.error('Error fetching department list:', error)
      // Return null or throw the error, depending on your error handling strategy
      return null
    }
  }

  async getAllEmployeeList() {
    try {
      // Await the async call to axios.get
      const response = await axios.get('http://localhost:8080/employee')
      // Return the data property from the response
      console.log(response)
      return response.data
    } catch (error) {
      // Log the error to the console or handle it as needed
      console.error('Error fetching department list:', error)
      // Return null or throw the error, depending on your error handling strategy
      return null
    }
  }

  async getManagerList() {
    try {
      // Await the async call to axios.get
      const response = await axios.get('http://localhost:8080/employee/managers')
      // Return the data property from the response
      return response.data
    } catch (error) {
      // Log the error to the console or handle it as needed
      console.error('Error fetching department list:', error)
      // Return null or throw the error, depending on your error handling strategy
      return null
    }
  }

  async addEmployee(employeeObj) {
    try {
      const response = await axios.post('http://localhost:8080/employee', employeeObj)
      console.log(response)
      console.log('in add employee success')
    } catch (error) {
      console.error('Error adding employee:', error)
      console.log('in add employee fail')
      // Return null or throw the error, depending on your error handling strategy
      return null
    }
  }
}

export default new EmployeeServiceAPI()

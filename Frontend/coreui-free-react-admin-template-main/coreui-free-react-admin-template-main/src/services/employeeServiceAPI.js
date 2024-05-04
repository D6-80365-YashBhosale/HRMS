import axios from 'axios'
import { StorageService } from './storage.service'
class EmployeeServiceAPI {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:8080', // Base URL for API requests
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  async updateEmployee(employee) {
    try {
      const token = StorageService.get('token')

      const response = await this.api.put(`/employee/${employee.id}`, employee, {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token in Authorization header
        },
      })
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
      const token = StorageService.get('token')

      const response = await this.api.get(`/employee/${empId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token in Authorization header
        },
      })
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
      const token = StorageService.get('token')
      const response = await this.api.get('/employee', {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token in Authorization header
        },
      })
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
      const token = StorageService.get('token')
      const response = await this.api.get('/employee/managers', {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token in Authorization header
        },
      })
      // Return the data property from the response
      return response.data
    } catch (error) {
      // Log the error to the console or handle it as needed
      console.error('Error fetching manager list:', error)
      // Return null or throw the error, depending on your error handling strategy
      return null
    }
  }

  async addEmployee(employeeObj) {
    try {
      const token = StorageService.get('token')
      const response = await this.api.post('/employee', employeeObj, {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token in Authorization header
        },
      })
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

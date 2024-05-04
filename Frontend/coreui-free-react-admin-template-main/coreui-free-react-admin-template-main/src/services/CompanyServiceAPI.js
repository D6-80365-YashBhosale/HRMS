import axios from 'axios'
import { StorageService } from './storage.service'
class ComapnyServiceAPI {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:8080/', // Base URL for API requests
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  async addCompany(companyData) {
    try {
      const token = StorageService.get('token')
      const response = await this.api.post('/api/companies/add', companyData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token in Authorization header
        },
      })
      return response.data // Return the response data
    } catch (error) {
      throw new Error('Failed to add company. Please try again.')
    }
  }
  async getCompanyList() {
    try {
      const token = StorageService.get('token')

      const response = await this.api.get('/api/companies', {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token in Authorization header
        },
      })
      console.log(response)
      return response.data
    } catch (error) {
      // Log the error to the console or handle it as needed
      console.error('Error fetching company list:', error)
      // Return null or throw the error, depending on your error handling strategy
      return null
    }
  }

  async deleteCompany(companyId) {
    try {
      const token = StorageService.get('token')

      const response = await this.api.delete(`/api/companies/${companyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log(response)
      console.log('got reponse company deleted ')
      return response.data
    } catch (error) {
      // Log the error to the console or handle it as needed
      console.error(' error deleting company :', error)
      // Return null or throw the error, depending on your error handling strategy
      return null
    }
  }

  async updateCompany(company, companyId) {
    try {
      const token = StorageService.get('token')

      const response = await this.api.put(`/api/companies/${companyId}`, company, {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token in Authorization header
        },
      })
      console.log(response)
      return response.data
    } catch (error) {
      // Log the error to the console or handle it as needed
      console.error('Error updating company:', error)
      // Return null or throw the error, depending on your error handling strategy
      return null
    }
  }
}

export default new ComapnyServiceAPI()

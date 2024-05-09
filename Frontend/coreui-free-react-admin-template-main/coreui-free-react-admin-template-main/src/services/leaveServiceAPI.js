import axios from 'axios'
import { StorageService } from './storage.service'
class LeaveServiceAPI {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:8080', // Base URL for API requests
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  async insertLeave(leave) {
    try {
      const token = StorageService.get('token')
      const response = await this.api.post('/leave', leave, {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token in Authorization header
        },
      })
      console.log(response)
      console.log('got reponse in fetching ')
      return response.data
    } catch (error) {
      // Log the error to the console or handle it as needed
      console.error(' error adding leave :', error)
      // Return null or throw the error, depending on your error handling strategy
      return null
    }
  }

  async fetchLeaveTypes() {
    try {
      const token = StorageService.get('token')
      const allLeaveTypes = await this.api.get('/leave/leave-types', {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token in Authorization header
        },
      })
      console.log(allLeaveTypes)
      console.log('got reponse in fetching ')
      return allLeaveTypes.data
    } catch (error) {
      // Log the error to the console or handle it as needed
      console.error(' error fetching leaveTypes :', error)
      // Return null or throw the error, depending on your error handling strategy
      return null
    }
  }

  async addLeaveType(leaveTypeData) {
    try {
      const token = StorageService.get('token')

      const response = await this.api.post('/api/leavetypes/add', leaveTypeData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token in Authorization header
        },
      })
      console.log(response)
      console.log('got reponse in adding leavetype ')
      return response
    } catch (error) {
      // Log the error to the console or handle it as needed
      console.error(' error fetching leaveTypes :', error)
      // Return null or throw the error, depending on your error handling strategy
      return null
    }
  }

  async fetchLeave() {
    try {
      const token = StorageService.get('token')
      const response = await this.api.get('/leave', {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token in Authorization header
        },
      })
      console.log(response)
      console.log('got reponse in fetching ')
      return response.data
    } catch (error) {
      // Log the error to the console or handle it as needed
      console.error(' error fetching leave :', error)
      // Return null or throw the error, depending on your error handling strategy
      return null
    }
  }

  async approveLeave(leaveId) {
    try {
      const token = StorageService.get('token')
      const response = await this.api.put(`/leave/${leaveId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token in Authorization header
        },
      })
      console.log(response)
      console.log('got reponse in approving leave ')
      return response.data
    } catch (error) {
      // Log the error to the console or handle it as needed
      console.error(' error approving leave :', error)
      // Return null or throw the error, depending on your error handling strategy
      return null
    }
  }

  async fetchMyLeaves() {
    try {
      const token = StorageService.get('token')
      const response = await this.api.get('/leave/my-leaves', {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token in Authorization header
        },
      })
      console.log(response)
      console.log('got reponse in fetching ')
      return response.data
    } catch (error) {
      // Log the error to the console or handle it as needed
      console.error(' error fetching leave :', error)
      // Return null or throw the error, depending on your error handling strategy
      return null
    }
  }
}

export default new LeaveServiceAPI()

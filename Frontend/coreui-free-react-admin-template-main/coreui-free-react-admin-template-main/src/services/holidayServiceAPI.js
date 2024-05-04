import axios from 'axios'
import { StorageService } from './storage.service'
class HolidayServiceAPI {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:8080/',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  async addHoliday(holidayData) {
    try {
      const token = StorageService.get('token')
      const response = await this.api.post('/holiday', holidayData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log(response)
      console.log(' add holiday success')
      return response.data
    } catch (error) {
      console.error('Error adding employee:', error)
      console.log('in add employee fail')
      // Return null or throw the error, depending on your error handling strategy
      throw new Error('Holiday creation failed. Please try again.')
    }
  }

  async fetchAllHolidays() {
    try {
      const token = StorageService.get('token')

      const response = await this.api.get('/holiday/get', {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log(response)
      console.log(' fetch holiday success')
      return response.data
    } catch (error) {
      console.error('Error adding employee:', error)
      //   console.log('')
      // Return null or throw the error, depending on your error handling strategy
      throw new Error('Holiday fetching failed. Please try again.')
    }
  }
}

export default new HolidayServiceAPI()

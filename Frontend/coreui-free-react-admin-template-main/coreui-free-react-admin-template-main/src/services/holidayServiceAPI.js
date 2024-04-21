import axios from 'axios'
class HolidayServiceAPI {
  async addHoliday(holidayData) {
    try {
      const response = await axios.post('http://localhost:8080/holiday', holidayData)
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
      const response = await axios.get('http://localhost:8080/holiday/get')
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

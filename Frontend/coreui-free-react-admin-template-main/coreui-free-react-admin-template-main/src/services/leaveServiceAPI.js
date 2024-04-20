import axios from 'axios'
class LeaveServiceAPI {
  async fetchLeaveTypes() {
    try {
      const allLeaveTypes = await axios.get(`http://localhost:8080/leave/leave-types`)
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
      const response = await axios.post(`http://localhost:8080/api/leavetypes/add`, leaveTypeData)
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
}

export default new LeaveServiceAPI()

import React, { useRef, useState } from 'react'
import '../../scss/leaveTypeform.css'
import leaveServiceAPI from 'src/services/leaveServiceAPI'
function AddLeaveTypeForm() {
  const [leaveType, setLeaveType] = useState('')
  const [maxLeaves, setMaxLeaves] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const leaveTypeData = {
      leaveType,
      maxLeaves,
    }
    try {
      const allLeaveTypes = await leaveServiceAPI.fetchLeaveTypes()
      console.log(allLeaveTypes.data)
      const existingLeaveType = allLeaveTypes.find((leave) => leave.leaveType === leaveType)
      if (existingLeaveType) {
        setError('Leave type with this name already exists.')
        return
      }
      const response = await leaveServiceAPI.addLeaveType(leaveTypeData)
      setLeaveType('')
      setMaxLeaves('')
      setError('')
    } catch (error) {
      console.error('Failed to add leave type:', error)
    }
  }
  return (
    <div className="add-leave-type-form">
      <h2>Add Leave Type</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="leaveType">Leave Type:</label>
          <input
            type="text"
            id="leaveType"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="maxLeaves">Max Leaves:</label>
          <input
            type="number"
            id="maxLeaves"
            value={maxLeaves}
            onChange={(e) => setMaxLeaves(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
export default AddLeaveTypeForm

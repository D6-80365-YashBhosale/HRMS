import React, { useState, useEffect } from 'react'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
// Import the API function to fetch leaves
import leaveServiceAPI from 'src/services/leaveServiceAPI'

const LeaveHistory = () => {
  const [leaves, setLeaves] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    // Fetch leave data from the API when the component mounts
    fetchMyLeaveData()
  }, [])

  const fetchMyLeaveData = () => {
    // Call your API service to fetch leave data with managerId as a parameter
    leaveServiceAPI
      .fetchMyLeaves()
      .then((data) => {
        if (data.length === 0) {
          setError('No leaves to Approve')
        } else {
          console.log(data)
          setLeaves(data)
        }
      })
      .catch((error) => {
        setError('Error fetching leave data')
        console.error('Error fetching leave data:', error)
      })
  }
  return (
    <div>
      <h2>Leave History</h2>
      <CTable striped hover>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Leave Type</CTableHeaderCell>
            <CTableHeaderCell>Start Date</CTableHeaderCell>
            <CTableHeaderCell>End Date</CTableHeaderCell>
            <CTableHeaderCell>Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {leaves.map((leave) => (
            <CTableRow key={leave.leaveId}>
              <CTableDataCell>{leave.leaveTypeId.leaveType}</CTableDataCell>
              <CTableDataCell>{leave.leaveStartOn}</CTableDataCell>
              <CTableDataCell>{leave.leaveEndOn}</CTableDataCell>
              <CTableDataCell>
                {leave.leaveStatus === 'true' ? 'Approved' : 'Pending'}
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  )
}

export default LeaveHistory

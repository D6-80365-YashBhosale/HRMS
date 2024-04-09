import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
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
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
//////////////////////////////////////////////////////////
import employeeServiceAPI from 'src/services/employeeServiceAPI'

function EmployeeList(props) {
  const [employees, setEmployees] = useState([])
  const navigate = useNavigate()

  const fetchEmployees = () => {
    employeeServiceAPI
      .getAllEmployeeList()
      .then((data) => {
        setEmployees(data)
      })
      .catch((error) => {
        console.error('Error fetching departments:', error)
      })
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const viewEmployee = (empId) => {
    navigate(`/view-employee/${empId}`)
  }
  const updateEmployee = (empId) => {
    navigate(`/update-employee/${empId}`)
  }

  return (
    <>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell className="text-center">
              <CIcon icon={cilPeople} />
            </CTableHeaderCell>
            <CTableHeaderCell>Employees</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Department</CTableHeaderCell>
            <CTableHeaderCell>Email</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Leaves Remaining</CTableHeaderCell>
            <CTableHeaderCell>Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {employees.map((employee, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell className="text-center">
                {/* <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} /> */}
              </CTableDataCell>
              <CTableDataCell>
                <div>{employee.firstName}</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                {/* <CIcon size="xl" title={item.country.name} /> */}
                {employee.desig}
              </CTableDataCell>
              <CTableDataCell>{employee.email}</CTableDataCell>
              <CTableDataCell className="text-center">{employee.leaveBalance}</CTableDataCell>
              <CTableDataCell>
                {props.flag ? (
                  <button
                    onClick={() => {
                      viewEmployee(employee.empId)
                    }}
                  >
                    View
                  </button>
                ) : (
                  <span>
                    <CButton
                      type="button"
                      color="success"
                      onClick={() => {
                        updateEmployee(employee.empId)
                      }}
                    >
                      Update
                    </CButton>
                    <CButton type="button" color="danger">
                      Delete
                    </CButton>
                  </span>
                )}
              </CTableDataCell>
            </CTableRow>
          ))}

          <br></br>
        </CTableBody>
      </CTable>
    </>
  )
}

export default EmployeeList

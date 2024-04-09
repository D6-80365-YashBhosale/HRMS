import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CLink,
} from '@coreui/react'
import employeeServiceAPI from 'src/services/employeeServiceAPI'
function ViewEmployee() {
  const { empId } = useParams()
  const [activeTab, setActiveTab] = useState('personalInfo')
  const [employee, setEmployee] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    dob: '',
    joiningDate: '',
    contactNo: '',
    dept: '',
    email: '',
    desig: '',
    empStatus: '',
    leaveBalance: '',
  })
  const boldTextStyle = {
    fontWeight: 'bold',
  }
  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }
  useEffect(() => {
    employeeServiceAPI
      .getSingleEmployee(empId)
      .then((data) => {
        setEmployee(data)
      })
      .catch((error) => {
        console.error('Error fetching employee7:', error)
      })
  }, [])
  return (
    <>
      <p>hello</p>
      <CNav variant="tabs">
        <CNavItem>
          <CNavLink
            active={activeTab === 'personalInfo'}
            onClick={() => handleTabChange('personalInfo')}
          >
            Personal Information
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            active={activeTab === 'contactDetails'}
            onClick={() => handleTabChange('contactDetails')}
          >
            Contact Details
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeTab === 'workInfo'} onClick={() => handleTabChange('workInfo')}>
            Work Information
          </CNavLink>
        </CNavItem>
      </CNav>

      <CTabContent>
        <CTabPane visible={activeTab === 'personalInfo'}>
          <CRow>
            <CCol>
              <CCard>
                <CCardBody>
                  <CRow>
                    <CCol md={5}>
                      <div>First Name</div>
                      <div style={boldTextStyle}>
                        {employee.firstName ? employee.firstName : 'N/A'}
                      </div>
                      <br></br>
                      <div>Middle Name</div>
                      <div style={boldTextStyle}>
                        {employee.middleName ? employee.middleName : 'N/A'}
                      </div>
                      <br></br>
                      <div>Last Name</div>
                      <div style={boldTextStyle}>
                        {employee.lastName ? employee.lastName : 'N/A'}
                      </div>
                      <br></br>
                      <div>Gender</div>
                      <div style={boldTextStyle}>{employee.gender ? employee.gender : 'N/A'}</div>
                      <br></br>
                      <div>Date of Birth</div>
                      <div style={boldTextStyle}>{employee.dob ? employee.dob : 'N/A'}</div>
                      <br></br>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CTabPane>

        <CTabPane visible={activeTab === 'contactDetails'}>
          <CRow>
            <CCol>
              <CCard>
                <CCardHeader>Contact Details</CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol>
                      <CCard>
                        <CCardBody>
                          <div>Email</div>
                          <div style={boldTextStyle}>{employee.email ? employee.email : 'N/A'}</div>
                          <br></br>
                          <div>Contact No </div>
                          <div style={boldTextStyle}>
                            {employee.contactNo ? employee.contactNo : 'N/A'}
                          </div>
                          <br></br>
                        </CCardBody>
                      </CCard>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CTabPane>

        <CTabPane visible={activeTab === 'workInfo'}>
          <CRow>
            <CCol>
              <CCard>
                <CCardHeader>Work Information</CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol>
                      <CCard>
                        <CCardBody>
                          <div>Designation</div>
                          <div style={boldTextStyle}>{employee.desig ? employee.desig : 'N/A'}</div>
                          <br></br>
                          <div>Department</div>
                          <div style={boldTextStyle}>
                            {employee.dept && employee.dept.deptName
                              ? employee.dept.deptName
                              : 'N/A'}
                          </div>
                          <br></br>
                          <div>Joining Date</div>
                          <div style={boldTextStyle}>
                            {employee.joiningDate ? employee.joiningDate : 'N/A'}
                          </div>
                          <br></br>
                          <div>Status</div>
                          <div style={boldTextStyle}>
                            {employee.empStatus ? 'Active' : 'Inactive'}
                          </div>
                          <br></br>
                          <div>Leaves Remaining</div>
                          <div style={boldTextStyle}>{employee.leaveBalance}</div>
                          <br></br>
                        </CCardBody>
                      </CCard>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CTabPane>
      </CTabContent>
    </>
  )
}
export default ViewEmployee

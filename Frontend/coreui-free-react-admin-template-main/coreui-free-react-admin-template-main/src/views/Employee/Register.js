import React, { useEffect, useState } from 'react'
import departmentService from 'src/services/departmentService'
import employeeServiceAPI from 'src/services/employeeServiceAPI'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Register = () => {
  const [department, setDepartment] = useState([])
  const [managers, setManagers] = useState([])
  const [formDetails, setFormDetails] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    dob: '',
    joiningDate: '',
    contactNo: '',
    dept: '',
    email: '',
    manager: '',
    desig: '',
    password: '',
    confirmPassword: '',
  })
  useEffect(() => {
    departmentService
      .getDepartmentList()
      .then((data) => {
        console.log(data)
        setDepartment([...data])
      })
      .catch((error) => {
        console.error('Error fetching departments:', error)
      })

    employeeServiceAPI
      .getManagerList()
      .then((data) => {
        console.log(data)
        setManagers([...data])
      })
      .catch((error) => {
        console.log('Error fetching Managers:', error)
      })
  }, [])

  const handleInputChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    employeeServiceAPI
      .addEmployee(formDetails)
      .then((responseData) => {
        console.log(responseData)
        console.log('employee added successfully')
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={14} lg={11} xl={8}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Add Employee</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CRow>
                    <CCol md={9} lg={7} xl={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>First Name</CInputGroupText>
                        <CFormInput
                          placeholder="FirstName"
                          autoComplete="FirstName"
                          type="Text"
                          id="firstName"
                          name="firstName"
                          value={formDetails.firstName}
                          onChange={handleInputChange}
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol md={9} lg={7} xl={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>Last Name</CInputGroupText>
                        <CFormInput
                          placeholder="LastName"
                          autoComplete="LastName"
                          id="lastName"
                          name="lastName"
                          value={formDetails.lastName}
                          onChange={handleInputChange}
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md={9} lg={7} xl={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>Middle Name</CInputGroupText>
                        <CFormInput
                          placeholder="MiddleName"
                          autoComplete="MiddleName"
                          id="middleName"
                          name="middleName"
                          value={formDetails.middleName}
                          onChange={handleInputChange}
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>@</CInputGroupText>
                        <CFormInput
                          placeholder="Email"
                          autoComplete="email"
                          id="email"
                          name="email"
                          value={formDetails.email}
                          onChange={handleInputChange}
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md={6} lg={8} xl={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>Date Of Birth</CInputGroupText>
                        <CFormInput
                          placeholder="Date Of Birth"
                          autoComplete="dob"
                          type="Date"
                          id="dob"
                          name="dob"
                          value={formDetails.dob}
                          onChange={handleInputChange}
                        />
                      </CInputGroup>
                    </CCol>

                    <CCol md={6} lg={9} xl={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>Date Of Joining</CInputGroupText>
                        <CFormInput
                          placeholder="Date Of Joining"
                          autoComplete="joiningDate"
                          type="Date"
                          id="joiningDate"
                          name="joiningDate"
                          value={formDetails.joiningDate}
                          onChange={handleInputChange}
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>Gender</CInputGroupText>
                        <CFormSelect>
                          <option>select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">female</option>
                          <option value="Other">Other</option>
                          value={formDetails.gender}
                          onChange={handleInputChange}
                        </CFormSelect>
                      </CInputGroup>
                    </CCol>
                    <CCol>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>Phone</CInputGroupText>
                        <CFormInput
                          placeholder="Phone"
                          autoComplete=""
                          id="contactNo"
                          name="contactNo"
                          value={formDetails.contactNo}
                          onChange={handleInputChange}
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>Department</CInputGroupText>
                        <CFormSelect
                          id="dept"
                          name="dept"
                          value={formDetails.dept}
                          onChange={handleInputChange}
                        >
                          <option>select department</option>
                          {department.map((department) => (
                            <option key={department.deptId} value={department.deptId}>
                              {department.deptName}
                            </option>
                          ))}
                        </CFormSelect>
                      </CInputGroup>
                    </CCol>
                    <CCol>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>Manager</CInputGroupText>
                        <CFormSelect
                          id="manager"
                          name="manager"
                          value={formDetails.manager}
                          onChange={handleInputChange}
                        >
                          <option>select Manager</option>
                          {managers.map((manager) => (
                            <option key={manager.empId} value={manager.empId}>
                              {manager.firstName +
                                ' ' +
                                manager.lastName +
                                ' (' +
                                manager.desig +
                                ')'}
                            </option>
                          ))}
                        </CFormSelect>
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>Password</CInputGroupText>
                        <CFormInput
                          placeholder="Password"
                          autoComplete=""
                          id="password"
                          name="password"
                          value={formDetails.password}
                          onChange={handleInputChange}
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>Conform Password</CInputGroupText>
                        <CFormInput
                          placeholder="Conform Password"
                          autoComplete=""
                          name="confirmPassword"
                          onChange={handleInputChange}
                          value={formDetails.confirmPassword}
                          id="confirmPassword"
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md={6} lg={9} xl={9}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>Designation</CInputGroupText>
                        <CFormSelect
                          name="desig"
                          value={formDetails.desig}
                          id="desig"
                          onChange={handleInputChange}
                        >
                          <option>select Designation</option>
                          <option value="HR">HR</option>
                          <option value="Employee">Employee</option>
                          <option value="Manager">Manager</option>
                          <option value="Admin">Admin</option>
                        </CFormSelect>

                        <CCol></CCol>
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <div className="d-grid">
                    <CButton color="success" type="submit">
                      Add Employee
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register

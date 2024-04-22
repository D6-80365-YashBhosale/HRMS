import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CRow,
  CFormSelect,
  CInputGroupText,
} from '@coreui/react'
import departmentService from 'src/services/departmentService'
import CompanyServiceAPI from 'src/services/CompanyServiceAPI'

function RegisterDepartment() {
  const [company, setCompany] = useState([])
  const [formdetails, setformdetails] = useState({
    deptName: '',
    companyId: '',
    deptHeadEmpId: '',
  })

  useEffect(() => {
    CompanyServiceAPI.getCompanyList()
      .then((data) => {
        setCompany([...data])
      })
      .catch((error) => {
        console.error('Error fetching departments:', error)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    departmentService
      .addDepartment(formdetails)
      .then((responseData) => {
        console.log('Department added successfully:', responseData)
      })
      .catch((error) => {
        console.error('Error adding Department:', error.message)
      })
    console.log('Form submitted:', formdetails)
    setformdetails({
      deptName: '',
      companyId: '',
      deptHeadEmpId: '',
    })
  }

  const handleInputChange = (e) => {
    setformdetails({
      ...formdetails,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6} lg={7} xl={6}>
            <CCard className="mx-4" style={{ width: '100%' }}>
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Add Department</h1>
                  <p className="text-medium-emphasis">Create new Department</p>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Department Name"
                      //autoComplete="departmentName"
                      id="deptName"
                      name="deptName"
                      value={formdetails.deptName}
                      onChange={handleInputChange}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Department Head Employee Id"
                      autoComplete="deptHeadEmpId"
                      id="deptHeadEmpId"
                      name="deptHeadEmpId"
                      value={formdetails.deptHeadEmpId}
                      onChange={handleInputChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CFormSelect
                      aria-label="Default select example"
                      id="companyId"
                      name="companyId"
                      value={formdetails.companyId}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Company</option>
                      {company.map((company) => (
                        <option key={company.companyId} value={company.companyName}>
                          {company.companyName}
                        </option>
                      ))}
                    </CFormSelect>
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton type="submit" color="success">
                      Add Department
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
export default RegisterDepartment

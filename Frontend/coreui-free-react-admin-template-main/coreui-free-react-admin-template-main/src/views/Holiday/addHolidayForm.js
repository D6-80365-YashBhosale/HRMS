import React, { useRef, useEffect, useState } from 'react'

import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CRow } from '@coreui/react'
import '../../scss/holiday.css'
import holidayServiceAPI from 'src/services/holidayServiceAPI'
function HolidayForm() {
  const [errorMessage, setErrorMessage] = useState('')

  const [HolidayData, setHolidayData] = useState({
    holidayName: '',
    holidayFromDate: '',
    holidayToDate: '',
  })

  const handleInputChange = (e) => {
    setHolidayData({
      ...HolidayData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(HolidayData)
    // Reset form fields and error message after submission
    holidayServiceAPI
      .addHoliday(HolidayData)
      .then((res) => {
        console.log(res)
        alert(`holiday add succesfully`)
      })
      .catch((err) => {
        alert(`An Error Occured While Submitting your Request :  ${err}`)
      })
    setErrorMessage('')
    setHolidayData({
      holidayName: '',
      holidayFromDate: '',
      holidayToDate: '',
    })
  }

  return (
    <>
      {' '}
      <div className="form-container">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={12}>
              <CCard className="mx-4" style={{ width: '100%' }}>
                <CCardBody className="p-4">
                  <>
                    <CForm onSubmit={handleSubmit}>
                      <h1>Add Holiday</h1>
                      <p className="text-medium-emphasis">Add Your Holiday</p>
                      <CRow className="mb-3">
                        <div>
                          <label htmlFor="holidayName">Holiday Name:</label>
                          <input
                            type="text"
                            id="holidayName"
                            name="holidayName"
                            value={HolidayData.holidayName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </CRow>
                      <CRow className="mb-3">
                        <div>
                          <label htmlFor="holidayFromDate">From Date:</label>
                          <input
                            type="date"
                            id="holidayFromDate"
                            name="holidayFromDate"
                            value={HolidayData.holidayFromDate}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </CRow>
                      <CRow className="mb-3">
                        <div>
                          <label htmlFor="holidayToDate">To Date:</label>
                          <input
                            type="date"
                            id="holidayToDate"
                            name="holidayToDate"
                            value={HolidayData.holidayToDate}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </CRow>
                      <div className="d-grid">
                        <CButton type="submit" color="success">
                          ADD
                        </CButton>
                      </div>
                      {errorMessage && <div className="error-message">{errorMessage}</div>}
                    </CForm>
                  </>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}
export default HolidayForm

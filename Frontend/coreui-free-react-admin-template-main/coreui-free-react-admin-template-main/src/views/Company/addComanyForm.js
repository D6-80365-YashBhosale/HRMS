import React, { useState } from 'react'
import CompanyServiceAPI from 'src/services/CompanyServiceAPI'
import { CToast, CToastBody, CToastHeader, CToaster } from '@coreui/react'
import '../../scss/addComany.css'
const AddCompanyForm = () => {
  const [companyName, setCompanyName] = useState('')
  const [companyEmail, setCompanyEmail] = useState('')
  const [companyContact, setCompanyContact] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const companyData = {
      companyName,
      companyEmail,
      companyContact,
    }

    try {
      // Assuming you have a method to fetch all companies
      const companies = await CompanyServiceAPI.getCompanyList()
      // Check if the company name already exists
      const existingCompany = companies.find((company) => company.companyName === companyName)
      if (existingCompany) {
        setErrorMessage('Company name already exists. Please choose a different name.')
        return
      }

      // If the company name is unique, proceed to add the company
      await CompanyServiceAPI.addCompany(companyData)

      setCompanyName('')
      setCompanyEmail('')
      setCompanyContact('')
      setErrorMessage('')
    } catch (error) {
      console.error('Failed to add company:', error)
    }
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className="add-company-form">
          <h3>Add Company</h3>
          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Company Email"
            value={companyEmail}
            onChange={(e) => setCompanyEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Company Contact"
            value={companyContact}
            onChange={(e) => setCompanyContact(e.target.value)}
            required
          />
          <button type="submit">Add Company</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </>
  )
}

export default AddCompanyForm

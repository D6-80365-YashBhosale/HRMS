{
    "empId": "65d21224a3406e60188b6553",
    "firstName": "yash",
    "middleName": "ankush",
    "lastName": "bhosale",
    "gender": "Male",
    "dob": "2024-02-16",
    "joiningDate": "2024-02-09",
    "desig": "Hr",
    "email": "yashbhosale3701@gmail.com",
    "contactNo": "9822893597",
    "userName": "yashbhosale3701@gmail.com",
    "empStatus": "true",
    "empAccesRole": null,
    "leaveBalance": 24
},

///////////////////////////////////////////////////////
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
      <CTableDataCell className="text-center">
        {employee.leaveBalance}
      </CTableDataCell>
      <CTableDataCell>
        <button>View</button>
      </CTableDataCell>
    </CTableRow>
  ))}
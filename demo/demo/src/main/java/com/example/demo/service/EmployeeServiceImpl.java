package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Department;
import com.example.demo.model.Employee;
import com.example.demo.repo.IDepartmentRepository;
import com.example.demo.repo.IEmployeeRespository;
import com.example.demo.request.EmployeeRequest;
import com.example.demo.request.UpdateEmpRequest;
import com.example.demo.response.EmployeeDto;
//import com.hrms.app.custome_exception.ResourceNotFoundException;
//import com.hrms.app.model.Project;
@Service
public class EmployeeServiceImpl {
     @Autowired IEmployeeRespository empRepo;
     @Autowired IDepartmentRepository deptRepo;
     @Autowired ModelMapper mapper;
     
     public EmployeeDto addEmployee( EmployeeRequest empReq) { 
    	 Optional<Employee>e=empRepo.findByUserName(empReq.getEmail());
    	 if(e.isPresent()) {
    		 throw new RuntimeException();
    	 }
    	 Employee emp = mapper.map(empReq, Employee.class);
    	 emp.setEmail(empReq.getEmail());
    	 emp.setContactNo(empReq.getContactNo());
    	 emp.setDesig(empReq.getDesig());
    	 emp.setCreatedOn(LocalDateTime.now());
    	 emp.setUserName(empReq.getEmail());
    	 emp.setLeaveBalance(25);
    	 empRepo.save(emp);
    	 return mapper.map(emp, EmployeeDto.class);
     }
     
     public List<EmployeeDto> findAllEmployees(){
    	 List<Employee> empList=empRepo.findAll();
    	 return empList.stream()
    			 .map(emp->mapper.map(emp,EmployeeDto.class))
    			 .collect(Collectors.toList());
     }
     
     public List<EmployeeDto> getAllManagers(){
    	 List<Employee> managerList=empRepo.findByDesig("Manager");
    	 System.out.println(managerList);
    	         return managerList
    	          .stream()
    	          .map((employee)->mapper.map(employee, EmployeeDto.class))
    	          .collect(Collectors.toList());
     }
     
     public EmployeeDto getEmployee(String empId) {
 		// get Employee by using empId  
// 		if(empId.equals("empId"))
// 		{
// 		System.out.println(userName);
// 		Employee emp = empRepo.findByUserName(userName).orElseThrow(() -> new RuntimeException("Invalid Emp login!!!"));
// 		return mapper.map(emp, EmployeeDto.class);
// 		} 
// 		else {
 			Employee emp = empRepo.findById(empId).orElseThrow(() -> new RuntimeException("Invalid Emp login!!!"));
 			return mapper.map(emp, EmployeeDto.class);
// 		}
 		
 	}
     
     public EmployeeDto updateEmployee(UpdateEmpRequest empReq) {
    	Employee emp1= empRepo.findById(empReq.getEmpId()).orElseThrow(()->new  RuntimeException("invalid employee id"));
    	Department dept=deptRepo.findById(empReq.getDept()).orElseThrow(()->new RuntimeException("Invalid Deptartment"));
    	
    	Employee emp=mapper.map(empReq,Employee.class);
    	emp.setDept(dept);
    	
//    	List<String> projectIds = empReq.getProjects();
//		List<Project> projectList = projectIds.stream().map(proRepo::findById).filter(Optional::isPresent)
//				.map(Optional::get).collect(Collectors.toList());
//		emp.setProjects(projectList);
    	
    	emp.setUserName(emp.getEmail());
		emp.setUpdatedOn(LocalDateTime.now());
		emp.setLeaveBalance(24); 
		emp.setPassword(emp1.getPassword());
		emp.setEmpStatus(true);
		// update the emp using save method
		System.out.println(emp);
		empRepo.save(emp);
		
		return mapper.map(emp, EmployeeDto.class);
     }
}

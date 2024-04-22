package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Company;
import com.example.demo.model.Department;
import com.example.demo.repo.ICompanyRepository;
import com.example.demo.repo.IDepartmentRepository;
import com.example.demo.request.DepartmentRequest;
import com.example.demo.response.DepartmentDto;
import com.example.demo.response.EmployeeDto;



@Service
public class DepartmentServiceImpl {
	
	@Autowired IDepartmentRepository deptRepo;
	
	@Autowired ModelMapper mapper;
	
	@Autowired 
	private ICompanyRepository compRepo;
	
     public  List<DepartmentDto> getAllDepartments(){
           List<Department> deptList=deptRepo.findAll();
//           System.out.println(deptList+"list of dept");
             return deptList
              .stream()
              .map(dept->mapper.map(dept,DepartmentDto.class ))
              .collect(Collectors.toList());

        }
     
     
     

 	public DepartmentDto addDepartment(DepartmentRequest deptReq) {

 		//fetch company and then convert 
 		Company comp=compRepo.findByCompanyName(deptReq.getCompanyId());
 		
 		// convert DepartmentRequest object to Department
 		Department dept = mapper.map(deptReq, Department.class); 
 		dept.setCompany(comp);
 		// save dept object in database 
 		dept.setActive(true);
 		dept.setCreatedOn(LocalDateTime.now()); 
 		dept.setUpdatedOn(LocalDateTime.now());
 		deptRepo.save(dept);
 		System.out.println("Department added with id: " + dept.getDeptId());
 		return mapper.map(dept, DepartmentDto.class);
 	}

 	public DepartmentDto getDepartment(String deptId) {
 		// get Department by using deptId
 		Department dept = deptRepo.findById(deptId).orElseThrow(() -> new RuntimeException("Invalid Department ID!!!"));
 		return mapper.map(dept, DepartmentDto.class);
 	}

// 	public ApiResponse removeDepartment(String deptId) {
// 		deptRepo.deleteById(deptId);
//
// 		return new ApiResponse("Department Details with ID " + deptId + " deleted....");
// 	}

 	public DepartmentDto updateDepartment(DepartmentRequest deptReq) {
 		// convert DepartmentRequest object to Department
 		Department dept = mapper.map(deptReq, Department.class);
 		// update dept using save method
 		deptRepo.save(dept);
 		return mapper.map(dept, DepartmentDto.class);
 	}

}

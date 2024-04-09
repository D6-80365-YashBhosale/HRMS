package com.example.demo.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Department;
import com.example.demo.repo.IDepartmentRepository;
import com.example.demo.response.DepartmentDto;
import com.example.demo.response.EmployeeDto;

@Service
public class DepartmentServiceImpl {
	
	@Autowired IDepartmentRepository deptRepo;
	
	@Autowired ModelMapper mapper;
	
	
     public  List<DepartmentDto> getAllDepartments(){
           List<Department> deptList=deptRepo.findAll();
//           System.out.println(deptList+"list of dept");
             return deptList
              .stream()
              .map(dept->mapper.map(dept,DepartmentDto.class ))
              .collect(Collectors.toList());

        }
}

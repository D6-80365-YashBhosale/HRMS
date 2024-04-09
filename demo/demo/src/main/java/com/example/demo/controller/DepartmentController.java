package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.response.DepartmentDto;
import com.example.demo.service.DepartmentServiceImpl;
@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/department")
public class DepartmentController {

	@Autowired
	DepartmentServiceImpl deptService;
	
	@GetMapping
	 public ResponseEntity<List<DepartmentDto>> getAllDepartments(){
		System.out.println("in controller department");
		System.out.println(deptService.getAllDepartments()+"list in controller");
		return  new ResponseEntity<>(deptService.getAllDepartments(),HttpStatus.OK);
       
	}
	
	
}

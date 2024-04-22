package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.request.DepartmentRequest;
import com.example.demo.response.DepartmentDto;
import com.example.demo.service.DepartmentServiceImpl;

import jakarta.validation.Valid;
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
	@PostMapping
	public ResponseEntity<?> addDeptDetails(@RequestBody @Valid DepartmentRequest deptReq) {
		try {
			// calling DeptService method for adding Department 
			System.out.println(deptReq);
			return new ResponseEntity<>(deptService.addDepartment(deptReq), HttpStatus.CREATED);
		} catch (Exception e) {
			System.out.println("Error in controller " + e);
			// return err mesg wrapped in DTO : ApiResp
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new RuntimeException(e.getMessage()));
		}
	}

	@GetMapping("/{deptId}")
	public ResponseEntity<?> getDepartEntity(@PathVariable String deptId) {
		// call service method for fetching an department info
		return ResponseEntity.ok(deptService.getDepartment(deptId));
	}

	
	 

	@PutMapping("/{deptId}")
	public ResponseEntity<?> updateDepartmentEntity(@PathVariable String deptId,
			@RequestBody @Valid DepartmentRequest deptReq) {
		// call update department method to update department
		System.out.println("in update department method");
		return ResponseEntity.ok(deptService.updateDepartment(deptReq));
	}

//	@DeleteMapping("/{deptId}")
//	public ResponseEntity<?> removeDepartment(@PathVariable String deptId) {
//		System.out.println("in delete department method");
//		return ResponseEntity.ok(deptService.removeDepartment(deptId));
//	}
	
	
}

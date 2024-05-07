package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.request.LeaveRequest;
import com.example.demo.response.LeaveDto;
import com.example.demo.response.LeaveTypeDto;
import com.example.demo.security.JwtUtil;
import com.example.demo.service.LeaveServiceImpl;
import com.example.demo.utils.AuthUtils;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController

@RequestMapping("/leave")
public class LeaveController {

	@Autowired LeaveServiceImpl leaveService;
	@Autowired AuthUtils authUtils;
	@PostMapping
	public ResponseEntity<?> addLeaveDetails(@RequestBody @Valid LeaveRequest leaveReq) {
		try {
			// calling LeaveService method for adding leave in db
			String username=authUtils.getUsername();
			System.out.println("in  leave cntlr + add leaveDetails");
			
			return new ResponseEntity<>(leaveService.addLeave(username, leaveReq), HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error in controller: " + e);
			// return error message wrapped in DTO: ApiResp
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
	
	// get all leave types from LeaveType Repo
	
		@GetMapping("/leave-types")
		public ResponseEntity<List<LeaveTypeDto>> getAllLeaveTypes() {
			List<LeaveTypeDto> leaveTypes = leaveService.getLeaveType();
			return new ResponseEntity<>(leaveTypes, HttpStatus.OK);
		}
	
		@GetMapping
		public ResponseEntity<?> getLeaveByManagerId() {
			try {
				System.out.println("fetching all leaves from controller");
				String username=authUtils.getUsername();
				List<LeaveDto> leaveList = leaveService.getLeavesList(username);
				return new ResponseEntity<>(leaveList, HttpStatus.OK);
			} catch (Exception e) {
				System.out.println(e.getMessage());
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
			}

		}
}

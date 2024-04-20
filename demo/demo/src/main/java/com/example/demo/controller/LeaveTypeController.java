package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.request.LeaveTypeRequest;
import com.example.demo.response.LeaveTypeDto;
import com.example.demo.service.LeaveTypeServiceImpl;


@CrossOrigin(origins = "http://localhost:3000/")

@RestController

@RequestMapping("/api/leavetypes")
public class LeaveTypeController {

	
	
	@Autowired
    private LeaveTypeServiceImpl leaveTypeService;

    @PostMapping("/add")
    public ResponseEntity<LeaveTypeDto> addLeaveType(@RequestBody LeaveTypeRequest leaveTypeRequest) {
    	System.out.println("in Leavetype Controller");
        LeaveTypeDto leaveTypeDto = leaveTypeService.addLeaveType(leaveTypeRequest);
        return new ResponseEntity<>(leaveTypeDto, HttpStatus.CREATED);
    }
}

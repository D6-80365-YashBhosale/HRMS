package com.example.demo.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.LeaveType;
import com.example.demo.repo.ILeaveTypeRepository;
import com.example.demo.request.LeaveTypeRequest;
import com.example.demo.response.LeaveTypeDto;



@Service
public class LeaveTypeServiceImpl {

	
	
	@Autowired
    private ILeaveTypeRepository leaveTypeRepository;
    
    @Autowired
	 private ModelMapper mapper;

    public LeaveTypeDto addLeaveType(LeaveTypeRequest leaveTypeRequest) {
    	LeaveType leavetype = mapper.map(leaveTypeRequest, LeaveType.class);
    	LeaveType leave = leaveTypeRepository.save(leavetype);
        return mapper.map(leave, LeaveTypeDto.class);
     
    }
}

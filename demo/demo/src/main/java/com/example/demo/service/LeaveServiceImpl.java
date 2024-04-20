package com.example.demo.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.management.RuntimeErrorException;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Employee;
import com.example.demo.model.Leave;
import com.example.demo.model.LeaveType;
import com.example.demo.repo.IEmployeeRespository;
import com.example.demo.repo.ILeaveRepository;
import com.example.demo.repo.ILeaveTypeRepository;

import com.example.demo.request.LeaveRequest;
import com.example.demo.response.LeaveDto;
import com.example.demo.response.LeaveTypeDto;




@Service
public class LeaveServiceImpl {
	@Autowired IEmployeeRespository empRepo;
	@Autowired ILeaveTypeRepository leaveTypeRepository;
	@Autowired ILeaveRepository leaveRepository;
	@Autowired ModelMapper mapper;
	
	public LeaveDto addLeave(String username, LeaveRequest leaveReq) {
		
		try {
			// convert LeaveRequest to Leave
			// Leave leave = mapper.map(leaveReq, Leave.class);
			Leave leave = new Leave();
			Optional<Employee> o = empRepo.findByUserName(username);
			if (o.isPresent()) {
				Employee employee = o.get();
				leave.setEmpId(employee);

			}
			// save leave object in database before mapping to dto
			Optional<LeaveType> leavetype = leaveTypeRepository.findById(leaveReq.getLeaveTypeId());
			if (leavetype.isPresent()) {
				LeaveType lt = leavetype.get();
				leave.setLeaveTypeId(lt);
			}
			leave.setLeaveComment(leaveReq.getLeaveComment());
			leave.setLeaveStartOn(leaveReq.getLeaveStartOn());
			leave.setLeaveEndOn(leaveReq.getLeaveEndOn());
			leave.setLeaveStatus(false);
			leaveRepository.save(leave);
            System.out.println("after saving leave");
			// return by mapping to dto
			return mapper.map(leave, LeaveDto.class);
		} catch (Exception e) {
			// Handle the exception
			System.out.println("Error occurred while adding leave: " + e.getMessage());
			throw new RuntimeException("Error occurred while adding leave. Please try again later.");
		}

	}
	
	
	public List<LeaveTypeDto> getLeaveType() {
		List<LeaveType> leaveTypes = leaveTypeRepository.findAll();

		// Map each LeaveType entity to LeaveTypeDto using ModelMapper
		return leaveTypes.stream()
				.map(leaveType -> mapper.map(leaveType, LeaveTypeDto.class))
				.collect(Collectors.toList());
		

	}

}

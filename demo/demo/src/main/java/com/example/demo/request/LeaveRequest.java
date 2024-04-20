package com.example.demo.request;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;



import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LeaveRequest {

	
//	private String employeeId;
	@NotBlank
	private String leaveTypeId;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate leaveStartOn;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate leaveEndOn;

	// @NotBlank
//	 private int numberOfDays;

	@NotBlank(message = "Please Enter Comment !")
	private String leaveComment;

	// private String leaveStatus;

}

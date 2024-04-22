package com.example.demo.request;


import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DepartmentRequest {
	
	@NotBlank(message = "Name can not be blank")
	private String deptName;
	private String companyId;
	@NotBlank(message = "Department head Id can not be blank")
	private String deptHeadEmpId;
	//private String recordStatus;
	//private boolean isActive;
//	@DateTimeFormat(pattern = "yyyy-MM-dd")
//	private LocalDateTime createdOn;
//	@DateTimeFormat(pattern = "yyyy-MM-dd")
//	private LocalDateTime updatedOn;
}

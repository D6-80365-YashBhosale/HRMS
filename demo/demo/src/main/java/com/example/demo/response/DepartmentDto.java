package com.example.demo.response;

import java.time.LocalDateTime;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString

public class DepartmentDto {
	private String deptId;
	private String deptName;
	private String companyId;
//	private String deptHeadEmpId;
	private String recordStatus;
	private boolean isActive;
	private LocalDateTime createdOn;
	private LocalDateTime updatedOn;
}

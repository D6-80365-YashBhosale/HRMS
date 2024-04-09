package com.example.demo.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

//import com.hrms.app.model.Company;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection="departments")

public class Department {
	@Id
	private String deptId;
    private String deptName;
    
//    @DBRef
//    @Field
//    private Company company;
    private String recordStatus;
    private boolean isActive;
    private LocalDateTime createdOn;
	private LocalDateTime updatedOn;
    
}

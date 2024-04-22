package com.example.demo.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data  
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "companies") 
@ToString
public class Company {
	// primary key
	@Id
	private String companyId;
	private String companyName;
	private String companyContact;
	private String companyEmail;
	private String recordStatus;
	private boolean isActive;
	private LocalDateTime createdOn;
	private LocalDateTime updatedOn;
}

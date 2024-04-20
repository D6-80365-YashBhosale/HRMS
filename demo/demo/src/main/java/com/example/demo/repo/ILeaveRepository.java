package com.example.demo.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.model.Leave;



public interface ILeaveRepository   extends MongoRepository<Leave, String> {
    
	
	Optional<Leave> findByEmpId(String empId);

	List<Leave> findAllByEmpId(String empId);
	
}

package com.example.demo.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Department;
@Repository
public interface IDepartmentRepository  extends MongoRepository<Department, String>{
         
}

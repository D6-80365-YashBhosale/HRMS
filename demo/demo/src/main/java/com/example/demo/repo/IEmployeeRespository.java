package com.example.demo.repo;

import java.util.Optional;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Employee;


@Repository
public interface IEmployeeRespository extends MongoRepository<Employee, String> {
       public Optional<Employee> findByUserName(String username);
       
       public List<Employee> findByManager(String managerId);
       
       public List<Employee>  findByDesig(String designation);
       
}

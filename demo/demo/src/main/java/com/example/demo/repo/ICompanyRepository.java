package com.example.demo.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.model.Company;


public interface ICompanyRepository extends MongoRepository<Company, String>{

	Company findByCompanyName(String string);

}


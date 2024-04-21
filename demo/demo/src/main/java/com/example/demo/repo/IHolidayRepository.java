package com.example.demo.repo;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.model.Holiday;


public interface IHolidayRepository extends MongoRepository<Holiday, String> {

	public Optional<Holiday> findById(String Id);

}
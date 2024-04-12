package com.example.demo.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.model.Event;

public interface IEventRepository extends MongoRepository<Event, String> {

}

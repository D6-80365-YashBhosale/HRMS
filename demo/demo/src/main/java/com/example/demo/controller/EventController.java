package com.example.demo.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.request.EventRequest;
import com.example.demo.response.EventDto;
import com.example.demo.service.EventServiceImpl;

import lombok.Data;


@CrossOrigin(origins = "http://localhost:3000/")
@RestController

@RequestMapping("/events")
public class EventController {
	
	
	
	@Autowired EventServiceImpl eventServiceImpl;
	@PostMapping("/add")
	public ResponseEntity<?> addEvent(@ModelAttribute EventRequest eventRequest,
			             @RequestParam ("bannerFile") MultipartFile bannerFile)  {
		System.out.println("in event Controller addevent method");
		try {
		  byte[] bannerData=bannerFile.getBytes();
		 return new ResponseEntity<> (eventServiceImpl.addEvent(eventRequest, bannerData),HttpStatus.CREATED);
		  
		}
		catch(IOException e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
			return new ResponseEntity<>("failed to add event",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
package com.example.demo.service;

import java.time.LocalTime;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Event;
import com.example.demo.repo.IEventRepository;
import com.example.demo.request.EventRequest;
import com.example.demo.response.EventDto;

import lombok.Data;

@Data
@Service
public class EventServiceImpl {
  
	@Autowired ModelMapper mapper;
	@Autowired IEventRepository eventRepo;
	
	public EventDto addEvent(EventRequest eventReq,byte[] bannerData) {
		Event event=mapper.map(eventReq, Event.class);
//		if(event.getId()==null) {
//			throw new RuntimeException("Id of event is not found");
//			
//		}
		  event.setTime(LocalTime.parse(eventReq.getEventTime()));
		  event.setBannerData(bannerData);
		 return mapper.map(eventRepo.save(event), EventDto.class);
		
	}
	
}

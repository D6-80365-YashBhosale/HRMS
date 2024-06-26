package com.example.demo.model;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.Data;
@Data
@Document(collection = "events")
public class Event {
	    @Id
	    private String id;
	    private String title;
	    private String description;
	    private LocalDate startDate;
	    private LocalDate endDate;
	    private LocalTime time;
	    private String venue;
	    private String category;
	    private String bannerId; // Field to store the ID of the associated image in GridFS
	    private byte[] bannerData;
   
}

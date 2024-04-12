package com.example.demo.request;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Data;

@Data
public class EventRequest {
	 private String companyId;
	    private String title;
	    private String description;
	    private LocalDate startDate;
	    private LocalDate endDate;
	    private String eventTime;
	    private String venue;
	    private byte[] bannerData;
	    private String category;
	    private boolean recordStatus;

   
}

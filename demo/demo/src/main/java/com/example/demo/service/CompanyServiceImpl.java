package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Company;
import com.example.demo.repo.ICompanyRepository;
import com.example.demo.request.CompanyRequest;
import com.example.demo.response.CompanyDto;



@Service
public class CompanyServiceImpl{
     @Autowired
     private ICompanyRepository icompanyRepository;
     
     @Autowired
 	 private ModelMapper mapper;
     
     public List<CompanyDto> getAllCompanies(){ 
    	 List<Company> companyList=icompanyRepository.findAll();
    	 System.out.println("in companies service getAllCompanies method");
    	 return companyList.stream().map(comp -> mapper.map(comp, CompanyDto.class)).collect(Collectors.toList());
     }
     
     public CompanyDto addCompany(CompanyRequest companyRequest) {
    	 
    	 
		Company company = mapper.map(companyRequest, Company.class);
         company.setCreatedOn(LocalDateTime.now());
         company.setUpdatedOn(LocalDateTime.now());
         company.setRecordStatus("Active");
         Company savedCompany = icompanyRepository.save(company);
         return mapper.map(savedCompany, CompanyDto.class);
     }
    
     public String deleteCompany(String companyId) {
    	 icompanyRepository.deleteById(companyId);
    	 return new String("Company Details Deleted");
     }

     public CompanyDto updateCompany(CompanyRequest compReq) {
        Company oldCompany = icompanyRepository.findById(compReq.getCompanyId()).orElseThrow();
       
        oldCompany = mapper.map(compReq, Company.class);
        oldCompany.setUpdatedOn(LocalDateTime.now());
        icompanyRepository.save(oldCompany);
        return mapper.map(oldCompany, CompanyDto.class);
     }
  
     public CompanyDto getCompany(String companyId) {
 		// get Employee by using empId
 		Company company = icompanyRepository.findById(companyId).orElseThrow(() -> new RuntimeException("Invalid company ID!!!"));
 		return mapper.map(company, CompanyDto.class);
 	}
     
     
     }

    
 

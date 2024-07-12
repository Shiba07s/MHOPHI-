package com.mhophi.MHOPHI.services;

import com.mhophi.MHOPHI.payload.WorkstationDto;
import com.mhophi.MHOPHI.response.PaginationResponse;

public interface WorkstationService {

//	String createWorkstation(WorkstationDto workstationDto);
//	
//	List<WorkstationDto> getAllWorkstations();
	
//	List<WorkstationDto> getAllWorkstations();
    WorkstationDto getWorkstationById(Integer id);
    WorkstationDto createWorkstation(WorkstationDto workstationDto);
    PaginationResponse getAllWorkstations(Integer pageNumber,Integer pageSize, String sortBy, String sortDir) ;
	void deleteWorkstation(Integer workstationId);
}
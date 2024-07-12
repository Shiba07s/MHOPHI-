package com.mhophi.MHOPHI.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mhophi.MHOPHI.payload.WorkstationDto;
import com.mhophi.MHOPHI.request.WorkstationConstants;
import com.mhophi.MHOPHI.response.PaginationResponse;
import com.mhophi.MHOPHI.services.WorkstationService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/workstations")
public class WorkstationController {

	  @Autowired
	    private WorkstationService workstationService;

	  @PostMapping("/create")
	    public ResponseEntity<WorkstationDto> createWorkstation(@RequestBody WorkstationDto workstationDto) {
	        WorkstationDto createdWorkstation = workstationService.createWorkstation(workstationDto);
	        return new ResponseEntity<>(createdWorkstation, HttpStatus.CREATED);
	    }

	    @GetMapping
	    public ResponseEntity<PaginationResponse> getAllWorkstations(
	    		@RequestParam(value = "pageNumber", defaultValue = WorkstationConstants.PAGE_NUMBER, required = false) Integer pageNumber,
				@RequestParam(value = "pageSize", defaultValue = WorkstationConstants.PAGE_SIZE, required = false) Integer pageSize,
				@RequestParam(value = "sortBy", defaultValue = WorkstationConstants.SORT_BY, required = false) String sortBy,
				@RequestParam(value = "sortDir", defaultValue = WorkstationConstants.SORT_DIR, required = false) String sortDir) {
	        PaginationResponse allWorkstations = workstationService.getAllWorkstations(pageNumber, pageSize, sortBy, sortDir);
	        return ResponseEntity.ok(allWorkstations);
	    }
//	    @GetMapping
//	    public ResponseEntity<List<WorkstationDto>> getAllWorkstations() {
//	    	List<WorkstationDto> workstations = workstationService.getAllWorkstations();
//	    	return ResponseEntity.ok(workstations);
//	    }

	    @GetMapping("/{id}")
	    public ResponseEntity<WorkstationDto> getWorkstationById(@PathVariable Integer id) {
	        WorkstationDto workstation = workstationService.getWorkstationById(id);
	        return ResponseEntity.ok(workstation);
	    }
	    
	    @DeleteMapping("/delete/{workstationId}")
	    public ResponseEntity<WorkstationDto> deleteByWorkstaion(@PathVariable Integer workstationId){
	    	workstationService.deleteWorkstation(workstationId);
			return ResponseEntity.noContent().build();
	    	
	    }
}
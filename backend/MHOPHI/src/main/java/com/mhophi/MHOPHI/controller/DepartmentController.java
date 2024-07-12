package com.mhophi.MHOPHI.controller;

import java.util.List;

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

import com.mhophi.MHOPHI.exception.DepartmentNotFoundException;
import com.mhophi.MHOPHI.payload.DepartmentConstants;
import com.mhophi.MHOPHI.payload.DepartmentDto;
import com.mhophi.MHOPHI.response.DepartmentNameDto;
import com.mhophi.MHOPHI.response.PaginationResponse;
import com.mhophi.MHOPHI.services.DepartmentService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/department")
public class DepartmentController {
	
	@Autowired
	private DepartmentService departmentService;
	
	@PostMapping("/create")
	public ResponseEntity<DepartmentDto> createNewDepartments(@RequestBody DepartmentDto departmentDto){
		DepartmentDto createNewDepartment = departmentService.createNewDepartment(departmentDto);
		return new ResponseEntity<DepartmentDto>(createNewDepartment,HttpStatus.CREATED);
		
	}
	
//	@GetMapping
//	public ResponseEntity<List<DepartmentDto>> getAllDeaprtments(){
//		List<DepartmentDto> allDepartmentList = departmentService.getAllDepartmentList();
//		return new ResponseEntity<List<DepartmentDto>>(allDepartmentList,HttpStatus.OK);
//	}
	
    @GetMapping
    public ResponseEntity<PaginationResponse> getAllSupplierMasters(
            @RequestParam(value = "pageNumber", defaultValue = DepartmentConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = DepartmentConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(value = "sortBy", defaultValue = DepartmentConstants.SORT_BY, required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = DepartmentConstants.SORT_DIR, required = false) String sortDir) {

  PaginationResponse allDepartmentList = departmentService.getAllDepartmentList(pageNumber, pageSize, sortBy, sortDir);
        return new ResponseEntity<>(allDepartmentList, HttpStatus.OK);
    }
	
    @GetMapping("/names")
    public ResponseEntity<List<DepartmentNameDto>> getAllDepartmentNames() {
        List<DepartmentNameDto> departmentNames = departmentService.getAllDepartmentNames();
        return ResponseEntity.ok().body(departmentNames);
    }

//	 public ResponseEntity<?> deleteDepartments(@PathVariable Integer departmentId){
//		 departmentService.deleteDepartments(departmentId);
//		return ResponseEntity.ok().build();
//	 }
	 
	  @DeleteMapping("/{departmentId}")
		 public ResponseEntity<?> deleteDepartment(@PathVariable Integer departmentId){
	        try {
				departmentService.deleteDepartments(departmentId);
			} catch (DepartmentNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	        return ResponseEntity.ok().build();
	    }

}

package com.mhophi.MHOPHI.services;

import java.util.List;

import com.mhophi.MHOPHI.exception.DepartmentNotFoundException;
import com.mhophi.MHOPHI.payload.DepartmentDto;
import com.mhophi.MHOPHI.response.DepartmentNameDto;
import com.mhophi.MHOPHI.response.PaginationResponse;

public interface DepartmentService {
	
	DepartmentDto createNewDepartment(DepartmentDto departmentDto);
	
//	List<DepartmentDto> getAllDepartmentList();
	
	PaginationResponse getAllDepartmentList(Integer pageNumber, Integer pageSize, String sortBy, String sortDir);
	
	 List<DepartmentNameDto> getAllDepartmentNames() ;
	 
	 void deleteDepartments(Integer departmentId) throws DepartmentNotFoundException;

}

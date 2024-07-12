package com.mhophi.MHOPHI.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.mhophi.MHOPHI.entities.Department;
import com.mhophi.MHOPHI.exception.DepartmentNotFoundException;
import com.mhophi.MHOPHI.mapper.DepartmentMapper;
import com.mhophi.MHOPHI.payload.DepartmentDto;
import com.mhophi.MHOPHI.repositories.DepartmentRepository;
import com.mhophi.MHOPHI.response.DepartmentNameDto;
import com.mhophi.MHOPHI.response.PaginationResponse;
import com.mhophi.MHOPHI.services.DepartmentService;

@Service
public class DepartmentServiceImpl implements DepartmentService {
	
	@Autowired
	private DepartmentRepository departmentRepository;

	@Override
	public DepartmentDto createNewDepartment(DepartmentDto departmentDto) {
		
		Department mapToDepartment = DepartmentMapper.mapToDepartment(departmentDto);
		
		mapToDepartment.setRecordStatus("Active");
		
		Department savedDepartment = departmentRepository.save(mapToDepartment);
		return DepartmentMapper.mapToDepartmentDto(savedDepartment);
	}

//	@Override
//	public List<DepartmentDto> getAllDepartmentList() {
//		List<Department> findAllDepartment = departmentRepository.findAll();
//		List<DepartmentDto> collect = findAllDepartment.stream().map((departments) -> DepartmentMapper.mapToDepartmentDto(departments)).collect(Collectors.toList());
//  		return collect;
//	}
	
	@Override
	public PaginationResponse getAllDepartmentList(Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
		Sort sort = Sort.by(sortDir.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy );
		Pageable pageable = PageRequest.of(pageNumber, pageSize,sort);
		Page<Department> pageDepartment = departmentRepository.findByRecordStatus("Active",pageable);
		
		List<DepartmentDto> collect = pageDepartment.stream().map((departments) -> DepartmentMapper.mapToDepartmentDto(departments)).collect(Collectors.toList());
		
		PaginationResponse paginationResponse = new PaginationResponse();
		paginationResponse.setContent(collect);
		paginationResponse.setPageNumber(pageDepartment.getNumber());
		paginationResponse.setPageSize(pageDepartment.getSize());
		paginationResponse.setTotalPages(pageDepartment.getTotalPages());
		paginationResponse.setTotalElements(pageDepartment.getTotalElements());
		paginationResponse.setLastPage(pageDepartment.isLast());
		return paginationResponse;
		
	}
	 
	
	@Override
	public List<DepartmentNameDto> getAllDepartmentNames() {
	    List<Department> departments = departmentRepository.findAll();
	    return departments.stream()
	            .filter(department -> "Active".equals(department.getRecordStatus())) // Only include active departments
	            .map(department -> new DepartmentNameDto(department.getDepartmentId(),
	            										 department.getDepartmentName()))
	            										 .collect(Collectors.toList());
	}


	@Override
	public void deleteDepartments(Integer departmentId) throws DepartmentNotFoundException {
	 Optional<Department> findByDepartmentId = departmentRepository.findById(departmentId);
		
		if (findByDepartmentId.isPresent()) {
			Department department = findByDepartmentId.get();
			department.setRecordStatus( "Inactive");
			departmentRepository.save(department);
 		} else {
			throw new DepartmentNotFoundException("Department not found with id: " + departmentId);
		}
		
		
	}

}

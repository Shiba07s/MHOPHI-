package com.mhophi.MHOPHI.mapper;

import com.mhophi.MHOPHI.entities.Department;
import com.mhophi.MHOPHI.payload.DepartmentDto;

public class DepartmentMapper {
	
	public static Department mapToDepartment(DepartmentDto departmentDto) {
        Department department = new Department();
        department.setDepartmentId(departmentDto.getDepartmentId());
        department.setCreatedAt(departmentDto.getCreatedAt());
        department.setDepartmentName(departmentDto.getDepartmentName());
        department.setDescription(departmentDto.getDescription());
        department.setRecordStatus(departmentDto.getRecordStatus());
        return department;
    }

    public static DepartmentDto mapToDepartmentDto(Department department) {
        DepartmentDto dto = new DepartmentDto();
        dto.setDepartmentId(department.getDepartmentId());
        dto.setCreatedAt(department.getCreatedAt());
        dto.setDepartmentName(department.getDepartmentName());
        dto.setDescription(department.getDescription());
        dto.setRecordStatus(department.getRecordStatus());
        return dto;
    }
}
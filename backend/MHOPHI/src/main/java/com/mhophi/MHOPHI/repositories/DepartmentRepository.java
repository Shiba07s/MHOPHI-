package com.mhophi.MHOPHI.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.mhophi.MHOPHI.entities.Department;

public interface DepartmentRepository extends JpaRepository<Department, Integer> {

	Page<Department> findByRecordStatus(String string, Pageable pageable);


}

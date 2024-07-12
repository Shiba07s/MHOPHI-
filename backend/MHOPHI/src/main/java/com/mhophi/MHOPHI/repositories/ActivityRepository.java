package com.mhophi.MHOPHI.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mhophi.MHOPHI.entities.Activity;
import com.mhophi.MHOPHI.entities.Department;

public interface ActivityRepository extends JpaRepository<Activity, Integer> {

	List<Activity> findByDepartment(Department department);

	Activity findByActivityName(String activityName);
	
//	 @Query("SELECT act FROM Activity act WHERE act.activityId <> 'All'")
//	    List<Activity> findByActivityId(@Param("All") String All);

}

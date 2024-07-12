package com.mhophi.MHOPHI.services;

import java.util.List;

import com.mhophi.MHOPHI.payload.ActivityDto;
import com.mhophi.MHOPHI.response.ActivityNameResponse;
import com.mhophi.MHOPHI.response.PaginationResponse;

public interface ActivityService {


//	List<ActivityDto> getAllActivities();
	 String createActivity(ActivityDto activityDto);
	 PaginationResponse getAllActivities(Integer pageNumber, Integer pageSize, String sortBy, String sortDir) ;
	 void deleteActivity(Integer activityId);
	 List<ActivityNameResponse> getActivityNameAndId();

}

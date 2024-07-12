package com.mhophi.MHOPHI.controller;

import java.util.List;

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

import com.mhophi.MHOPHI.payload.ActivityConstants;
import com.mhophi.MHOPHI.payload.ActivityDto;
import com.mhophi.MHOPHI.response.ActivityNameResponse;
import com.mhophi.MHOPHI.response.PaginationResponse;
import com.mhophi.MHOPHI.services.ActivityService;

import lombok.RequiredArgsConstructor;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/activities")
public class ActivityController {

    private final ActivityService activityService;

    @PostMapping("/create")
    public ResponseEntity<String> createActivity(@RequestBody ActivityDto activityDto) {
        String response = activityService.createActivity(activityDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

//    @GetMapping
//    public ResponseEntity<List<ActivityDto>> getAllActivities() {
//        List<ActivityDto> activities = activityService.getAllActivities();
//        return ResponseEntity.ok(activities);
//    }
//    
    @GetMapping
	public ResponseEntity<PaginationResponse> getAllActivities(
			@RequestParam(value = "pageNumber", defaultValue = ActivityConstants.PAGE_NUMBER, required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", defaultValue = ActivityConstants.PAGE_SIZE, required = false) Integer pageSize,
			@RequestParam(value = "sortBy", defaultValue = ActivityConstants.SORT_BY, required = false) String sortBy,
			@RequestParam(value = "sortDir", defaultValue = ActivityConstants.SORT_DIR, required = false) String sortDir) {
		PaginationResponse allActivitiesList = activityService.getAllActivities(pageNumber, pageSize, sortDir, sortBy);
		return new ResponseEntity<>(allActivitiesList, HttpStatus.OK);
	}
    
    @DeleteMapping("/{activityId}")
    public ResponseEntity<Void> deleteActivity(@PathVariable Integer activityId) {
        activityService.deleteActivity(activityId);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/names")
    public ResponseEntity<List<ActivityNameResponse>> getActivityname(){
    	List<ActivityNameResponse> activityNameAndId = activityService.getActivityNameAndId();
		return new ResponseEntity<>(activityNameAndId,HttpStatus.OK);
    }
 
}

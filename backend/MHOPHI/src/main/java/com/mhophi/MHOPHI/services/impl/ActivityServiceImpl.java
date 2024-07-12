package com.mhophi.MHOPHI.services.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.mhophi.MHOPHI.entities.Activity;
import com.mhophi.MHOPHI.entities.Department;
import com.mhophi.MHOPHI.exception.ResourceNotFoundException;
import com.mhophi.MHOPHI.payload.ActivityDto;
import com.mhophi.MHOPHI.payload.DepartmentDto;
import com.mhophi.MHOPHI.repositories.ActivityRepository;
import com.mhophi.MHOPHI.repositories.DepartmentRepository;
import com.mhophi.MHOPHI.response.ActivityNameResponse;
import com.mhophi.MHOPHI.response.PaginationResponse;
import com.mhophi.MHOPHI.services.ActivityService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ActivityServiceImpl implements ActivityService {

    private final ActivityRepository activityRepository;
    private final DepartmentRepository departmentRepository;
    
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private HttpServletRequest request;

    @Override
    public String createActivity(ActivityDto activityDto) {
        try {
            // Check if the activity name already exists
            Activity existingActivity = activityRepository.findByActivityName(activityDto.getActivityName());
            if (existingActivity != null) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Activity name already exists");
            }

       

            // Find the department by ID
            Department department = departmentRepository.findById(activityDto.getDepartment().get(0).getDepartmentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Department not found"));

            Activity newActivity = new Activity();
            newActivity.setActivityName(activityDto.getActivityName());
            newActivity.setDescription(activityDto.getDescription());
            newActivity.setCreatedAt(LocalDateTime.now());
            newActivity.setDepartment(department);

            Activity savedActivity = activityRepository.save(newActivity);

            return "Activity created successfully";
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An unexpected error occurred", e);
        }
    }


@Override
public PaginationResponse getAllActivities(Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
    Sort sort = Sort.by(sortDir.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC,  "activityName");
    Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
    Page<Activity> pageActivities = activityRepository.findAll(pageable);

    List<ActivityDto> activityDtos = pageActivities.stream()
            .map(activity -> {
                ActivityDto activityDto = modelMapper.map(activity, ActivityDto.class);
                activityDto.setDepartment(List.of(modelMapper.map(activity.getDepartment(), DepartmentDto.class)));
                return activityDto;
            })
            .collect(Collectors.toList());

    PaginationResponse paginationResponse = new PaginationResponse();
    paginationResponse.setContent(activityDtos);
    paginationResponse.setPageNumber(pageActivities.getNumber());
    paginationResponse.setPageSize(pageActivities.getSize());
    paginationResponse.setTotalPages(pageActivities.getTotalPages());
    paginationResponse.setTotalElements(pageActivities.getTotalElements());
    paginationResponse.setLastPage(pageActivities.isLast());

    return paginationResponse;
}

@Override
public void deleteActivity(Integer activityId) {
    Activity activity = activityRepository.findById(activityId)
            .orElseThrow(() -> new ResourceNotFoundException("Activity not found with id: " + activityId));

    activityRepository.delete(activity);
}


@Override
public List<ActivityNameResponse> getActivityNameAndId() {
	List<Activity> activities = activityRepository.findAll();
	return activities.stream().map(activity -> modelMapper.map(activity, ActivityNameResponse.class)).collect(Collectors.toList());
}

//    private ActivityDto mapToActivityDto(Activity activity) {
//        ActivityDto activityDto = modelMapper.map(activity, ActivityDto.class);
//        activityDto.setDepartment(List.of(modelMapper.map(activity.getDepartment(), DepartmentDto.class)));
//        return activityDto;
//    }
}

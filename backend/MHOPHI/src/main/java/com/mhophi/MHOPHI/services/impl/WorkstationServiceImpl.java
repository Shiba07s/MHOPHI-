package com.mhophi.MHOPHI.services.impl;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.mhophi.MHOPHI.entities.Activity;
import com.mhophi.MHOPHI.entities.Workstation;
import com.mhophi.MHOPHI.exception.ResourceNotFoundException;
import com.mhophi.MHOPHI.payload.ActivityDto;
import com.mhophi.MHOPHI.payload.WorkstationDto;
import com.mhophi.MHOPHI.repositories.ActivityRepository;
import com.mhophi.MHOPHI.repositories.WorkstationRepository;
import com.mhophi.MHOPHI.response.PaginationResponse;
import com.mhophi.MHOPHI.services.WorkstationService;

@Service
public class WorkstationServiceImpl implements WorkstationService {

	@Autowired
	private WorkstationRepository workstationRepository;

	@Autowired
	private ActivityRepository activityRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public WorkstationDto createWorkstation(WorkstationDto workstationDto) {
		Workstation workstation = modelMapper.map(workstationDto, Workstation.class);

		// Set the activities
		Set<Activity> activities = new HashSet<>();
		if (workstationDto.getActivities() != null) {
			for (ActivityDto activityDto : workstationDto.getActivities()) {
				Activity activity = activityRepository.findById(activityDto.getActivityId())
						.orElseThrow(() -> new ResourceNotFoundException("Activity not found"));
				activities.add(activity);
			}
		}
		workstation.setCreatedAt(new Date());
		workstation.setStatus("Running");
		workstation.setActivities(activities);

		Workstation savedWorkstation = workstationRepository.save(workstation);
		return modelMapper.map(savedWorkstation, WorkstationDto.class);
	}

	public WorkstationDto getWorkstationById(Integer id) {
		Workstation workstation = workstationRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Workstation not found"));
		return modelMapper.map(workstation, WorkstationDto.class);
	}

//	@Override
//	public List<WorkstationDto> getAllWorkstations() {
//		List<Workstation> workstations = workstationRepository.findAll();
//		return workstations.stream().map(workstation -> modelMapper.map(workstation, WorkstationDto.class))
//				.collect(Collectors.toList());
//	}

	@Override
	public PaginationResponse getAllWorkstations(Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {

		Sort sort = Sort.by(sortDir.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);
		Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
		Page<Workstation> pageWorkstation = workstationRepository.findAll(pageable);

		List<WorkstationDto> collect = pageWorkstation.stream()
				.map(workstation -> modelMapper.map(workstation, WorkstationDto.class)).collect(Collectors.toList());

		PaginationResponse paginationResponse = new PaginationResponse();
		paginationResponse.setContent(collect);
		paginationResponse.setPageNumber(pageWorkstation.getNumber());
		paginationResponse.setPageSize(pageWorkstation.getSize());
		paginationResponse.setTotalElements(pageWorkstation.getTotalElements());
		paginationResponse.setLastPage(pageWorkstation.isLast());

		return paginationResponse;
	}

	@Override
	public void deleteWorkstation(Integer workstationId) {
		Workstation workstations = workstationRepository.findById(workstationId).orElseThrow(() -> new ResourceNotFoundException( "Workstation Not Found With This id: "+workstationId));
 		workstationRepository.delete(workstations);
	}

}

//public WorkstationDto createWorkstation(WorkstationDto workstationDto) {
//Workstation workstation = modelMapper.map(workstationDto, Workstation.class);
//
//// Fetch and set managed Activity entities
//Set<Activity> activities = workstation.getActivities().stream()
//      .map(activity -> activityRepository.findById(activity.getActivityId())
//              .orElseThrow(() -> new ResourceNotFoundException("Activity not found")))
//      .collect(Collectors.toSet());
//
//workstation.setActivities(activities);
//
//Workstation savedWorkstation = workstationRepository.save(workstation);
//return modelMapper.map(savedWorkstation, WorkstationDto.class);
//}

//@Override
//public List<WorkstationDto> getAllWorkstations() {
//List<Workstation> workstations = workstationRepository.findAll();
//return workstations.stream()
//  .map(workstation -> {
//      WorkstationDto workstationDto = modelMapper.map(workstation, WorkstationDto.class);
//      workstationDto.setActivities(workstation.getActivities().stream()
//          .map(activity -> modelMapper.map(activity, ActivityDto.class))
//          .collect(Collectors.toSet()));
//      return workstationDto;
//  })
//  .collect(Collectors.toList());
//}
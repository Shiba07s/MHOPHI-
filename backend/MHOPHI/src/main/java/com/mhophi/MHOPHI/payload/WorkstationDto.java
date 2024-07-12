package com.mhophi.MHOPHI.payload;

import java.util.Date;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkstationDto {

	private Integer workstationId;
	private Date createdAt;
	private String workstationName;
	private String description;
	private String status;
	private Set<ActivityDto> activities;
	
}
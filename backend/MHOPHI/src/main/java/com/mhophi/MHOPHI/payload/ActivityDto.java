package com.mhophi.MHOPHI.payload;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActivityDto {
    private Integer activityId;
    private LocalDateTime createdAt;
    private String activityName;
    private String description;
    private List<DepartmentDto>department;
//    private Set<WorkstationDto> workstations;
}

 

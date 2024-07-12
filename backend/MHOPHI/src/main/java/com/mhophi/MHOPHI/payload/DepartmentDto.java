package com.mhophi.MHOPHI.payload;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class DepartmentDto {
    private Integer departmentId;
    private LocalDateTime createdAt;
    private String departmentName;
    private String description;
    private String recordStatus;
//    private int organisationDetailsId;
}
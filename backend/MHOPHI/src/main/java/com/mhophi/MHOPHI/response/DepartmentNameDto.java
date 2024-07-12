package com.mhophi.MHOPHI.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DepartmentNameDto {
    private Integer departmentId;
    private String departmentName;
}

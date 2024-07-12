package com.mhophi.MHOPHI.payload;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductionLineDto {

    private Integer productionlineId;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
    private Date createdAt;
    private String productionLineName;
    private String description;
    private Integer organisationDetailsId;
    private String recordStatus;

    private Set<ProductDto> products= new HashSet<>();
}

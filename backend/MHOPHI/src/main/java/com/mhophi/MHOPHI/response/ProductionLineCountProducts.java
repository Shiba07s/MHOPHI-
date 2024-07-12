package com.mhophi.MHOPHI.response;

import java.util.Date;

import lombok.Data;

@Data
public class ProductionLineCountProducts {
    private Integer productionlineId;
    private Date createdAt;
    private String productionLineName;
    private String description;
    private Integer organisationDetailsId;
    private int products; // Change to int to hold the count of products
}

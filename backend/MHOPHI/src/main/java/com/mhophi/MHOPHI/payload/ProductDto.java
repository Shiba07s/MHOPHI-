package com.mhophi.MHOPHI.payload;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {

    private Integer productId;
    private LocalDateTime createdAt;
    private String name;
    private String description;
    private String variance;
    private String category;
    private String productFamily;
    private String baseUnit;
    private String additionalUnit;
    private BigDecimal conversionFactor;
    private BigDecimal costOfProduction;
    private BigDecimal lastSoldPrice;
    private BigDecimal lastOfferedPrice;
    private BigDecimal weightedAveragePrice;
    private BigDecimal averageOfferPrice;
    private String priceCurrency;
    private Integer organisationDetailsId;
    private Integer productAttributes;
    private String recordStatus;
 
}

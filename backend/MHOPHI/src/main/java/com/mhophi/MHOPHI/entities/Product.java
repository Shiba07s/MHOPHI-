package com.mhophi.MHOPHI.entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(exclude = "productionLines")

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="product_id")
    private Integer productId;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "product_name", length = 255)
    private String productName;

    @Column(name = "description", length = 255)
    private String description;

    @Column(name = "variance", length = 255)
    private String variance;

    @Column(name = "category", length = 255)
    private String category;

    @Column(name = "productFamily", length = 255)
    private String productFamily;

    @Column(name = "baseUnit", length = 255)
    private String baseUnit;

    @Column(name = "additionalUnit", length = 255)
    private String additionalUnit;

    @Column(name = "conversionFactor", precision = 60, scale = 5)
    private BigDecimal conversionFactor;

    @Column(name = "costOfProduction", precision = 60, scale = 5)
    private BigDecimal costOfProduction;

    @Column(name = "lastSoldPrice", precision = 60, scale = 5)
    private BigDecimal lastSoldPrice;

    @Column(name = "lastOfferedPrice", precision = 60, scale = 5)
    private BigDecimal lastOfferedPrice;

    @Column(name = "weightedAveragePrice", precision = 60, scale = 5)
    private BigDecimal weightedAveragePrice;

    @Column(name = "averageOfferPrice", precision = 60, scale = 5)
    private BigDecimal averageOfferPrice;

    @Column(name = "priceCurrency", length = 255)
    private String priceCurrency;

    @Column(name = "organisation_details_id")
    private Integer organisationDetailsId;

    @Column(name = "product_attributes")
    private Integer productAttributes;
    
    @Column(name = "record_status")
    private String recordStatus;
    
    @ManyToMany(mappedBy = "products",cascade = CascadeType.ALL)
    private Set<ProductionLine> productionlines = new HashSet<>();
}
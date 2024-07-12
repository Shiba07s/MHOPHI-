package com.mhophi.MHOPHI.entities;

import jakarta.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(exclude = "products")

@Entity
@Table(name = "production_lines")
public class ProductionLine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "productionline_id")
    private Integer productionlineId;

    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(name = "production_line_name", length = 255)
    private String productionLineName;

    @Column(name = "description", length = 255)
    private String description;

    @Column(name = "organisation_details_id")
    private Integer organisationDetailsId;
    
    @Column(name = "record_status")
    private String recordStatus;
    
    @ManyToMany( cascade = CascadeType.ALL)
    @JoinTable(
        name = "product_production_lines",
        joinColumns = @JoinColumn(name = "productionline_id", referencedColumnName = "productionline_id"),
        inverseJoinColumns = @JoinColumn(name = "product_id", referencedColumnName = "product_id")
    )
    private Set<Product> products = new HashSet<>();
}

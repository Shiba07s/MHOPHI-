package com.mhophi.MHOPHI.entities;

import java.time.LocalDateTime;

import ch.qos.logback.classic.spi.Configurator.ExecutionStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "order_products")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "organisation_details_id")
    private String organisationDetailsId;

    @Column(name = "orderNumber")
    private String orderNumber;

    @Column(name = "products_id")
    private String productsId;

    @Column(name = "quantity")
    private String quantity;

     @Column(name = "orderStatus")
    private String orderStatus="UNALLOCATED";

     @Column(name = "trackingStatus")
    private String trackingStatus="PENDING";

     @Column(name = "executionStatus")
    private String executionStatus="NOTSTARTED";
    
}

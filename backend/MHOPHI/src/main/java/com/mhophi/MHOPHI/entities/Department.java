package com.mhophi.MHOPHI.entities;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "departments")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "department_id")
    private Integer departmentId;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "department_name", length = 255)
    private String departmentName;

    @Column(name = "description", length = 255)
    private String description;
    
    @Column(name="record_status")
    private String recordStatus;
    
    @OneToMany(mappedBy = "department", fetch = FetchType.LAZY)
    private List<Activity> activities;

//    @ManyToOne
//    @JoinColumn(name = "organisation_details_id")
//    private OrganisationDetails organisationDetails;

}
package com.mhophi.MHOPHI.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mhophi.MHOPHI.entities.Workstation;

public interface WorkstationRepository extends JpaRepository<Workstation, Integer> {

    Workstation findByWorkstationName(String workstationName);

}

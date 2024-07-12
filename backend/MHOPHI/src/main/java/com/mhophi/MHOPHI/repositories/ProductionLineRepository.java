package com.mhophi.MHOPHI.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mhophi.MHOPHI.entities.ProductionLine;

public interface ProductionLineRepository extends JpaRepository<ProductionLine, Integer> {

    @Query("SELECT DISTINCT pl FROM ProductionLine pl LEFT JOIN FETCH pl.products")
	    List<ProductionLine> findAllWithProducts();
}

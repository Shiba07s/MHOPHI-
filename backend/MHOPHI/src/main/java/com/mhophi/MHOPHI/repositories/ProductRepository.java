package com.mhophi.MHOPHI.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mhophi.MHOPHI.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

}

package com.mhophi.MHOPHI.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mhophi.MHOPHI.entities.Order;

 
public interface OrderRepository extends JpaRepository<Order, Integer> {

}

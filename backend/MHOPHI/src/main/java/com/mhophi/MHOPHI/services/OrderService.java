package com.mhophi.MHOPHI.services;

import java.util.List;

import com.mhophi.MHOPHI.entities.Order;

public interface OrderService {
	
	Order createOrders(Order order);
	
	List<Order> getOrdersDetails();

}

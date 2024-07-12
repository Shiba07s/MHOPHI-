package com.mhophi.MHOPHI.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mhophi.MHOPHI.entities.Order;
import com.mhophi.MHOPHI.entities.Product;
import com.mhophi.MHOPHI.services.OrderService;
import com.mhophi.MHOPHI.services.ProductService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	
	@PostMapping("/create")
	public ResponseEntity<Order> createNewOrders(@RequestBody Order order){
		  Order createOrders = orderService.createOrders(order);
		return new ResponseEntity<>(createOrders,HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<Order>> getAllOrderDetails(){
	 List<Order> ordersDetails = orderService.getOrdersDetails();
		return new ResponseEntity<List<Order>>(ordersDetails,HttpStatus.OK);
	}

}
package com.mhophi.MHOPHI.services;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mhophi.MHOPHI.entities.Order;
import com.mhophi.MHOPHI.repositories.OrderRepository;

@Service
public class OrderServiceImpl implements OrderService {

	@Autowired
	private OrderRepository orderRepository;
	
    private static final AtomicInteger counter = new AtomicInteger(1);  


	@Override
	public Order createOrders(Order orders) {
// 		String monthYear = DateTimeFormatter.ofPattern("MM/yyyy").format(LocalDate.now());
//		String orderNumber = String.format("IOO-%s-%d", monthYear, counter.getAndIncrement());

		String monthYear = DateTimeFormatter.ofPattern("MM/YYYY").format(LocalDate.now());
		String orderNumber = String.format("IOO-%s-%d", monthYear,counter.getAndIncrement());
		
		orders.setOrderNumber(orderNumber);
		return orderRepository.save(orders);
	}

	@Override
	public List<Order> getOrdersDetails() {
		// TODO Auto-generated method stub
		return orderRepository.findAll();
	}

}

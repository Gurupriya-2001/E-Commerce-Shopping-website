package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.crud.error.OrderNotFoundException;
import com.example.demo.model.Order;
import com.example.demo.repository.OrderRepository;

@Service
public  class OrderServiceImpl implements OrderService {

	@Autowired
	OrderRepository orderRepository;

	@Override
	public Order saveOrder(Order order) {
		return orderRepository.save(order);

	}

	@Override
	public Order getOrderById(long id) {
		Optional<Order> orderDb = orderRepository.findById(id);

		if (orderDb.isPresent()) {
			Order order = orderDb.get();
			return order;
		} else {
			throw new OrderNotFoundException("order not found");
		}
	}

	@Override
	public List<Order> getOrders() {
		return orderRepository.findAll();
	}

	@Override
	public Order updateOrder(Order order) {
		Optional<Order> orderDb = orderRepository.findById(order.getOrderId());

		if (orderDb.isPresent()) {
			Order orderUpdate = orderDb.get();
			orderUpdate.setOrderDate(order.getOrderDate());
		    orderUpdate.setStatus(order.getStatus());
		    orderUpdate.setTotalAmount(order.getTotalAmount());
			orderRepository.save(orderUpdate);
			return orderUpdate;
		} else {
			throw new OrderNotFoundException("Order not found");
		}
	}

	@Override
	public void deleteOrder(long id) {
		Optional<Order> orderDb = orderRepository.findById(id);

		if (orderDb.isPresent()) {
			orderRepository.delete(orderDb.get());
		} else {
			throw new OrderNotFoundException("Order not found");
		}
	}

	
}


	package com.example.demo.controller;

	import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Order;
import com.example.demo.service.OrderService;

	@RestController
	public class OrderController {
		@Autowired
	    OrderService orderService;

		@PostMapping("/order")
		public ResponseEntity<Order> saveProduct(@RequestBody Order order) {
			return ResponseEntity.ok().body(orderService.saveOrder(order));
		}

		@GetMapping("/order/{id}") // http://localhost:9000/employee/1
		public ResponseEntity<Order> getOrderById(@PathVariable long id) {
			return ResponseEntity.ok().body(orderService.getOrderById(id));
		}

		@GetMapping("/orders")
		public ResponseEntity<List<Order>> getOrders() {
			return ResponseEntity.ok().body(orderService.getOrders());
		}

		@PutMapping("/order/{id}")
		public ResponseEntity<Order> updateOrder(@PathVariable long id, @RequestBody Order order) {
			order.setOrderId(id);
			return ResponseEntity.ok().body(orderService.updateOrder(order));
		}

		@DeleteMapping("/order/{id}")
		public ResponseEntity<String> deleteOrder(@PathVariable long id) {
			orderService.deleteOrder(id);
			return ResponseEntity.ok().body("Order deleted");
		}
	}

	


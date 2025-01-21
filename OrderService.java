package com.example.demo.service;

import java.util.List;

import com.example.demo.model.Order;

public interface OrderService 
{
   public Order saveOrder(Order order);
   public Order getOrderById(long id);
   public List<Order> getOrders();
   public Order updateOrder(Order order);
   public void deleteOrder(long id);
}

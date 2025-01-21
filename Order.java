package com.example.demo.model;


import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="orders")
public class Order 
{
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name="order_id")
    private long orderId;

    @Column(name="order_date")
    private Date orderDate;

    @Column(name="status")
    private String Status;

    
    @Column(name="total_amount")
    private double TotalAmount;


	public long getOrderId() {
		return orderId;
	}


	public void setOrderId(long orderId) {
		this.orderId = orderId;
	}


	public Date getOrderDate() {
		return orderDate;
	}


	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}


	public String getStatus() {
		return Status;
	}


	public void setStatus(String status) {
		Status = status;
	}


	public double getTotalAmount() {
		return TotalAmount;
	}


	public void setTotalAmount(double totalAmount) {
		TotalAmount = totalAmount;
	}
    
   


	
    
}

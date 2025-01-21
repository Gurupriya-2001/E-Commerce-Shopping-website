package com.example.demo.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="product")
public class Product 
{
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name="product_id")
    private long productId;

    @Column(name="category")
    private String category;

    @Column(name="name")
    private String name;

    @Column(name="description")
    private String description;
    
    @Column(name="image_url")
    private String imageurl;
    
    @Column(name="price")
    private double price;
    
    @Column(name="stock_quantity")
    private int stockquantity;


	public long getProductId() {
		return productId;
	}
	public void setProductId(long productId) {
		this.productId = productId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public  String getCategory()
	{
		return category;
	}
	public void setCategory(String category)
	{
		this.category=category;
	}
	public double getPrice() {
		return price;
	}
	public void setSalary(double price) {
		this.price = price;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	public String getImageUrl() {
		return imageurl;
	}
	public void setImageUrl(String imageurl) {
		this.imageurl = imageurl;
	}
	public int getStockQuantity()
	{
		return stockquantity;
	}
	public void setStockQuantity(int stockquantity)
	{
		this.stockquantity=stockquantity;
	}
    
}

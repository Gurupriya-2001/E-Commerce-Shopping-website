package com.example.demo.service;

import java.util.List;

import com.example.demo.model.Product;

public interface ProductService 
{
   public Product saveProduct(Product product);
   public Product getProductById(long id);
   public List<Product> getProducts();
   public Product updateProduct(Product product);
   public void deleteProduct(long id);
}

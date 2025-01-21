package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Product;
import com.example.demo.crud.error.ProductNotFoundException;
import com.example.demo.repository.ProductRepository;

@Service
public  class ProductServiceImpl implements ProductService {

	@Autowired
	ProductRepository productRepository;

	@Override
	public Product saveProduct(Product product) {
		return productRepository.save(product);

	}

	@Override
	public Product getProductById(long id) {
		Optional<Product> productDb = productRepository.findById(id);

		if (productDb.isPresent()) {
			Product product = productDb.get();
			return product;
		} else {
			throw new ProductNotFoundException("product not found");
		}
	}

	@Override
	public List<Product> getProducts() {
		return productRepository.findAll();
	}

	@Override
	public Product updateProduct(Product product) {
		Optional<Product> productDb = productRepository.findById(product.getProductId());

		if (productDb.isPresent()) {
			Product productUpdate = productDb.get();
			productUpdate.setStockQuantity(product.getStockQuantity());
		    productUpdate.setName(product.getName());
		    productUpdate.setCategory(product.getCategory());
		    productUpdate.setDescription(product.getDescription());
		    productUpdate.setImageUrl(product.getImageUrl());
			productRepository.save(productUpdate);
			return productUpdate;
		} else {
			throw new ProductNotFoundException("Product not found");
		}
	}

	@Override
	public void deleteProduct(long id) {
		Optional<Product> productDb = productRepository.findById(id);

		if (productDb.isPresent()) {
			productRepository.delete(productDb.get());
		} else {
			throw new ProductNotFoundException("Product not found");
		}
	}

}

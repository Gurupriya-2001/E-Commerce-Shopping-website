
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

	import com.example.demo.model.Product;
	import com.example.demo.service.ProductService;

	@RestController
	public class ProductController {
		@Autowired
	    ProductService productService;

		@PostMapping("/product")
		public ResponseEntity<Product> saveProduct(@RequestBody Product product) {
			return ResponseEntity.ok().body(productService.saveProduct(product));
		}

		@GetMapping("/product/{id}") // http://localhost:9000/employee/1
		public ResponseEntity<Product> getProductById(@PathVariable long id) {
			return ResponseEntity.ok().body(productService.getProductById(id));
		}

		@GetMapping("/products")
		public ResponseEntity<List<Product>> getProducts() {
			return ResponseEntity.ok().body(productService.getProducts());
		}

		@PutMapping("/product/{id}")
		public ResponseEntity<Product> updateProduct(@PathVariable long id, @RequestBody Product product) {
			product.setProductId(id);
			return ResponseEntity.ok().body(productService.updateProduct(product));
		}

		@DeleteMapping("/product/{id}")
		public ResponseEntity<String> deleteProduct(@PathVariable long id) {
			productService.deleteProduct(id);
			return ResponseEntity.ok().body("Product deleted");
		}
	}

	


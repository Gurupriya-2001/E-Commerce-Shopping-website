
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

import com.example.demo.model.Address;
import com.example.demo.service.AddressService;

	@RestController
	public class AddressController {
		@Autowired
	    AddressService addressService;

		@PostMapping("/address")
		public ResponseEntity<Address> saveAddress(@RequestBody Address address) {
			return ResponseEntity.ok().body(addressService.saveAddress(address));
		}

		@GetMapping("/address/{id}")
		public ResponseEntity<Object> getAddressById(@PathVariable long id) {
			return ResponseEntity.ok().body(addressService.getAddressById(id));
		}

		@GetMapping("/addresses")
		public ResponseEntity<List<Address>> getAddresses() {
			return ResponseEntity.ok().body(addressService.getAddresses());
		}

		@PutMapping("/address/{id}")
		public ResponseEntity<Address> updateAddress(@PathVariable long id, @RequestBody Address address) {
			address.setAddressId(id);
			return ResponseEntity.ok().body(addressService.updateAddress(address));
		}

		@DeleteMapping("/address/{id}")
		public ResponseEntity<String> deleteOrder(@PathVariable long id) {
			addressService.deleteAddress(id);
			return ResponseEntity.ok().body("Address deleted");
		}
	}

	


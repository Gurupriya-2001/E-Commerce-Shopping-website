package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Address;

import com.example.demo.repository.AddressRepository;

@Service
public  class AddressServiceImpl implements AddressService {

	@Autowired
	AddressRepository addressRepository;

	@Override
	public Address saveAddress(Address address) {
		return addressRepository.save(address);

	}

	@Override
	public Address getAddressById(long id) {
		Optional<Address> addressDb = addressRepository.findById(id);

			Address address = addressDb.get();
			return address;
	
	}

	@Override
	public List<Address> getAddresses() {
		return addressRepository.findAll();
	}

	@Override
	public Address updateAddress(Address address) {
		Optional<Address> addressDb = addressRepository.findById(address.getAddressId());

		
			Address addressUpdate = addressDb.get();
			addressUpdate.setPhoneNumber(address.getPhoneNumber());
		    addressUpdate.setName(address.getName());
		    addressUpdate.setPincode(address.getPincode());
		    addressUpdate.setArea(address.getArea());
		    addressUpdate.setEmail(address.getEmail());
		    addressUpdate.setLocality(address.getLocality());
		    addressUpdate.setState(address.getState());
		    addressUpdate.setTypeOfAddress(address.getTypeOfAddress());
			addressRepository.save(addressUpdate);
			return addressUpdate;
		
	}

	@Override
	public void deleteAddress(long id) {
		Optional<Address> addressDb = addressRepository.findById(id);

		
			addressRepository.delete(addressDb.get());
		
	}

	

}

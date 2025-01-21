package com.example.demo.service;

import java.util.List;

import com.example.demo.model.Address;

public interface AddressService 
{
   public Address saveAddress(Address address);
   public Address getAddressById(long id);
   public List<Address> getAddresses();
   public Address updateAddress(Address address);
   public void deleteAddress(long id);
}

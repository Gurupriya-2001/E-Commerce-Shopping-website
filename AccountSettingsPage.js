import React, { useState, useEffect } from 'react';
import AddressService from './AddressService';

const AddressComponent = () => {
    const [addresses, setAddresses] = useState([]);
    const [address, setAddress] = useState({
        addressId: '',
        name: '',
        phoneNumber: '',
        pincode: '',
        area: '',
        email: '',
        locality: '',
        state: '',
        typeOfAddress: ''
    });

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = () => {
        AddressService.getAddresses().then((response) => {
            setAddresses(response.data);
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress({ ...address, [name]: value });
    };

    const saveAddress = () => {
        AddressService.saveAddress(address).then(() => {
            fetchAddresses();
            clearForm();
        });
    };

    const updateAddress = () => {
        AddressService.updateAddress(address.addressId, address).then(() => {
            fetchAddresses();
            clearForm();
        });
    };

    const deleteAddress = (addressId) => {
        AddressService.deleteAddress(addressId).then(() => {
            fetchAddresses();
        });
    };

    const clearForm = () => {
        setAddress({
            addressId: '',
            name: '',
            phoneNumber: '',
            pincode: '',
            area: '',
            email: '',
            locality: '',
            state: '',
            typeOfAddress: ''
        });
    };

    const handleEdit = (address) => {
        setAddress(address);
    };
    return (
      <div className="container">
          <h2>Address Management</h2>
          <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={address.name}
                  onChange={handleChange}
              />
          </div>
          <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={address.phoneNumber}
                  onChange={handleChange}
              />
          </div>
          <div className="form-group">
              <label htmlFor="pincode">Pincode</label>
              <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  placeholder="Pincode"
                  value={address.pincode}
                  onChange={handleChange}
              />
          </div>
          <div className="form-group">
              <label htmlFor="area">Area</label>
              <input
                  type="text"
                  id="area"
                  name="area"
                  placeholder="Area"
                  value={address.area}
                  onChange={handleChange}
              />
          </div>
          <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={address.email}
                  onChange={handleChange}
              />
          </div>
          <div className="form-group">
              <label htmlFor="locality">Locality</label>
              <input
                  type="text"
                  id="locality"
                  name="locality"
                  placeholder="Locality"
                  value={address.locality}
                  onChange={handleChange}
              />
          </div>
          <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                  type="text"
                  id="state"
                  name="state"
                  placeholder="State"
                  value={address.state}
                  onChange={handleChange}
              />
          </div>
          <div className="form-group">
              <label htmlFor="typeOfAddress">Type of Address</label>
              <input
                  type="text"
                  id="typeOfAddress"
                  name="typeOfAddress"
                  placeholder="Type of Address"
                  value={address.typeOfAddress}
                  onChange={handleChange}
              />
          </div>
          <button onClick={saveAddress}>Save Address</button>
          <button className="update-btn" onClick={updateAddress}>Update Address</button>
  
          <h3>Addresses List</h3>
          <ul className="address-list">
              {addresses.map(address => (
                  <li key={address.addressId}>
                      {address.name} - {address.phoneNumber} - {address.pincode}
                      <div>
                          <button className="edit-btn" onClick={() => handleEdit(address)}>Edit</button>
                          <button className="delete-btn" onClick={() => deleteAddress(address.addressId)}>Delete</button>
                      </div>
                  </li>
              ))}
          </ul>
      </div>
  );
}
    

export default AddressComponent;

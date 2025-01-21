
package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="address")
public class Address
{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;

    @Column(name="name")
    private String Name;

    public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	@Column(name="phone_number")
    private Long phoneNumber;
    
    @Column(name="email")
    private String email;
   
   @Column(name="pin_code")
    private Long pincode;

    @Column(name="state")
    private String state;

    public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	@Column(name="area")
    private String area;

    @Column(name="locality")
    private String locality;

    @Column(name="typeofaddress")
    private String typeOfAddress;
	
  
    
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public Long getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(Long phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public Long getPincode() {
		return pincode;
	}
	public void setPincode(Long pincode) {
		this.pincode = pincode;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	public String getLocality() {
		return locality;
	}
	public void setLocality(String locality) {
		this.locality = locality;
	}
	public String getTypeOfAddress() {
		return typeOfAddress;
	}
	public void setTypeOfAddress(String typeOfAddress) {
		this.typeOfAddress = typeOfAddress;
	}
	public void setAddressId(long id2) {
		// TODO Auto-generated method stub
		
	}
	public Long getAddressId() {
		// TODO Auto-generated method stub
		return null;
	}


}

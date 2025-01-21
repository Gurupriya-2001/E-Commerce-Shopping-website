package com.example.demo.crud.error;

public class ProductNotFoundException extends RuntimeException
{
   	private static final long serialVersionUID = 1L;

	public ProductNotFoundException(){}

    public ProductNotFoundException(String message)
    {
         super(message);
    }
}

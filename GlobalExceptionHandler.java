package com.example.demo.crud.error;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler
{
     @ExceptionHandler(ProductNotFoundException.class) 
     public ResponseEntity<?> productNotFoundException(ProductNotFoundException exception)
     {
           return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_FOUND);
     }
     @ExceptionHandler(OrderNotFoundException.class)
     public ResponseEntity<?> orderNotFoundException(OrderNotFoundException exception)
     {
    	 return new ResponseEntity<>(exception.getMessage(),HttpStatus.NOT_FOUND);
     }
}

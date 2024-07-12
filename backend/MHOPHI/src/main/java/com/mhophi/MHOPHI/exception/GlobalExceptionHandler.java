package com.mhophi.MHOPHI.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

 @ExceptionHandler(DepartmentNotFoundException.class)
 public ResponseEntity<String> handleCustomException(DepartmentNotFoundException ex) {
     return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
 }
 @ExceptionHandler(ResourceNotFoundException.class)
 public ResponseEntity<String> handleCustomExceptionRNFE(ResourceNotFoundException rex) {
	 return new ResponseEntity<>(rex.getMessage(), HttpStatus.NOT_FOUND);
 }
}

package com.mhophi.MHOPHI.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mhophi.MHOPHI.entities.Product;
import com.mhophi.MHOPHI.payload.ActivityConstants;
import com.mhophi.MHOPHI.payload.ProductDto;
import com.mhophi.MHOPHI.payload.WorkstationDto;
import com.mhophi.MHOPHI.request.ProductConstants;
import com.mhophi.MHOPHI.response.PaginationResponse;
import com.mhophi.MHOPHI.services.ProductService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/products")
public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	@PostMapping("/create")
	public ResponseEntity<ProductDto> createNewProduct(@RequestBody ProductDto productDto){
		 ProductDto createNewProduct = productService.createNewProduct(productDto);
		return new ResponseEntity<>(createNewProduct,HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<PaginationResponse> getAllProductDetails(
			@RequestParam(value = "pageNumber", defaultValue = ProductConstants.PAGE_NUMBER, required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", defaultValue = ProductConstants.PAGE_SIZE, required = false) Integer pageSize,
			@RequestParam(value = "sortBy", defaultValue = ProductConstants.SORT_BY, required = false) String sortBy,
			@RequestParam(value = "sortDir", defaultValue = ProductConstants.SORT_DIR, required = false) String sortDir) {
		 PaginationResponse allProductsData = productService.getAllProductsData(pageNumber, pageSize, sortBy, sortDir);
		return new ResponseEntity<PaginationResponse>(allProductsData,HttpStatus.OK);
	}
	
	 @DeleteMapping("/delete/{productId}")
	    public ResponseEntity<ProductDto> deleteByProduct(@PathVariable Integer productId){
	    	productService.deleteProduct(productId);
			return ResponseEntity.noContent().build();
	    	
	    }

}

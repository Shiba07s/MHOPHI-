package com.mhophi.MHOPHI.services;

import java.util.List;

import com.mhophi.MHOPHI.entities.Product;
import com.mhophi.MHOPHI.payload.ProductDto;
import com.mhophi.MHOPHI.response.PaginationResponse;

public interface ProductService {
	
	ProductDto createNewProduct(ProductDto productDto);
	
//	List<ProductDto> getAllProductsData();
	 PaginationResponse getAllProductsData(Integer pageNumber,Integer pageSize, String sortBy,String sortDir) ;

	 void deleteProduct(Integer productId);
}

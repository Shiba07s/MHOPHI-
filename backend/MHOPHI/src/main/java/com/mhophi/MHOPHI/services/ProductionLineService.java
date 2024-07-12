package com.mhophi.MHOPHI.services;

import java.util.List;

import com.mhophi.MHOPHI.payload.ProductionLineDto;
import com.mhophi.MHOPHI.response.PaginationResponse;
import com.mhophi.MHOPHI.response.ProductionLineCountProducts;

public interface ProductionLineService {

	ProductionLineDto createNewProductionLine(ProductionLineDto productionLineDto);
	
//	List<ProductionLineDto> getAll();
	PaginationResponse getProductionLineDetails(Integer pageNumber, Integer pageSize, String sortBy, String sortDir);
//	List<ProductionLineCountProducts> getCountProducts();
	PaginationResponse getCountProducts(Integer pageNumber, Integer pageSize, String sortBy, String sortDir);
	
	void deleteProductionLine(Integer productionlineId);
}

package com.mhophi.MHOPHI.controller;

import java.util.List;

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

import com.mhophi.MHOPHI.payload.ProductionLineDto;
import com.mhophi.MHOPHI.repositories.ProductionLineRepository;
import com.mhophi.MHOPHI.request.ProductionLineConstants;
import com.mhophi.MHOPHI.response.PaginationResponse;
import com.mhophi.MHOPHI.services.ProductionLineService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/production-line")
public class ProductionLineController {

	private final ProductionLineService productionLineService;
	private final ProductionLineRepository productionLineRepository;

	@PostMapping("/create")
	public ResponseEntity<ProductionLineDto> createProductionLine(@RequestBody ProductionLineDto productionLineDto) {
		ProductionLineDto createNewProductionLine = productionLineService.createNewProductionLine(productionLineDto);
		return new ResponseEntity<>(createNewProductionLine, HttpStatus.CREATED);
	}

	@GetMapping
	public ResponseEntity<PaginationResponse> getAllDetails(
			@RequestParam(value = "pageNumber", defaultValue = ProductionLineConstants.PAGE_NUMBER, required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", defaultValue = ProductionLineConstants.PAGE_SIZE, required = false) Integer pageSize,
			@RequestParam(value = "sortBy", defaultValue = ProductionLineConstants.SORT_BY, required = false) String sortBy,
			@RequestParam(value = "sortDir", defaultValue = ProductionLineConstants.SORT_DIR, required = false) String sortDir) {

  PaginationResponse productionLineDetails = productionLineService.getProductionLineDetails(pageNumber, pageSize, sortBy, sortDir);
		return new ResponseEntity<PaginationResponse>(productionLineDetails, HttpStatus.OK);
	}

	@GetMapping("/count")
	public ResponseEntity<PaginationResponse> getAllCountProduct(
			@RequestParam(value = "pageNumber", defaultValue = ProductionLineConstants.PAGE_NUMBER, required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", defaultValue = ProductionLineConstants.PAGE_SIZE, required = false) Integer pageSize,
			@RequestParam(value = "sortBy", defaultValue = ProductionLineConstants.SORT_BY, required = false) String sortBy,
			@RequestParam(value = "sortDir", defaultValue = ProductionLineConstants.SORT_DIR, required = false) String sortDir) {

		PaginationResponse countProducts = productionLineService.getCountProducts(pageNumber, pageSize, sortBy,
				sortDir);
		return new ResponseEntity<PaginationResponse>(countProducts, HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{productionlineId}")
	public ResponseEntity<ProductionLineDto> deleteProductionLine(@PathVariable Integer productionlineId) {
		productionLineService.deleteProductionLine(productionlineId);
		return ResponseEntity.noContent().build();
	}

}

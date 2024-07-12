package com.mhophi.MHOPHI.services.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.mhophi.MHOPHI.entities.Product;
import com.mhophi.MHOPHI.entities.ProductionLine;
import com.mhophi.MHOPHI.entities.Workstation;
import com.mhophi.MHOPHI.exception.ResourceNotFoundException;
import com.mhophi.MHOPHI.payload.ProductDto;
import com.mhophi.MHOPHI.payload.ProductionLineDto;
import com.mhophi.MHOPHI.payload.WorkstationDto;
import com.mhophi.MHOPHI.repositories.ProductRepository;
import com.mhophi.MHOPHI.repositories.ProductionLineRepository;
import com.mhophi.MHOPHI.response.PaginationResponse;
import com.mhophi.MHOPHI.response.ProductionLineCountProducts;
import com.mhophi.MHOPHI.services.ProductionLineService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductionLineServiceImpl implements ProductionLineService {

	private final ProductionLineRepository productionLineRepository;
	private final ModelMapper modelMapper;
	private final ProductRepository productRepository;

	@Override
	public ProductionLineDto createNewProductionLine(ProductionLineDto productionLineDto) {
		ProductionLine productionLine = modelMapper.map(productionLineDto, ProductionLine.class);

		Set<Product> products = new HashSet<>();
		if (productionLineDto.getProducts() != null) {
			for (ProductDto productDto : productionLineDto.getProducts()) {
				Product product = productRepository.findById(productDto.getProductId())
						.orElseThrow(() -> new ResourceNotFoundException("Product not found "));

				products.add(product);
			}
		}
		productionLine.setRecordStatus("active");
		productionLine.setProducts(products);

		ProductionLine saveProduct = productionLineRepository.save(productionLine);
		return modelMapper.map(saveProduct, ProductionLineDto.class);
	}
 
	@Override
	public PaginationResponse getProductionLineDetails(Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {

		Sort sort = Sort.by(sortDir.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);
		Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
		Page<ProductionLine> pageProductionLine = productionLineRepository.findAll(pageable);

		  List<ProductionLineDto> collect = pageProductionLine.stream().map(productionline -> modelMapper.map(productionline, ProductionLineDto.class))
				.collect(Collectors.toList());
		PaginationResponse paginationResponse = new PaginationResponse();
		paginationResponse.setContent(collect);
		paginationResponse.setPageNumber(pageProductionLine.getNumber());
		paginationResponse.setPageSize(pageProductionLine.getSize());
		paginationResponse.setTotalElements(pageProductionLine.getTotalElements());
		paginationResponse.setLastPage(pageProductionLine.isLast());

		return paginationResponse;
	}
	
	
	@Override
	public PaginationResponse getCountProducts(Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
		
		Sort sort = Sort.by(sortDir.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);
		Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
		Page<ProductionLine> pageProductionLineCount = productionLineRepository.findAll(pageable);
		
		List<ProductionLineCountProducts> countProductsList = pageProductionLineCount.stream().map(productionLine -> {
			ProductionLineCountProducts countProducts = new ProductionLineCountProducts();
			countProducts.setProductionlineId(productionLine.getProductionlineId());
			countProducts.setCreatedAt(productionLine.getCreatedAt());
			countProducts.setProductionLineName(productionLine.getProductionLineName());
			countProducts.setDescription(productionLine.getDescription());
			countProducts.setOrganisationDetailsId(productionLine.getOrganisationDetailsId());
			countProducts.setProducts(productionLine.getProducts().size());
			return countProducts;
		}).collect(Collectors.toList());
		
		PaginationResponse paginationResponse = new PaginationResponse();
		paginationResponse.setContent(countProductsList);
		paginationResponse.setPageNumber(pageProductionLineCount.getNumber());
		paginationResponse.setPageSize(pageProductionLineCount.getSize());
		paginationResponse.setTotalElements(pageProductionLineCount.getTotalElements());
		paginationResponse.setLastPage(pageProductionLineCount.isLast());
		
		return paginationResponse;
	}

	@Override
	public void deleteProductionLine(Integer productionlineId) {
		Optional<ProductionLine> findById = productionLineRepository.findById(productionlineId);
		
		if (findById.isPresent()) {
			ProductionLine productionLine = findById.get();
			productionLine.setRecordStatus("Inactive");
			productionLineRepository.save(productionLine);
		} else {
			throw new ResourceNotFoundException("production line is not found with this id: "+productionlineId);
		}
	}

//	@Override
//	public List<ProductionLineDto> getAll() {
//	  List<ProductionLine> findAll = productionLineRepository.findAll();
//	  return findAll.stream().map(productionLine -> {
//	      ProductionLineDto productionLineDto = modelMapper.map(productionLine, ProductionLineDto.class);
//	      List<ProductDto> productDtos = productionLine.getProducts().stream()
//	              .map(product -> modelMapper.map(product, ProductDto.class))
//	              .collect(Collectors.toList());
//	      productionLineDto.setProducts(new HashSet<>(productDtos));
//	      return productionLineDto;
//	  }).collect(Collectors.toList());
//	}

//	@Override
//	public List<ProductionLineDto> getAll() {
//	    List<ProductionLine> findAll = productionLineRepository.findAll();
//	    List<ProductionLineDto> productionLineDtos = new ArrayList<>();
//
//	    for (ProductionLine productionLine : findAll) {
//	        ProductionLineDto productionLineDto = modelMapper.map(productionLine, ProductionLineDto.class);
//	        Set<ProductDto> productDtos = new HashSet<>();
//
//	        for (Product product : productionLine.getProducts()) {
//	            ProductDto productDto = modelMapper.map(product, ProductDto.class);
//	            productDtos.add(productDto);
//	        }
//
//	        productionLineDto.setProducts(productDtos);
//	        productionLineDtos.add(productionLineDto);
//	    }
//
//	    return productionLineDtos;
//	}
}

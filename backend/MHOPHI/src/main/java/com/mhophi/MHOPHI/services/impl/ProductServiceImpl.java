package com.mhophi.MHOPHI.services.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.mhophi.MHOPHI.entities.Department;
import com.mhophi.MHOPHI.entities.Product;
import com.mhophi.MHOPHI.exception.DepartmentNotFoundException;
import com.mhophi.MHOPHI.exception.ResourceNotFoundException;
import com.mhophi.MHOPHI.payload.ProductDto;
import com.mhophi.MHOPHI.repositories.ProductRepository;
import com.mhophi.MHOPHI.response.PaginationResponse;
import com.mhophi.MHOPHI.services.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public ProductDto createNewProduct(ProductDto productDto) {
		Product product = modelMapper.map(productDto, Product.class);

//		 String uuid = UUID.randomUUID().toString().replace("-", "").substring(0, 12);
		String format = String.format("%010d", (long) (Math.random() * 1_000_000_000L));
		String formattedName = "01 IC" + format;

		product.setProductName(formattedName);
		product.setRecordStatus("Active");
		product.setCreatedAt(LocalDateTime.now());

		Product saveProduct = productRepository.save(product);

		return modelMapper.map(saveProduct, ProductDto.class);
	}

	@Override
	public PaginationResponse getAllProductsData(Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
		Sort sort = Sort.by(sortDir.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);
		Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
		Page<Product> pageProduct = productRepository.findAll(pageable);

		List<ProductDto> collect = pageProduct.stream()
				.filter(product -> "Active".equals(product.getRecordStatus()))
				.map(product -> modelMapper.map(product, ProductDto.class))
				.collect(Collectors.toList());

		PaginationResponse paginationResponse = new PaginationResponse();
		paginationResponse.setContent(collect);
		paginationResponse.setPageNumber(pageProduct.getNumber());
		paginationResponse.setPageSize(pageProduct.getSize());
		paginationResponse.setTotalElements(pageProduct.getTotalElements());
		paginationResponse.setLastPage(pageProduct.isLast());
		return paginationResponse;
	}

	@Override
	public void deleteProduct(Integer productId) {
 		Optional<Product> findById = productRepository.findById(productId);
		if (findById.isPresent()) {
			Product product = findById.get();
			product.setRecordStatus("Inactive");
			productRepository.save(product);
		} else {
			throw new ResourceNotFoundException("Product not found with this id: " + productId);
		}

	}

//	@Override
//	public Product createNewProduct(Product product) {
//		
////	    String uuid = UUID.randomUUID().toString().replace("-", "").substring(0, 12);
//	    String uuid = String.format("%010d", (long) (Math.random() * 1_000_000_000L));
//
//	    // Format the name
//	    String formattedName = "01 IC " + uuid;
//
//	    // Set the formatted name to the product's name field
//	    product.setName(formattedName);
//  		return productRepository.save(product);
//	}
//
//	@Override
//	public List<Product> getAllProductsData() {
//		// TODO Auto-generated method stub
//		return productRepository.findAll();
//	}

}

package com.licenta.licenta.service;

import com.licenta.licenta.data.dto.ProductDto;
import com.licenta.licenta.data.entity.Category;
import com.licenta.licenta.data.entity.Product;
import com.licenta.licenta.repo.CategoriesRepo;
import com.licenta.licenta.repo.ProductsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ProductService {

    private final ProductsRepo productsRepo;
    private final CategoriesRepo categoriesRepo;

    public ProductService(ProductsRepo productsRepo, CategoriesRepo categoriesRepo) {
        this.productsRepo = productsRepo;
        this.categoriesRepo = categoriesRepo;
    }
    public ProductDto createProduct(ProductDto productDto) {
        Category category = categoriesRepo.findByName(productDto.getCategoryName())
                .orElseThrow(() -> new IllegalStateException("Category not found"));

        Product product = new Product();
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        product.setImageUrl(productDto.getImageUrl());
        product.setCategory(category);
        product.setStockQuantity(productDto.getStockQuantity());
        productsRepo.save(product);
        return convertToDto(product);
    }

    public ProductDto updateProduct(UUID id, ProductDto productDto) {
        Product product = productsRepo.findById(id)
                .orElseThrow(() -> new IllegalStateException("Product not found"));

        Category category = categoriesRepo.findByName(productDto.getCategoryName())
                .orElseThrow(() -> new IllegalStateException("Category not found"));

        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        product.setImageUrl(productDto.getImageUrl());
        product.setCategory(category);
        product.setStockQuantity(productDto.getStockQuantity());
        productsRepo.save(product);

        return convertToDto(product);
    }

    public void deleteProduct(UUID id) {
        productsRepo.deleteById(id);
    }

    private ProductDto convertToDto(Product product) {
        ProductDto productDto = new ProductDto();
        productDto.setName(product.getName());
        productDto.setDescription(product.getDescription());
        productDto.setPrice(product.getPrice());
        productDto.setImageUrl(product.getImageUrl());
        productDto.setStockQuantity(product.getStockQuantity());
        productDto.setCategory(product.getCategory().getName());
        return productDto;
    }
}
package com.licenta.licenta.rest;

import com.licenta.licenta.data.dto.ProductDto;
import com.licenta.licenta.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/products")
public class ProductApiRest {

    private final ProductService productService;

    public ProductApiRest(ProductService productService) {
        this.productService = productService;
    }
    @PostMapping("/")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<ProductDto> createProduct(@RequestBody ProductDto productDto) {
        ProductDto createdProduct = productService.createProduct(productDto);
        return ResponseEntity.ok(createdProduct); // 200 OK with body
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable UUID id, @RequestBody ProductDto productDto) {
        ProductDto updatedProduct = productService.updateProduct(id, productDto);
        return ResponseEntity.ok(updatedProduct); // 200 OK with body
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Void> deleteProduct(@PathVariable UUID id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }
}
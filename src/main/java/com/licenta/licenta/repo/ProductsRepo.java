package com.licenta.licenta.repo;

import com.licenta.licenta.data.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProductsRepo extends JpaRepository<Product, UUID> {
    // Additional custom methods can be added here
}

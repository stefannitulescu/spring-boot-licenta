package com.licenta.licenta.repo;

import com.licenta.licenta.data.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CartItemsRepo extends JpaRepository<CartItem, UUID> {
}

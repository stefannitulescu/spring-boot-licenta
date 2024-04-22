package com.licenta.licenta.service;

import com.licenta.licenta.repo.CartItemsRepo;
import com.licenta.licenta.repo.CartsRepo;
import org.springframework.stereotype.Service;

@Service
public class CartService {
    private final CartsRepo cartsRepo;
    private final CartItemsRepo cartItemsRepo;

    public CartService(CartsRepo cartsRepo, CartItemsRepo cartItemsRepo) {
        this.cartsRepo = cartsRepo;
        this.cartItemsRepo = cartItemsRepo;
    }
}

package com.licenta.licenta.service;

import com.licenta.licenta.repo.OrderItemsRepo;
import com.licenta.licenta.repo.OrdersRepo;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    private final OrdersRepo ordersRepo;
    private final OrderItemsRepo orderItemsRepo;

    public OrderService(OrdersRepo ordersRepo, OrderItemsRepo orderItemsRepo) {
        this.ordersRepo = ordersRepo;
        this.orderItemsRepo = orderItemsRepo;
    }
}

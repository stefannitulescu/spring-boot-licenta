package com.licenta.licenta.rest;

import com.licenta.licenta.data.dto.AddressDto;
import com.licenta.licenta.data.dto.OrderDto;
import com.licenta.licenta.data.dto.UpdateOrderStatusDto;
import com.licenta.licenta.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderApiRest {
    private final OrderService orderService;

    @Autowired
    public OrderApiRest(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/convert-cart/{userId}")
    public ResponseEntity<OrderDto> convertCartToOrder(@PathVariable UUID userId, @RequestBody(required = false) AddressDto addressDto) {
        OrderDto orderDto = orderService.convertCartToOrder(userId, addressDto);
        return ResponseEntity.ok(orderDto);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable UUID orderId) {
        OrderDto orderDto = orderService.getOrderById(orderId);
        return ResponseEntity.ok(orderDto);
    }

    @PutMapping("/{orderId}/update-status")
    public ResponseEntity<OrderDto> updateOrderStatus(@PathVariable UUID orderId, @RequestBody UpdateOrderStatusDto updateOrderStatusDto) {
        OrderDto orderDto = orderService.updateOrderStatus(orderId, updateOrderStatusDto.getStatus());
        return ResponseEntity.ok(orderDto);
    }


    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderDto>> getOrdersByUserId(@PathVariable UUID userId) {
        List<OrderDto> orders = orderService.getOrdersByUserId(userId);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_DEPOSIT_MANAGER')")
    public ResponseEntity<List<OrderDto>> getAllOrders() {
        List<OrderDto> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }
}

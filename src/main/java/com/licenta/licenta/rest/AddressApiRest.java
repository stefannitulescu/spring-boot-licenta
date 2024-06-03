package com.licenta.licenta.rest;

import com.licenta.licenta.data.dto.AddressDto;
import com.licenta.licenta.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/addresses")
@CrossOrigin(origins = "http://localhost:3000")
public class AddressApiRest {

    private final AddressService addressService;

    @Autowired
    public AddressApiRest(AddressService addressService) {
        this.addressService = addressService;
    }

    @PostMapping("/{userId}")
    public ResponseEntity<AddressDto> createOrUpdateAddress(@PathVariable UUID userId, @RequestBody AddressDto addressDto) {
        AddressDto createdOrUpdatedAddress = addressService.createOrUpdateAddress(userId, addressDto);
        return ResponseEntity.ok(createdOrUpdatedAddress);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<AddressDto> getAddressByUserId(@PathVariable UUID userId) {
        AddressDto address = addressService.getAddressByUserId(userId);
        return ResponseEntity.ok(address);
    }
}

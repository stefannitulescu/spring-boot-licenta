package com.licenta.licenta.repo;

import com.licenta.licenta.data.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AddressesRepo extends JpaRepository<Address, UUID> {
}

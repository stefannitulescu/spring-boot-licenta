package com.licenta.licenta.service;

import com.licenta.licenta.data.dto.AddressDto;
import com.licenta.licenta.data.entity.Address;
import com.licenta.licenta.data.entity.User;
import com.licenta.licenta.repo.AddressesRepo;
import com.licenta.licenta.repo.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AddressService {
    private final AddressesRepo addressesRepo;
    private final UsersRepo usersRepo;

    @Autowired
    public AddressService(AddressesRepo addressesRepo, UsersRepo usersRepo) {
        this.addressesRepo = addressesRepo;
        this.usersRepo = usersRepo;
    }

    public AddressDto createOrUpdateAddress(UUID userId, AddressDto addressDto) {
        User user = usersRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Address address = user.getAddress();

        if (address == null) {
            address = new Address();
            address.setUser(user);
        }

        address.setStreet(addressDto.getStreet());
        address.setNumber(addressDto.getNumber());
        address.setCity(addressDto.getCity());
        address.setCounty(addressDto.getCounty());
        address.setZipCode(addressDto.getZipCode());
        address.setCountry(addressDto.getCountry());

        address = addressesRepo.save(address);
        user.setAddress(address);
        usersRepo.save(user);

        return convertToDto(address);
    }

    public AddressDto getAddressByUserId(UUID userId) {
        User user = usersRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Address address = user.getAddress();
        if (address != null) {
            return convertToDto(address);
        } else {
            return null;
        }
    }

    private AddressDto convertToDto(Address address) {
        return new AddressDto(address.getId(), address.getStreet(), address.getNumber(), address.getCity(),
                address.getCounty(), address.getCountry(), address.getZipCode());
    }
}

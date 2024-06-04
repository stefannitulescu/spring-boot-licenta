package com.licenta.licenta.data.dto;

import java.util.UUID;

public class AddressDto {
    private UUID id;
    private String street;
    private String number;
    private String city;
    private String county;
    private String country;
    private String zipCode;


    public AddressDto() {
    }

    public AddressDto(UUID id, String street, String number, String city, String county, String country, String zipCode) {
        this.id = id;
        this.street = street;
        this.number = number;
        this.city = city;
        this.county = county;
        this.country = country;
        this.zipCode = zipCode;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }
}

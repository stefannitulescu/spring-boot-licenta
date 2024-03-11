package com.licenta.licenta.rest;

import com.licenta.licenta.data.dto.PersonDTO;
import com.licenta.licenta.exception.RestApiException;
import com.licenta.licenta.service.PersonService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/persons")
public class PersonApiRest {
    private final PersonService personService;

    public PersonApiRest(PersonService personService) {
        this.personService = personService;
    }

    @PostMapping("/add-person")
    public void sendPerson(@RequestBody PersonDTO dto) {
        try {
            personService.sendPerson(dto);
        } catch (Exception e) {
            throw new RestApiException("Eroare sendPerson", e, "error");
        }
    }
}

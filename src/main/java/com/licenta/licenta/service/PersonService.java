package com.licenta.licenta.service;

import com.licenta.licenta.data.dto.PersonDTO;
import com.licenta.licenta.model.Person;
import com.licenta.licenta.repo.PersonRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {
    private final PersonRepo personRepo;

    public PersonService(PersonRepo personRepo) {
        this.personRepo = personRepo;
    }

    public void sendPerson(final PersonDTO dto) {
        Person person = new Person();
        person.setUsername(dto.getUsername());
        person.setEmail(dto.getEmail());
        person.setHobby(dto.getHobby());

        personRepo.save(person);
    }

    public List<Person> getAllPersons() {
        return personRepo.findAll();
    }

    public List<Person> getAllPersonsByHobbies(String hobby) {
        return personRepo.findByHobby(hobby);
    }


}

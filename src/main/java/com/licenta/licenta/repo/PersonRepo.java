package com.licenta.licenta.repo;

import com.licenta.licenta.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PersonRepo extends JpaRepository<Person, Long> {

    List<Person> findByHobby(String hobby);
}

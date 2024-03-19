package com.licenta.licenta.service;

import com.licenta.licenta.data.dto.RegisterUserDto;
import com.licenta.licenta.data.entity.User;
import com.licenta.licenta.data.enums.RoleEnum;
import com.licenta.licenta.exception.RestApiException;
import com.licenta.licenta.repo.RolesRepo;
import com.licenta.licenta.repo.UsersRepo;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class UserService {

    private final UsersRepo usersRepo;
    private final PasswordEncoder passwordEncoder;

    private final RolesRepo rolesRepo;

    public UserService(UsersRepo usersRepo, PasswordEncoder passwordEncoder, RolesRepo rolesRepo) {
        this.usersRepo = usersRepo;
        this.passwordEncoder = passwordEncoder;
        this.rolesRepo = rolesRepo;
    }

    public Optional<User> getUserByEmail(String email) {
        return usersRepo.findByEmail(email);
    }

    public User createUser(final RegisterUserDto dto) {
        User user = new User();
        user.setEmail(dto.getEmail());
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setRole(rolesRepo.findByCode(RoleEnum.valueOf(dto.getRole())).orElseThrow(() -> new RestApiException("Unable to identify role!")));
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        usersRepo.save(user);
        return user;
    }
 }

package com.licenta.licenta.service;

import com.licenta.licenta.data.dto.RegisterUserDto;
import com.licenta.licenta.data.dto.UserDto;
import com.licenta.licenta.data.entity.Cart;
import com.licenta.licenta.data.entity.User;
import com.licenta.licenta.data.enums.RoleEnum;
import com.licenta.licenta.exception.RestApiException;
import com.licenta.licenta.exception.UserNotFoundException;
import com.licenta.licenta.repo.CartsRepo;
import com.licenta.licenta.repo.RolesRepo;
import com.licenta.licenta.repo.TokensRepo;
import com.licenta.licenta.repo.UsersRepo;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UsersRepo usersRepo;
    private final PasswordEncoder passwordEncoder;
    private final TokensRepo tokensRepo;
    private final RolesRepo rolesRepo;

    private final CartsRepo cartsRepo;

    public UserService(UsersRepo usersRepo, PasswordEncoder passwordEncoder, TokensRepo tokensRepo, RolesRepo rolesRepo, CartsRepo cartsRepo) {
        this.usersRepo = usersRepo;
        this.passwordEncoder = passwordEncoder;
        this.tokensRepo = tokensRepo;
        this.rolesRepo = rolesRepo;
        this.cartsRepo = cartsRepo;
    }

    public Optional<User> getUserByEmail(String email) {
        return usersRepo.findByEmail(email);
    }

    public List<UserDto> getAllUsers() {
        List<User> users = usersRepo.findAll();

        return users.stream()
                .map(user -> new UserDto(
                        user.getId(),
                        user.getEmail(),
                        user.getFirstName(),
                        user.getLastName(),
                        user.getRole().getCode().name()
                ))
                .collect(Collectors.toList());
    }

    public void deleteUser(UUID id) {
        if (!usersRepo.existsById(id)) {
            throw new UserNotFoundException("User with id " + id + " does not exist");
        }

        Cart cart = cartsRepo.findByUserId(id).orElse(null);
        if (cart != null && !cart.getItems().isEmpty()) {
            throw new IllegalStateException("Cannot delete user with a non-empty cart");
        }
        cartsRepo.delete(cart);
        tokensRepo.deleteByUserId(id);
        usersRepo.deleteById(id);
    }
    public UserDto getUserById(UUID id) {
        Optional<User> userOptional = usersRepo.findById(id);
        if(userOptional.get() != null) {
            User user = userOptional.get();
            UserDto userDto = new UserDto();
            userDto.setRole(user.getRole().getCode().name());
            userDto.setFirstName(user.getFirstName());
            userDto.setLastName(user.getLastName());
            return userDto;
        } else {
            return null;
        }
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

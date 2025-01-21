package com.wora.easyOrder.repository.base;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository<T, RES> extends JpaRepository<T, String> {

    Optional<T> findByEmail(String email);
    RES findByEmailAndMapToResponseDTO(String email);

}

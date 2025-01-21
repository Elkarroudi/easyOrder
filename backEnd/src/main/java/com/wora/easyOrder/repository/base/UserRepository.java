package com.wora.easyOrder.repository.base;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepository<T, RES> extends JpaRepository<T, String> {

    T findByEmail(String email);

}

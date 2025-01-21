package com.wora.easyOrder.entity.base;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@SuperBuilder
@MappedSuperclass
public abstract class BaseUser {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    protected String id;

    @Column(nullable = false)
    protected String name;

    @Column(nullable = false, unique = true)
    protected String email;

    @Column(nullable = false)
    protected String phone;

    @Column(nullable = false)
    protected String password;

    @CreationTimestamp
    @Column(
            name = "created_at",
            updatable = false,
            nullable = false
    )
    private LocalDateTime createdAt;

    protected BaseUser() {
    }
}

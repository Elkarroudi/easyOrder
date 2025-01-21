package com.wora.easyOrder.entity.base;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@MappedSuperclass
@AllArgsConstructor
@NoArgsConstructor
public abstract class BaseUser {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    protected String id;

    @Column(
            name = "name",
            nullable = false
    )
    protected String name;

    @Column(
            name = "name",
            nullable = false
    )
    protected String email;

    @Column(
            name = "name",
            nullable = false
    )
    protected String phone;

    @Column(
            name = "name",
            nullable = false
    )
    protected String password;

    @CreationTimestamp
    @Column(
            name = "createdAt",
            updatable = false,
            nullable = false
    )
    private LocalDateTime createdAt;

}

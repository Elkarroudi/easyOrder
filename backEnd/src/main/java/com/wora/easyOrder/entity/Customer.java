package com.wora.easyOrder.entity;

import com.wora.easyOrder.entity.base.BaseUser;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "customers")
@EqualsAndHashCode(callSuper = true)
public class Customer extends BaseUser {

    @Column(
            name = "address",
            nullable = false
    )
    private String address;

}

package com.wora.easyOrder.entity;

import com.wora.easyOrder.entity.base.BaseUser;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@Entity(name = "admins")
public class Admin extends BaseUser {
    
    protected Admin() {
        super();
    }
}

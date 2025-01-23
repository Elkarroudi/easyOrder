package com.wora.easyOrder.entity;

import com.wora.easyOrder.entity.base.BaseUser;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity(name = "admins")
@EqualsAndHashCode(callSuper = true)
public class Admin extends BaseUser {

}

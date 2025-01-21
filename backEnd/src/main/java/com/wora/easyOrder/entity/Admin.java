package com.wora.easyOrder.entity;

import com.wora.easyOrder.entity.base.BaseUser;
import com.wora.easyOrder.entity.projectEnum.VehicleType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "admins")
@EqualsAndHashCode(callSuper = true)
public class Admin extends BaseUser {

}

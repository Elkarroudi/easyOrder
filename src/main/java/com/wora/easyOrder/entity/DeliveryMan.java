package com.wora.easyOrder.entity;

import com.wora.easyOrder.entity.base.BaseUser;
import com.wora.easyOrder.enums.VehicleType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "deliveryMans")
@EqualsAndHashCode(callSuper = true)
public class DeliveryMan extends BaseUser {

    @Column(
            name = "vehicleType",
            nullable = false
    )
    private VehicleType vehicleType;

}

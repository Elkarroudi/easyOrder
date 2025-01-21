package com.wora.easyOrder.repository;

import com.wora.easyOrder.dto.response.DeliveryManResponseDTO;
import com.wora.easyOrder.entity.DeliveryMan;
import com.wora.easyOrder.repository.base.UserRepository;

public interface DeliveryManRepository extends UserRepository<DeliveryMan, DeliveryManResponseDTO> {
}

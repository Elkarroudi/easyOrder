package com.wora.easyOrder.repository;

import com.wora.easyOrder.dto.response.DeliveryManResponseDTO;
import com.wora.easyOrder.entity.DeliveryMan;
import com.wora.easyOrder.repository.base.UserRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryManRepository extends UserRepository<DeliveryMan, DeliveryManResponseDTO> {
}

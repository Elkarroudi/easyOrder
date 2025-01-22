package com.wora.easyOrder.repository;

import com.wora.easyOrder.dto.response.DeliveryManResponseDTO;
import com.wora.easyOrder.entity.DeliveryMan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryManRepository extends JpaRepository<DeliveryMan, DeliveryManResponseDTO> {
}

package com.wora.easyOrder.repository;

import com.wora.easyOrder.dto.response.CustomerResponseDTO;
import com.wora.easyOrder.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, CustomerResponseDTO> {
}

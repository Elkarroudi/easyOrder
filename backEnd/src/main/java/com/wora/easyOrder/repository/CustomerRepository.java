package com.wora.easyOrder.repository;

import com.wora.easyOrder.dto.response.CustomerResponseDTO;
import com.wora.easyOrder.entity.Customer;
import com.wora.easyOrder.repository.base.UserRepository;

public interface CustomerRepository extends UserRepository<Customer, CustomerResponseDTO> {
}

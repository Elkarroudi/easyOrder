package com.wora.easyOrder.repository;

import com.wora.easyOrder.dto.response.AdminResponseDTO;
import com.wora.easyOrder.entity.Admin;
import com.wora.easyOrder.repository.base.UserRepository;

public interface AdminRepository extends UserRepository<Admin, AdminResponseDTO> {
}

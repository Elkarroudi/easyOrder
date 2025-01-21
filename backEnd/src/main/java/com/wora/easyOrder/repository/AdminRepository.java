package com.wora.easyOrder.repository;

import com.wora.easyOrder.dto.response.AdminResponseDTO;
import com.wora.easyOrder.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, AdminResponseDTO> {
}

package com.wora.easyOrder.service;

import com.wora.easyOrder.mapper.GenericMapper;
import com.wora.easyOrder.repository.base.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BaseUserService<T, REQ, RES> extends GenericService<T, REQ, RES>  {

    UserRepository<T, RES> getRepository();
    GenericMapper<T, REQ, RES> getMapper();

    default Page<RES> findAll(Pageable pageable) {
        Page<T> entities = getRepository().findAll(pageable);
        return entities.map(getMapper()::toResponseDTO);
    };

    default T findByEmail(String email) {
        return getRepository().findByEmail(email);
    };

    default RES findByEmailAndMapToResponseDTO(String email) {
        return getMapper().toResponseDTO(
                findByEmail(email)
        );
    };

    default T findById(String id) {
        return getRepository().findById(id)
                .orElseThrow(() -> new RuntimeException("Entity not found with id : " + id));

    };

    default RES findByIdAndMapToResponseDTO(String id) {
        return getMapper().toResponseDTO(
                findById(id)
        );
    };

    default RES create(REQ req) {
        T entity = getMapper().toEntity(req);
        return getMapper().toResponseDTO(
                getRepository().save(entity)
        );
    };

    default RES update(String id, REQ req) {
        T entity = findById(id);
        getMapper().updateEntity(req, entity);
        getRepository().save(entity);

        return getMapper().toResponseDTO(
                getRepository().save(entity)
        );
    };

    default void delete(String id) {
        T entity = findById(id);
        getRepository().delete(entity);
    };

}

package com.wora.easyOrder.service;

public interface GenericService<T, REQ, RES> {

    T findById(String id);
    RES findByIdAndMapToResponseDTO(String id);

    RES create(REQ req);
    RES update(String id, REQ req);
    void delete(String id);

}

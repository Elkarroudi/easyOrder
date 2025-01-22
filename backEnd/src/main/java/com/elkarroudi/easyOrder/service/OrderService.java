package com.elkarroudi.easyOrder.service;

import com.elkarroudi.easyOrder.model.Order;
import java.time.LocalDateTime;
import java.util.List;

public interface OrderService {
    Order createOrder(Order order);
    
    Order getOrderById(Long id);
    
    List<Order> getAllOrders();
    
    List<Order> getOrdersByCustomerId(Long customerId);
    
    Order updateOrderStatus(Long id, String status);
    
    void deleteOrder(Long id);
    
    List<Order> getOrdersByDateRange(LocalDateTime startDate, LocalDateTime endDate);
    
    List<Order> getOrdersByStatus(String status);
}

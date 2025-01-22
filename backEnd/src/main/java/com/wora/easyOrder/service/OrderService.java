package com.wora.easyOrder.service;

import com.wora.easyOrder.entity.Order;
import com.wora.easyOrder.enums.OrderStatus;
import java.time.LocalDateTime;
import java.util.List;

public interface OrderService {
    Order createOrder(Order order);
    
    Order getOrderById(Long id);
    
    List<Order> getAllOrders();
    
    List<Order> getOrdersByCustomerId(Long customerId);
    
    Order updateOrderStatus(Long id, OrderStatus status);
    
    void deleteOrder(Long id);
    
    List<Order> getOrdersByDateRange(LocalDateTime startDate, LocalDateTime endDate);
    
    List<Order> getOrdersByStatus(OrderStatus status);
}

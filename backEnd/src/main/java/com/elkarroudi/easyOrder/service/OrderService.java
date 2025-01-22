package com.elkarroudi.easyOrder.service;

import com.elkarroudi.easyOrder.model.Order;
import com.elkarroudi.easyOrder.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    public Order createOrder(Order order) {
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PENDING");
        return orderRepository.save(order);
    }
    
    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
    }
    
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    
    public List<Order> getOrdersByCustomerId(Long customerId) {
        return orderRepository.findByCustomerId(customerId);
    }
    
    public Order updateOrderStatus(Long id, String status) {
        Order order = getOrderById(id);
        order.setStatus(status);
        return orderRepository.save(order);
    }
    
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
    
    public List<Order> getOrdersByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return orderRepository.findByOrderDateBetween(startDate, endDate);
    }
    
    public List<Order> getOrdersByStatus(String status) {
        return orderRepository.findByStatus(status);
    }
}

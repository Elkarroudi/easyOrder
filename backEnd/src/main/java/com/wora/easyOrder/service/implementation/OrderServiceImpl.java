package com.wora.easyOrder.service.implementation;

import com.wora.easyOrder.entity.Order;
import com.wora.easyOrder.repository.OrderRepository;
import com.wora.easyOrder.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Override
    public Order createOrder(Order order) {
        // Validation de base
        if (order.getOrderItems() == null || order.getOrderItems().isEmpty()) {
            throw new IllegalArgumentException("Une commande doit contenir au moins un article");
        }
        
        // Calcul du montant total
        double totalAmount = order.getOrderItems().stream()
                .mapToDouble(item -> item.getQuantity() * item.getUnitPrice())
                .sum();
        
        order.setTotalAmount(totalAmount);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PENDING");
        
        // Associer la commande à chaque article de commande
        order.getOrderItems().forEach(item -> item.setOrder(order));
        
        return orderRepository.save(order);
    }
    
    @Override
    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Commande non trouvée avec l'id: " + id));
    }
    
    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    
    @Override
    public List<Order> getOrdersByCustomerId(Long customerId) {
        if (customerId == null) {
            throw new IllegalArgumentException("L'ID du client ne peut pas être null");
        }
        return orderRepository.findByCustomerId(customerId);
    }
    
    @Override
    public Order updateOrderStatus(Long id, String status) {
        if (status == null || status.trim().isEmpty()) {
            throw new IllegalArgumentException("Le statut ne peut pas être vide");
        }
        
        Order order = getOrderById(id);
        
        // Validation du statut
        switch (status.toUpperCase()) {
            case "PENDING":
            case "CONFIRMED":
            case "PREPARING":
            case "READY":
            case "DELIVERED":
            case "CANCELLED":
                order.setStatus(status.toUpperCase());
                break;
            default:
                throw new IllegalArgumentException("Statut non valide: " + status);
        }
        
        return orderRepository.save(order);
    }
    
    @Override
    public void deleteOrder(Long id) {
        Order order = getOrderById(id);
        // Vérifier si la commande peut être supprimée
        if (!"PENDING".equals(order.getStatus()) && !"CANCELLED".equals(order.getStatus())) {
            throw new IllegalStateException("Seules les commandes en attente ou annulées peuvent être supprimées");
        }
        orderRepository.deleteById(id);
    }
    
    @Override
    public List<Order> getOrdersByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        if (startDate == null || endDate == null) {
            throw new IllegalArgumentException("Les dates de début et de fin sont requises");
        }
        if (startDate.isAfter(endDate)) {
            throw new IllegalArgumentException("La date de début doit être antérieure à la date de fin");
        }
        return orderRepository.findByOrderDateBetween(startDate, endDate);
    }
    
    @Override
    public List<Order> getOrdersByStatus(String status) {
        if (status == null || status.trim().isEmpty()) {
            throw new IllegalArgumentException("Le statut ne peut pas être vide");
        }
        return orderRepository.findByStatus(status.toUpperCase());
    }
}

package com.wora.easyOrder.service.implementation;

import com.wora.easyOrder.entity.Order;
import com.wora.easyOrder.enums.OrderStatus;
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
                .mapToDouble(item -> item.getQuantity() * item.getPriceAtOrder())
                .sum();
        
        order.setTotalAmount(totalAmount);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(OrderStatus.IN_PREPARATION);
        
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
    public List<Order> getOrdersByCustomerId(String customerId) {
        if (customerId == null) {
            throw new IllegalArgumentException("L'ID du client ne peut pas être null");
        }
        return orderRepository.findByCustomerId(customerId);
    }
    
    @Override
    public Order updateOrderStatus(Long id, OrderStatus status) {
        if (status == null) {
            throw new IllegalArgumentException("Le statut ne peut pas être null");
        }
        
        Order order = getOrderById(id);
        OrderStatus currentStatus = order.getStatus();
        
        // Validation des transitions de statut
        if (currentStatus == OrderStatus.CANCELLED) {
            throw new IllegalStateException("Impossible de modifier le statut d'une commande annulée");
        }
        
        if (currentStatus == OrderStatus.SERVED && status != OrderStatus.CANCELLED) {
            throw new IllegalStateException("Une commande servie ne peut être que annulée");
        }
        
        // Validation de l'ordre logique des statuts
        if (currentStatus == OrderStatus.BEING_DELIVERED && status == OrderStatus.IN_PREPARATION) {
            throw new IllegalStateException("Impossible de remettre une commande en préparation une fois en livraison");
        }
        
        order.setStatus(status);
        return orderRepository.save(order);
    }
    
    @Override
    public void deleteOrder(Long id) {
        Order order = getOrderById(id);
        // Vérifier si la commande peut être supprimée
        if (order.getStatus() != OrderStatus.IN_PREPARATION) {
            throw new IllegalStateException("Seules les commandes en préparation peuvent être supprimées");
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
    public List<Order> getOrdersByStatus(OrderStatus status) {
        if (status == null) {
            throw new IllegalArgumentException("Le statut ne peut pas être null");
        }
        return orderRepository.findByStatus(status);
    }
}

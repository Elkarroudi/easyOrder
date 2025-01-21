package com.wora.easyOrder.entity;

import com.wora.easyOrder.enums.OrderStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "orders")
@EqualsAndHashCode(exclude = {"orderItems", "table"})
@ToString(exclude = {"orderItems", "table"})
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private LocalDateTime orderDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @NotNull
    @DecimalMin("0.0")
    private Double totalAmount;

    @Size(max = 500)
    private String specialInstructions;

    @NotNull
    private Boolean takeout;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "table_id")
    private RestaurantTable table;
}
package com.wora.easyOrder.entity;
import com.wora.easyOrder.enums.TableStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity(name = "restaurant_tables")
public class RestaurantTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Positive
    private Integer number;

    @Min(1)
    private Integer capacity;

    @NotNull
    @Enumerated(EnumType.STRING)
    private TableStatus status;


    @Size(max = 100)
    private String location;

    @OneToMany(mappedBy = "table")
    private List<Order> orders = new ArrayList<>();
}
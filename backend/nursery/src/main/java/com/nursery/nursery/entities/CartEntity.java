package com.nursery.nursery.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "cart")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class CartEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @NotBlank(message = "{blank.invalid}")
    @NotEmpty(message = "{empty.invalid}")
    String productName;

    @NotBlank(message = "{blank.invalid}")
    @NotEmpty(message = "{empty.invalid}")
    String type;

    @Min(value = 0, message = "cannot be negative")
    @NotNull(message = "{null.invalid}")
    Integer quantity;

    @Min(value = 1, message = "cost cannot be zero")
    @NotNull(message = "{null.invalid}")
    Float cost;

}

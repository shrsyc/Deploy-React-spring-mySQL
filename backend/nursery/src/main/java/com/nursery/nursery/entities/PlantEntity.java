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
@Table(name = "plant")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class PlantEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @NotBlank(message = "{blank.invalid}")
    @NotEmpty(message = "{empty.invalid}")
    String name;

    @NotBlank(message = "{blank.invalid}")
    @NotEmpty(message = "{empty.invalid}")
    String category;

    @NotNull(message = "{null.invalid}")
    @Min(value = 1, message = "Plant height cannot be zero")
    Float plantHeight;

    @Min(value = 1, message = "Plant cost cannot be zero")
    @NotNull(message = "{null.invalid}")
    Float cost;

    @Min(value = 0, message = "Plant stock cannot be negative")
    @NotNull(message = "{null.invalid}")
    Integer plantsStock;
}

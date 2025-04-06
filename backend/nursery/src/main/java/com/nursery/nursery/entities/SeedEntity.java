package com.nursery.nursery.entities;


import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;




@Entity
@Table(name = "seeds")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class SeedEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @NotBlank(message = "{blank.invalid}")
    @NotNull(message = "{null.invalid}")
    String name;

    @NotBlank(message = "{blank.invalid}")
    @NotNull(message = "{null.invalid}")
    String category;

    @Min(value = 0, message = "Seed's stock can't be negative")
    @NotNull(message = "{null.invalid}")
    Integer seedsStock;

    @Min(value = 1, message = "There cannot be zero seeds in a packet")
    @NotNull(message = "{null.invalid}")
    Integer seedsPerPacket;

    @Min(value = 1, message = "Seed's cost should not be zero")
    @NotNull(message = "{null.invalid}")
    Float cost;
}

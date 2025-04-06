package com.nursery.nursery.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class PlantDTO {
    Long id;
    String name;
    String category;
    Float plantHeight;
    Integer plantsStock;
    Float cost;
}

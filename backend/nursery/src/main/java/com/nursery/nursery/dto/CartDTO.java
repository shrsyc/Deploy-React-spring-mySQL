package com.nursery.nursery.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class CartDTO {
    Long id;
    String productName;
    String type;
    Integer quantity;
    Float cost;
}

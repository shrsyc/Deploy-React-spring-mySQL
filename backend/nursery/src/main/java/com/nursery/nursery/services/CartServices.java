package com.nursery.nursery.services;


import com.nursery.nursery.dto.CartDTO;
import com.nursery.nursery.entities.CartEntity;
import com.nursery.nursery.repositories.CartRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartServices {
    final private CartRepository cartRepository;
    final private ModelMapper modelMapper;

    public CartServices(CartRepository cartRepository, ModelMapper modelMapper) {
        this.cartRepository = cartRepository;
        this.modelMapper = modelMapper;
    }

    public List<CartDTO> getAllCarts() {
        List<CartEntity> cartEntities= cartRepository.findAll();
        return cartEntities
                .stream()
                .map(cartEntity -> modelMapper.map(cartEntity,CartDTO.class))
                .collect(Collectors.toList());
    }


    @Transactional
    public void removeDuplicatesAndUpdateCost() {
        // Fetch duplicate groups
        List<Object[]> duplicates = cartRepository.findDuplicates();

        for (Object[] duplicate : duplicates) {
            String productName = (String) duplicate[0];
            String type = (String) duplicate[1];
            Long duplicateCount = (Long) duplicate[2];

            // Find all rows matching the productName and type
            List<CartEntity> rows = cartRepository.findByProductNameAndType(productName, type);

            if (!rows.isEmpty()) {
                // Retain the first row
                CartEntity primaryRow = rows.get(0);

                // Calculate the total cost and quantity by summing up all rows
                float totalCost = 0.0F;
                int totalQuantity = 0;
                for (CartEntity row : rows) {
                    totalCost += row.getCost();
                    totalQuantity += row.getQuantity();
                }

                // Update the retained row
                primaryRow.setCost(totalCost);
                primaryRow.setQuantity(totalQuantity);
                cartRepository.save(primaryRow);

                // Delete all other rows
                rows.remove(0); // Retain the first row
                cartRepository.deleteAll(rows); // Delete the rest
            }
        }
    }


    @Transactional
    public void updateQuantityAndRecalculateCost(Long id, int newQuantity) {
        // Find the cart item by ID
        Optional<CartEntity> optionalCart = cartRepository.findById(id);

        if (optionalCart.isPresent()) {
            CartEntity cart = optionalCart.get();

            // Retrieve old quantity and cost
            int oldQuantity = cart.getQuantity();
            float oldCost = cart.getCost();

            // Recalculate the cost based on the new quantity
            float newCost = (oldCost / oldQuantity) * newQuantity;

            // Update the cart item
            cart.setQuantity(newQuantity);
            cart.setCost(newCost);

            // Save the updated cart item
            cartRepository.save(cart);
        } else {
            throw new EntityNotFoundException("Cart item with ID " + id + " not found.");
        }
    }


    public Boolean postCart(CartDTO inputCart) {
        CartEntity toSaveEntity=modelMapper.map(inputCart,CartEntity.class);
        cartRepository.save(toSaveEntity);
        removeDuplicatesAndUpdateCost();
        return true;
    }

    public boolean deleteCartById(Long cartId){
        boolean exists=cartRepository.existsById(cartId);
        if(!exists)return false;
        cartRepository.deleteById(cartId);
        return true;
    }

    public boolean deleteCart(Boolean Cart){
        if(Cart){
            cartRepository.deleteAll();
            return cartRepository.count() == 0;
        }
        else return false;
    }

    public CartDTO partiallyUpdateCartById(Long cartId, Map<String, Object> updates) {
        // Check if the seed exists
        boolean exists = cartRepository.existsById(cartId);
        if (!exists) {
            return null;
        }

        // Retrieve the seed entity
        CartEntity cartEntity = cartRepository.findById(cartId).get();

        // Handle the 'cost' field update explicitly
        if (updates.containsKey("cost")) {
            Object costValue = updates.get("cost");
            if (costValue instanceof Number) {
                cartEntity.setCost(((Number) costValue).floatValue());
                updates.remove("cost"); // Avoid duplicate updates in the reflection block
            } else {
                throw new IllegalArgumentException("Invalid data type for cost");
            }
        }
        updates.forEach((field, value) -> {
            Field fieldToBeUpdated = ReflectionUtils.findField(CartEntity.class, field);
            if (fieldToBeUpdated != null) {
                fieldToBeUpdated.setAccessible(true);
                ReflectionUtils.setField(fieldToBeUpdated, cartEntity, value);
            }
        });

        // Save the updated entity and map to DTO
        return modelMapper.map(cartRepository.save(cartEntity), CartDTO.class);
    }


}

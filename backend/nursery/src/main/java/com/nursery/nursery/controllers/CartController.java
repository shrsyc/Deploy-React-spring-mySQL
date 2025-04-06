package com.nursery.nursery.controllers;

import com.nursery.nursery.dto.CartDTO;
import com.nursery.nursery.services.CartServices;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping(path = "/cart")
public class CartController {
    private final CartServices cartServices;

    public CartController(CartServices cartServices) {
        this.cartServices = cartServices;
    }

    @GetMapping
    public List<CartDTO> getAllCarts(){
        return cartServices.getAllCarts();
    }

    @PostMapping
    public Boolean postCart(@RequestBody @Valid CartDTO inputCart){
        cartServices.postCart(inputCart);
        return true;
    }

    @PostMapping(path = "/{CartId}")
    public void editQuantity(@RequestParam("quantity") Integer quantity,@PathVariable Long CartId) {
        cartServices.updateQuantityAndRecalculateCost(CartId,quantity);
    }

    @DeleteMapping(path = "/{CartId}")
    public boolean deleteCartById(@PathVariable Long CartId){
        boolean found=cartServices.deleteCartById(CartId);
        if(!found)return false ;
        return true;
    }

    @DeleteMapping(path = "/deleteAll/{Cart}")
    public boolean deleteCart(@PathVariable Boolean Cart){
        return cartServices.deleteCart(Cart);
    }

    @PatchMapping(path = "/{CartId}")
    public CartDTO partiallyUpdateCartById(@RequestBody Map<String,Object> updates, @PathVariable Long CartId){
        return cartServices.partiallyUpdateCartById(CartId,updates);
    }

}

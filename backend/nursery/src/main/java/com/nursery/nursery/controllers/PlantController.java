package com.nursery.nursery.controllers;


import com.nursery.nursery.dto.PlantDTO;
import com.nursery.nursery.dto.SeedDTO;
import com.nursery.nursery.services.PlantServices;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping(path = "/plants")
public class PlantController {

    private final PlantServices plantServices;

    public PlantController(PlantServices plantServices) {
        this.plantServices = plantServices;
    }
    @GetMapping
    public List<PlantDTO> getAllPlants(){
        return plantServices.getAllPlants();
    }

    @PostMapping
    public Boolean postPlant(@RequestBody @Valid PlantDTO inputPlant){
        plantServices.postPlant(inputPlant);
        return true;
    }

    @DeleteMapping(path = "/{PlantId}")
    public boolean deletePlantById(@PathVariable Long PlantId){
        boolean found=plantServices.deletePlantById(PlantId);
        if(!found)return false ;
        return true;
    }

    @PatchMapping(path = "/{PlantId}")
    public PlantDTO partiallyUpdatePlantById(@RequestBody Map<String,Object> updates, @PathVariable Long PlantId){
        return plantServices.partiallyUpdatePlantById(PlantId,updates);
    }
}

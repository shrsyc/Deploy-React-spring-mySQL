package com.nursery.nursery.services;

import com.nursery.nursery.dto.PlantDTO;

import com.nursery.nursery.entities.PlantEntity;

import com.nursery.nursery.repositories.PlantRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PlantServices {

    private final PlantRepository plantRepository;
    private final ModelMapper modelMapper;

    public PlantServices(PlantRepository plantRepository, ModelMapper modelMapper) {
        this.plantRepository = plantRepository;
        this.modelMapper = modelMapper;
    }

    public List<PlantDTO> getAllPlants() {
        List<PlantEntity> plantEntities= plantRepository.findAll();
        return plantEntities
                .stream()
                .map(plantEntity -> modelMapper.map(plantEntity,PlantDTO.class))
                .collect(Collectors.toList());
    }

    public Boolean postPlant(PlantDTO inputPlant) {
        PlantEntity toSaveEntity=modelMapper.map(inputPlant,PlantEntity.class);
        plantRepository.save(toSaveEntity);
        return true;
    }

    public boolean deletePlantById(Long plantId){
        boolean exists=plantRepository.existsById(plantId);
        if(!exists)return false;
        plantRepository.deleteById(plantId);
        return true;
    }




    public PlantDTO partiallyUpdatePlantById(Long plantId, Map<String, Object> updates) {
        // Check if the seed exists
        boolean exists = plantRepository.existsById(plantId);
        if (!exists) {
            return null;
        }

        // Retrieve the seed entity
        PlantEntity plantEntity = plantRepository.findById(plantId).get();

        // Handle the 'cost' field update explicitly
        if (updates.containsKey("cost")) {
            Object costValue = updates.get("cost");
            if (costValue instanceof Number) {
                plantEntity.setCost(((Number) costValue).floatValue());
                updates.remove("cost"); // Avoid duplicate updates in the reflection block
            } else {
                throw new IllegalArgumentException("Invalid data type for cost");
            }
        }
        if (updates.containsKey("plantHeight")) {
            Object costValue2 = updates.get("plantHeight");
            if (costValue2 instanceof Number) {
                plantEntity.setPlantHeight(((Number) costValue2).floatValue());
                updates.remove("plantHeight"); // Avoid duplicate updates in the reflection block
            } else {
                throw new IllegalArgumentException("Invalid data type for plantHeight");
            }
        }
        // Use reflection to update other fields
        updates.forEach((field, value) -> {
            Field fieldToBeUpdated = ReflectionUtils.findField(PlantEntity.class, field);
            if (fieldToBeUpdated != null) {
                fieldToBeUpdated.setAccessible(true);
                ReflectionUtils.setField(fieldToBeUpdated, plantEntity, value);
            }
        });

        // Save the updated entity and map to DTO
        return modelMapper.map(plantRepository.save(plantEntity), PlantDTO.class);
    }

}

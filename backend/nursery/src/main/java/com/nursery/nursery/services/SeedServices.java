package com.nursery.nursery.services;

import com.nursery.nursery.dto.SeedDTO;
import com.nursery.nursery.entities.SeedEntity;
import com.nursery.nursery.repositories.SeedRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class SeedServices {

    private final SeedRepository seedRepository;
    private final ModelMapper modelMapper;

    public SeedServices(SeedRepository seedRepository, ModelMapper modelMapper) {
        this.seedRepository = seedRepository;
        this.modelMapper = modelMapper;
    }

    public List<SeedDTO> getAllSeeds() {
        List<SeedEntity> seedEntities= seedRepository.findAll();
        return seedEntities
                .stream()
                .map(seedEntity -> modelMapper.map(seedEntity,SeedDTO.class))
                .collect(Collectors.toList());
    }

    public Boolean postSeed(SeedDTO inputSeed) {
        SeedEntity toSaveEntity=modelMapper.map(inputSeed,SeedEntity.class);
        seedRepository.save(toSaveEntity);
        return true;
    }

    public boolean deleteSeedById(Long seedId){
        boolean exists=seedRepository.existsById(seedId);
        if(!exists)return false;
        seedRepository.deleteById(seedId);
        return true;
    }

    public SeedDTO partiallyUpdateSeedById(Long seedId, Map<String, Object> updates) {
        // Check if the seed exists
        boolean exists = seedRepository.existsById(seedId);
        if (!exists) {
            return null;
        }

        // Retrieve the seed entity
        SeedEntity seedEntity = seedRepository.findById(seedId).get();

        // Handle the 'cost' field update explicitly
        if (updates.containsKey("cost")) {
            Object costValue = updates.get("cost");
            if (costValue instanceof Number) {
                seedEntity.setCost(((Number) costValue).floatValue());
                updates.remove("cost"); // Avoid duplicate updates in the reflection block
            } else {
                throw new IllegalArgumentException("Invalid data type for cost");
            }
        }

        // Use reflection to update other fields
        updates.forEach((field, value) -> {
            Field fieldToBeUpdated = ReflectionUtils.findField(SeedEntity.class, field);
            if (fieldToBeUpdated != null) {
                fieldToBeUpdated.setAccessible(true);
                ReflectionUtils.setField(fieldToBeUpdated, seedEntity, value);
            }
        });

        // Save the updated entity and map to DTO
        return modelMapper.map(seedRepository.save(seedEntity), SeedDTO.class);
    }

}


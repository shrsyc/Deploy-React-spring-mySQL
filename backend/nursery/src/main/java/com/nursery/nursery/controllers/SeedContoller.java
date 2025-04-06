package com.nursery.nursery.controllers;

import com.nursery.nursery.dto.SeedDTO;
import com.nursery.nursery.services.SeedServices;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping(path = "/seeds")
public class SeedContoller {

    final private SeedServices seedServices;

    public SeedContoller(SeedServices seedServices) {
        this.seedServices = seedServices;
    }

    @GetMapping
    public List<SeedDTO> getAllSeeds(){
        return seedServices.getAllSeeds();
    }

    @PostMapping
    public Boolean postSeed(@RequestBody @Valid SeedDTO inputSeed){
        seedServices.postSeed(inputSeed);
        return true;
    }

    @DeleteMapping(path = "/{SeedId}")
    public boolean deleteSeedById(@PathVariable Long SeedId){
        boolean found=seedServices.deleteSeedById(SeedId);
        if(!found)return false ;
        return true;
    }

    @PatchMapping(path = "/{SeedId}")
    public SeedDTO partiallyUpdateSeedById(@RequestBody Map<String,Object> updates, @PathVariable Long SeedId){
        return seedServices.partiallyUpdateSeedById(SeedId,updates);
    }
}

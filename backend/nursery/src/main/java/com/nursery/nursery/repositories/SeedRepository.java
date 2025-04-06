package com.nursery.nursery.repositories;

import com.nursery.nursery.entities.SeedEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeedRepository extends JpaRepository<SeedEntity,Long> {

}

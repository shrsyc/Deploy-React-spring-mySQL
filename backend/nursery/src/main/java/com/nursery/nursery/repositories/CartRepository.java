package com.nursery.nursery.repositories;

import com.nursery.nursery.entities.CartEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<CartEntity,Long> {

    @Query("SELECT c.productName, c.type, COUNT(c.id) as duplicateCount " +
            "FROM CartEntity c " +
            "GROUP BY c.productName, c.type " +
            "HAVING COUNT(c.id) > 1")
    List<Object[]> findDuplicates();

    List<CartEntity> findByProductNameAndType(String productName, String type);
}

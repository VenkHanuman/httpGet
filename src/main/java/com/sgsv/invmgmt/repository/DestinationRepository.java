package com.sgsv.invmgmt.repository;

import com.sgsv.invmgmt.domain.Destination;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Destination entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DestinationRepository extends JpaRepository<Destination, Long> {}

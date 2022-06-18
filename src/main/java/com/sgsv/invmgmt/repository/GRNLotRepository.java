package com.sgsv.invmgmt.repository;

import com.sgsv.invmgmt.domain.GRNLot;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the GRNLot entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GRNLotRepository extends JpaRepository<GRNLot, Long> {}

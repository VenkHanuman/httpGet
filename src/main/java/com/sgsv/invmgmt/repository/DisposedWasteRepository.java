package com.sgsv.invmgmt.repository;

import com.sgsv.invmgmt.domain.DisposedWaste;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the DisposedWaste entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DisposedWasteRepository extends JpaRepository<DisposedWaste, Long> {}

package com.sgsv.invmgmt.repository;

import com.sgsv.invmgmt.domain.MaterialOutput;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the MaterialOutput entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MaterialOutputRepository extends JpaRepository<MaterialOutput, Long> {}

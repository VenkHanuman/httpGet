package com.sgsv.invmgmt.repository;

import com.sgsv.invmgmt.domain.OutputBundle;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the OutputBundle entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OutputBundleRepository extends JpaRepository<OutputBundle, Long> {}

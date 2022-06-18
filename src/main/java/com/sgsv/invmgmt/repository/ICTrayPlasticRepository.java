package com.sgsv.invmgmt.repository;

import com.sgsv.invmgmt.domain.ICTrayPlastic;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ICTrayPlastic entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ICTrayPlasticRepository extends JpaRepository<ICTrayPlastic, Long> {}

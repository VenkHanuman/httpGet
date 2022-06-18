package com.sgsv.invmgmt.service;

import com.sgsv.invmgmt.service.dto.ICTrayPlasticDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.sgsv.invmgmt.domain.ICTrayPlastic}.
 */
public interface ICTrayPlasticService {
    /**
     * Save a iCTrayPlastic.
     *
     * @param iCTrayPlasticDTO the entity to save.
     * @return the persisted entity.
     */
    ICTrayPlasticDTO save(ICTrayPlasticDTO iCTrayPlasticDTO);

    /**
     * Updates a iCTrayPlastic.
     *
     * @param iCTrayPlasticDTO the entity to update.
     * @return the persisted entity.
     */
    ICTrayPlasticDTO update(ICTrayPlasticDTO iCTrayPlasticDTO);

    /**
     * Partially updates a iCTrayPlastic.
     *
     * @param iCTrayPlasticDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ICTrayPlasticDTO> partialUpdate(ICTrayPlasticDTO iCTrayPlasticDTO);

    /**
     * Get all the iCTrayPlastics.
     *
     * @return the list of entities.
     */
    List<ICTrayPlasticDTO> findAll();

    /**
     * Get the "id" iCTrayPlastic.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ICTrayPlasticDTO> findOne(Long id);

    /**
     * Delete the "id" iCTrayPlastic.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

package com.sgsv.invmgmt.service;

import com.sgsv.invmgmt.service.dto.MaterialOutputDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.sgsv.invmgmt.domain.MaterialOutput}.
 */
public interface MaterialOutputService {
    /**
     * Save a materialOutput.
     *
     * @param materialOutputDTO the entity to save.
     * @return the persisted entity.
     */
    MaterialOutputDTO save(MaterialOutputDTO materialOutputDTO);

    /**
     * Updates a materialOutput.
     *
     * @param materialOutputDTO the entity to update.
     * @return the persisted entity.
     */
    MaterialOutputDTO update(MaterialOutputDTO materialOutputDTO);

    /**
     * Partially updates a materialOutput.
     *
     * @param materialOutputDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<MaterialOutputDTO> partialUpdate(MaterialOutputDTO materialOutputDTO);

    /**
     * Get all the materialOutputs.
     *
     * @return the list of entities.
     */
    List<MaterialOutputDTO> findAll();

    /**
     * Get the "id" materialOutput.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<MaterialOutputDTO> findOne(Long id);

    /**
     * Delete the "id" materialOutput.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

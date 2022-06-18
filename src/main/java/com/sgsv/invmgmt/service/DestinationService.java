package com.sgsv.invmgmt.service;

import com.sgsv.invmgmt.service.dto.DestinationDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.sgsv.invmgmt.domain.Destination}.
 */
public interface DestinationService {
    /**
     * Save a destination.
     *
     * @param destinationDTO the entity to save.
     * @return the persisted entity.
     */
    DestinationDTO save(DestinationDTO destinationDTO);

    /**
     * Updates a destination.
     *
     * @param destinationDTO the entity to update.
     * @return the persisted entity.
     */
    DestinationDTO update(DestinationDTO destinationDTO);

    /**
     * Partially updates a destination.
     *
     * @param destinationDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<DestinationDTO> partialUpdate(DestinationDTO destinationDTO);

    /**
     * Get all the destinations.
     *
     * @return the list of entities.
     */
    List<DestinationDTO> findAll();

    /**
     * Get the "id" destination.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DestinationDTO> findOne(Long id);

    /**
     * Delete the "id" destination.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

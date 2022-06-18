package com.sgsv.invmgmt.service;

import com.sgsv.invmgmt.service.dto.DisposedWasteDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.sgsv.invmgmt.domain.DisposedWaste}.
 */
public interface DisposedWasteService {
    /**
     * Save a disposedWaste.
     *
     * @param disposedWasteDTO the entity to save.
     * @return the persisted entity.
     */
    DisposedWasteDTO save(DisposedWasteDTO disposedWasteDTO);

    /**
     * Updates a disposedWaste.
     *
     * @param disposedWasteDTO the entity to update.
     * @return the persisted entity.
     */
    DisposedWasteDTO update(DisposedWasteDTO disposedWasteDTO);

    /**
     * Partially updates a disposedWaste.
     *
     * @param disposedWasteDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<DisposedWasteDTO> partialUpdate(DisposedWasteDTO disposedWasteDTO);

    /**
     * Get all the disposedWastes.
     *
     * @return the list of entities.
     */
    List<DisposedWasteDTO> findAll();

    /**
     * Get the "id" disposedWaste.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DisposedWasteDTO> findOne(Long id);

    /**
     * Delete the "id" disposedWaste.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

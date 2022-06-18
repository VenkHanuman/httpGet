package com.sgsv.invmgmt.service;

import com.sgsv.invmgmt.service.dto.OutputBundleDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.sgsv.invmgmt.domain.OutputBundle}.
 */
public interface OutputBundleService {
    /**
     * Save a outputBundle.
     *
     * @param outputBundleDTO the entity to save.
     * @return the persisted entity.
     */
    OutputBundleDTO save(OutputBundleDTO outputBundleDTO);

    /**
     * Updates a outputBundle.
     *
     * @param outputBundleDTO the entity to update.
     * @return the persisted entity.
     */
    OutputBundleDTO update(OutputBundleDTO outputBundleDTO);

    /**
     * Partially updates a outputBundle.
     *
     * @param outputBundleDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<OutputBundleDTO> partialUpdate(OutputBundleDTO outputBundleDTO);

    /**
     * Get all the outputBundles.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<OutputBundleDTO> findAll(Pageable pageable);

    /**
     * Get the "id" outputBundle.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<OutputBundleDTO> findOne(Long id);

    /**
     * Delete the "id" outputBundle.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

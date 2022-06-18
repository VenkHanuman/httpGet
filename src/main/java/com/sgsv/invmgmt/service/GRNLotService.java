package com.sgsv.invmgmt.service;

import com.sgsv.invmgmt.service.dto.GRNLotDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.sgsv.invmgmt.domain.GRNLot}.
 */
public interface GRNLotService {
    /**
     * Save a gRNLot.
     *
     * @param gRNLotDTO the entity to save.
     * @return the persisted entity.
     */
    GRNLotDTO save(GRNLotDTO gRNLotDTO);

    /**
     * Updates a gRNLot.
     *
     * @param gRNLotDTO the entity to update.
     * @return the persisted entity.
     */
    GRNLotDTO update(GRNLotDTO gRNLotDTO);

    /**
     * Partially updates a gRNLot.
     *
     * @param gRNLotDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<GRNLotDTO> partialUpdate(GRNLotDTO gRNLotDTO);

    /**
     * Get all the gRNLots.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<GRNLotDTO> findAll(Pageable pageable);

    /**
     * Get the "id" gRNLot.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<GRNLotDTO> findOne(Long id);

    /**
     * Delete the "id" gRNLot.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

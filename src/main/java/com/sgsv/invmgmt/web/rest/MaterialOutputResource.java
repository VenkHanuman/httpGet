package com.sgsv.invmgmt.web.rest;

import com.sgsv.invmgmt.repository.MaterialOutputRepository;
import com.sgsv.invmgmt.service.MaterialOutputService;
import com.sgsv.invmgmt.service.dto.MaterialOutputDTO;
import com.sgsv.invmgmt.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.sgsv.invmgmt.domain.MaterialOutput}.
 */
@RestController
@RequestMapping("/api")
public class MaterialOutputResource {

    private final Logger log = LoggerFactory.getLogger(MaterialOutputResource.class);

    private static final String ENTITY_NAME = "materialOutput";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MaterialOutputService materialOutputService;

    private final MaterialOutputRepository materialOutputRepository;

    public MaterialOutputResource(MaterialOutputService materialOutputService, MaterialOutputRepository materialOutputRepository) {
        this.materialOutputService = materialOutputService;
        this.materialOutputRepository = materialOutputRepository;
    }

    /**
     * {@code POST  /material-outputs} : Create a new materialOutput.
     *
     * @param materialOutputDTO the materialOutputDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new materialOutputDTO, or with status {@code 400 (Bad Request)} if the materialOutput has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/material-outputs")
    public ResponseEntity<MaterialOutputDTO> createMaterialOutput(@RequestBody MaterialOutputDTO materialOutputDTO)
        throws URISyntaxException {
        log.debug("REST request to save MaterialOutput : {}", materialOutputDTO);
        if (materialOutputDTO.getId() != null) {
            throw new BadRequestAlertException("A new materialOutput cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MaterialOutputDTO result = materialOutputService.save(materialOutputDTO);
        return ResponseEntity
            .created(new URI("/api/material-outputs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /material-outputs/:id} : Updates an existing materialOutput.
     *
     * @param id the id of the materialOutputDTO to save.
     * @param materialOutputDTO the materialOutputDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated materialOutputDTO,
     * or with status {@code 400 (Bad Request)} if the materialOutputDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the materialOutputDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/material-outputs/{id}")
    public ResponseEntity<MaterialOutputDTO> updateMaterialOutput(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody MaterialOutputDTO materialOutputDTO
    ) throws URISyntaxException {
        log.debug("REST request to update MaterialOutput : {}, {}", id, materialOutputDTO);
        if (materialOutputDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, materialOutputDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!materialOutputRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        MaterialOutputDTO result = materialOutputService.update(materialOutputDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, materialOutputDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /material-outputs/:id} : Partial updates given fields of an existing materialOutput, field will ignore if it is null
     *
     * @param id the id of the materialOutputDTO to save.
     * @param materialOutputDTO the materialOutputDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated materialOutputDTO,
     * or with status {@code 400 (Bad Request)} if the materialOutputDTO is not valid,
     * or with status {@code 404 (Not Found)} if the materialOutputDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the materialOutputDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/material-outputs/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<MaterialOutputDTO> partialUpdateMaterialOutput(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody MaterialOutputDTO materialOutputDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update MaterialOutput partially : {}, {}", id, materialOutputDTO);
        if (materialOutputDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, materialOutputDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!materialOutputRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<MaterialOutputDTO> result = materialOutputService.partialUpdate(materialOutputDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, materialOutputDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /material-outputs} : get all the materialOutputs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of materialOutputs in body.
     */
    @GetMapping("/material-outputs")
    public List<MaterialOutputDTO> getAllMaterialOutputs() {
        log.debug("REST request to get all MaterialOutputs");
        return materialOutputService.findAll();
    }

    /**
     * {@code GET  /material-outputs/:id} : get the "id" materialOutput.
     *
     * @param id the id of the materialOutputDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the materialOutputDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/material-outputs/{id}")
    public ResponseEntity<MaterialOutputDTO> getMaterialOutput(@PathVariable Long id) {
        log.debug("REST request to get MaterialOutput : {}", id);
        Optional<MaterialOutputDTO> materialOutputDTO = materialOutputService.findOne(id);
        return ResponseUtil.wrapOrNotFound(materialOutputDTO);
    }

    /**
     * {@code DELETE  /material-outputs/:id} : delete the "id" materialOutput.
     *
     * @param id the id of the materialOutputDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/material-outputs/{id}")
    public ResponseEntity<Void> deleteMaterialOutput(@PathVariable Long id) {
        log.debug("REST request to delete MaterialOutput : {}", id);
        materialOutputService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

package com.sgsv.invmgmt.web.rest;

import com.sgsv.invmgmt.repository.DisposedWasteRepository;
import com.sgsv.invmgmt.service.DisposedWasteService;
import com.sgsv.invmgmt.service.dto.DisposedWasteDTO;
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
 * REST controller for managing {@link com.sgsv.invmgmt.domain.DisposedWaste}.
 */
@RestController
@RequestMapping("/api")
public class DisposedWasteResource {

    private final Logger log = LoggerFactory.getLogger(DisposedWasteResource.class);

    private static final String ENTITY_NAME = "disposedWaste";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DisposedWasteService disposedWasteService;

    private final DisposedWasteRepository disposedWasteRepository;

    public DisposedWasteResource(DisposedWasteService disposedWasteService, DisposedWasteRepository disposedWasteRepository) {
        this.disposedWasteService = disposedWasteService;
        this.disposedWasteRepository = disposedWasteRepository;
    }

    /**
     * {@code POST  /disposed-wastes} : Create a new disposedWaste.
     *
     * @param disposedWasteDTO the disposedWasteDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new disposedWasteDTO, or with status {@code 400 (Bad Request)} if the disposedWaste has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/disposed-wastes")
    public ResponseEntity<DisposedWasteDTO> createDisposedWaste(@RequestBody DisposedWasteDTO disposedWasteDTO) throws URISyntaxException {
        log.debug("REST request to save DisposedWaste : {}", disposedWasteDTO);
        if (disposedWasteDTO.getId() != null) {
            throw new BadRequestAlertException("A new disposedWaste cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DisposedWasteDTO result = disposedWasteService.save(disposedWasteDTO);
        return ResponseEntity
            .created(new URI("/api/disposed-wastes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /disposed-wastes/:id} : Updates an existing disposedWaste.
     *
     * @param id the id of the disposedWasteDTO to save.
     * @param disposedWasteDTO the disposedWasteDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated disposedWasteDTO,
     * or with status {@code 400 (Bad Request)} if the disposedWasteDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the disposedWasteDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/disposed-wastes/{id}")
    public ResponseEntity<DisposedWasteDTO> updateDisposedWaste(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody DisposedWasteDTO disposedWasteDTO
    ) throws URISyntaxException {
        log.debug("REST request to update DisposedWaste : {}, {}", id, disposedWasteDTO);
        if (disposedWasteDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, disposedWasteDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!disposedWasteRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        DisposedWasteDTO result = disposedWasteService.update(disposedWasteDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, disposedWasteDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /disposed-wastes/:id} : Partial updates given fields of an existing disposedWaste, field will ignore if it is null
     *
     * @param id the id of the disposedWasteDTO to save.
     * @param disposedWasteDTO the disposedWasteDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated disposedWasteDTO,
     * or with status {@code 400 (Bad Request)} if the disposedWasteDTO is not valid,
     * or with status {@code 404 (Not Found)} if the disposedWasteDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the disposedWasteDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/disposed-wastes/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<DisposedWasteDTO> partialUpdateDisposedWaste(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody DisposedWasteDTO disposedWasteDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update DisposedWaste partially : {}, {}", id, disposedWasteDTO);
        if (disposedWasteDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, disposedWasteDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!disposedWasteRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<DisposedWasteDTO> result = disposedWasteService.partialUpdate(disposedWasteDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, disposedWasteDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /disposed-wastes} : get all the disposedWastes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of disposedWastes in body.
     */
    @GetMapping("/disposed-wastes")
    public List<DisposedWasteDTO> getAllDisposedWastes() {
        log.debug("REST request to get all DisposedWastes");
        return disposedWasteService.findAll();
    }

    /**
     * {@code GET  /disposed-wastes/:id} : get the "id" disposedWaste.
     *
     * @param id the id of the disposedWasteDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the disposedWasteDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/disposed-wastes/{id}")
    public ResponseEntity<DisposedWasteDTO> getDisposedWaste(@PathVariable Long id) {
        log.debug("REST request to get DisposedWaste : {}", id);
        Optional<DisposedWasteDTO> disposedWasteDTO = disposedWasteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(disposedWasteDTO);
    }

    /**
     * {@code DELETE  /disposed-wastes/:id} : delete the "id" disposedWaste.
     *
     * @param id the id of the disposedWasteDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/disposed-wastes/{id}")
    public ResponseEntity<Void> deleteDisposedWaste(@PathVariable Long id) {
        log.debug("REST request to delete DisposedWaste : {}", id);
        disposedWasteService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

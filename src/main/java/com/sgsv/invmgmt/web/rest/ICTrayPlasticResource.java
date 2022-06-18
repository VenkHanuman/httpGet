package com.sgsv.invmgmt.web.rest;

import com.sgsv.invmgmt.repository.ICTrayPlasticRepository;
import com.sgsv.invmgmt.service.ICTrayPlasticService;
import com.sgsv.invmgmt.service.dto.ICTrayPlasticDTO;
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
 * REST controller for managing {@link com.sgsv.invmgmt.domain.ICTrayPlastic}.
 */
@RestController
@RequestMapping("/api")
public class ICTrayPlasticResource {

    private final Logger log = LoggerFactory.getLogger(ICTrayPlasticResource.class);

    private static final String ENTITY_NAME = "iCTrayPlastic";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ICTrayPlasticService iCTrayPlasticService;

    private final ICTrayPlasticRepository iCTrayPlasticRepository;

    public ICTrayPlasticResource(ICTrayPlasticService iCTrayPlasticService, ICTrayPlasticRepository iCTrayPlasticRepository) {
        this.iCTrayPlasticService = iCTrayPlasticService;
        this.iCTrayPlasticRepository = iCTrayPlasticRepository;
    }

    /**
     * {@code POST  /ic-tray-plastics} : Create a new iCTrayPlastic.
     *
     * @param iCTrayPlasticDTO the iCTrayPlasticDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new iCTrayPlasticDTO, or with status {@code 400 (Bad Request)} if the iCTrayPlastic has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ic-tray-plastics")
    public ResponseEntity<ICTrayPlasticDTO> createICTrayPlastic(@RequestBody ICTrayPlasticDTO iCTrayPlasticDTO) throws URISyntaxException {
        log.debug("REST request to save ICTrayPlastic : {}", iCTrayPlasticDTO);
        if (iCTrayPlasticDTO.getId() != null) {
            throw new BadRequestAlertException("A new iCTrayPlastic cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ICTrayPlasticDTO result = iCTrayPlasticService.save(iCTrayPlasticDTO);
        return ResponseEntity
            .created(new URI("/api/ic-tray-plastics/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ic-tray-plastics/:id} : Updates an existing iCTrayPlastic.
     *
     * @param id the id of the iCTrayPlasticDTO to save.
     * @param iCTrayPlasticDTO the iCTrayPlasticDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated iCTrayPlasticDTO,
     * or with status {@code 400 (Bad Request)} if the iCTrayPlasticDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the iCTrayPlasticDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ic-tray-plastics/{id}")
    public ResponseEntity<ICTrayPlasticDTO> updateICTrayPlastic(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ICTrayPlasticDTO iCTrayPlasticDTO
    ) throws URISyntaxException {
        log.debug("REST request to update ICTrayPlastic : {}, {}", id, iCTrayPlasticDTO);
        if (iCTrayPlasticDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, iCTrayPlasticDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!iCTrayPlasticRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ICTrayPlasticDTO result = iCTrayPlasticService.update(iCTrayPlasticDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, iCTrayPlasticDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /ic-tray-plastics/:id} : Partial updates given fields of an existing iCTrayPlastic, field will ignore if it is null
     *
     * @param id the id of the iCTrayPlasticDTO to save.
     * @param iCTrayPlasticDTO the iCTrayPlasticDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated iCTrayPlasticDTO,
     * or with status {@code 400 (Bad Request)} if the iCTrayPlasticDTO is not valid,
     * or with status {@code 404 (Not Found)} if the iCTrayPlasticDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the iCTrayPlasticDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/ic-tray-plastics/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ICTrayPlasticDTO> partialUpdateICTrayPlastic(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ICTrayPlasticDTO iCTrayPlasticDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update ICTrayPlastic partially : {}, {}", id, iCTrayPlasticDTO);
        if (iCTrayPlasticDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, iCTrayPlasticDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!iCTrayPlasticRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ICTrayPlasticDTO> result = iCTrayPlasticService.partialUpdate(iCTrayPlasticDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, iCTrayPlasticDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /ic-tray-plastics} : get all the iCTrayPlastics.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of iCTrayPlastics in body.
     */
    @GetMapping("/ic-tray-plastics")
    public List<ICTrayPlasticDTO> getAllICTrayPlastics() {
        log.debug("REST request to get all ICTrayPlastics");
        return iCTrayPlasticService.findAll();
    }

    /**
     * {@code GET  /ic-tray-plastics/:id} : get the "id" iCTrayPlastic.
     *
     * @param id the id of the iCTrayPlasticDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the iCTrayPlasticDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ic-tray-plastics/{id}")
    public ResponseEntity<ICTrayPlasticDTO> getICTrayPlastic(@PathVariable Long id) {
        log.debug("REST request to get ICTrayPlastic : {}", id);
        Optional<ICTrayPlasticDTO> iCTrayPlasticDTO = iCTrayPlasticService.findOne(id);
        return ResponseUtil.wrapOrNotFound(iCTrayPlasticDTO);
    }

    /**
     * {@code DELETE  /ic-tray-plastics/:id} : delete the "id" iCTrayPlastic.
     *
     * @param id the id of the iCTrayPlasticDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ic-tray-plastics/{id}")
    public ResponseEntity<Void> deleteICTrayPlastic(@PathVariable Long id) {
        log.debug("REST request to delete ICTrayPlastic : {}", id);
        iCTrayPlasticService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

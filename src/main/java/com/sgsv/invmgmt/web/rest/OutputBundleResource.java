package com.sgsv.invmgmt.web.rest;

import com.sgsv.invmgmt.repository.OutputBundleRepository;
import com.sgsv.invmgmt.service.OutputBundleService;
import com.sgsv.invmgmt.service.dto.OutputBundleDTO;
import com.sgsv.invmgmt.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.sgsv.invmgmt.domain.OutputBundle}.
 */
@RestController
@RequestMapping("/api")
public class OutputBundleResource {

    private final Logger log = LoggerFactory.getLogger(OutputBundleResource.class);

    private static final String ENTITY_NAME = "outputBundle";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OutputBundleService outputBundleService;

    private final OutputBundleRepository outputBundleRepository;

    public OutputBundleResource(OutputBundleService outputBundleService, OutputBundleRepository outputBundleRepository) {
        this.outputBundleService = outputBundleService;
        this.outputBundleRepository = outputBundleRepository;
    }

    /**
     * {@code POST  /output-bundles} : Create a new outputBundle.
     *
     * @param outputBundleDTO the outputBundleDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new outputBundleDTO, or with status {@code 400 (Bad Request)} if the outputBundle has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/output-bundles")
    public ResponseEntity<OutputBundleDTO> createOutputBundle(@RequestBody OutputBundleDTO outputBundleDTO) throws URISyntaxException {
        log.debug("REST request to save OutputBundle : {}", outputBundleDTO);
        if (outputBundleDTO.getId() != null) {
            throw new BadRequestAlertException("A new outputBundle cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OutputBundleDTO result = outputBundleService.save(outputBundleDTO);
        return ResponseEntity
            .created(new URI("/api/output-bundles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /output-bundles/:id} : Updates an existing outputBundle.
     *
     * @param id the id of the outputBundleDTO to save.
     * @param outputBundleDTO the outputBundleDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated outputBundleDTO,
     * or with status {@code 400 (Bad Request)} if the outputBundleDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the outputBundleDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/output-bundles/{id}")
    public ResponseEntity<OutputBundleDTO> updateOutputBundle(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody OutputBundleDTO outputBundleDTO
    ) throws URISyntaxException {
        log.debug("REST request to update OutputBundle : {}, {}", id, outputBundleDTO);
        if (outputBundleDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, outputBundleDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!outputBundleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        OutputBundleDTO result = outputBundleService.update(outputBundleDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, outputBundleDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /output-bundles/:id} : Partial updates given fields of an existing outputBundle, field will ignore if it is null
     *
     * @param id the id of the outputBundleDTO to save.
     * @param outputBundleDTO the outputBundleDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated outputBundleDTO,
     * or with status {@code 400 (Bad Request)} if the outputBundleDTO is not valid,
     * or with status {@code 404 (Not Found)} if the outputBundleDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the outputBundleDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/output-bundles/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<OutputBundleDTO> partialUpdateOutputBundle(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody OutputBundleDTO outputBundleDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update OutputBundle partially : {}, {}", id, outputBundleDTO);
        if (outputBundleDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, outputBundleDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!outputBundleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<OutputBundleDTO> result = outputBundleService.partialUpdate(outputBundleDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, outputBundleDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /output-bundles} : get all the outputBundles.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of outputBundles in body.
     */
    @GetMapping("/output-bundles")
    public ResponseEntity<List<OutputBundleDTO>> getAllOutputBundles(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of OutputBundles");
        Page<OutputBundleDTO> page = outputBundleService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /output-bundles/:id} : get the "id" outputBundle.
     *
     * @param id the id of the outputBundleDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the outputBundleDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/output-bundles/{id}")
    public ResponseEntity<OutputBundleDTO> getOutputBundle(@PathVariable Long id) {
        log.debug("REST request to get OutputBundle : {}", id);
        Optional<OutputBundleDTO> outputBundleDTO = outputBundleService.findOne(id);
        return ResponseUtil.wrapOrNotFound(outputBundleDTO);
    }

    /**
     * {@code DELETE  /output-bundles/:id} : delete the "id" outputBundle.
     *
     * @param id the id of the outputBundleDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/output-bundles/{id}")
    public ResponseEntity<Void> deleteOutputBundle(@PathVariable Long id) {
        log.debug("REST request to delete OutputBundle : {}", id);
        outputBundleService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

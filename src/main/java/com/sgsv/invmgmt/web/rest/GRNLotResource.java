package com.sgsv.invmgmt.web.rest;

import com.sgsv.invmgmt.repository.GRNLotRepository;
import com.sgsv.invmgmt.service.GRNLotService;
import com.sgsv.invmgmt.service.dto.GRNLotDTO;
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
 * REST controller for managing {@link com.sgsv.invmgmt.domain.GRNLot}.
 */
@RestController
@RequestMapping("/api")
public class GRNLotResource {

    private final Logger log = LoggerFactory.getLogger(GRNLotResource.class);

    private static final String ENTITY_NAME = "gRNLot";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GRNLotService gRNLotService;

    private final GRNLotRepository gRNLotRepository;

    public GRNLotResource(GRNLotService gRNLotService, GRNLotRepository gRNLotRepository) {
        this.gRNLotService = gRNLotService;
        this.gRNLotRepository = gRNLotRepository;
    }

    /**
     * {@code POST  /grn-lots} : Create a new gRNLot.
     *
     * @param gRNLotDTO the gRNLotDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new gRNLotDTO, or with status {@code 400 (Bad Request)} if the gRNLot has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/grn-lots")
    public ResponseEntity<GRNLotDTO> createGRNLot(@RequestBody GRNLotDTO gRNLotDTO) throws URISyntaxException {
        log.debug("REST request to save GRNLot : {}", gRNLotDTO);
        if (gRNLotDTO.getId() != null) {
            throw new BadRequestAlertException("A new gRNLot cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GRNLotDTO result = gRNLotService.save(gRNLotDTO);
        return ResponseEntity
            .created(new URI("/api/grn-lots/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /grn-lots/:id} : Updates an existing gRNLot.
     *
     * @param id the id of the gRNLotDTO to save.
     * @param gRNLotDTO the gRNLotDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated gRNLotDTO,
     * or with status {@code 400 (Bad Request)} if the gRNLotDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the gRNLotDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/grn-lots/{id}")
    public ResponseEntity<GRNLotDTO> updateGRNLot(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody GRNLotDTO gRNLotDTO
    ) throws URISyntaxException {
        log.debug("REST request to update GRNLot : {}, {}", id, gRNLotDTO);
        if (gRNLotDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, gRNLotDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!gRNLotRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        GRNLotDTO result = gRNLotService.update(gRNLotDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, gRNLotDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /grn-lots/:id} : Partial updates given fields of an existing gRNLot, field will ignore if it is null
     *
     * @param id the id of the gRNLotDTO to save.
     * @param gRNLotDTO the gRNLotDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated gRNLotDTO,
     * or with status {@code 400 (Bad Request)} if the gRNLotDTO is not valid,
     * or with status {@code 404 (Not Found)} if the gRNLotDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the gRNLotDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/grn-lots/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<GRNLotDTO> partialUpdateGRNLot(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody GRNLotDTO gRNLotDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update GRNLot partially : {}, {}", id, gRNLotDTO);
        if (gRNLotDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, gRNLotDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!gRNLotRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<GRNLotDTO> result = gRNLotService.partialUpdate(gRNLotDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, gRNLotDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /grn-lots} : get all the gRNLots.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of gRNLots in body.
     */
    @GetMapping("/grn-lots")
    public ResponseEntity<List<GRNLotDTO>> getAllGRNLots(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of GRNLots");
        Page<GRNLotDTO> page = gRNLotService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /grn-lots/:id} : get the "id" gRNLot.
     *
     * @param id the id of the gRNLotDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the gRNLotDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/grn-lots/{id}")
    public ResponseEntity<GRNLotDTO> getGRNLot(@PathVariable Long id) {
        log.debug("REST request to get GRNLot : {}", id);
        Optional<GRNLotDTO> gRNLotDTO = gRNLotService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gRNLotDTO);
    }

    /**
     * {@code DELETE  /grn-lots/:id} : delete the "id" gRNLot.
     *
     * @param id the id of the gRNLotDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/grn-lots/{id}")
    public ResponseEntity<Void> deleteGRNLot(@PathVariable Long id) {
        log.debug("REST request to delete GRNLot : {}", id);
        gRNLotService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

package com.sgsv.invmgmt.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.sgsv.invmgmt.IntegrationTest;
import com.sgsv.invmgmt.domain.GRNLot;
import com.sgsv.invmgmt.repository.GRNLotRepository;
import com.sgsv.invmgmt.service.dto.GRNLotDTO;
import com.sgsv.invmgmt.service.mapper.GRNLotMapper;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link GRNLotResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class GRNLotResourceIT {

    private static final String DEFAULT_GRN_CODE = "AAAAAAAAAA";
    private static final String UPDATED_GRN_CODE = "BBBBBBBBBB";

    private static final Instant DEFAULT_COLLECTION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_COLLECTION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_VEHICLE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_VEHICLE_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_SRC_OF_MATERIALS = "AAAAAAAAAA";
    private static final String UPDATED_SRC_OF_MATERIALS = "BBBBBBBBBB";

    private static final Long DEFAULT_TOTAL_WEIGHT = 1L;
    private static final Long UPDATED_TOTAL_WEIGHT = 2L;

    private static final String ENTITY_API_URL = "/api/grn-lots";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private GRNLotRepository gRNLotRepository;

    @Autowired
    private GRNLotMapper gRNLotMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGRNLotMockMvc;

    private GRNLot gRNLot;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GRNLot createEntity(EntityManager em) {
        GRNLot gRNLot = new GRNLot()
            .grnCode(DEFAULT_GRN_CODE)
            .collectionDate(DEFAULT_COLLECTION_DATE)
            .vehicleNumber(DEFAULT_VEHICLE_NUMBER)
            .srcOfMaterials(DEFAULT_SRC_OF_MATERIALS)
            .totalWeight(DEFAULT_TOTAL_WEIGHT);
        return gRNLot;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GRNLot createUpdatedEntity(EntityManager em) {
        GRNLot gRNLot = new GRNLot()
            .grnCode(UPDATED_GRN_CODE)
            .collectionDate(UPDATED_COLLECTION_DATE)
            .vehicleNumber(UPDATED_VEHICLE_NUMBER)
            .srcOfMaterials(UPDATED_SRC_OF_MATERIALS)
            .totalWeight(UPDATED_TOTAL_WEIGHT);
        return gRNLot;
    }

    @BeforeEach
    public void initTest() {
        gRNLot = createEntity(em);
    }

    @Test
    @Transactional
    void createGRNLot() throws Exception {
        int databaseSizeBeforeCreate = gRNLotRepository.findAll().size();
        // Create the GRNLot
        GRNLotDTO gRNLotDTO = gRNLotMapper.toDto(gRNLot);
        restGRNLotMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(gRNLotDTO)))
            .andExpect(status().isCreated());

        // Validate the GRNLot in the database
        List<GRNLot> gRNLotList = gRNLotRepository.findAll();
        assertThat(gRNLotList).hasSize(databaseSizeBeforeCreate + 1);
        GRNLot testGRNLot = gRNLotList.get(gRNLotList.size() - 1);
        assertThat(testGRNLot.getGrnCode()).isEqualTo(DEFAULT_GRN_CODE);
        assertThat(testGRNLot.getCollectionDate()).isEqualTo(DEFAULT_COLLECTION_DATE);
        assertThat(testGRNLot.getVehicleNumber()).isEqualTo(DEFAULT_VEHICLE_NUMBER);
        assertThat(testGRNLot.getSrcOfMaterials()).isEqualTo(DEFAULT_SRC_OF_MATERIALS);
        assertThat(testGRNLot.getTotalWeight()).isEqualTo(DEFAULT_TOTAL_WEIGHT);
    }

    @Test
    @Transactional
    void createGRNLotWithExistingId() throws Exception {
        // Create the GRNLot with an existing ID
        gRNLot.setId(1L);
        GRNLotDTO gRNLotDTO = gRNLotMapper.toDto(gRNLot);

        int databaseSizeBeforeCreate = gRNLotRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restGRNLotMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(gRNLotDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GRNLot in the database
        List<GRNLot> gRNLotList = gRNLotRepository.findAll();
        assertThat(gRNLotList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllGRNLots() throws Exception {
        // Initialize the database
        gRNLotRepository.saveAndFlush(gRNLot);

        // Get all the gRNLotList
        restGRNLotMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gRNLot.getId().intValue())))
            .andExpect(jsonPath("$.[*].grnCode").value(hasItem(DEFAULT_GRN_CODE)))
            .andExpect(jsonPath("$.[*].collectionDate").value(hasItem(DEFAULT_COLLECTION_DATE.toString())))
            .andExpect(jsonPath("$.[*].vehicleNumber").value(hasItem(DEFAULT_VEHICLE_NUMBER)))
            .andExpect(jsonPath("$.[*].srcOfMaterials").value(hasItem(DEFAULT_SRC_OF_MATERIALS)))
            .andExpect(jsonPath("$.[*].totalWeight").value(hasItem(DEFAULT_TOTAL_WEIGHT.intValue())));
    }

    @Test
    @Transactional
    void getGRNLot() throws Exception {
        // Initialize the database
        gRNLotRepository.saveAndFlush(gRNLot);

        // Get the gRNLot
        restGRNLotMockMvc
            .perform(get(ENTITY_API_URL_ID, gRNLot.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(gRNLot.getId().intValue()))
            .andExpect(jsonPath("$.grnCode").value(DEFAULT_GRN_CODE))
            .andExpect(jsonPath("$.collectionDate").value(DEFAULT_COLLECTION_DATE.toString()))
            .andExpect(jsonPath("$.vehicleNumber").value(DEFAULT_VEHICLE_NUMBER))
            .andExpect(jsonPath("$.srcOfMaterials").value(DEFAULT_SRC_OF_MATERIALS))
            .andExpect(jsonPath("$.totalWeight").value(DEFAULT_TOTAL_WEIGHT.intValue()));
    }

    @Test
    @Transactional
    void getNonExistingGRNLot() throws Exception {
        // Get the gRNLot
        restGRNLotMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewGRNLot() throws Exception {
        // Initialize the database
        gRNLotRepository.saveAndFlush(gRNLot);

        int databaseSizeBeforeUpdate = gRNLotRepository.findAll().size();

        // Update the gRNLot
        GRNLot updatedGRNLot = gRNLotRepository.findById(gRNLot.getId()).get();
        // Disconnect from session so that the updates on updatedGRNLot are not directly saved in db
        em.detach(updatedGRNLot);
        updatedGRNLot
            .grnCode(UPDATED_GRN_CODE)
            .collectionDate(UPDATED_COLLECTION_DATE)
            .vehicleNumber(UPDATED_VEHICLE_NUMBER)
            .srcOfMaterials(UPDATED_SRC_OF_MATERIALS)
            .totalWeight(UPDATED_TOTAL_WEIGHT);
        GRNLotDTO gRNLotDTO = gRNLotMapper.toDto(updatedGRNLot);

        restGRNLotMockMvc
            .perform(
                put(ENTITY_API_URL_ID, gRNLotDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(gRNLotDTO))
            )
            .andExpect(status().isOk());

        // Validate the GRNLot in the database
        List<GRNLot> gRNLotList = gRNLotRepository.findAll();
        assertThat(gRNLotList).hasSize(databaseSizeBeforeUpdate);
        GRNLot testGRNLot = gRNLotList.get(gRNLotList.size() - 1);
        assertThat(testGRNLot.getGrnCode()).isEqualTo(UPDATED_GRN_CODE);
        assertThat(testGRNLot.getCollectionDate()).isEqualTo(UPDATED_COLLECTION_DATE);
        assertThat(testGRNLot.getVehicleNumber()).isEqualTo(UPDATED_VEHICLE_NUMBER);
        assertThat(testGRNLot.getSrcOfMaterials()).isEqualTo(UPDATED_SRC_OF_MATERIALS);
        assertThat(testGRNLot.getTotalWeight()).isEqualTo(UPDATED_TOTAL_WEIGHT);
    }

    @Test
    @Transactional
    void putNonExistingGRNLot() throws Exception {
        int databaseSizeBeforeUpdate = gRNLotRepository.findAll().size();
        gRNLot.setId(count.incrementAndGet());

        // Create the GRNLot
        GRNLotDTO gRNLotDTO = gRNLotMapper.toDto(gRNLot);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGRNLotMockMvc
            .perform(
                put(ENTITY_API_URL_ID, gRNLotDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(gRNLotDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the GRNLot in the database
        List<GRNLot> gRNLotList = gRNLotRepository.findAll();
        assertThat(gRNLotList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchGRNLot() throws Exception {
        int databaseSizeBeforeUpdate = gRNLotRepository.findAll().size();
        gRNLot.setId(count.incrementAndGet());

        // Create the GRNLot
        GRNLotDTO gRNLotDTO = gRNLotMapper.toDto(gRNLot);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restGRNLotMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(gRNLotDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the GRNLot in the database
        List<GRNLot> gRNLotList = gRNLotRepository.findAll();
        assertThat(gRNLotList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamGRNLot() throws Exception {
        int databaseSizeBeforeUpdate = gRNLotRepository.findAll().size();
        gRNLot.setId(count.incrementAndGet());

        // Create the GRNLot
        GRNLotDTO gRNLotDTO = gRNLotMapper.toDto(gRNLot);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restGRNLotMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(gRNLotDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the GRNLot in the database
        List<GRNLot> gRNLotList = gRNLotRepository.findAll();
        assertThat(gRNLotList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateGRNLotWithPatch() throws Exception {
        // Initialize the database
        gRNLotRepository.saveAndFlush(gRNLot);

        int databaseSizeBeforeUpdate = gRNLotRepository.findAll().size();

        // Update the gRNLot using partial update
        GRNLot partialUpdatedGRNLot = new GRNLot();
        partialUpdatedGRNLot.setId(gRNLot.getId());

        partialUpdatedGRNLot
            .grnCode(UPDATED_GRN_CODE)
            .vehicleNumber(UPDATED_VEHICLE_NUMBER)
            .srcOfMaterials(UPDATED_SRC_OF_MATERIALS)
            .totalWeight(UPDATED_TOTAL_WEIGHT);

        restGRNLotMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedGRNLot.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedGRNLot))
            )
            .andExpect(status().isOk());

        // Validate the GRNLot in the database
        List<GRNLot> gRNLotList = gRNLotRepository.findAll();
        assertThat(gRNLotList).hasSize(databaseSizeBeforeUpdate);
        GRNLot testGRNLot = gRNLotList.get(gRNLotList.size() - 1);
        assertThat(testGRNLot.getGrnCode()).isEqualTo(UPDATED_GRN_CODE);
        assertThat(testGRNLot.getCollectionDate()).isEqualTo(DEFAULT_COLLECTION_DATE);
        assertThat(testGRNLot.getVehicleNumber()).isEqualTo(UPDATED_VEHICLE_NUMBER);
        assertThat(testGRNLot.getSrcOfMaterials()).isEqualTo(UPDATED_SRC_OF_MATERIALS);
        assertThat(testGRNLot.getTotalWeight()).isEqualTo(UPDATED_TOTAL_WEIGHT);
    }

    @Test
    @Transactional
    void fullUpdateGRNLotWithPatch() throws Exception {
        // Initialize the database
        gRNLotRepository.saveAndFlush(gRNLot);

        int databaseSizeBeforeUpdate = gRNLotRepository.findAll().size();

        // Update the gRNLot using partial update
        GRNLot partialUpdatedGRNLot = new GRNLot();
        partialUpdatedGRNLot.setId(gRNLot.getId());

        partialUpdatedGRNLot
            .grnCode(UPDATED_GRN_CODE)
            .collectionDate(UPDATED_COLLECTION_DATE)
            .vehicleNumber(UPDATED_VEHICLE_NUMBER)
            .srcOfMaterials(UPDATED_SRC_OF_MATERIALS)
            .totalWeight(UPDATED_TOTAL_WEIGHT);

        restGRNLotMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedGRNLot.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedGRNLot))
            )
            .andExpect(status().isOk());

        // Validate the GRNLot in the database
        List<GRNLot> gRNLotList = gRNLotRepository.findAll();
        assertThat(gRNLotList).hasSize(databaseSizeBeforeUpdate);
        GRNLot testGRNLot = gRNLotList.get(gRNLotList.size() - 1);
        assertThat(testGRNLot.getGrnCode()).isEqualTo(UPDATED_GRN_CODE);
        assertThat(testGRNLot.getCollectionDate()).isEqualTo(UPDATED_COLLECTION_DATE);
        assertThat(testGRNLot.getVehicleNumber()).isEqualTo(UPDATED_VEHICLE_NUMBER);
        assertThat(testGRNLot.getSrcOfMaterials()).isEqualTo(UPDATED_SRC_OF_MATERIALS);
        assertThat(testGRNLot.getTotalWeight()).isEqualTo(UPDATED_TOTAL_WEIGHT);
    }

    @Test
    @Transactional
    void patchNonExistingGRNLot() throws Exception {
        int databaseSizeBeforeUpdate = gRNLotRepository.findAll().size();
        gRNLot.setId(count.incrementAndGet());

        // Create the GRNLot
        GRNLotDTO gRNLotDTO = gRNLotMapper.toDto(gRNLot);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGRNLotMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, gRNLotDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(gRNLotDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the GRNLot in the database
        List<GRNLot> gRNLotList = gRNLotRepository.findAll();
        assertThat(gRNLotList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchGRNLot() throws Exception {
        int databaseSizeBeforeUpdate = gRNLotRepository.findAll().size();
        gRNLot.setId(count.incrementAndGet());

        // Create the GRNLot
        GRNLotDTO gRNLotDTO = gRNLotMapper.toDto(gRNLot);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restGRNLotMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(gRNLotDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the GRNLot in the database
        List<GRNLot> gRNLotList = gRNLotRepository.findAll();
        assertThat(gRNLotList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamGRNLot() throws Exception {
        int databaseSizeBeforeUpdate = gRNLotRepository.findAll().size();
        gRNLot.setId(count.incrementAndGet());

        // Create the GRNLot
        GRNLotDTO gRNLotDTO = gRNLotMapper.toDto(gRNLot);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restGRNLotMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(gRNLotDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the GRNLot in the database
        List<GRNLot> gRNLotList = gRNLotRepository.findAll();
        assertThat(gRNLotList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteGRNLot() throws Exception {
        // Initialize the database
        gRNLotRepository.saveAndFlush(gRNLot);

        int databaseSizeBeforeDelete = gRNLotRepository.findAll().size();

        // Delete the gRNLot
        restGRNLotMockMvc
            .perform(delete(ENTITY_API_URL_ID, gRNLot.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<GRNLot> gRNLotList = gRNLotRepository.findAll();
        assertThat(gRNLotList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

package com.sgsv.invmgmt.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.sgsv.invmgmt.IntegrationTest;
import com.sgsv.invmgmt.domain.OutputBundle;
import com.sgsv.invmgmt.repository.OutputBundleRepository;
import com.sgsv.invmgmt.service.dto.OutputBundleDTO;
import com.sgsv.invmgmt.service.mapper.OutputBundleMapper;
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
 * Integration tests for the {@link OutputBundleResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class OutputBundleResourceIT {

    private static final Long DEFAULT_TOTAL = 1L;
    private static final Long UPDATED_TOTAL = 2L;

    private static final Long DEFAULT_TOTAL_OF_DISPOSABLE_WASTE = 1L;
    private static final Long UPDATED_TOTAL_OF_DISPOSABLE_WASTE = 2L;

    private static final String ENTITY_API_URL = "/api/output-bundles";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private OutputBundleRepository outputBundleRepository;

    @Autowired
    private OutputBundleMapper outputBundleMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOutputBundleMockMvc;

    private OutputBundle outputBundle;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OutputBundle createEntity(EntityManager em) {
        OutputBundle outputBundle = new OutputBundle().total(DEFAULT_TOTAL).totalOfDisposableWaste(DEFAULT_TOTAL_OF_DISPOSABLE_WASTE);
        return outputBundle;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OutputBundle createUpdatedEntity(EntityManager em) {
        OutputBundle outputBundle = new OutputBundle().total(UPDATED_TOTAL).totalOfDisposableWaste(UPDATED_TOTAL_OF_DISPOSABLE_WASTE);
        return outputBundle;
    }

    @BeforeEach
    public void initTest() {
        outputBundle = createEntity(em);
    }

    @Test
    @Transactional
    void createOutputBundle() throws Exception {
        int databaseSizeBeforeCreate = outputBundleRepository.findAll().size();
        // Create the OutputBundle
        OutputBundleDTO outputBundleDTO = outputBundleMapper.toDto(outputBundle);
        restOutputBundleMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(outputBundleDTO))
            )
            .andExpect(status().isCreated());

        // Validate the OutputBundle in the database
        List<OutputBundle> outputBundleList = outputBundleRepository.findAll();
        assertThat(outputBundleList).hasSize(databaseSizeBeforeCreate + 1);
        OutputBundle testOutputBundle = outputBundleList.get(outputBundleList.size() - 1);
        assertThat(testOutputBundle.getTotal()).isEqualTo(DEFAULT_TOTAL);
        assertThat(testOutputBundle.getTotalOfDisposableWaste()).isEqualTo(DEFAULT_TOTAL_OF_DISPOSABLE_WASTE);
    }

    @Test
    @Transactional
    void createOutputBundleWithExistingId() throws Exception {
        // Create the OutputBundle with an existing ID
        outputBundle.setId(1L);
        OutputBundleDTO outputBundleDTO = outputBundleMapper.toDto(outputBundle);

        int databaseSizeBeforeCreate = outputBundleRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restOutputBundleMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(outputBundleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the OutputBundle in the database
        List<OutputBundle> outputBundleList = outputBundleRepository.findAll();
        assertThat(outputBundleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllOutputBundles() throws Exception {
        // Initialize the database
        outputBundleRepository.saveAndFlush(outputBundle);

        // Get all the outputBundleList
        restOutputBundleMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(outputBundle.getId().intValue())))
            .andExpect(jsonPath("$.[*].total").value(hasItem(DEFAULT_TOTAL.intValue())))
            .andExpect(jsonPath("$.[*].totalOfDisposableWaste").value(hasItem(DEFAULT_TOTAL_OF_DISPOSABLE_WASTE.intValue())));
    }

    @Test
    @Transactional
    void getOutputBundle() throws Exception {
        // Initialize the database
        outputBundleRepository.saveAndFlush(outputBundle);

        // Get the outputBundle
        restOutputBundleMockMvc
            .perform(get(ENTITY_API_URL_ID, outputBundle.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(outputBundle.getId().intValue()))
            .andExpect(jsonPath("$.total").value(DEFAULT_TOTAL.intValue()))
            .andExpect(jsonPath("$.totalOfDisposableWaste").value(DEFAULT_TOTAL_OF_DISPOSABLE_WASTE.intValue()));
    }

    @Test
    @Transactional
    void getNonExistingOutputBundle() throws Exception {
        // Get the outputBundle
        restOutputBundleMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewOutputBundle() throws Exception {
        // Initialize the database
        outputBundleRepository.saveAndFlush(outputBundle);

        int databaseSizeBeforeUpdate = outputBundleRepository.findAll().size();

        // Update the outputBundle
        OutputBundle updatedOutputBundle = outputBundleRepository.findById(outputBundle.getId()).get();
        // Disconnect from session so that the updates on updatedOutputBundle are not directly saved in db
        em.detach(updatedOutputBundle);
        updatedOutputBundle.total(UPDATED_TOTAL).totalOfDisposableWaste(UPDATED_TOTAL_OF_DISPOSABLE_WASTE);
        OutputBundleDTO outputBundleDTO = outputBundleMapper.toDto(updatedOutputBundle);

        restOutputBundleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, outputBundleDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(outputBundleDTO))
            )
            .andExpect(status().isOk());

        // Validate the OutputBundle in the database
        List<OutputBundle> outputBundleList = outputBundleRepository.findAll();
        assertThat(outputBundleList).hasSize(databaseSizeBeforeUpdate);
        OutputBundle testOutputBundle = outputBundleList.get(outputBundleList.size() - 1);
        assertThat(testOutputBundle.getTotal()).isEqualTo(UPDATED_TOTAL);
        assertThat(testOutputBundle.getTotalOfDisposableWaste()).isEqualTo(UPDATED_TOTAL_OF_DISPOSABLE_WASTE);
    }

    @Test
    @Transactional
    void putNonExistingOutputBundle() throws Exception {
        int databaseSizeBeforeUpdate = outputBundleRepository.findAll().size();
        outputBundle.setId(count.incrementAndGet());

        // Create the OutputBundle
        OutputBundleDTO outputBundleDTO = outputBundleMapper.toDto(outputBundle);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOutputBundleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, outputBundleDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(outputBundleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the OutputBundle in the database
        List<OutputBundle> outputBundleList = outputBundleRepository.findAll();
        assertThat(outputBundleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchOutputBundle() throws Exception {
        int databaseSizeBeforeUpdate = outputBundleRepository.findAll().size();
        outputBundle.setId(count.incrementAndGet());

        // Create the OutputBundle
        OutputBundleDTO outputBundleDTO = outputBundleMapper.toDto(outputBundle);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOutputBundleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(outputBundleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the OutputBundle in the database
        List<OutputBundle> outputBundleList = outputBundleRepository.findAll();
        assertThat(outputBundleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamOutputBundle() throws Exception {
        int databaseSizeBeforeUpdate = outputBundleRepository.findAll().size();
        outputBundle.setId(count.incrementAndGet());

        // Create the OutputBundle
        OutputBundleDTO outputBundleDTO = outputBundleMapper.toDto(outputBundle);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOutputBundleMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(outputBundleDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the OutputBundle in the database
        List<OutputBundle> outputBundleList = outputBundleRepository.findAll();
        assertThat(outputBundleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateOutputBundleWithPatch() throws Exception {
        // Initialize the database
        outputBundleRepository.saveAndFlush(outputBundle);

        int databaseSizeBeforeUpdate = outputBundleRepository.findAll().size();

        // Update the outputBundle using partial update
        OutputBundle partialUpdatedOutputBundle = new OutputBundle();
        partialUpdatedOutputBundle.setId(outputBundle.getId());

        partialUpdatedOutputBundle.total(UPDATED_TOTAL).totalOfDisposableWaste(UPDATED_TOTAL_OF_DISPOSABLE_WASTE);

        restOutputBundleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOutputBundle.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOutputBundle))
            )
            .andExpect(status().isOk());

        // Validate the OutputBundle in the database
        List<OutputBundle> outputBundleList = outputBundleRepository.findAll();
        assertThat(outputBundleList).hasSize(databaseSizeBeforeUpdate);
        OutputBundle testOutputBundle = outputBundleList.get(outputBundleList.size() - 1);
        assertThat(testOutputBundle.getTotal()).isEqualTo(UPDATED_TOTAL);
        assertThat(testOutputBundle.getTotalOfDisposableWaste()).isEqualTo(UPDATED_TOTAL_OF_DISPOSABLE_WASTE);
    }

    @Test
    @Transactional
    void fullUpdateOutputBundleWithPatch() throws Exception {
        // Initialize the database
        outputBundleRepository.saveAndFlush(outputBundle);

        int databaseSizeBeforeUpdate = outputBundleRepository.findAll().size();

        // Update the outputBundle using partial update
        OutputBundle partialUpdatedOutputBundle = new OutputBundle();
        partialUpdatedOutputBundle.setId(outputBundle.getId());

        partialUpdatedOutputBundle.total(UPDATED_TOTAL).totalOfDisposableWaste(UPDATED_TOTAL_OF_DISPOSABLE_WASTE);

        restOutputBundleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOutputBundle.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOutputBundle))
            )
            .andExpect(status().isOk());

        // Validate the OutputBundle in the database
        List<OutputBundle> outputBundleList = outputBundleRepository.findAll();
        assertThat(outputBundleList).hasSize(databaseSizeBeforeUpdate);
        OutputBundle testOutputBundle = outputBundleList.get(outputBundleList.size() - 1);
        assertThat(testOutputBundle.getTotal()).isEqualTo(UPDATED_TOTAL);
        assertThat(testOutputBundle.getTotalOfDisposableWaste()).isEqualTo(UPDATED_TOTAL_OF_DISPOSABLE_WASTE);
    }

    @Test
    @Transactional
    void patchNonExistingOutputBundle() throws Exception {
        int databaseSizeBeforeUpdate = outputBundleRepository.findAll().size();
        outputBundle.setId(count.incrementAndGet());

        // Create the OutputBundle
        OutputBundleDTO outputBundleDTO = outputBundleMapper.toDto(outputBundle);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOutputBundleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, outputBundleDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(outputBundleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the OutputBundle in the database
        List<OutputBundle> outputBundleList = outputBundleRepository.findAll();
        assertThat(outputBundleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchOutputBundle() throws Exception {
        int databaseSizeBeforeUpdate = outputBundleRepository.findAll().size();
        outputBundle.setId(count.incrementAndGet());

        // Create the OutputBundle
        OutputBundleDTO outputBundleDTO = outputBundleMapper.toDto(outputBundle);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOutputBundleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(outputBundleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the OutputBundle in the database
        List<OutputBundle> outputBundleList = outputBundleRepository.findAll();
        assertThat(outputBundleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamOutputBundle() throws Exception {
        int databaseSizeBeforeUpdate = outputBundleRepository.findAll().size();
        outputBundle.setId(count.incrementAndGet());

        // Create the OutputBundle
        OutputBundleDTO outputBundleDTO = outputBundleMapper.toDto(outputBundle);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOutputBundleMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(outputBundleDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the OutputBundle in the database
        List<OutputBundle> outputBundleList = outputBundleRepository.findAll();
        assertThat(outputBundleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteOutputBundle() throws Exception {
        // Initialize the database
        outputBundleRepository.saveAndFlush(outputBundle);

        int databaseSizeBeforeDelete = outputBundleRepository.findAll().size();

        // Delete the outputBundle
        restOutputBundleMockMvc
            .perform(delete(ENTITY_API_URL_ID, outputBundle.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OutputBundle> outputBundleList = outputBundleRepository.findAll();
        assertThat(outputBundleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

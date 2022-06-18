package com.sgsv.invmgmt.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.sgsv.invmgmt.IntegrationTest;
import com.sgsv.invmgmt.domain.MaterialOutput;
import com.sgsv.invmgmt.domain.enumeration.MaterialType;
import com.sgsv.invmgmt.repository.MaterialOutputRepository;
import com.sgsv.invmgmt.service.dto.MaterialOutputDTO;
import com.sgsv.invmgmt.service.mapper.MaterialOutputMapper;
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
 * Integration tests for the {@link MaterialOutputResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class MaterialOutputResourceIT {

    private static final MaterialType DEFAULT_TYPE_OF_MATRIAL = MaterialType.PS;
    private static final MaterialType UPDATED_TYPE_OF_MATRIAL = MaterialType.PC;

    private static final Long DEFAULT_SUB_TOTAL = 1L;
    private static final Long UPDATED_SUB_TOTAL = 2L;

    private static final String ENTITY_API_URL = "/api/material-outputs";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private MaterialOutputRepository materialOutputRepository;

    @Autowired
    private MaterialOutputMapper materialOutputMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMaterialOutputMockMvc;

    private MaterialOutput materialOutput;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MaterialOutput createEntity(EntityManager em) {
        MaterialOutput materialOutput = new MaterialOutput().typeOfMatrial(DEFAULT_TYPE_OF_MATRIAL).subTotal(DEFAULT_SUB_TOTAL);
        return materialOutput;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MaterialOutput createUpdatedEntity(EntityManager em) {
        MaterialOutput materialOutput = new MaterialOutput().typeOfMatrial(UPDATED_TYPE_OF_MATRIAL).subTotal(UPDATED_SUB_TOTAL);
        return materialOutput;
    }

    @BeforeEach
    public void initTest() {
        materialOutput = createEntity(em);
    }

    @Test
    @Transactional
    void createMaterialOutput() throws Exception {
        int databaseSizeBeforeCreate = materialOutputRepository.findAll().size();
        // Create the MaterialOutput
        MaterialOutputDTO materialOutputDTO = materialOutputMapper.toDto(materialOutput);
        restMaterialOutputMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(materialOutputDTO))
            )
            .andExpect(status().isCreated());

        // Validate the MaterialOutput in the database
        List<MaterialOutput> materialOutputList = materialOutputRepository.findAll();
        assertThat(materialOutputList).hasSize(databaseSizeBeforeCreate + 1);
        MaterialOutput testMaterialOutput = materialOutputList.get(materialOutputList.size() - 1);
        assertThat(testMaterialOutput.getTypeOfMatrial()).isEqualTo(DEFAULT_TYPE_OF_MATRIAL);
        assertThat(testMaterialOutput.getSubTotal()).isEqualTo(DEFAULT_SUB_TOTAL);
    }

    @Test
    @Transactional
    void createMaterialOutputWithExistingId() throws Exception {
        // Create the MaterialOutput with an existing ID
        materialOutput.setId(1L);
        MaterialOutputDTO materialOutputDTO = materialOutputMapper.toDto(materialOutput);

        int databaseSizeBeforeCreate = materialOutputRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMaterialOutputMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(materialOutputDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the MaterialOutput in the database
        List<MaterialOutput> materialOutputList = materialOutputRepository.findAll();
        assertThat(materialOutputList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllMaterialOutputs() throws Exception {
        // Initialize the database
        materialOutputRepository.saveAndFlush(materialOutput);

        // Get all the materialOutputList
        restMaterialOutputMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(materialOutput.getId().intValue())))
            .andExpect(jsonPath("$.[*].typeOfMatrial").value(hasItem(DEFAULT_TYPE_OF_MATRIAL.toString())))
            .andExpect(jsonPath("$.[*].subTotal").value(hasItem(DEFAULT_SUB_TOTAL.intValue())));
    }

    @Test
    @Transactional
    void getMaterialOutput() throws Exception {
        // Initialize the database
        materialOutputRepository.saveAndFlush(materialOutput);

        // Get the materialOutput
        restMaterialOutputMockMvc
            .perform(get(ENTITY_API_URL_ID, materialOutput.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(materialOutput.getId().intValue()))
            .andExpect(jsonPath("$.typeOfMatrial").value(DEFAULT_TYPE_OF_MATRIAL.toString()))
            .andExpect(jsonPath("$.subTotal").value(DEFAULT_SUB_TOTAL.intValue()));
    }

    @Test
    @Transactional
    void getNonExistingMaterialOutput() throws Exception {
        // Get the materialOutput
        restMaterialOutputMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewMaterialOutput() throws Exception {
        // Initialize the database
        materialOutputRepository.saveAndFlush(materialOutput);

        int databaseSizeBeforeUpdate = materialOutputRepository.findAll().size();

        // Update the materialOutput
        MaterialOutput updatedMaterialOutput = materialOutputRepository.findById(materialOutput.getId()).get();
        // Disconnect from session so that the updates on updatedMaterialOutput are not directly saved in db
        em.detach(updatedMaterialOutput);
        updatedMaterialOutput.typeOfMatrial(UPDATED_TYPE_OF_MATRIAL).subTotal(UPDATED_SUB_TOTAL);
        MaterialOutputDTO materialOutputDTO = materialOutputMapper.toDto(updatedMaterialOutput);

        restMaterialOutputMockMvc
            .perform(
                put(ENTITY_API_URL_ID, materialOutputDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(materialOutputDTO))
            )
            .andExpect(status().isOk());

        // Validate the MaterialOutput in the database
        List<MaterialOutput> materialOutputList = materialOutputRepository.findAll();
        assertThat(materialOutputList).hasSize(databaseSizeBeforeUpdate);
        MaterialOutput testMaterialOutput = materialOutputList.get(materialOutputList.size() - 1);
        assertThat(testMaterialOutput.getTypeOfMatrial()).isEqualTo(UPDATED_TYPE_OF_MATRIAL);
        assertThat(testMaterialOutput.getSubTotal()).isEqualTo(UPDATED_SUB_TOTAL);
    }

    @Test
    @Transactional
    void putNonExistingMaterialOutput() throws Exception {
        int databaseSizeBeforeUpdate = materialOutputRepository.findAll().size();
        materialOutput.setId(count.incrementAndGet());

        // Create the MaterialOutput
        MaterialOutputDTO materialOutputDTO = materialOutputMapper.toDto(materialOutput);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMaterialOutputMockMvc
            .perform(
                put(ENTITY_API_URL_ID, materialOutputDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(materialOutputDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the MaterialOutput in the database
        List<MaterialOutput> materialOutputList = materialOutputRepository.findAll();
        assertThat(materialOutputList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMaterialOutput() throws Exception {
        int databaseSizeBeforeUpdate = materialOutputRepository.findAll().size();
        materialOutput.setId(count.incrementAndGet());

        // Create the MaterialOutput
        MaterialOutputDTO materialOutputDTO = materialOutputMapper.toDto(materialOutput);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMaterialOutputMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(materialOutputDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the MaterialOutput in the database
        List<MaterialOutput> materialOutputList = materialOutputRepository.findAll();
        assertThat(materialOutputList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMaterialOutput() throws Exception {
        int databaseSizeBeforeUpdate = materialOutputRepository.findAll().size();
        materialOutput.setId(count.incrementAndGet());

        // Create the MaterialOutput
        MaterialOutputDTO materialOutputDTO = materialOutputMapper.toDto(materialOutput);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMaterialOutputMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(materialOutputDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the MaterialOutput in the database
        List<MaterialOutput> materialOutputList = materialOutputRepository.findAll();
        assertThat(materialOutputList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMaterialOutputWithPatch() throws Exception {
        // Initialize the database
        materialOutputRepository.saveAndFlush(materialOutput);

        int databaseSizeBeforeUpdate = materialOutputRepository.findAll().size();

        // Update the materialOutput using partial update
        MaterialOutput partialUpdatedMaterialOutput = new MaterialOutput();
        partialUpdatedMaterialOutput.setId(materialOutput.getId());

        partialUpdatedMaterialOutput.subTotal(UPDATED_SUB_TOTAL);

        restMaterialOutputMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMaterialOutput.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMaterialOutput))
            )
            .andExpect(status().isOk());

        // Validate the MaterialOutput in the database
        List<MaterialOutput> materialOutputList = materialOutputRepository.findAll();
        assertThat(materialOutputList).hasSize(databaseSizeBeforeUpdate);
        MaterialOutput testMaterialOutput = materialOutputList.get(materialOutputList.size() - 1);
        assertThat(testMaterialOutput.getTypeOfMatrial()).isEqualTo(DEFAULT_TYPE_OF_MATRIAL);
        assertThat(testMaterialOutput.getSubTotal()).isEqualTo(UPDATED_SUB_TOTAL);
    }

    @Test
    @Transactional
    void fullUpdateMaterialOutputWithPatch() throws Exception {
        // Initialize the database
        materialOutputRepository.saveAndFlush(materialOutput);

        int databaseSizeBeforeUpdate = materialOutputRepository.findAll().size();

        // Update the materialOutput using partial update
        MaterialOutput partialUpdatedMaterialOutput = new MaterialOutput();
        partialUpdatedMaterialOutput.setId(materialOutput.getId());

        partialUpdatedMaterialOutput.typeOfMatrial(UPDATED_TYPE_OF_MATRIAL).subTotal(UPDATED_SUB_TOTAL);

        restMaterialOutputMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMaterialOutput.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMaterialOutput))
            )
            .andExpect(status().isOk());

        // Validate the MaterialOutput in the database
        List<MaterialOutput> materialOutputList = materialOutputRepository.findAll();
        assertThat(materialOutputList).hasSize(databaseSizeBeforeUpdate);
        MaterialOutput testMaterialOutput = materialOutputList.get(materialOutputList.size() - 1);
        assertThat(testMaterialOutput.getTypeOfMatrial()).isEqualTo(UPDATED_TYPE_OF_MATRIAL);
        assertThat(testMaterialOutput.getSubTotal()).isEqualTo(UPDATED_SUB_TOTAL);
    }

    @Test
    @Transactional
    void patchNonExistingMaterialOutput() throws Exception {
        int databaseSizeBeforeUpdate = materialOutputRepository.findAll().size();
        materialOutput.setId(count.incrementAndGet());

        // Create the MaterialOutput
        MaterialOutputDTO materialOutputDTO = materialOutputMapper.toDto(materialOutput);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMaterialOutputMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, materialOutputDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(materialOutputDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the MaterialOutput in the database
        List<MaterialOutput> materialOutputList = materialOutputRepository.findAll();
        assertThat(materialOutputList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMaterialOutput() throws Exception {
        int databaseSizeBeforeUpdate = materialOutputRepository.findAll().size();
        materialOutput.setId(count.incrementAndGet());

        // Create the MaterialOutput
        MaterialOutputDTO materialOutputDTO = materialOutputMapper.toDto(materialOutput);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMaterialOutputMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(materialOutputDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the MaterialOutput in the database
        List<MaterialOutput> materialOutputList = materialOutputRepository.findAll();
        assertThat(materialOutputList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMaterialOutput() throws Exception {
        int databaseSizeBeforeUpdate = materialOutputRepository.findAll().size();
        materialOutput.setId(count.incrementAndGet());

        // Create the MaterialOutput
        MaterialOutputDTO materialOutputDTO = materialOutputMapper.toDto(materialOutput);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMaterialOutputMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(materialOutputDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the MaterialOutput in the database
        List<MaterialOutput> materialOutputList = materialOutputRepository.findAll();
        assertThat(materialOutputList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMaterialOutput() throws Exception {
        // Initialize the database
        materialOutputRepository.saveAndFlush(materialOutput);

        int databaseSizeBeforeDelete = materialOutputRepository.findAll().size();

        // Delete the materialOutput
        restMaterialOutputMockMvc
            .perform(delete(ENTITY_API_URL_ID, materialOutput.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MaterialOutput> materialOutputList = materialOutputRepository.findAll();
        assertThat(materialOutputList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

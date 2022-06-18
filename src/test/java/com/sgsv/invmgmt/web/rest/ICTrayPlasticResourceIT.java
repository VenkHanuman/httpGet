package com.sgsv.invmgmt.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.sgsv.invmgmt.IntegrationTest;
import com.sgsv.invmgmt.domain.ICTrayPlastic;
import com.sgsv.invmgmt.repository.ICTrayPlasticRepository;
import com.sgsv.invmgmt.service.dto.ICTrayPlasticDTO;
import com.sgsv.invmgmt.service.mapper.ICTrayPlasticMapper;
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
 * Integration tests for the {@link ICTrayPlasticResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ICTrayPlasticResourceIT {

    private static final String DEFAULT_BRAND_NAME = "AAAAAAAAAA";
    private static final String UPDATED_BRAND_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/ic-tray-plastics";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ICTrayPlasticRepository iCTrayPlasticRepository;

    @Autowired
    private ICTrayPlasticMapper iCTrayPlasticMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restICTrayPlasticMockMvc;

    private ICTrayPlastic iCTrayPlastic;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ICTrayPlastic createEntity(EntityManager em) {
        ICTrayPlastic iCTrayPlastic = new ICTrayPlastic().brandName(DEFAULT_BRAND_NAME);
        return iCTrayPlastic;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ICTrayPlastic createUpdatedEntity(EntityManager em) {
        ICTrayPlastic iCTrayPlastic = new ICTrayPlastic().brandName(UPDATED_BRAND_NAME);
        return iCTrayPlastic;
    }

    @BeforeEach
    public void initTest() {
        iCTrayPlastic = createEntity(em);
    }

    @Test
    @Transactional
    void createICTrayPlastic() throws Exception {
        int databaseSizeBeforeCreate = iCTrayPlasticRepository.findAll().size();
        // Create the ICTrayPlastic
        ICTrayPlasticDTO iCTrayPlasticDTO = iCTrayPlasticMapper.toDto(iCTrayPlastic);
        restICTrayPlasticMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(iCTrayPlasticDTO))
            )
            .andExpect(status().isCreated());

        // Validate the ICTrayPlastic in the database
        List<ICTrayPlastic> iCTrayPlasticList = iCTrayPlasticRepository.findAll();
        assertThat(iCTrayPlasticList).hasSize(databaseSizeBeforeCreate + 1);
        ICTrayPlastic testICTrayPlastic = iCTrayPlasticList.get(iCTrayPlasticList.size() - 1);
        assertThat(testICTrayPlastic.getBrandName()).isEqualTo(DEFAULT_BRAND_NAME);
    }

    @Test
    @Transactional
    void createICTrayPlasticWithExistingId() throws Exception {
        // Create the ICTrayPlastic with an existing ID
        iCTrayPlastic.setId(1L);
        ICTrayPlasticDTO iCTrayPlasticDTO = iCTrayPlasticMapper.toDto(iCTrayPlastic);

        int databaseSizeBeforeCreate = iCTrayPlasticRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restICTrayPlasticMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(iCTrayPlasticDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ICTrayPlastic in the database
        List<ICTrayPlastic> iCTrayPlasticList = iCTrayPlasticRepository.findAll();
        assertThat(iCTrayPlasticList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllICTrayPlastics() throws Exception {
        // Initialize the database
        iCTrayPlasticRepository.saveAndFlush(iCTrayPlastic);

        // Get all the iCTrayPlasticList
        restICTrayPlasticMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(iCTrayPlastic.getId().intValue())))
            .andExpect(jsonPath("$.[*].brandName").value(hasItem(DEFAULT_BRAND_NAME)));
    }

    @Test
    @Transactional
    void getICTrayPlastic() throws Exception {
        // Initialize the database
        iCTrayPlasticRepository.saveAndFlush(iCTrayPlastic);

        // Get the iCTrayPlastic
        restICTrayPlasticMockMvc
            .perform(get(ENTITY_API_URL_ID, iCTrayPlastic.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(iCTrayPlastic.getId().intValue()))
            .andExpect(jsonPath("$.brandName").value(DEFAULT_BRAND_NAME));
    }

    @Test
    @Transactional
    void getNonExistingICTrayPlastic() throws Exception {
        // Get the iCTrayPlastic
        restICTrayPlasticMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewICTrayPlastic() throws Exception {
        // Initialize the database
        iCTrayPlasticRepository.saveAndFlush(iCTrayPlastic);

        int databaseSizeBeforeUpdate = iCTrayPlasticRepository.findAll().size();

        // Update the iCTrayPlastic
        ICTrayPlastic updatedICTrayPlastic = iCTrayPlasticRepository.findById(iCTrayPlastic.getId()).get();
        // Disconnect from session so that the updates on updatedICTrayPlastic are not directly saved in db
        em.detach(updatedICTrayPlastic);
        updatedICTrayPlastic.brandName(UPDATED_BRAND_NAME);
        ICTrayPlasticDTO iCTrayPlasticDTO = iCTrayPlasticMapper.toDto(updatedICTrayPlastic);

        restICTrayPlasticMockMvc
            .perform(
                put(ENTITY_API_URL_ID, iCTrayPlasticDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(iCTrayPlasticDTO))
            )
            .andExpect(status().isOk());

        // Validate the ICTrayPlastic in the database
        List<ICTrayPlastic> iCTrayPlasticList = iCTrayPlasticRepository.findAll();
        assertThat(iCTrayPlasticList).hasSize(databaseSizeBeforeUpdate);
        ICTrayPlastic testICTrayPlastic = iCTrayPlasticList.get(iCTrayPlasticList.size() - 1);
        assertThat(testICTrayPlastic.getBrandName()).isEqualTo(UPDATED_BRAND_NAME);
    }

    @Test
    @Transactional
    void putNonExistingICTrayPlastic() throws Exception {
        int databaseSizeBeforeUpdate = iCTrayPlasticRepository.findAll().size();
        iCTrayPlastic.setId(count.incrementAndGet());

        // Create the ICTrayPlastic
        ICTrayPlasticDTO iCTrayPlasticDTO = iCTrayPlasticMapper.toDto(iCTrayPlastic);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restICTrayPlasticMockMvc
            .perform(
                put(ENTITY_API_URL_ID, iCTrayPlasticDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(iCTrayPlasticDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ICTrayPlastic in the database
        List<ICTrayPlastic> iCTrayPlasticList = iCTrayPlasticRepository.findAll();
        assertThat(iCTrayPlasticList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchICTrayPlastic() throws Exception {
        int databaseSizeBeforeUpdate = iCTrayPlasticRepository.findAll().size();
        iCTrayPlastic.setId(count.incrementAndGet());

        // Create the ICTrayPlastic
        ICTrayPlasticDTO iCTrayPlasticDTO = iCTrayPlasticMapper.toDto(iCTrayPlastic);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restICTrayPlasticMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(iCTrayPlasticDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ICTrayPlastic in the database
        List<ICTrayPlastic> iCTrayPlasticList = iCTrayPlasticRepository.findAll();
        assertThat(iCTrayPlasticList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamICTrayPlastic() throws Exception {
        int databaseSizeBeforeUpdate = iCTrayPlasticRepository.findAll().size();
        iCTrayPlastic.setId(count.incrementAndGet());

        // Create the ICTrayPlastic
        ICTrayPlasticDTO iCTrayPlasticDTO = iCTrayPlasticMapper.toDto(iCTrayPlastic);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restICTrayPlasticMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(iCTrayPlasticDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ICTrayPlastic in the database
        List<ICTrayPlastic> iCTrayPlasticList = iCTrayPlasticRepository.findAll();
        assertThat(iCTrayPlasticList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateICTrayPlasticWithPatch() throws Exception {
        // Initialize the database
        iCTrayPlasticRepository.saveAndFlush(iCTrayPlastic);

        int databaseSizeBeforeUpdate = iCTrayPlasticRepository.findAll().size();

        // Update the iCTrayPlastic using partial update
        ICTrayPlastic partialUpdatedICTrayPlastic = new ICTrayPlastic();
        partialUpdatedICTrayPlastic.setId(iCTrayPlastic.getId());

        restICTrayPlasticMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedICTrayPlastic.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedICTrayPlastic))
            )
            .andExpect(status().isOk());

        // Validate the ICTrayPlastic in the database
        List<ICTrayPlastic> iCTrayPlasticList = iCTrayPlasticRepository.findAll();
        assertThat(iCTrayPlasticList).hasSize(databaseSizeBeforeUpdate);
        ICTrayPlastic testICTrayPlastic = iCTrayPlasticList.get(iCTrayPlasticList.size() - 1);
        assertThat(testICTrayPlastic.getBrandName()).isEqualTo(DEFAULT_BRAND_NAME);
    }

    @Test
    @Transactional
    void fullUpdateICTrayPlasticWithPatch() throws Exception {
        // Initialize the database
        iCTrayPlasticRepository.saveAndFlush(iCTrayPlastic);

        int databaseSizeBeforeUpdate = iCTrayPlasticRepository.findAll().size();

        // Update the iCTrayPlastic using partial update
        ICTrayPlastic partialUpdatedICTrayPlastic = new ICTrayPlastic();
        partialUpdatedICTrayPlastic.setId(iCTrayPlastic.getId());

        partialUpdatedICTrayPlastic.brandName(UPDATED_BRAND_NAME);

        restICTrayPlasticMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedICTrayPlastic.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedICTrayPlastic))
            )
            .andExpect(status().isOk());

        // Validate the ICTrayPlastic in the database
        List<ICTrayPlastic> iCTrayPlasticList = iCTrayPlasticRepository.findAll();
        assertThat(iCTrayPlasticList).hasSize(databaseSizeBeforeUpdate);
        ICTrayPlastic testICTrayPlastic = iCTrayPlasticList.get(iCTrayPlasticList.size() - 1);
        assertThat(testICTrayPlastic.getBrandName()).isEqualTo(UPDATED_BRAND_NAME);
    }

    @Test
    @Transactional
    void patchNonExistingICTrayPlastic() throws Exception {
        int databaseSizeBeforeUpdate = iCTrayPlasticRepository.findAll().size();
        iCTrayPlastic.setId(count.incrementAndGet());

        // Create the ICTrayPlastic
        ICTrayPlasticDTO iCTrayPlasticDTO = iCTrayPlasticMapper.toDto(iCTrayPlastic);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restICTrayPlasticMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, iCTrayPlasticDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(iCTrayPlasticDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ICTrayPlastic in the database
        List<ICTrayPlastic> iCTrayPlasticList = iCTrayPlasticRepository.findAll();
        assertThat(iCTrayPlasticList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchICTrayPlastic() throws Exception {
        int databaseSizeBeforeUpdate = iCTrayPlasticRepository.findAll().size();
        iCTrayPlastic.setId(count.incrementAndGet());

        // Create the ICTrayPlastic
        ICTrayPlasticDTO iCTrayPlasticDTO = iCTrayPlasticMapper.toDto(iCTrayPlastic);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restICTrayPlasticMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(iCTrayPlasticDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ICTrayPlastic in the database
        List<ICTrayPlastic> iCTrayPlasticList = iCTrayPlasticRepository.findAll();
        assertThat(iCTrayPlasticList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamICTrayPlastic() throws Exception {
        int databaseSizeBeforeUpdate = iCTrayPlasticRepository.findAll().size();
        iCTrayPlastic.setId(count.incrementAndGet());

        // Create the ICTrayPlastic
        ICTrayPlasticDTO iCTrayPlasticDTO = iCTrayPlasticMapper.toDto(iCTrayPlastic);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restICTrayPlasticMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(iCTrayPlasticDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ICTrayPlastic in the database
        List<ICTrayPlastic> iCTrayPlasticList = iCTrayPlasticRepository.findAll();
        assertThat(iCTrayPlasticList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteICTrayPlastic() throws Exception {
        // Initialize the database
        iCTrayPlasticRepository.saveAndFlush(iCTrayPlastic);

        int databaseSizeBeforeDelete = iCTrayPlasticRepository.findAll().size();

        // Delete the iCTrayPlastic
        restICTrayPlasticMockMvc
            .perform(delete(ENTITY_API_URL_ID, iCTrayPlastic.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ICTrayPlastic> iCTrayPlasticList = iCTrayPlasticRepository.findAll();
        assertThat(iCTrayPlasticList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

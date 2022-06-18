package com.sgsv.invmgmt.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.sgsv.invmgmt.IntegrationTest;
import com.sgsv.invmgmt.domain.DisposedWaste;
import com.sgsv.invmgmt.repository.DisposedWasteRepository;
import com.sgsv.invmgmt.service.dto.DisposedWasteDTO;
import com.sgsv.invmgmt.service.mapper.DisposedWasteMapper;
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
 * Integration tests for the {@link DisposedWasteResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DisposedWasteResourceIT {

    private static final Long DEFAULT_SUB_TOTAL = 1L;
    private static final Long UPDATED_SUB_TOTAL = 2L;

    private static final String ENTITY_API_URL = "/api/disposed-wastes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DisposedWasteRepository disposedWasteRepository;

    @Autowired
    private DisposedWasteMapper disposedWasteMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDisposedWasteMockMvc;

    private DisposedWaste disposedWaste;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DisposedWaste createEntity(EntityManager em) {
        DisposedWaste disposedWaste = new DisposedWaste().subTotal(DEFAULT_SUB_TOTAL);
        return disposedWaste;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DisposedWaste createUpdatedEntity(EntityManager em) {
        DisposedWaste disposedWaste = new DisposedWaste().subTotal(UPDATED_SUB_TOTAL);
        return disposedWaste;
    }

    @BeforeEach
    public void initTest() {
        disposedWaste = createEntity(em);
    }

    @Test
    @Transactional
    void createDisposedWaste() throws Exception {
        int databaseSizeBeforeCreate = disposedWasteRepository.findAll().size();
        // Create the DisposedWaste
        DisposedWasteDTO disposedWasteDTO = disposedWasteMapper.toDto(disposedWaste);
        restDisposedWasteMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(disposedWasteDTO))
            )
            .andExpect(status().isCreated());

        // Validate the DisposedWaste in the database
        List<DisposedWaste> disposedWasteList = disposedWasteRepository.findAll();
        assertThat(disposedWasteList).hasSize(databaseSizeBeforeCreate + 1);
        DisposedWaste testDisposedWaste = disposedWasteList.get(disposedWasteList.size() - 1);
        assertThat(testDisposedWaste.getSubTotal()).isEqualTo(DEFAULT_SUB_TOTAL);
    }

    @Test
    @Transactional
    void createDisposedWasteWithExistingId() throws Exception {
        // Create the DisposedWaste with an existing ID
        disposedWaste.setId(1L);
        DisposedWasteDTO disposedWasteDTO = disposedWasteMapper.toDto(disposedWaste);

        int databaseSizeBeforeCreate = disposedWasteRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDisposedWasteMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(disposedWasteDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DisposedWaste in the database
        List<DisposedWaste> disposedWasteList = disposedWasteRepository.findAll();
        assertThat(disposedWasteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllDisposedWastes() throws Exception {
        // Initialize the database
        disposedWasteRepository.saveAndFlush(disposedWaste);

        // Get all the disposedWasteList
        restDisposedWasteMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(disposedWaste.getId().intValue())))
            .andExpect(jsonPath("$.[*].subTotal").value(hasItem(DEFAULT_SUB_TOTAL.intValue())));
    }

    @Test
    @Transactional
    void getDisposedWaste() throws Exception {
        // Initialize the database
        disposedWasteRepository.saveAndFlush(disposedWaste);

        // Get the disposedWaste
        restDisposedWasteMockMvc
            .perform(get(ENTITY_API_URL_ID, disposedWaste.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(disposedWaste.getId().intValue()))
            .andExpect(jsonPath("$.subTotal").value(DEFAULT_SUB_TOTAL.intValue()));
    }

    @Test
    @Transactional
    void getNonExistingDisposedWaste() throws Exception {
        // Get the disposedWaste
        restDisposedWasteMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewDisposedWaste() throws Exception {
        // Initialize the database
        disposedWasteRepository.saveAndFlush(disposedWaste);

        int databaseSizeBeforeUpdate = disposedWasteRepository.findAll().size();

        // Update the disposedWaste
        DisposedWaste updatedDisposedWaste = disposedWasteRepository.findById(disposedWaste.getId()).get();
        // Disconnect from session so that the updates on updatedDisposedWaste are not directly saved in db
        em.detach(updatedDisposedWaste);
        updatedDisposedWaste.subTotal(UPDATED_SUB_TOTAL);
        DisposedWasteDTO disposedWasteDTO = disposedWasteMapper.toDto(updatedDisposedWaste);

        restDisposedWasteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, disposedWasteDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(disposedWasteDTO))
            )
            .andExpect(status().isOk());

        // Validate the DisposedWaste in the database
        List<DisposedWaste> disposedWasteList = disposedWasteRepository.findAll();
        assertThat(disposedWasteList).hasSize(databaseSizeBeforeUpdate);
        DisposedWaste testDisposedWaste = disposedWasteList.get(disposedWasteList.size() - 1);
        assertThat(testDisposedWaste.getSubTotal()).isEqualTo(UPDATED_SUB_TOTAL);
    }

    @Test
    @Transactional
    void putNonExistingDisposedWaste() throws Exception {
        int databaseSizeBeforeUpdate = disposedWasteRepository.findAll().size();
        disposedWaste.setId(count.incrementAndGet());

        // Create the DisposedWaste
        DisposedWasteDTO disposedWasteDTO = disposedWasteMapper.toDto(disposedWaste);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDisposedWasteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, disposedWasteDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(disposedWasteDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DisposedWaste in the database
        List<DisposedWaste> disposedWasteList = disposedWasteRepository.findAll();
        assertThat(disposedWasteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDisposedWaste() throws Exception {
        int databaseSizeBeforeUpdate = disposedWasteRepository.findAll().size();
        disposedWaste.setId(count.incrementAndGet());

        // Create the DisposedWaste
        DisposedWasteDTO disposedWasteDTO = disposedWasteMapper.toDto(disposedWaste);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDisposedWasteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(disposedWasteDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DisposedWaste in the database
        List<DisposedWaste> disposedWasteList = disposedWasteRepository.findAll();
        assertThat(disposedWasteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDisposedWaste() throws Exception {
        int databaseSizeBeforeUpdate = disposedWasteRepository.findAll().size();
        disposedWaste.setId(count.incrementAndGet());

        // Create the DisposedWaste
        DisposedWasteDTO disposedWasteDTO = disposedWasteMapper.toDto(disposedWaste);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDisposedWasteMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(disposedWasteDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the DisposedWaste in the database
        List<DisposedWaste> disposedWasteList = disposedWasteRepository.findAll();
        assertThat(disposedWasteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDisposedWasteWithPatch() throws Exception {
        // Initialize the database
        disposedWasteRepository.saveAndFlush(disposedWaste);

        int databaseSizeBeforeUpdate = disposedWasteRepository.findAll().size();

        // Update the disposedWaste using partial update
        DisposedWaste partialUpdatedDisposedWaste = new DisposedWaste();
        partialUpdatedDisposedWaste.setId(disposedWaste.getId());

        partialUpdatedDisposedWaste.subTotal(UPDATED_SUB_TOTAL);

        restDisposedWasteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDisposedWaste.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDisposedWaste))
            )
            .andExpect(status().isOk());

        // Validate the DisposedWaste in the database
        List<DisposedWaste> disposedWasteList = disposedWasteRepository.findAll();
        assertThat(disposedWasteList).hasSize(databaseSizeBeforeUpdate);
        DisposedWaste testDisposedWaste = disposedWasteList.get(disposedWasteList.size() - 1);
        assertThat(testDisposedWaste.getSubTotal()).isEqualTo(UPDATED_SUB_TOTAL);
    }

    @Test
    @Transactional
    void fullUpdateDisposedWasteWithPatch() throws Exception {
        // Initialize the database
        disposedWasteRepository.saveAndFlush(disposedWaste);

        int databaseSizeBeforeUpdate = disposedWasteRepository.findAll().size();

        // Update the disposedWaste using partial update
        DisposedWaste partialUpdatedDisposedWaste = new DisposedWaste();
        partialUpdatedDisposedWaste.setId(disposedWaste.getId());

        partialUpdatedDisposedWaste.subTotal(UPDATED_SUB_TOTAL);

        restDisposedWasteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDisposedWaste.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDisposedWaste))
            )
            .andExpect(status().isOk());

        // Validate the DisposedWaste in the database
        List<DisposedWaste> disposedWasteList = disposedWasteRepository.findAll();
        assertThat(disposedWasteList).hasSize(databaseSizeBeforeUpdate);
        DisposedWaste testDisposedWaste = disposedWasteList.get(disposedWasteList.size() - 1);
        assertThat(testDisposedWaste.getSubTotal()).isEqualTo(UPDATED_SUB_TOTAL);
    }

    @Test
    @Transactional
    void patchNonExistingDisposedWaste() throws Exception {
        int databaseSizeBeforeUpdate = disposedWasteRepository.findAll().size();
        disposedWaste.setId(count.incrementAndGet());

        // Create the DisposedWaste
        DisposedWasteDTO disposedWasteDTO = disposedWasteMapper.toDto(disposedWaste);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDisposedWasteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, disposedWasteDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(disposedWasteDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DisposedWaste in the database
        List<DisposedWaste> disposedWasteList = disposedWasteRepository.findAll();
        assertThat(disposedWasteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDisposedWaste() throws Exception {
        int databaseSizeBeforeUpdate = disposedWasteRepository.findAll().size();
        disposedWaste.setId(count.incrementAndGet());

        // Create the DisposedWaste
        DisposedWasteDTO disposedWasteDTO = disposedWasteMapper.toDto(disposedWaste);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDisposedWasteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(disposedWasteDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DisposedWaste in the database
        List<DisposedWaste> disposedWasteList = disposedWasteRepository.findAll();
        assertThat(disposedWasteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDisposedWaste() throws Exception {
        int databaseSizeBeforeUpdate = disposedWasteRepository.findAll().size();
        disposedWaste.setId(count.incrementAndGet());

        // Create the DisposedWaste
        DisposedWasteDTO disposedWasteDTO = disposedWasteMapper.toDto(disposedWaste);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDisposedWasteMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(disposedWasteDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the DisposedWaste in the database
        List<DisposedWaste> disposedWasteList = disposedWasteRepository.findAll();
        assertThat(disposedWasteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDisposedWaste() throws Exception {
        // Initialize the database
        disposedWasteRepository.saveAndFlush(disposedWaste);

        int databaseSizeBeforeDelete = disposedWasteRepository.findAll().size();

        // Delete the disposedWaste
        restDisposedWasteMockMvc
            .perform(delete(ENTITY_API_URL_ID, disposedWaste.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DisposedWaste> disposedWasteList = disposedWasteRepository.findAll();
        assertThat(disposedWasteList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

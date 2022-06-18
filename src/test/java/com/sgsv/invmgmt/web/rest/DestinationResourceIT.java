package com.sgsv.invmgmt.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.sgsv.invmgmt.IntegrationTest;
import com.sgsv.invmgmt.domain.Destination;
import com.sgsv.invmgmt.repository.DestinationRepository;
import com.sgsv.invmgmt.service.dto.DestinationDTO;
import com.sgsv.invmgmt.service.mapper.DestinationMapper;
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
 * Integration tests for the {@link DestinationResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DestinationResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/destinations";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DestinationRepository destinationRepository;

    @Autowired
    private DestinationMapper destinationMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDestinationMockMvc;

    private Destination destination;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Destination createEntity(EntityManager em) {
        Destination destination = new Destination().name(DEFAULT_NAME);
        return destination;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Destination createUpdatedEntity(EntityManager em) {
        Destination destination = new Destination().name(UPDATED_NAME);
        return destination;
    }

    @BeforeEach
    public void initTest() {
        destination = createEntity(em);
    }

    @Test
    @Transactional
    void createDestination() throws Exception {
        int databaseSizeBeforeCreate = destinationRepository.findAll().size();
        // Create the Destination
        DestinationDTO destinationDTO = destinationMapper.toDto(destination);
        restDestinationMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(destinationDTO))
            )
            .andExpect(status().isCreated());

        // Validate the Destination in the database
        List<Destination> destinationList = destinationRepository.findAll();
        assertThat(destinationList).hasSize(databaseSizeBeforeCreate + 1);
        Destination testDestination = destinationList.get(destinationList.size() - 1);
        assertThat(testDestination.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    void createDestinationWithExistingId() throws Exception {
        // Create the Destination with an existing ID
        destination.setId(1L);
        DestinationDTO destinationDTO = destinationMapper.toDto(destination);

        int databaseSizeBeforeCreate = destinationRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDestinationMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(destinationDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Destination in the database
        List<Destination> destinationList = destinationRepository.findAll();
        assertThat(destinationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllDestinations() throws Exception {
        // Initialize the database
        destinationRepository.saveAndFlush(destination);

        // Get all the destinationList
        restDestinationMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(destination.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }

    @Test
    @Transactional
    void getDestination() throws Exception {
        // Initialize the database
        destinationRepository.saveAndFlush(destination);

        // Get the destination
        restDestinationMockMvc
            .perform(get(ENTITY_API_URL_ID, destination.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(destination.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    void getNonExistingDestination() throws Exception {
        // Get the destination
        restDestinationMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewDestination() throws Exception {
        // Initialize the database
        destinationRepository.saveAndFlush(destination);

        int databaseSizeBeforeUpdate = destinationRepository.findAll().size();

        // Update the destination
        Destination updatedDestination = destinationRepository.findById(destination.getId()).get();
        // Disconnect from session so that the updates on updatedDestination are not directly saved in db
        em.detach(updatedDestination);
        updatedDestination.name(UPDATED_NAME);
        DestinationDTO destinationDTO = destinationMapper.toDto(updatedDestination);

        restDestinationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, destinationDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(destinationDTO))
            )
            .andExpect(status().isOk());

        // Validate the Destination in the database
        List<Destination> destinationList = destinationRepository.findAll();
        assertThat(destinationList).hasSize(databaseSizeBeforeUpdate);
        Destination testDestination = destinationList.get(destinationList.size() - 1);
        assertThat(testDestination.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    void putNonExistingDestination() throws Exception {
        int databaseSizeBeforeUpdate = destinationRepository.findAll().size();
        destination.setId(count.incrementAndGet());

        // Create the Destination
        DestinationDTO destinationDTO = destinationMapper.toDto(destination);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDestinationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, destinationDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(destinationDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Destination in the database
        List<Destination> destinationList = destinationRepository.findAll();
        assertThat(destinationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDestination() throws Exception {
        int databaseSizeBeforeUpdate = destinationRepository.findAll().size();
        destination.setId(count.incrementAndGet());

        // Create the Destination
        DestinationDTO destinationDTO = destinationMapper.toDto(destination);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDestinationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(destinationDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Destination in the database
        List<Destination> destinationList = destinationRepository.findAll();
        assertThat(destinationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDestination() throws Exception {
        int databaseSizeBeforeUpdate = destinationRepository.findAll().size();
        destination.setId(count.incrementAndGet());

        // Create the Destination
        DestinationDTO destinationDTO = destinationMapper.toDto(destination);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDestinationMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(destinationDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Destination in the database
        List<Destination> destinationList = destinationRepository.findAll();
        assertThat(destinationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDestinationWithPatch() throws Exception {
        // Initialize the database
        destinationRepository.saveAndFlush(destination);

        int databaseSizeBeforeUpdate = destinationRepository.findAll().size();

        // Update the destination using partial update
        Destination partialUpdatedDestination = new Destination();
        partialUpdatedDestination.setId(destination.getId());

        partialUpdatedDestination.name(UPDATED_NAME);

        restDestinationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDestination.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDestination))
            )
            .andExpect(status().isOk());

        // Validate the Destination in the database
        List<Destination> destinationList = destinationRepository.findAll();
        assertThat(destinationList).hasSize(databaseSizeBeforeUpdate);
        Destination testDestination = destinationList.get(destinationList.size() - 1);
        assertThat(testDestination.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    void fullUpdateDestinationWithPatch() throws Exception {
        // Initialize the database
        destinationRepository.saveAndFlush(destination);

        int databaseSizeBeforeUpdate = destinationRepository.findAll().size();

        // Update the destination using partial update
        Destination partialUpdatedDestination = new Destination();
        partialUpdatedDestination.setId(destination.getId());

        partialUpdatedDestination.name(UPDATED_NAME);

        restDestinationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDestination.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDestination))
            )
            .andExpect(status().isOk());

        // Validate the Destination in the database
        List<Destination> destinationList = destinationRepository.findAll();
        assertThat(destinationList).hasSize(databaseSizeBeforeUpdate);
        Destination testDestination = destinationList.get(destinationList.size() - 1);
        assertThat(testDestination.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    void patchNonExistingDestination() throws Exception {
        int databaseSizeBeforeUpdate = destinationRepository.findAll().size();
        destination.setId(count.incrementAndGet());

        // Create the Destination
        DestinationDTO destinationDTO = destinationMapper.toDto(destination);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDestinationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, destinationDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(destinationDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Destination in the database
        List<Destination> destinationList = destinationRepository.findAll();
        assertThat(destinationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDestination() throws Exception {
        int databaseSizeBeforeUpdate = destinationRepository.findAll().size();
        destination.setId(count.incrementAndGet());

        // Create the Destination
        DestinationDTO destinationDTO = destinationMapper.toDto(destination);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDestinationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(destinationDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Destination in the database
        List<Destination> destinationList = destinationRepository.findAll();
        assertThat(destinationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDestination() throws Exception {
        int databaseSizeBeforeUpdate = destinationRepository.findAll().size();
        destination.setId(count.incrementAndGet());

        // Create the Destination
        DestinationDTO destinationDTO = destinationMapper.toDto(destination);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDestinationMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(destinationDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Destination in the database
        List<Destination> destinationList = destinationRepository.findAll();
        assertThat(destinationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDestination() throws Exception {
        // Initialize the database
        destinationRepository.saveAndFlush(destination);

        int databaseSizeBeforeDelete = destinationRepository.findAll().size();

        // Delete the destination
        restDestinationMockMvc
            .perform(delete(ENTITY_API_URL_ID, destination.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Destination> destinationList = destinationRepository.findAll();
        assertThat(destinationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

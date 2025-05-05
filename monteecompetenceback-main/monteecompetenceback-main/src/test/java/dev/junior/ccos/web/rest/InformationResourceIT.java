package dev.junior.ccos.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import dev.junior.ccos.IntegrationTest;
import dev.junior.ccos.domain.Information;
import dev.junior.ccos.repository.InformationRepository;
import dev.junior.ccos.service.dto.InformationDTO;
import dev.junior.ccos.service.mapper.InformationMapper;
import jakarta.persistence.EntityManager;
import java.util.Base64;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link InformationResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class InformationResourceIT {

    private static final String DEFAULT_TITRE = "AAAAAAAAAA";
    private static final String UPDATED_TITRE = "BBBBBBBBBB";

    private static final byte[] DEFAULT_IMAGE_INFOS = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE_INFOS = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGE_INFOS_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_INFOS_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_CONTENU = "AAAAAAAAAA";
    private static final String UPDATED_CONTENU = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/information";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private InformationRepository informationRepository;

    @Autowired
    private InformationMapper informationMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restInformationMockMvc;

    private Information information;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Information createEntity(EntityManager em) {
        Information information = new Information()
            .titre(DEFAULT_TITRE)
            .imageInfos(DEFAULT_IMAGE_INFOS)
            .imageInfosContentType(DEFAULT_IMAGE_INFOS_CONTENT_TYPE)
            .contenu(DEFAULT_CONTENU);
        return information;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Information createUpdatedEntity(EntityManager em) {
        Information information = new Information()
            .titre(UPDATED_TITRE)
            .imageInfos(UPDATED_IMAGE_INFOS)
            .imageInfosContentType(UPDATED_IMAGE_INFOS_CONTENT_TYPE)
            .contenu(UPDATED_CONTENU);
        return information;
    }

    @BeforeEach
    public void initTest() {
        information = createEntity(em);
    }

    @Test
    @Transactional
    void createInformation() throws Exception {
        int databaseSizeBeforeCreate = informationRepository.findAll().size();
        // Create the Information
        InformationDTO informationDTO = informationMapper.toDto(information);
        restInformationMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(informationDTO))
            )
            .andExpect(status().isCreated());

        // Validate the Information in the database
        List<Information> informationList = informationRepository.findAll();
        assertThat(informationList).hasSize(databaseSizeBeforeCreate + 1);
        Information testInformation = informationList.get(informationList.size() - 1);
        assertThat(testInformation.getTitre()).isEqualTo(DEFAULT_TITRE);
        assertThat(testInformation.getImageInfos()).isEqualTo(DEFAULT_IMAGE_INFOS);
        assertThat(testInformation.getImageInfosContentType()).isEqualTo(DEFAULT_IMAGE_INFOS_CONTENT_TYPE);
        assertThat(testInformation.getContenu()).isEqualTo(DEFAULT_CONTENU);
    }

    @Test
    @Transactional
    void createInformationWithExistingId() throws Exception {
        // Create the Information with an existing ID
        information.setId(1L);
        InformationDTO informationDTO = informationMapper.toDto(information);

        int databaseSizeBeforeCreate = informationRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restInformationMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(informationDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Information in the database
        List<Information> informationList = informationRepository.findAll();
        assertThat(informationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllInformation() throws Exception {
        // Initialize the database
        informationRepository.saveAndFlush(information);

        // Get all the informationList
        restInformationMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(information.getId().intValue())))
            .andExpect(jsonPath("$.[*].titre").value(hasItem(DEFAULT_TITRE)))
            .andExpect(jsonPath("$.[*].imageInfosContentType").value(hasItem(DEFAULT_IMAGE_INFOS_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].imageInfos").value(hasItem(Base64.getEncoder().encodeToString(DEFAULT_IMAGE_INFOS))))
            .andExpect(jsonPath("$.[*].contenu").value(hasItem(DEFAULT_CONTENU)));
    }

    @Test
    @Transactional
    void getInformation() throws Exception {
        // Initialize the database
        informationRepository.saveAndFlush(information);

        // Get the information
        restInformationMockMvc
            .perform(get(ENTITY_API_URL_ID, information.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(information.getId().intValue()))
            .andExpect(jsonPath("$.titre").value(DEFAULT_TITRE))
            .andExpect(jsonPath("$.imageInfosContentType").value(DEFAULT_IMAGE_INFOS_CONTENT_TYPE))
            .andExpect(jsonPath("$.imageInfos").value(Base64.getEncoder().encodeToString(DEFAULT_IMAGE_INFOS)))
            .andExpect(jsonPath("$.contenu").value(DEFAULT_CONTENU));
    }

    @Test
    @Transactional
    void getNonExistingInformation() throws Exception {
        // Get the information
        restInformationMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingInformation() throws Exception {
        // Initialize the database
        informationRepository.saveAndFlush(information);

        int databaseSizeBeforeUpdate = informationRepository.findAll().size();

        // Update the information
        Information updatedInformation = informationRepository.findById(information.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedInformation are not directly saved in db
        em.detach(updatedInformation);
        updatedInformation
            .titre(UPDATED_TITRE)
            .imageInfos(UPDATED_IMAGE_INFOS)
            .imageInfosContentType(UPDATED_IMAGE_INFOS_CONTENT_TYPE)
            .contenu(UPDATED_CONTENU);
        InformationDTO informationDTO = informationMapper.toDto(updatedInformation);

        restInformationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, informationDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(informationDTO))
            )
            .andExpect(status().isOk());

        // Validate the Information in the database
        List<Information> informationList = informationRepository.findAll();
        assertThat(informationList).hasSize(databaseSizeBeforeUpdate);
        Information testInformation = informationList.get(informationList.size() - 1);
        assertThat(testInformation.getTitre()).isEqualTo(UPDATED_TITRE);
        assertThat(testInformation.getImageInfos()).isEqualTo(UPDATED_IMAGE_INFOS);
        assertThat(testInformation.getImageInfosContentType()).isEqualTo(UPDATED_IMAGE_INFOS_CONTENT_TYPE);
        assertThat(testInformation.getContenu()).isEqualTo(UPDATED_CONTENU);
    }

    @Test
    @Transactional
    void putNonExistingInformation() throws Exception {
        int databaseSizeBeforeUpdate = informationRepository.findAll().size();
        information.setId(longCount.incrementAndGet());

        // Create the Information
        InformationDTO informationDTO = informationMapper.toDto(information);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInformationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, informationDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(informationDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Information in the database
        List<Information> informationList = informationRepository.findAll();
        assertThat(informationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchInformation() throws Exception {
        int databaseSizeBeforeUpdate = informationRepository.findAll().size();
        information.setId(longCount.incrementAndGet());

        // Create the Information
        InformationDTO informationDTO = informationMapper.toDto(information);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInformationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(informationDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Information in the database
        List<Information> informationList = informationRepository.findAll();
        assertThat(informationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamInformation() throws Exception {
        int databaseSizeBeforeUpdate = informationRepository.findAll().size();
        information.setId(longCount.incrementAndGet());

        // Create the Information
        InformationDTO informationDTO = informationMapper.toDto(information);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInformationMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(informationDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Information in the database
        List<Information> informationList = informationRepository.findAll();
        assertThat(informationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateInformationWithPatch() throws Exception {
        // Initialize the database
        informationRepository.saveAndFlush(information);

        int databaseSizeBeforeUpdate = informationRepository.findAll().size();

        // Update the information using partial update
        Information partialUpdatedInformation = new Information();
        partialUpdatedInformation.setId(information.getId());

        partialUpdatedInformation
            .imageInfos(UPDATED_IMAGE_INFOS)
            .imageInfosContentType(UPDATED_IMAGE_INFOS_CONTENT_TYPE)
            .contenu(UPDATED_CONTENU);

        restInformationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedInformation.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedInformation))
            )
            .andExpect(status().isOk());

        // Validate the Information in the database
        List<Information> informationList = informationRepository.findAll();
        assertThat(informationList).hasSize(databaseSizeBeforeUpdate);
        Information testInformation = informationList.get(informationList.size() - 1);
        assertThat(testInformation.getTitre()).isEqualTo(DEFAULT_TITRE);
        assertThat(testInformation.getImageInfos()).isEqualTo(UPDATED_IMAGE_INFOS);
        assertThat(testInformation.getImageInfosContentType()).isEqualTo(UPDATED_IMAGE_INFOS_CONTENT_TYPE);
        assertThat(testInformation.getContenu()).isEqualTo(UPDATED_CONTENU);
    }

    @Test
    @Transactional
    void fullUpdateInformationWithPatch() throws Exception {
        // Initialize the database
        informationRepository.saveAndFlush(information);

        int databaseSizeBeforeUpdate = informationRepository.findAll().size();

        // Update the information using partial update
        Information partialUpdatedInformation = new Information();
        partialUpdatedInformation.setId(information.getId());

        partialUpdatedInformation
            .titre(UPDATED_TITRE)
            .imageInfos(UPDATED_IMAGE_INFOS)
            .imageInfosContentType(UPDATED_IMAGE_INFOS_CONTENT_TYPE)
            .contenu(UPDATED_CONTENU);

        restInformationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedInformation.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedInformation))
            )
            .andExpect(status().isOk());

        // Validate the Information in the database
        List<Information> informationList = informationRepository.findAll();
        assertThat(informationList).hasSize(databaseSizeBeforeUpdate);
        Information testInformation = informationList.get(informationList.size() - 1);
        assertThat(testInformation.getTitre()).isEqualTo(UPDATED_TITRE);
        assertThat(testInformation.getImageInfos()).isEqualTo(UPDATED_IMAGE_INFOS);
        assertThat(testInformation.getImageInfosContentType()).isEqualTo(UPDATED_IMAGE_INFOS_CONTENT_TYPE);
        assertThat(testInformation.getContenu()).isEqualTo(UPDATED_CONTENU);
    }

    @Test
    @Transactional
    void patchNonExistingInformation() throws Exception {
        int databaseSizeBeforeUpdate = informationRepository.findAll().size();
        information.setId(longCount.incrementAndGet());

        // Create the Information
        InformationDTO informationDTO = informationMapper.toDto(information);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInformationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, informationDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(informationDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Information in the database
        List<Information> informationList = informationRepository.findAll();
        assertThat(informationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchInformation() throws Exception {
        int databaseSizeBeforeUpdate = informationRepository.findAll().size();
        information.setId(longCount.incrementAndGet());

        // Create the Information
        InformationDTO informationDTO = informationMapper.toDto(information);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInformationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(informationDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Information in the database
        List<Information> informationList = informationRepository.findAll();
        assertThat(informationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamInformation() throws Exception {
        int databaseSizeBeforeUpdate = informationRepository.findAll().size();
        information.setId(longCount.incrementAndGet());

        // Create the Information
        InformationDTO informationDTO = informationMapper.toDto(information);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInformationMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(informationDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Information in the database
        List<Information> informationList = informationRepository.findAll();
        assertThat(informationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteInformation() throws Exception {
        // Initialize the database
        informationRepository.saveAndFlush(information);

        int databaseSizeBeforeDelete = informationRepository.findAll().size();

        // Delete the information
        restInformationMockMvc
            .perform(delete(ENTITY_API_URL_ID, information.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Information> informationList = informationRepository.findAll();
        assertThat(informationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

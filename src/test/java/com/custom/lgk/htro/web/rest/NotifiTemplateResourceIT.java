package com.custom.lgk.htro.web.rest;

import com.custom.lgk.htro.HondaStocOnlineApp;
import com.custom.lgk.htro.domain.NotifiTemplate;
import com.custom.lgk.htro.repository.NotifiTemplateRepository;
import com.custom.lgk.htro.repository.search.NotifiTemplateSearchRepository;
import com.custom.lgk.htro.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;

import static com.custom.lgk.htro.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link NotifiTemplateResource} REST controller.
 */
@SpringBootTest(classes = HondaStocOnlineApp.class)
public class NotifiTemplateResourceIT {

    private static final String DEFAULT_EMAIL_ADDRESSES = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL_ADDRESSES = "BBBBBBBBBB";

    private static final String DEFAULT_MESSAGE = "AAAAAAAAAA";
    private static final String UPDATED_MESSAGE = "BBBBBBBBBB";

    @Autowired
    private NotifiTemplateRepository notifiTemplateRepository;

    /**
     * This repository is mocked in the com.custom.lgk.htro.repository.search test package.
     *
     * @see com.custom.lgk.htro.repository.search.NotifiTemplateSearchRepositoryMockConfiguration
     */
    @Autowired
    private NotifiTemplateSearchRepository mockNotifiTemplateSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restNotifiTemplateMockMvc;

    private NotifiTemplate notifiTemplate;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NotifiTemplateResource notifiTemplateResource = new NotifiTemplateResource(notifiTemplateRepository, mockNotifiTemplateSearchRepository);
        this.restNotifiTemplateMockMvc = MockMvcBuilders.standaloneSetup(notifiTemplateResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NotifiTemplate createEntity(EntityManager em) {
        NotifiTemplate notifiTemplate = new NotifiTemplate()
            .emailAddresses(DEFAULT_EMAIL_ADDRESSES)
            .message(DEFAULT_MESSAGE);
        return notifiTemplate;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NotifiTemplate createUpdatedEntity(EntityManager em) {
        NotifiTemplate notifiTemplate = new NotifiTemplate()
            .emailAddresses(UPDATED_EMAIL_ADDRESSES)
            .message(UPDATED_MESSAGE);
        return notifiTemplate;
    }

    @BeforeEach
    public void initTest() {
        notifiTemplate = createEntity(em);
    }

    @Test
    @Transactional
    public void createNotifiTemplate() throws Exception {
        int databaseSizeBeforeCreate = notifiTemplateRepository.findAll().size();

        // Create the NotifiTemplate
        restNotifiTemplateMockMvc.perform(post("/api/notifi-templates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(notifiTemplate)))
            .andExpect(status().isCreated());

        // Validate the NotifiTemplate in the database
        List<NotifiTemplate> notifiTemplateList = notifiTemplateRepository.findAll();
        assertThat(notifiTemplateList).hasSize(databaseSizeBeforeCreate + 1);
        NotifiTemplate testNotifiTemplate = notifiTemplateList.get(notifiTemplateList.size() - 1);
        assertThat(testNotifiTemplate.getEmailAddresses()).isEqualTo(DEFAULT_EMAIL_ADDRESSES);
        assertThat(testNotifiTemplate.getMessage()).isEqualTo(DEFAULT_MESSAGE);

        // Validate the NotifiTemplate in Elasticsearch
        verify(mockNotifiTemplateSearchRepository, times(1)).save(testNotifiTemplate);
    }

    @Test
    @Transactional
    public void createNotifiTemplateWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = notifiTemplateRepository.findAll().size();

        // Create the NotifiTemplate with an existing ID
        notifiTemplate.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNotifiTemplateMockMvc.perform(post("/api/notifi-templates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(notifiTemplate)))
            .andExpect(status().isBadRequest());

        // Validate the NotifiTemplate in the database
        List<NotifiTemplate> notifiTemplateList = notifiTemplateRepository.findAll();
        assertThat(notifiTemplateList).hasSize(databaseSizeBeforeCreate);

        // Validate the NotifiTemplate in Elasticsearch
        verify(mockNotifiTemplateSearchRepository, times(0)).save(notifiTemplate);
    }


    @Test
    @Transactional
    public void checkEmailAddressesIsRequired() throws Exception {
        int databaseSizeBeforeTest = notifiTemplateRepository.findAll().size();
        // set the field null
        notifiTemplate.setEmailAddresses(null);

        // Create the NotifiTemplate, which fails.

        restNotifiTemplateMockMvc.perform(post("/api/notifi-templates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(notifiTemplate)))
            .andExpect(status().isBadRequest());

        List<NotifiTemplate> notifiTemplateList = notifiTemplateRepository.findAll();
        assertThat(notifiTemplateList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNotifiTemplates() throws Exception {
        // Initialize the database
        notifiTemplateRepository.saveAndFlush(notifiTemplate);

        // Get all the notifiTemplateList
        restNotifiTemplateMockMvc.perform(get("/api/notifi-templates?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(notifiTemplate.getId().intValue())))
            .andExpect(jsonPath("$.[*].emailAddresses").value(hasItem(DEFAULT_EMAIL_ADDRESSES)))
            .andExpect(jsonPath("$.[*].message").value(hasItem(DEFAULT_MESSAGE)));
    }
    
    @Test
    @Transactional
    public void getNotifiTemplate() throws Exception {
        // Initialize the database
        notifiTemplateRepository.saveAndFlush(notifiTemplate);

        // Get the notifiTemplate
        restNotifiTemplateMockMvc.perform(get("/api/notifi-templates/{id}", notifiTemplate.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(notifiTemplate.getId().intValue()))
            .andExpect(jsonPath("$.emailAddresses").value(DEFAULT_EMAIL_ADDRESSES))
            .andExpect(jsonPath("$.message").value(DEFAULT_MESSAGE));
    }

    @Test
    @Transactional
    public void getNonExistingNotifiTemplate() throws Exception {
        // Get the notifiTemplate
        restNotifiTemplateMockMvc.perform(get("/api/notifi-templates/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNotifiTemplate() throws Exception {
        // Initialize the database
        notifiTemplateRepository.saveAndFlush(notifiTemplate);

        int databaseSizeBeforeUpdate = notifiTemplateRepository.findAll().size();

        // Update the notifiTemplate
        NotifiTemplate updatedNotifiTemplate = notifiTemplateRepository.findById(notifiTemplate.getId()).get();
        // Disconnect from session so that the updates on updatedNotifiTemplate are not directly saved in db
        em.detach(updatedNotifiTemplate);
        updatedNotifiTemplate
            .emailAddresses(UPDATED_EMAIL_ADDRESSES)
            .message(UPDATED_MESSAGE);

        restNotifiTemplateMockMvc.perform(put("/api/notifi-templates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNotifiTemplate)))
            .andExpect(status().isOk());

        // Validate the NotifiTemplate in the database
        List<NotifiTemplate> notifiTemplateList = notifiTemplateRepository.findAll();
        assertThat(notifiTemplateList).hasSize(databaseSizeBeforeUpdate);
        NotifiTemplate testNotifiTemplate = notifiTemplateList.get(notifiTemplateList.size() - 1);
        assertThat(testNotifiTemplate.getEmailAddresses()).isEqualTo(UPDATED_EMAIL_ADDRESSES);
        assertThat(testNotifiTemplate.getMessage()).isEqualTo(UPDATED_MESSAGE);

        // Validate the NotifiTemplate in Elasticsearch
        verify(mockNotifiTemplateSearchRepository, times(1)).save(testNotifiTemplate);
    }

    @Test
    @Transactional
    public void updateNonExistingNotifiTemplate() throws Exception {
        int databaseSizeBeforeUpdate = notifiTemplateRepository.findAll().size();

        // Create the NotifiTemplate

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNotifiTemplateMockMvc.perform(put("/api/notifi-templates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(notifiTemplate)))
            .andExpect(status().isBadRequest());

        // Validate the NotifiTemplate in the database
        List<NotifiTemplate> notifiTemplateList = notifiTemplateRepository.findAll();
        assertThat(notifiTemplateList).hasSize(databaseSizeBeforeUpdate);

        // Validate the NotifiTemplate in Elasticsearch
        verify(mockNotifiTemplateSearchRepository, times(0)).save(notifiTemplate);
    }

    @Test
    @Transactional
    public void deleteNotifiTemplate() throws Exception {
        // Initialize the database
        notifiTemplateRepository.saveAndFlush(notifiTemplate);

        int databaseSizeBeforeDelete = notifiTemplateRepository.findAll().size();

        // Delete the notifiTemplate
        restNotifiTemplateMockMvc.perform(delete("/api/notifi-templates/{id}", notifiTemplate.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NotifiTemplate> notifiTemplateList = notifiTemplateRepository.findAll();
        assertThat(notifiTemplateList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the NotifiTemplate in Elasticsearch
        verify(mockNotifiTemplateSearchRepository, times(1)).deleteById(notifiTemplate.getId());
    }

    @Test
    @Transactional
    public void searchNotifiTemplate() throws Exception {
        // Initialize the database
        notifiTemplateRepository.saveAndFlush(notifiTemplate);
        when(mockNotifiTemplateSearchRepository.search(queryStringQuery("id:" + notifiTemplate.getId())))
            .thenReturn(Collections.singletonList(notifiTemplate));
        // Search the notifiTemplate
        restNotifiTemplateMockMvc.perform(get("/api/_search/notifi-templates?query=id:" + notifiTemplate.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(notifiTemplate.getId().intValue())))
            .andExpect(jsonPath("$.[*].emailAddresses").value(hasItem(DEFAULT_EMAIL_ADDRESSES)))
            .andExpect(jsonPath("$.[*].message").value(hasItem(DEFAULT_MESSAGE)));
    }
}

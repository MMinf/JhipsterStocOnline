package com.custom.lgk.htro.web.rest;

import com.custom.lgk.htro.HondaStocOnlineApp;
import com.custom.lgk.htro.domain.Dealer;
import com.custom.lgk.htro.repository.DealerRepository;
import com.custom.lgk.htro.repository.search.DealerSearchRepository;
import com.custom.lgk.htro.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static com.custom.lgk.htro.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.custom.lgk.htro.domain.enumeration.TipuriAuto;
/**
 * Integration tests for the {@link DealerResource} REST controller.
 */
@SpringBootTest(classes = HondaStocOnlineApp.class)
public class DealerResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final TipuriAuto DEFAULT_TIP_AUTOVEHICULE = TipuriAuto.AUTOMOBILE;
    private static final TipuriAuto UPDATED_TIP_AUTOVEHICULE = TipuriAuto.MOTOCILCETE;

    private static final String DEFAULT_DEALER_ID = "AAAAAAAAAA";
    private static final String UPDATED_DEALER_ID = "BBBBBBBBBB";

    @Autowired
    private DealerRepository dealerRepository;

    @Mock
    private DealerRepository dealerRepositoryMock;

    /**
     * This repository is mocked in the com.custom.lgk.htro.repository.search test package.
     *
     * @see com.custom.lgk.htro.repository.search.DealerSearchRepositoryMockConfiguration
     */
    @Autowired
    private DealerSearchRepository mockDealerSearchRepository;

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

    private MockMvc restDealerMockMvc;

    private Dealer dealer;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DealerResource dealerResource = new DealerResource(dealerRepository, mockDealerSearchRepository);
        this.restDealerMockMvc = MockMvcBuilders.standaloneSetup(dealerResource)
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
    public static Dealer createEntity(EntityManager em) {
        Dealer dealer = new Dealer()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .tipAutovehicule(DEFAULT_TIP_AUTOVEHICULE)
            .dealerId(DEFAULT_DEALER_ID);
        return dealer;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Dealer createUpdatedEntity(EntityManager em) {
        Dealer dealer = new Dealer()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .tipAutovehicule(UPDATED_TIP_AUTOVEHICULE)
            .dealerId(UPDATED_DEALER_ID);
        return dealer;
    }

    @BeforeEach
    public void initTest() {
        dealer = createEntity(em);
    }

    @Test
    @Transactional
    public void createDealer() throws Exception {
        int databaseSizeBeforeCreate = dealerRepository.findAll().size();

        // Create the Dealer
        restDealerMockMvc.perform(post("/api/dealers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dealer)))
            .andExpect(status().isCreated());

        // Validate the Dealer in the database
        List<Dealer> dealerList = dealerRepository.findAll();
        assertThat(dealerList).hasSize(databaseSizeBeforeCreate + 1);
        Dealer testDealer = dealerList.get(dealerList.size() - 1);
        assertThat(testDealer.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testDealer.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testDealer.getTipAutovehicule()).isEqualTo(DEFAULT_TIP_AUTOVEHICULE);
        assertThat(testDealer.getDealerId()).isEqualTo(DEFAULT_DEALER_ID);

        // Validate the Dealer in Elasticsearch
        verify(mockDealerSearchRepository, times(1)).save(testDealer);
    }

    @Test
    @Transactional
    public void createDealerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dealerRepository.findAll().size();

        // Create the Dealer with an existing ID
        dealer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDealerMockMvc.perform(post("/api/dealers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dealer)))
            .andExpect(status().isBadRequest());

        // Validate the Dealer in the database
        List<Dealer> dealerList = dealerRepository.findAll();
        assertThat(dealerList).hasSize(databaseSizeBeforeCreate);

        // Validate the Dealer in Elasticsearch
        verify(mockDealerSearchRepository, times(0)).save(dealer);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = dealerRepository.findAll().size();
        // set the field null
        dealer.setName(null);

        // Create the Dealer, which fails.

        restDealerMockMvc.perform(post("/api/dealers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dealer)))
            .andExpect(status().isBadRequest());

        List<Dealer> dealerList = dealerRepository.findAll();
        assertThat(dealerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDealers() throws Exception {
        // Initialize the database
        dealerRepository.saveAndFlush(dealer);

        // Get all the dealerList
        restDealerMockMvc.perform(get("/api/dealers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dealer.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].tipAutovehicule").value(hasItem(DEFAULT_TIP_AUTOVEHICULE.toString())))
            .andExpect(jsonPath("$.[*].dealerId").value(hasItem(DEFAULT_DEALER_ID)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllDealersWithEagerRelationshipsIsEnabled() throws Exception {
        DealerResource dealerResource = new DealerResource(dealerRepositoryMock, mockDealerSearchRepository);
        when(dealerRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restDealerMockMvc = MockMvcBuilders.standaloneSetup(dealerResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restDealerMockMvc.perform(get("/api/dealers?eagerload=true"))
        .andExpect(status().isOk());

        verify(dealerRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllDealersWithEagerRelationshipsIsNotEnabled() throws Exception {
        DealerResource dealerResource = new DealerResource(dealerRepositoryMock, mockDealerSearchRepository);
            when(dealerRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restDealerMockMvc = MockMvcBuilders.standaloneSetup(dealerResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restDealerMockMvc.perform(get("/api/dealers?eagerload=true"))
        .andExpect(status().isOk());

            verify(dealerRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getDealer() throws Exception {
        // Initialize the database
        dealerRepository.saveAndFlush(dealer);

        // Get the dealer
        restDealerMockMvc.perform(get("/api/dealers/{id}", dealer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dealer.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.tipAutovehicule").value(DEFAULT_TIP_AUTOVEHICULE.toString()))
            .andExpect(jsonPath("$.dealerId").value(DEFAULT_DEALER_ID));
    }

    @Test
    @Transactional
    public void getNonExistingDealer() throws Exception {
        // Get the dealer
        restDealerMockMvc.perform(get("/api/dealers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDealer() throws Exception {
        // Initialize the database
        dealerRepository.saveAndFlush(dealer);

        int databaseSizeBeforeUpdate = dealerRepository.findAll().size();

        // Update the dealer
        Dealer updatedDealer = dealerRepository.findById(dealer.getId()).get();
        // Disconnect from session so that the updates on updatedDealer are not directly saved in db
        em.detach(updatedDealer);
        updatedDealer
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .tipAutovehicule(UPDATED_TIP_AUTOVEHICULE)
            .dealerId(UPDATED_DEALER_ID);

        restDealerMockMvc.perform(put("/api/dealers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDealer)))
            .andExpect(status().isOk());

        // Validate the Dealer in the database
        List<Dealer> dealerList = dealerRepository.findAll();
        assertThat(dealerList).hasSize(databaseSizeBeforeUpdate);
        Dealer testDealer = dealerList.get(dealerList.size() - 1);
        assertThat(testDealer.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testDealer.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testDealer.getTipAutovehicule()).isEqualTo(UPDATED_TIP_AUTOVEHICULE);
        assertThat(testDealer.getDealerId()).isEqualTo(UPDATED_DEALER_ID);

        // Validate the Dealer in Elasticsearch
        verify(mockDealerSearchRepository, times(1)).save(testDealer);
    }

    @Test
    @Transactional
    public void updateNonExistingDealer() throws Exception {
        int databaseSizeBeforeUpdate = dealerRepository.findAll().size();

        // Create the Dealer

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDealerMockMvc.perform(put("/api/dealers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dealer)))
            .andExpect(status().isBadRequest());

        // Validate the Dealer in the database
        List<Dealer> dealerList = dealerRepository.findAll();
        assertThat(dealerList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Dealer in Elasticsearch
        verify(mockDealerSearchRepository, times(0)).save(dealer);
    }

    @Test
    @Transactional
    public void deleteDealer() throws Exception {
        // Initialize the database
        dealerRepository.saveAndFlush(dealer);

        int databaseSizeBeforeDelete = dealerRepository.findAll().size();

        // Delete the dealer
        restDealerMockMvc.perform(delete("/api/dealers/{id}", dealer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Dealer> dealerList = dealerRepository.findAll();
        assertThat(dealerList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Dealer in Elasticsearch
        verify(mockDealerSearchRepository, times(1)).deleteById(dealer.getId());
    }

    @Test
    @Transactional
    public void searchDealer() throws Exception {
        // Initialize the database
        dealerRepository.saveAndFlush(dealer);
        when(mockDealerSearchRepository.search(queryStringQuery("id:" + dealer.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(dealer), PageRequest.of(0, 1), 1));
        // Search the dealer
        restDealerMockMvc.perform(get("/api/_search/dealers?query=id:" + dealer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dealer.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].tipAutovehicule").value(hasItem(DEFAULT_TIP_AUTOVEHICULE.toString())))
            .andExpect(jsonPath("$.[*].dealerId").value(hasItem(DEFAULT_DEALER_ID)));
    }
}

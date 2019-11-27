package com.custom.lgk.htro.web.rest;

import com.custom.lgk.htro.HondaStocOnlineApp;
import com.custom.lgk.htro.domain.Stoc;
import com.custom.lgk.htro.repository.StocRepository;
import com.custom.lgk.htro.repository.search.StocSearchRepository;
import com.custom.lgk.htro.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
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
 * Integration tests for the {@link StocResource} REST controller.
 */
@SpringBootTest(classes = HondaStocOnlineApp.class)
public class StocResourceIT {

    private static final Integer DEFAULT_H_TROCARNO = 1;
    private static final Integer UPDATED_H_TROCARNO = 2;

    private static final Integer DEFAULT_R_ESDEALERID = 1;
    private static final Integer UPDATED_R_ESDEALERID = 2;

    private static final Integer DEFAULT_A_NFABRICATIECIV = 1;
    private static final Integer UPDATED_A_NFABRICATIECIV = 2;

    private static final String DEFAULT_T_IPAUTOVEHICUL = "AAAAAAAAAA";
    private static final String UPDATED_T_IPAUTOVEHICUL = "BBBBBBBBBB";

    private static final String DEFAULT_C_ODCULOAREEXTERIOR = "AAAAAAAAAA";
    private static final String UPDATED_C_ODCULOAREEXTERIOR = "BBBBBBBBBB";

    private static final String DEFAULT_D_ESCCULOAREEXTERIOR = "AAAAAAAAAA";
    private static final String UPDATED_D_ESCCULOAREEXTERIOR = "BBBBBBBBBB";

    private static final String DEFAULT_V_OPSEAMETALIZATA = "AAAAAAAAAA";
    private static final String UPDATED_V_OPSEAMETALIZATA = "BBBBBBBBBB";

    private static final String DEFAULT_C_ULOAREINTERIOR = "AAAAAAAAAA";
    private static final String UPDATED_C_ULOAREINTERIOR = "BBBBBBBBBB";

    private static final String DEFAULT_O_BSERVATII = "AAAAAAAAAA";
    private static final String UPDATED_O_BSERVATII = "BBBBBBBBBB";

    private static final String DEFAULT_L_OCATIE = "AAAAAAAAAA";
    private static final String UPDATED_L_OCATIE = "BBBBBBBBBB";

    private static final String DEFAULT_O_MOLOGAREIND = "AAAAAAAAAA";
    private static final String UPDATED_O_MOLOGAREIND = "BBBBBBBBBB";

    private static final String DEFAULT_L_UNASOSIREINTARA = "AAAAAAAAAA";
    private static final String UPDATED_L_UNASOSIREINTARA = "BBBBBBBBBB";

    private static final String DEFAULT_R_EZERVATA = "AAAAAAAAAA";
    private static final String UPDATED_R_EZERVATA = "BBBBBBBBBB";

    private static final String DEFAULT_D_ATAEXPIRAREREZ = "AAAAAAAAAA";
    private static final String UPDATED_D_ATAEXPIRAREREZ = "BBBBBBBBBB";

    @Autowired
    private StocRepository stocRepository;

    /**
     * This repository is mocked in the com.custom.lgk.htro.repository.search test package.
     *
     * @see com.custom.lgk.htro.repository.search.StocSearchRepositoryMockConfiguration
     */
    @Autowired
    private StocSearchRepository mockStocSearchRepository;

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

    private MockMvc restStocMockMvc;

    private Stoc stoc;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StocResource stocResource = new StocResource(stocRepository, mockStocSearchRepository);
        this.restStocMockMvc = MockMvcBuilders.standaloneSetup(stocResource)
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
    public static Stoc createEntity(EntityManager em) {
        Stoc stoc = new Stoc()
            .hTROCARNO(DEFAULT_H_TROCARNO)
            .rESDEALERID(DEFAULT_R_ESDEALERID)
            .aNFABRICATIECIV(DEFAULT_A_NFABRICATIECIV)
            .tIPAUTOVEHICUL(DEFAULT_T_IPAUTOVEHICUL)
            .cODCULOAREEXTERIOR(DEFAULT_C_ODCULOAREEXTERIOR)
            .dESCCULOAREEXTERIOR(DEFAULT_D_ESCCULOAREEXTERIOR)
            .vOPSEAMETALIZATA(DEFAULT_V_OPSEAMETALIZATA)
            .cULOAREINTERIOR(DEFAULT_C_ULOAREINTERIOR)
            .oBSERVATII(DEFAULT_O_BSERVATII)
            .lOCATIE(DEFAULT_L_OCATIE)
            .oMOLOGAREIND(DEFAULT_O_MOLOGAREIND)
            .lUNASOSIREINTARA(DEFAULT_L_UNASOSIREINTARA)
            .rEZERVATA(DEFAULT_R_EZERVATA)
            .dATAEXPIRAREREZ(DEFAULT_D_ATAEXPIRAREREZ);
        return stoc;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Stoc createUpdatedEntity(EntityManager em) {
        Stoc stoc = new Stoc()
            .hTROCARNO(UPDATED_H_TROCARNO)
            .rESDEALERID(UPDATED_R_ESDEALERID)
            .aNFABRICATIECIV(UPDATED_A_NFABRICATIECIV)
            .tIPAUTOVEHICUL(UPDATED_T_IPAUTOVEHICUL)
            .cODCULOAREEXTERIOR(UPDATED_C_ODCULOAREEXTERIOR)
            .dESCCULOAREEXTERIOR(UPDATED_D_ESCCULOAREEXTERIOR)
            .vOPSEAMETALIZATA(UPDATED_V_OPSEAMETALIZATA)
            .cULOAREINTERIOR(UPDATED_C_ULOAREINTERIOR)
            .oBSERVATII(UPDATED_O_BSERVATII)
            .lOCATIE(UPDATED_L_OCATIE)
            .oMOLOGAREIND(UPDATED_O_MOLOGAREIND)
            .lUNASOSIREINTARA(UPDATED_L_UNASOSIREINTARA)
            .rEZERVATA(UPDATED_R_EZERVATA)
            .dATAEXPIRAREREZ(UPDATED_D_ATAEXPIRAREREZ);
        return stoc;
    }

    @BeforeEach
    public void initTest() {
        stoc = createEntity(em);
    }

    @Test
    @Transactional
    public void createStoc() throws Exception {
        int databaseSizeBeforeCreate = stocRepository.findAll().size();

        // Create the Stoc
        restStocMockMvc.perform(post("/api/stocs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stoc)))
            .andExpect(status().isCreated());

        // Validate the Stoc in the database
        List<Stoc> stocList = stocRepository.findAll();
        assertThat(stocList).hasSize(databaseSizeBeforeCreate + 1);
        Stoc testStoc = stocList.get(stocList.size() - 1);
        assertThat(testStoc.gethTROCARNO()).isEqualTo(DEFAULT_H_TROCARNO);
        assertThat(testStoc.getrESDEALERID()).isEqualTo(DEFAULT_R_ESDEALERID);
        assertThat(testStoc.getaNFABRICATIECIV()).isEqualTo(DEFAULT_A_NFABRICATIECIV);
        assertThat(testStoc.gettIPAUTOVEHICUL()).isEqualTo(DEFAULT_T_IPAUTOVEHICUL);
        assertThat(testStoc.getcODCULOAREEXTERIOR()).isEqualTo(DEFAULT_C_ODCULOAREEXTERIOR);
        assertThat(testStoc.getdESCCULOAREEXTERIOR()).isEqualTo(DEFAULT_D_ESCCULOAREEXTERIOR);
        assertThat(testStoc.getvOPSEAMETALIZATA()).isEqualTo(DEFAULT_V_OPSEAMETALIZATA);
        assertThat(testStoc.getcULOAREINTERIOR()).isEqualTo(DEFAULT_C_ULOAREINTERIOR);
        assertThat(testStoc.getoBSERVATII()).isEqualTo(DEFAULT_O_BSERVATII);
        assertThat(testStoc.getlOCATIE()).isEqualTo(DEFAULT_L_OCATIE);
        assertThat(testStoc.getoMOLOGAREIND()).isEqualTo(DEFAULT_O_MOLOGAREIND);
        assertThat(testStoc.getlUNASOSIREINTARA()).isEqualTo(DEFAULT_L_UNASOSIREINTARA);
        assertThat(testStoc.getrEZERVATA()).isEqualTo(DEFAULT_R_EZERVATA);
        assertThat(testStoc.getdATAEXPIRAREREZ()).isEqualTo(DEFAULT_D_ATAEXPIRAREREZ);

        // Validate the Stoc in Elasticsearch
        verify(mockStocSearchRepository, times(1)).save(testStoc);
    }

    @Test
    @Transactional
    public void createStocWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = stocRepository.findAll().size();

        // Create the Stoc with an existing ID
        stoc.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStocMockMvc.perform(post("/api/stocs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stoc)))
            .andExpect(status().isBadRequest());

        // Validate the Stoc in the database
        List<Stoc> stocList = stocRepository.findAll();
        assertThat(stocList).hasSize(databaseSizeBeforeCreate);

        // Validate the Stoc in Elasticsearch
        verify(mockStocSearchRepository, times(0)).save(stoc);
    }


    @Test
    @Transactional
    public void getAllStocs() throws Exception {
        // Initialize the database
        stocRepository.saveAndFlush(stoc);

        // Get all the stocList
        restStocMockMvc.perform(get("/api/stocs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stoc.getId().intValue())))
            .andExpect(jsonPath("$.[*].hTROCARNO").value(hasItem(DEFAULT_H_TROCARNO)))
            .andExpect(jsonPath("$.[*].rESDEALERID").value(hasItem(DEFAULT_R_ESDEALERID)))
            .andExpect(jsonPath("$.[*].aNFABRICATIECIV").value(hasItem(DEFAULT_A_NFABRICATIECIV)))
            .andExpect(jsonPath("$.[*].tIPAUTOVEHICUL").value(hasItem(DEFAULT_T_IPAUTOVEHICUL)))
            .andExpect(jsonPath("$.[*].cODCULOAREEXTERIOR").value(hasItem(DEFAULT_C_ODCULOAREEXTERIOR)))
            .andExpect(jsonPath("$.[*].dESCCULOAREEXTERIOR").value(hasItem(DEFAULT_D_ESCCULOAREEXTERIOR)))
            .andExpect(jsonPath("$.[*].vOPSEAMETALIZATA").value(hasItem(DEFAULT_V_OPSEAMETALIZATA)))
            .andExpect(jsonPath("$.[*].cULOAREINTERIOR").value(hasItem(DEFAULT_C_ULOAREINTERIOR)))
            .andExpect(jsonPath("$.[*].oBSERVATII").value(hasItem(DEFAULT_O_BSERVATII)))
            .andExpect(jsonPath("$.[*].lOCATIE").value(hasItem(DEFAULT_L_OCATIE)))
            .andExpect(jsonPath("$.[*].oMOLOGAREIND").value(hasItem(DEFAULT_O_MOLOGAREIND)))
            .andExpect(jsonPath("$.[*].lUNASOSIREINTARA").value(hasItem(DEFAULT_L_UNASOSIREINTARA)))
            .andExpect(jsonPath("$.[*].rEZERVATA").value(hasItem(DEFAULT_R_EZERVATA)))
            .andExpect(jsonPath("$.[*].dATAEXPIRAREREZ").value(hasItem(DEFAULT_D_ATAEXPIRAREREZ)));
    }
    
    @Test
    @Transactional
    public void getStoc() throws Exception {
        // Initialize the database
        stocRepository.saveAndFlush(stoc);

        // Get the stoc
        restStocMockMvc.perform(get("/api/stocs/{id}", stoc.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(stoc.getId().intValue()))
            .andExpect(jsonPath("$.hTROCARNO").value(DEFAULT_H_TROCARNO))
            .andExpect(jsonPath("$.rESDEALERID").value(DEFAULT_R_ESDEALERID))
            .andExpect(jsonPath("$.aNFABRICATIECIV").value(DEFAULT_A_NFABRICATIECIV))
            .andExpect(jsonPath("$.tIPAUTOVEHICUL").value(DEFAULT_T_IPAUTOVEHICUL))
            .andExpect(jsonPath("$.cODCULOAREEXTERIOR").value(DEFAULT_C_ODCULOAREEXTERIOR))
            .andExpect(jsonPath("$.dESCCULOAREEXTERIOR").value(DEFAULT_D_ESCCULOAREEXTERIOR))
            .andExpect(jsonPath("$.vOPSEAMETALIZATA").value(DEFAULT_V_OPSEAMETALIZATA))
            .andExpect(jsonPath("$.cULOAREINTERIOR").value(DEFAULT_C_ULOAREINTERIOR))
            .andExpect(jsonPath("$.oBSERVATII").value(DEFAULT_O_BSERVATII))
            .andExpect(jsonPath("$.lOCATIE").value(DEFAULT_L_OCATIE))
            .andExpect(jsonPath("$.oMOLOGAREIND").value(DEFAULT_O_MOLOGAREIND))
            .andExpect(jsonPath("$.lUNASOSIREINTARA").value(DEFAULT_L_UNASOSIREINTARA))
            .andExpect(jsonPath("$.rEZERVATA").value(DEFAULT_R_EZERVATA))
            .andExpect(jsonPath("$.dATAEXPIRAREREZ").value(DEFAULT_D_ATAEXPIRAREREZ));
    }

    @Test
    @Transactional
    public void getNonExistingStoc() throws Exception {
        // Get the stoc
        restStocMockMvc.perform(get("/api/stocs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStoc() throws Exception {
        // Initialize the database
        stocRepository.saveAndFlush(stoc);

        int databaseSizeBeforeUpdate = stocRepository.findAll().size();

        // Update the stoc
        Stoc updatedStoc = stocRepository.findById(stoc.getId()).get();
        // Disconnect from session so that the updates on updatedStoc are not directly saved in db
        em.detach(updatedStoc);
        updatedStoc
            .hTROCARNO(UPDATED_H_TROCARNO)
            .rESDEALERID(UPDATED_R_ESDEALERID)
            .aNFABRICATIECIV(UPDATED_A_NFABRICATIECIV)
            .tIPAUTOVEHICUL(UPDATED_T_IPAUTOVEHICUL)
            .cODCULOAREEXTERIOR(UPDATED_C_ODCULOAREEXTERIOR)
            .dESCCULOAREEXTERIOR(UPDATED_D_ESCCULOAREEXTERIOR)
            .vOPSEAMETALIZATA(UPDATED_V_OPSEAMETALIZATA)
            .cULOAREINTERIOR(UPDATED_C_ULOAREINTERIOR)
            .oBSERVATII(UPDATED_O_BSERVATII)
            .lOCATIE(UPDATED_L_OCATIE)
            .oMOLOGAREIND(UPDATED_O_MOLOGAREIND)
            .lUNASOSIREINTARA(UPDATED_L_UNASOSIREINTARA)
            .rEZERVATA(UPDATED_R_EZERVATA)
            .dATAEXPIRAREREZ(UPDATED_D_ATAEXPIRAREREZ);

        restStocMockMvc.perform(put("/api/stocs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStoc)))
            .andExpect(status().isOk());

        // Validate the Stoc in the database
        List<Stoc> stocList = stocRepository.findAll();
        assertThat(stocList).hasSize(databaseSizeBeforeUpdate);
        Stoc testStoc = stocList.get(stocList.size() - 1);
        assertThat(testStoc.gethTROCARNO()).isEqualTo(UPDATED_H_TROCARNO);
        assertThat(testStoc.getrESDEALERID()).isEqualTo(UPDATED_R_ESDEALERID);
        assertThat(testStoc.getaNFABRICATIECIV()).isEqualTo(UPDATED_A_NFABRICATIECIV);
        assertThat(testStoc.gettIPAUTOVEHICUL()).isEqualTo(UPDATED_T_IPAUTOVEHICUL);
        assertThat(testStoc.getcODCULOAREEXTERIOR()).isEqualTo(UPDATED_C_ODCULOAREEXTERIOR);
        assertThat(testStoc.getdESCCULOAREEXTERIOR()).isEqualTo(UPDATED_D_ESCCULOAREEXTERIOR);
        assertThat(testStoc.getvOPSEAMETALIZATA()).isEqualTo(UPDATED_V_OPSEAMETALIZATA);
        assertThat(testStoc.getcULOAREINTERIOR()).isEqualTo(UPDATED_C_ULOAREINTERIOR);
        assertThat(testStoc.getoBSERVATII()).isEqualTo(UPDATED_O_BSERVATII);
        assertThat(testStoc.getlOCATIE()).isEqualTo(UPDATED_L_OCATIE);
        assertThat(testStoc.getoMOLOGAREIND()).isEqualTo(UPDATED_O_MOLOGAREIND);
        assertThat(testStoc.getlUNASOSIREINTARA()).isEqualTo(UPDATED_L_UNASOSIREINTARA);
        assertThat(testStoc.getrEZERVATA()).isEqualTo(UPDATED_R_EZERVATA);
        assertThat(testStoc.getdATAEXPIRAREREZ()).isEqualTo(UPDATED_D_ATAEXPIRAREREZ);

        // Validate the Stoc in Elasticsearch
        verify(mockStocSearchRepository, times(1)).save(testStoc);
    }

    @Test
    @Transactional
    public void updateNonExistingStoc() throws Exception {
        int databaseSizeBeforeUpdate = stocRepository.findAll().size();

        // Create the Stoc

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStocMockMvc.perform(put("/api/stocs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stoc)))
            .andExpect(status().isBadRequest());

        // Validate the Stoc in the database
        List<Stoc> stocList = stocRepository.findAll();
        assertThat(stocList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Stoc in Elasticsearch
        verify(mockStocSearchRepository, times(0)).save(stoc);
    }

    @Test
    @Transactional
    public void deleteStoc() throws Exception {
        // Initialize the database
        stocRepository.saveAndFlush(stoc);

        int databaseSizeBeforeDelete = stocRepository.findAll().size();

        // Delete the stoc
        restStocMockMvc.perform(delete("/api/stocs/{id}", stoc.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Stoc> stocList = stocRepository.findAll();
        assertThat(stocList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Stoc in Elasticsearch
        verify(mockStocSearchRepository, times(1)).deleteById(stoc.getId());
    }

    @Test
    @Transactional
    public void searchStoc() throws Exception {
        // Initialize the database
        stocRepository.saveAndFlush(stoc);
        when(mockStocSearchRepository.search(queryStringQuery("id:" + stoc.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(stoc), PageRequest.of(0, 1), 1));
        // Search the stoc
        restStocMockMvc.perform(get("/api/_search/stocs?query=id:" + stoc.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stoc.getId().intValue())))
            .andExpect(jsonPath("$.[*].hTROCARNO").value(hasItem(DEFAULT_H_TROCARNO)))
            .andExpect(jsonPath("$.[*].rESDEALERID").value(hasItem(DEFAULT_R_ESDEALERID)))
            .andExpect(jsonPath("$.[*].aNFABRICATIECIV").value(hasItem(DEFAULT_A_NFABRICATIECIV)))
            .andExpect(jsonPath("$.[*].tIPAUTOVEHICUL").value(hasItem(DEFAULT_T_IPAUTOVEHICUL)))
            .andExpect(jsonPath("$.[*].cODCULOAREEXTERIOR").value(hasItem(DEFAULT_C_ODCULOAREEXTERIOR)))
            .andExpect(jsonPath("$.[*].dESCCULOAREEXTERIOR").value(hasItem(DEFAULT_D_ESCCULOAREEXTERIOR)))
            .andExpect(jsonPath("$.[*].vOPSEAMETALIZATA").value(hasItem(DEFAULT_V_OPSEAMETALIZATA)))
            .andExpect(jsonPath("$.[*].cULOAREINTERIOR").value(hasItem(DEFAULT_C_ULOAREINTERIOR)))
            .andExpect(jsonPath("$.[*].oBSERVATII").value(hasItem(DEFAULT_O_BSERVATII)))
            .andExpect(jsonPath("$.[*].lOCATIE").value(hasItem(DEFAULT_L_OCATIE)))
            .andExpect(jsonPath("$.[*].oMOLOGAREIND").value(hasItem(DEFAULT_O_MOLOGAREIND)))
            .andExpect(jsonPath("$.[*].lUNASOSIREINTARA").value(hasItem(DEFAULT_L_UNASOSIREINTARA)))
            .andExpect(jsonPath("$.[*].rEZERVATA").value(hasItem(DEFAULT_R_EZERVATA)))
            .andExpect(jsonPath("$.[*].dATAEXPIRAREREZ").value(hasItem(DEFAULT_D_ATAEXPIRAREREZ)));
    }
}

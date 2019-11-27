package com.custom.lgk.htro.web.rest;

import com.custom.lgk.htro.HondaStocOnlineApp;
import com.custom.lgk.htro.domain.Portofoliu;
import com.custom.lgk.htro.repository.PortofoliuRepository;
import com.custom.lgk.htro.repository.search.PortofoliuSearchRepository;
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
 * Integration tests for the {@link PortofoliuResource} REST controller.
 */
@SpringBootTest(classes = HondaStocOnlineApp.class)
public class PortofoliuResourceIT {

    private static final Integer DEFAULT_H_TROCARNO = 1;
    private static final Integer UPDATED_H_TROCARNO = 2;

    private static final String DEFAULT_D_EALER = "AAAAAAAAAA";
    private static final String UPDATED_D_EALER = "BBBBBBBBBB";

    private static final String DEFAULT_D_ATAREZSAUFACTURA = "AAAAAAAAAA";
    private static final String UPDATED_D_ATAREZSAUFACTURA = "BBBBBBBBBB";

    private static final String DEFAULT_D_ATAEXPIRARE = "AAAAAAAAAA";
    private static final String UPDATED_D_ATAEXPIRARE = "BBBBBBBBBB";

    private static final Integer DEFAULT_R_ESDEALERID = 1;
    private static final Integer UPDATED_R_ESDEALERID = 2;

    private static final String DEFAULT_T_IPLINIE = "AAAAAAAAAA";
    private static final String UPDATED_T_IPLINIE = "BBBBBBBBBB";

    private static final String DEFAULT_L_OCATIE = "AAAAAAAAAA";
    private static final String UPDATED_L_OCATIE = "BBBBBBBBBB";

    private static final String DEFAULT_L_UNAPRODUCTIE = "AAAAAAAAAA";
    private static final String UPDATED_L_UNAPRODUCTIE = "BBBBBBBBBB";

    private static final String DEFAULT_L_UNASOSIREINTARA = "AAAAAAAAAA";
    private static final String UPDATED_L_UNASOSIREINTARA = "BBBBBBBBBB";

    private static final String DEFAULT_C_ODMODEL = "AAAAAAAAAA";
    private static final String UPDATED_C_ODMODEL = "BBBBBBBBBB";

    private static final String DEFAULT_T_IPAUTOVEHICUL = "AAAAAAAAAA";
    private static final String UPDATED_T_IPAUTOVEHICUL = "BBBBBBBBBB";

    private static final String DEFAULT_C_ODCULOAREEXT = "AAAAAAAAAA";
    private static final String UPDATED_C_ODCULOAREEXT = "BBBBBBBBBB";

    private static final String DEFAULT_C_ULOAREEXTERIOR = "AAAAAAAAAA";
    private static final String UPDATED_C_ULOAREEXTERIOR = "BBBBBBBBBB";

    private static final String DEFAULT_C_ULOARE_INTEGER_ERIOR = "AAAAAAAAAA";
    private static final String UPDATED_C_ULOARE_INTEGER_ERIOR = "BBBBBBBBBB";

    private static final String DEFAULT_O_BSERVATII = "AAAAAAAAAA";
    private static final String UPDATED_O_BSERVATII = "BBBBBBBBBB";

    private static final String DEFAULT_N_UMECLIENT = "AAAAAAAAAA";
    private static final String UPDATED_N_UMECLIENT = "BBBBBBBBBB";

    private static final String DEFAULT_N_UMEVANZATOR = "AAAAAAAAAA";
    private static final String UPDATED_N_UMEVANZATOR = "BBBBBBBBBB";

    private static final String DEFAULT_V_IN = "AAAAAAAAAA";
    private static final String UPDATED_V_IN = "BBBBBBBBBB";

    private static final String DEFAULT_E_NGINENO = "AAAAAAAAAA";
    private static final String UPDATED_E_NGINENO = "BBBBBBBBBB";

    private static final Integer DEFAULT_A_NFABRICATIECFCIV = 1;
    private static final Integer UPDATED_A_NFABRICATIECFCIV = 2;

    private static final String DEFAULT_O_MOLOGAREINDIVIDUALA = "AAAAAAAAAA";
    private static final String UPDATED_O_MOLOGAREINDIVIDUALA = "BBBBBBBBBB";

    private static final Integer DEFAULT_P_RETLISTA = 1;
    private static final Integer UPDATED_P_RETLISTA = 2;

    private static final Integer DEFAULT_D_ISCOUNTSTANDARD = 1;
    private static final Integer UPDATED_D_ISCOUNTSTANDARD = 2;

    private static final Integer DEFAULT_D_ISCOUNTSUPLIMENTAR = 1;
    private static final Integer UPDATED_D_ISCOUNTSUPLIMENTAR = 2;

    private static final Integer DEFAULT_T_RUSALEGISLATIVA = 1;
    private static final Integer UPDATED_T_RUSALEGISLATIVA = 2;

    private static final Integer DEFAULT_P_RETFINAL = 1;
    private static final Integer UPDATED_P_RETFINAL = 2;

    private static final Integer DEFAULT_A_VANSPLATIT = 1;
    private static final Integer UPDATED_A_VANSPLATIT = 2;

    private static final Integer DEFAULT_R_ESTDEPLATA = 1;
    private static final Integer UPDATED_R_ESTDEPLATA = 2;

    private static final Integer DEFAULT_C_USTOMERTRXID = 1;
    private static final Integer UPDATED_C_USTOMERTRXID = 2;

    private static final String DEFAULT_R_EZCUSTID = "AAAAAAAAAA";
    private static final String UPDATED_R_EZCUSTID = "BBBBBBBBBB";

    private static final Integer DEFAULT_S_OLDCUSTID = 1;
    private static final Integer UPDATED_S_OLDCUSTID = 2;

    private static final Boolean DEFAULT_P_ROFORMA = false;
    private static final Boolean UPDATED_P_ROFORMA = true;

    private static final Boolean DEFAULT_T_RANSPORT = false;
    private static final Boolean UPDATED_T_RANSPORT = true;

    @Autowired
    private PortofoliuRepository portofoliuRepository;

    /**
     * This repository is mocked in the com.custom.lgk.htro.repository.search test package.
     *
     * @see com.custom.lgk.htro.repository.search.PortofoliuSearchRepositoryMockConfiguration
     */
    @Autowired
    private PortofoliuSearchRepository mockPortofoliuSearchRepository;

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

    private MockMvc restPortofoliuMockMvc;

    private Portofoliu portofoliu;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PortofoliuResource portofoliuResource = new PortofoliuResource(portofoliuRepository, mockPortofoliuSearchRepository);
        this.restPortofoliuMockMvc = MockMvcBuilders.standaloneSetup(portofoliuResource)
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
    public static Portofoliu createEntity(EntityManager em) {
        Portofoliu portofoliu = new Portofoliu()
            .hTROCARNO(DEFAULT_H_TROCARNO)
            .dEALER(DEFAULT_D_EALER)
            .dATAREZSAUFACTURA(DEFAULT_D_ATAREZSAUFACTURA)
            .dATAEXPIRARE(DEFAULT_D_ATAEXPIRARE)
            .rESDEALERID(DEFAULT_R_ESDEALERID)
            .tIPLINIE(DEFAULT_T_IPLINIE)
            .lOCATIE(DEFAULT_L_OCATIE)
            .lUNAPRODUCTIE(DEFAULT_L_UNAPRODUCTIE)
            .lUNASOSIREINTARA(DEFAULT_L_UNASOSIREINTARA)
            .cODMODEL(DEFAULT_C_ODMODEL)
            .tIPAUTOVEHICUL(DEFAULT_T_IPAUTOVEHICUL)
            .cODCULOAREEXT(DEFAULT_C_ODCULOAREEXT)
            .cULOAREEXTERIOR(DEFAULT_C_ULOAREEXTERIOR)
            .cULOAREIntegerERIOR(DEFAULT_C_ULOARE_INTEGER_ERIOR)
            .oBSERVATII(DEFAULT_O_BSERVATII)
            .nUMECLIENT(DEFAULT_N_UMECLIENT)
            .nUMEVANZATOR(DEFAULT_N_UMEVANZATOR)
            .vIN(DEFAULT_V_IN)
            .eNGINENO(DEFAULT_E_NGINENO)
            .aNFABRICATIECFCIV(DEFAULT_A_NFABRICATIECFCIV)
            .oMOLOGAREINDIVIDUALA(DEFAULT_O_MOLOGAREINDIVIDUALA)
            .pRETLISTA(DEFAULT_P_RETLISTA)
            .dISCOUNTSTANDARD(DEFAULT_D_ISCOUNTSTANDARD)
            .dISCOUNTSUPLIMENTAR(DEFAULT_D_ISCOUNTSUPLIMENTAR)
            .tRUSALEGISLATIVA(DEFAULT_T_RUSALEGISLATIVA)
            .pRETFINAL(DEFAULT_P_RETFINAL)
            .aVANSPLATIT(DEFAULT_A_VANSPLATIT)
            .rESTDEPLATA(DEFAULT_R_ESTDEPLATA)
            .cUSTOMERTRXID(DEFAULT_C_USTOMERTRXID)
            .rEZCUSTID(DEFAULT_R_EZCUSTID)
            .sOLDCUSTID(DEFAULT_S_OLDCUSTID)
            .pROFORMA(DEFAULT_P_ROFORMA)
            .tRANSPORT(DEFAULT_T_RANSPORT);
        return portofoliu;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Portofoliu createUpdatedEntity(EntityManager em) {
        Portofoliu portofoliu = new Portofoliu()
            .hTROCARNO(UPDATED_H_TROCARNO)
            .dEALER(UPDATED_D_EALER)
            .dATAREZSAUFACTURA(UPDATED_D_ATAREZSAUFACTURA)
            .dATAEXPIRARE(UPDATED_D_ATAEXPIRARE)
            .rESDEALERID(UPDATED_R_ESDEALERID)
            .tIPLINIE(UPDATED_T_IPLINIE)
            .lOCATIE(UPDATED_L_OCATIE)
            .lUNAPRODUCTIE(UPDATED_L_UNAPRODUCTIE)
            .lUNASOSIREINTARA(UPDATED_L_UNASOSIREINTARA)
            .cODMODEL(UPDATED_C_ODMODEL)
            .tIPAUTOVEHICUL(UPDATED_T_IPAUTOVEHICUL)
            .cODCULOAREEXT(UPDATED_C_ODCULOAREEXT)
            .cULOAREEXTERIOR(UPDATED_C_ULOAREEXTERIOR)
            .cULOAREIntegerERIOR(UPDATED_C_ULOARE_INTEGER_ERIOR)
            .oBSERVATII(UPDATED_O_BSERVATII)
            .nUMECLIENT(UPDATED_N_UMECLIENT)
            .nUMEVANZATOR(UPDATED_N_UMEVANZATOR)
            .vIN(UPDATED_V_IN)
            .eNGINENO(UPDATED_E_NGINENO)
            .aNFABRICATIECFCIV(UPDATED_A_NFABRICATIECFCIV)
            .oMOLOGAREINDIVIDUALA(UPDATED_O_MOLOGAREINDIVIDUALA)
            .pRETLISTA(UPDATED_P_RETLISTA)
            .dISCOUNTSTANDARD(UPDATED_D_ISCOUNTSTANDARD)
            .dISCOUNTSUPLIMENTAR(UPDATED_D_ISCOUNTSUPLIMENTAR)
            .tRUSALEGISLATIVA(UPDATED_T_RUSALEGISLATIVA)
            .pRETFINAL(UPDATED_P_RETFINAL)
            .aVANSPLATIT(UPDATED_A_VANSPLATIT)
            .rESTDEPLATA(UPDATED_R_ESTDEPLATA)
            .cUSTOMERTRXID(UPDATED_C_USTOMERTRXID)
            .rEZCUSTID(UPDATED_R_EZCUSTID)
            .sOLDCUSTID(UPDATED_S_OLDCUSTID)
            .pROFORMA(UPDATED_P_ROFORMA)
            .tRANSPORT(UPDATED_T_RANSPORT);
        return portofoliu;
    }

    @BeforeEach
    public void initTest() {
        portofoliu = createEntity(em);
    }

    @Test
    @Transactional
    public void createPortofoliu() throws Exception {
        int databaseSizeBeforeCreate = portofoliuRepository.findAll().size();

        // Create the Portofoliu
        restPortofoliuMockMvc.perform(post("/api/portofolius")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(portofoliu)))
            .andExpect(status().isCreated());

        // Validate the Portofoliu in the database
        List<Portofoliu> portofoliuList = portofoliuRepository.findAll();
        assertThat(portofoliuList).hasSize(databaseSizeBeforeCreate + 1);
        Portofoliu testPortofoliu = portofoliuList.get(portofoliuList.size() - 1);
        assertThat(testPortofoliu.gethTROCARNO()).isEqualTo(DEFAULT_H_TROCARNO);
        assertThat(testPortofoliu.getdEALER()).isEqualTo(DEFAULT_D_EALER);
        assertThat(testPortofoliu.getdATAREZSAUFACTURA()).isEqualTo(DEFAULT_D_ATAREZSAUFACTURA);
        assertThat(testPortofoliu.getdATAEXPIRARE()).isEqualTo(DEFAULT_D_ATAEXPIRARE);
        assertThat(testPortofoliu.getrESDEALERID()).isEqualTo(DEFAULT_R_ESDEALERID);
        assertThat(testPortofoliu.gettIPLINIE()).isEqualTo(DEFAULT_T_IPLINIE);
        assertThat(testPortofoliu.getlOCATIE()).isEqualTo(DEFAULT_L_OCATIE);
        assertThat(testPortofoliu.getlUNAPRODUCTIE()).isEqualTo(DEFAULT_L_UNAPRODUCTIE);
        assertThat(testPortofoliu.getlUNASOSIREINTARA()).isEqualTo(DEFAULT_L_UNASOSIREINTARA);
        assertThat(testPortofoliu.getcODMODEL()).isEqualTo(DEFAULT_C_ODMODEL);
        assertThat(testPortofoliu.gettIPAUTOVEHICUL()).isEqualTo(DEFAULT_T_IPAUTOVEHICUL);
        assertThat(testPortofoliu.getcODCULOAREEXT()).isEqualTo(DEFAULT_C_ODCULOAREEXT);
        assertThat(testPortofoliu.getcULOAREEXTERIOR()).isEqualTo(DEFAULT_C_ULOAREEXTERIOR);
        assertThat(testPortofoliu.getcULOAREIntegerERIOR()).isEqualTo(DEFAULT_C_ULOARE_INTEGER_ERIOR);
        assertThat(testPortofoliu.getoBSERVATII()).isEqualTo(DEFAULT_O_BSERVATII);
        assertThat(testPortofoliu.getnUMECLIENT()).isEqualTo(DEFAULT_N_UMECLIENT);
        assertThat(testPortofoliu.getnUMEVANZATOR()).isEqualTo(DEFAULT_N_UMEVANZATOR);
        assertThat(testPortofoliu.getvIN()).isEqualTo(DEFAULT_V_IN);
        assertThat(testPortofoliu.geteNGINENO()).isEqualTo(DEFAULT_E_NGINENO);
        assertThat(testPortofoliu.getaNFABRICATIECFCIV()).isEqualTo(DEFAULT_A_NFABRICATIECFCIV);
        assertThat(testPortofoliu.getoMOLOGAREINDIVIDUALA()).isEqualTo(DEFAULT_O_MOLOGAREINDIVIDUALA);
        assertThat(testPortofoliu.getpRETLISTA()).isEqualTo(DEFAULT_P_RETLISTA);
        assertThat(testPortofoliu.getdISCOUNTSTANDARD()).isEqualTo(DEFAULT_D_ISCOUNTSTANDARD);
        assertThat(testPortofoliu.getdISCOUNTSUPLIMENTAR()).isEqualTo(DEFAULT_D_ISCOUNTSUPLIMENTAR);
        assertThat(testPortofoliu.gettRUSALEGISLATIVA()).isEqualTo(DEFAULT_T_RUSALEGISLATIVA);
        assertThat(testPortofoliu.getpRETFINAL()).isEqualTo(DEFAULT_P_RETFINAL);
        assertThat(testPortofoliu.getaVANSPLATIT()).isEqualTo(DEFAULT_A_VANSPLATIT);
        assertThat(testPortofoliu.getrESTDEPLATA()).isEqualTo(DEFAULT_R_ESTDEPLATA);
        assertThat(testPortofoliu.getcUSTOMERTRXID()).isEqualTo(DEFAULT_C_USTOMERTRXID);
        assertThat(testPortofoliu.getrEZCUSTID()).isEqualTo(DEFAULT_R_EZCUSTID);
        assertThat(testPortofoliu.getsOLDCUSTID()).isEqualTo(DEFAULT_S_OLDCUSTID);
        assertThat(testPortofoliu.ispROFORMA()).isEqualTo(DEFAULT_P_ROFORMA);
        assertThat(testPortofoliu.istRANSPORT()).isEqualTo(DEFAULT_T_RANSPORT);

        // Validate the Portofoliu in Elasticsearch
        verify(mockPortofoliuSearchRepository, times(1)).save(testPortofoliu);
    }

    @Test
    @Transactional
    public void createPortofoliuWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = portofoliuRepository.findAll().size();

        // Create the Portofoliu with an existing ID
        portofoliu.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPortofoliuMockMvc.perform(post("/api/portofolius")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(portofoliu)))
            .andExpect(status().isBadRequest());

        // Validate the Portofoliu in the database
        List<Portofoliu> portofoliuList = portofoliuRepository.findAll();
        assertThat(portofoliuList).hasSize(databaseSizeBeforeCreate);

        // Validate the Portofoliu in Elasticsearch
        verify(mockPortofoliuSearchRepository, times(0)).save(portofoliu);
    }


    @Test
    @Transactional
    public void getAllPortofolius() throws Exception {
        // Initialize the database
        portofoliuRepository.saveAndFlush(portofoliu);

        // Get all the portofoliuList
        restPortofoliuMockMvc.perform(get("/api/portofolius?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(portofoliu.getId().intValue())))
            .andExpect(jsonPath("$.[*].hTROCARNO").value(hasItem(DEFAULT_H_TROCARNO)))
            .andExpect(jsonPath("$.[*].dEALER").value(hasItem(DEFAULT_D_EALER)))
            .andExpect(jsonPath("$.[*].dATAREZSAUFACTURA").value(hasItem(DEFAULT_D_ATAREZSAUFACTURA)))
            .andExpect(jsonPath("$.[*].dATAEXPIRARE").value(hasItem(DEFAULT_D_ATAEXPIRARE)))
            .andExpect(jsonPath("$.[*].rESDEALERID").value(hasItem(DEFAULT_R_ESDEALERID)))
            .andExpect(jsonPath("$.[*].tIPLINIE").value(hasItem(DEFAULT_T_IPLINIE)))
            .andExpect(jsonPath("$.[*].lOCATIE").value(hasItem(DEFAULT_L_OCATIE)))
            .andExpect(jsonPath("$.[*].lUNAPRODUCTIE").value(hasItem(DEFAULT_L_UNAPRODUCTIE)))
            .andExpect(jsonPath("$.[*].lUNASOSIREINTARA").value(hasItem(DEFAULT_L_UNASOSIREINTARA)))
            .andExpect(jsonPath("$.[*].cODMODEL").value(hasItem(DEFAULT_C_ODMODEL)))
            .andExpect(jsonPath("$.[*].tIPAUTOVEHICUL").value(hasItem(DEFAULT_T_IPAUTOVEHICUL)))
            .andExpect(jsonPath("$.[*].cODCULOAREEXT").value(hasItem(DEFAULT_C_ODCULOAREEXT)))
            .andExpect(jsonPath("$.[*].cULOAREEXTERIOR").value(hasItem(DEFAULT_C_ULOAREEXTERIOR)))
            .andExpect(jsonPath("$.[*].cULOAREIntegerERIOR").value(hasItem(DEFAULT_C_ULOARE_INTEGER_ERIOR)))
            .andExpect(jsonPath("$.[*].oBSERVATII").value(hasItem(DEFAULT_O_BSERVATII)))
            .andExpect(jsonPath("$.[*].nUMECLIENT").value(hasItem(DEFAULT_N_UMECLIENT)))
            .andExpect(jsonPath("$.[*].nUMEVANZATOR").value(hasItem(DEFAULT_N_UMEVANZATOR)))
            .andExpect(jsonPath("$.[*].vIN").value(hasItem(DEFAULT_V_IN)))
            .andExpect(jsonPath("$.[*].eNGINENO").value(hasItem(DEFAULT_E_NGINENO)))
            .andExpect(jsonPath("$.[*].aNFABRICATIECFCIV").value(hasItem(DEFAULT_A_NFABRICATIECFCIV)))
            .andExpect(jsonPath("$.[*].oMOLOGAREINDIVIDUALA").value(hasItem(DEFAULT_O_MOLOGAREINDIVIDUALA)))
            .andExpect(jsonPath("$.[*].pRETLISTA").value(hasItem(DEFAULT_P_RETLISTA)))
            .andExpect(jsonPath("$.[*].dISCOUNTSTANDARD").value(hasItem(DEFAULT_D_ISCOUNTSTANDARD)))
            .andExpect(jsonPath("$.[*].dISCOUNTSUPLIMENTAR").value(hasItem(DEFAULT_D_ISCOUNTSUPLIMENTAR)))
            .andExpect(jsonPath("$.[*].tRUSALEGISLATIVA").value(hasItem(DEFAULT_T_RUSALEGISLATIVA)))
            .andExpect(jsonPath("$.[*].pRETFINAL").value(hasItem(DEFAULT_P_RETFINAL)))
            .andExpect(jsonPath("$.[*].aVANSPLATIT").value(hasItem(DEFAULT_A_VANSPLATIT)))
            .andExpect(jsonPath("$.[*].rESTDEPLATA").value(hasItem(DEFAULT_R_ESTDEPLATA)))
            .andExpect(jsonPath("$.[*].cUSTOMERTRXID").value(hasItem(DEFAULT_C_USTOMERTRXID)))
            .andExpect(jsonPath("$.[*].rEZCUSTID").value(hasItem(DEFAULT_R_EZCUSTID)))
            .andExpect(jsonPath("$.[*].sOLDCUSTID").value(hasItem(DEFAULT_S_OLDCUSTID)))
            .andExpect(jsonPath("$.[*].pROFORMA").value(hasItem(DEFAULT_P_ROFORMA.booleanValue())))
            .andExpect(jsonPath("$.[*].tRANSPORT").value(hasItem(DEFAULT_T_RANSPORT.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getPortofoliu() throws Exception {
        // Initialize the database
        portofoliuRepository.saveAndFlush(portofoliu);

        // Get the portofoliu
        restPortofoliuMockMvc.perform(get("/api/portofolius/{id}", portofoliu.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(portofoliu.getId().intValue()))
            .andExpect(jsonPath("$.hTROCARNO").value(DEFAULT_H_TROCARNO))
            .andExpect(jsonPath("$.dEALER").value(DEFAULT_D_EALER))
            .andExpect(jsonPath("$.dATAREZSAUFACTURA").value(DEFAULT_D_ATAREZSAUFACTURA))
            .andExpect(jsonPath("$.dATAEXPIRARE").value(DEFAULT_D_ATAEXPIRARE))
            .andExpect(jsonPath("$.rESDEALERID").value(DEFAULT_R_ESDEALERID))
            .andExpect(jsonPath("$.tIPLINIE").value(DEFAULT_T_IPLINIE))
            .andExpect(jsonPath("$.lOCATIE").value(DEFAULT_L_OCATIE))
            .andExpect(jsonPath("$.lUNAPRODUCTIE").value(DEFAULT_L_UNAPRODUCTIE))
            .andExpect(jsonPath("$.lUNASOSIREINTARA").value(DEFAULT_L_UNASOSIREINTARA))
            .andExpect(jsonPath("$.cODMODEL").value(DEFAULT_C_ODMODEL))
            .andExpect(jsonPath("$.tIPAUTOVEHICUL").value(DEFAULT_T_IPAUTOVEHICUL))
            .andExpect(jsonPath("$.cODCULOAREEXT").value(DEFAULT_C_ODCULOAREEXT))
            .andExpect(jsonPath("$.cULOAREEXTERIOR").value(DEFAULT_C_ULOAREEXTERIOR))
            .andExpect(jsonPath("$.cULOAREIntegerERIOR").value(DEFAULT_C_ULOARE_INTEGER_ERIOR))
            .andExpect(jsonPath("$.oBSERVATII").value(DEFAULT_O_BSERVATII))
            .andExpect(jsonPath("$.nUMECLIENT").value(DEFAULT_N_UMECLIENT))
            .andExpect(jsonPath("$.nUMEVANZATOR").value(DEFAULT_N_UMEVANZATOR))
            .andExpect(jsonPath("$.vIN").value(DEFAULT_V_IN))
            .andExpect(jsonPath("$.eNGINENO").value(DEFAULT_E_NGINENO))
            .andExpect(jsonPath("$.aNFABRICATIECFCIV").value(DEFAULT_A_NFABRICATIECFCIV))
            .andExpect(jsonPath("$.oMOLOGAREINDIVIDUALA").value(DEFAULT_O_MOLOGAREINDIVIDUALA))
            .andExpect(jsonPath("$.pRETLISTA").value(DEFAULT_P_RETLISTA))
            .andExpect(jsonPath("$.dISCOUNTSTANDARD").value(DEFAULT_D_ISCOUNTSTANDARD))
            .andExpect(jsonPath("$.dISCOUNTSUPLIMENTAR").value(DEFAULT_D_ISCOUNTSUPLIMENTAR))
            .andExpect(jsonPath("$.tRUSALEGISLATIVA").value(DEFAULT_T_RUSALEGISLATIVA))
            .andExpect(jsonPath("$.pRETFINAL").value(DEFAULT_P_RETFINAL))
            .andExpect(jsonPath("$.aVANSPLATIT").value(DEFAULT_A_VANSPLATIT))
            .andExpect(jsonPath("$.rESTDEPLATA").value(DEFAULT_R_ESTDEPLATA))
            .andExpect(jsonPath("$.cUSTOMERTRXID").value(DEFAULT_C_USTOMERTRXID))
            .andExpect(jsonPath("$.rEZCUSTID").value(DEFAULT_R_EZCUSTID))
            .andExpect(jsonPath("$.sOLDCUSTID").value(DEFAULT_S_OLDCUSTID))
            .andExpect(jsonPath("$.pROFORMA").value(DEFAULT_P_ROFORMA.booleanValue()))
            .andExpect(jsonPath("$.tRANSPORT").value(DEFAULT_T_RANSPORT.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPortofoliu() throws Exception {
        // Get the portofoliu
        restPortofoliuMockMvc.perform(get("/api/portofolius/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePortofoliu() throws Exception {
        // Initialize the database
        portofoliuRepository.saveAndFlush(portofoliu);

        int databaseSizeBeforeUpdate = portofoliuRepository.findAll().size();

        // Update the portofoliu
        Portofoliu updatedPortofoliu = portofoliuRepository.findById(portofoliu.getId()).get();
        // Disconnect from session so that the updates on updatedPortofoliu are not directly saved in db
        em.detach(updatedPortofoliu);
        updatedPortofoliu
            .hTROCARNO(UPDATED_H_TROCARNO)
            .dEALER(UPDATED_D_EALER)
            .dATAREZSAUFACTURA(UPDATED_D_ATAREZSAUFACTURA)
            .dATAEXPIRARE(UPDATED_D_ATAEXPIRARE)
            .rESDEALERID(UPDATED_R_ESDEALERID)
            .tIPLINIE(UPDATED_T_IPLINIE)
            .lOCATIE(UPDATED_L_OCATIE)
            .lUNAPRODUCTIE(UPDATED_L_UNAPRODUCTIE)
            .lUNASOSIREINTARA(UPDATED_L_UNASOSIREINTARA)
            .cODMODEL(UPDATED_C_ODMODEL)
            .tIPAUTOVEHICUL(UPDATED_T_IPAUTOVEHICUL)
            .cODCULOAREEXT(UPDATED_C_ODCULOAREEXT)
            .cULOAREEXTERIOR(UPDATED_C_ULOAREEXTERIOR)
            .cULOAREIntegerERIOR(UPDATED_C_ULOARE_INTEGER_ERIOR)
            .oBSERVATII(UPDATED_O_BSERVATII)
            .nUMECLIENT(UPDATED_N_UMECLIENT)
            .nUMEVANZATOR(UPDATED_N_UMEVANZATOR)
            .vIN(UPDATED_V_IN)
            .eNGINENO(UPDATED_E_NGINENO)
            .aNFABRICATIECFCIV(UPDATED_A_NFABRICATIECFCIV)
            .oMOLOGAREINDIVIDUALA(UPDATED_O_MOLOGAREINDIVIDUALA)
            .pRETLISTA(UPDATED_P_RETLISTA)
            .dISCOUNTSTANDARD(UPDATED_D_ISCOUNTSTANDARD)
            .dISCOUNTSUPLIMENTAR(UPDATED_D_ISCOUNTSUPLIMENTAR)
            .tRUSALEGISLATIVA(UPDATED_T_RUSALEGISLATIVA)
            .pRETFINAL(UPDATED_P_RETFINAL)
            .aVANSPLATIT(UPDATED_A_VANSPLATIT)
            .rESTDEPLATA(UPDATED_R_ESTDEPLATA)
            .cUSTOMERTRXID(UPDATED_C_USTOMERTRXID)
            .rEZCUSTID(UPDATED_R_EZCUSTID)
            .sOLDCUSTID(UPDATED_S_OLDCUSTID)
            .pROFORMA(UPDATED_P_ROFORMA)
            .tRANSPORT(UPDATED_T_RANSPORT);

        restPortofoliuMockMvc.perform(put("/api/portofolius")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPortofoliu)))
            .andExpect(status().isOk());

        // Validate the Portofoliu in the database
        List<Portofoliu> portofoliuList = portofoliuRepository.findAll();
        assertThat(portofoliuList).hasSize(databaseSizeBeforeUpdate);
        Portofoliu testPortofoliu = portofoliuList.get(portofoliuList.size() - 1);
        assertThat(testPortofoliu.gethTROCARNO()).isEqualTo(UPDATED_H_TROCARNO);
        assertThat(testPortofoliu.getdEALER()).isEqualTo(UPDATED_D_EALER);
        assertThat(testPortofoliu.getdATAREZSAUFACTURA()).isEqualTo(UPDATED_D_ATAREZSAUFACTURA);
        assertThat(testPortofoliu.getdATAEXPIRARE()).isEqualTo(UPDATED_D_ATAEXPIRARE);
        assertThat(testPortofoliu.getrESDEALERID()).isEqualTo(UPDATED_R_ESDEALERID);
        assertThat(testPortofoliu.gettIPLINIE()).isEqualTo(UPDATED_T_IPLINIE);
        assertThat(testPortofoliu.getlOCATIE()).isEqualTo(UPDATED_L_OCATIE);
        assertThat(testPortofoliu.getlUNAPRODUCTIE()).isEqualTo(UPDATED_L_UNAPRODUCTIE);
        assertThat(testPortofoliu.getlUNASOSIREINTARA()).isEqualTo(UPDATED_L_UNASOSIREINTARA);
        assertThat(testPortofoliu.getcODMODEL()).isEqualTo(UPDATED_C_ODMODEL);
        assertThat(testPortofoliu.gettIPAUTOVEHICUL()).isEqualTo(UPDATED_T_IPAUTOVEHICUL);
        assertThat(testPortofoliu.getcODCULOAREEXT()).isEqualTo(UPDATED_C_ODCULOAREEXT);
        assertThat(testPortofoliu.getcULOAREEXTERIOR()).isEqualTo(UPDATED_C_ULOAREEXTERIOR);
        assertThat(testPortofoliu.getcULOAREIntegerERIOR()).isEqualTo(UPDATED_C_ULOARE_INTEGER_ERIOR);
        assertThat(testPortofoliu.getoBSERVATII()).isEqualTo(UPDATED_O_BSERVATII);
        assertThat(testPortofoliu.getnUMECLIENT()).isEqualTo(UPDATED_N_UMECLIENT);
        assertThat(testPortofoliu.getnUMEVANZATOR()).isEqualTo(UPDATED_N_UMEVANZATOR);
        assertThat(testPortofoliu.getvIN()).isEqualTo(UPDATED_V_IN);
        assertThat(testPortofoliu.geteNGINENO()).isEqualTo(UPDATED_E_NGINENO);
        assertThat(testPortofoliu.getaNFABRICATIECFCIV()).isEqualTo(UPDATED_A_NFABRICATIECFCIV);
        assertThat(testPortofoliu.getoMOLOGAREINDIVIDUALA()).isEqualTo(UPDATED_O_MOLOGAREINDIVIDUALA);
        assertThat(testPortofoliu.getpRETLISTA()).isEqualTo(UPDATED_P_RETLISTA);
        assertThat(testPortofoliu.getdISCOUNTSTANDARD()).isEqualTo(UPDATED_D_ISCOUNTSTANDARD);
        assertThat(testPortofoliu.getdISCOUNTSUPLIMENTAR()).isEqualTo(UPDATED_D_ISCOUNTSUPLIMENTAR);
        assertThat(testPortofoliu.gettRUSALEGISLATIVA()).isEqualTo(UPDATED_T_RUSALEGISLATIVA);
        assertThat(testPortofoliu.getpRETFINAL()).isEqualTo(UPDATED_P_RETFINAL);
        assertThat(testPortofoliu.getaVANSPLATIT()).isEqualTo(UPDATED_A_VANSPLATIT);
        assertThat(testPortofoliu.getrESTDEPLATA()).isEqualTo(UPDATED_R_ESTDEPLATA);
        assertThat(testPortofoliu.getcUSTOMERTRXID()).isEqualTo(UPDATED_C_USTOMERTRXID);
        assertThat(testPortofoliu.getrEZCUSTID()).isEqualTo(UPDATED_R_EZCUSTID);
        assertThat(testPortofoliu.getsOLDCUSTID()).isEqualTo(UPDATED_S_OLDCUSTID);
        assertThat(testPortofoliu.ispROFORMA()).isEqualTo(UPDATED_P_ROFORMA);
        assertThat(testPortofoliu.istRANSPORT()).isEqualTo(UPDATED_T_RANSPORT);

        // Validate the Portofoliu in Elasticsearch
        verify(mockPortofoliuSearchRepository, times(1)).save(testPortofoliu);
    }

    @Test
    @Transactional
    public void updateNonExistingPortofoliu() throws Exception {
        int databaseSizeBeforeUpdate = portofoliuRepository.findAll().size();

        // Create the Portofoliu

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPortofoliuMockMvc.perform(put("/api/portofolius")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(portofoliu)))
            .andExpect(status().isBadRequest());

        // Validate the Portofoliu in the database
        List<Portofoliu> portofoliuList = portofoliuRepository.findAll();
        assertThat(portofoliuList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Portofoliu in Elasticsearch
        verify(mockPortofoliuSearchRepository, times(0)).save(portofoliu);
    }

    @Test
    @Transactional
    public void deletePortofoliu() throws Exception {
        // Initialize the database
        portofoliuRepository.saveAndFlush(portofoliu);

        int databaseSizeBeforeDelete = portofoliuRepository.findAll().size();

        // Delete the portofoliu
        restPortofoliuMockMvc.perform(delete("/api/portofolius/{id}", portofoliu.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Portofoliu> portofoliuList = portofoliuRepository.findAll();
        assertThat(portofoliuList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Portofoliu in Elasticsearch
        verify(mockPortofoliuSearchRepository, times(1)).deleteById(portofoliu.getId());
    }

    @Test
    @Transactional
    public void searchPortofoliu() throws Exception {
        // Initialize the database
        portofoliuRepository.saveAndFlush(portofoliu);
        when(mockPortofoliuSearchRepository.search(queryStringQuery("id:" + portofoliu.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(portofoliu), PageRequest.of(0, 1), 1));
        // Search the portofoliu
        restPortofoliuMockMvc.perform(get("/api/_search/portofolius?query=id:" + portofoliu.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(portofoliu.getId().intValue())))
            .andExpect(jsonPath("$.[*].hTROCARNO").value(hasItem(DEFAULT_H_TROCARNO)))
            .andExpect(jsonPath("$.[*].dEALER").value(hasItem(DEFAULT_D_EALER)))
            .andExpect(jsonPath("$.[*].dATAREZSAUFACTURA").value(hasItem(DEFAULT_D_ATAREZSAUFACTURA)))
            .andExpect(jsonPath("$.[*].dATAEXPIRARE").value(hasItem(DEFAULT_D_ATAEXPIRARE)))
            .andExpect(jsonPath("$.[*].rESDEALERID").value(hasItem(DEFAULT_R_ESDEALERID)))
            .andExpect(jsonPath("$.[*].tIPLINIE").value(hasItem(DEFAULT_T_IPLINIE)))
            .andExpect(jsonPath("$.[*].lOCATIE").value(hasItem(DEFAULT_L_OCATIE)))
            .andExpect(jsonPath("$.[*].lUNAPRODUCTIE").value(hasItem(DEFAULT_L_UNAPRODUCTIE)))
            .andExpect(jsonPath("$.[*].lUNASOSIREINTARA").value(hasItem(DEFAULT_L_UNASOSIREINTARA)))
            .andExpect(jsonPath("$.[*].cODMODEL").value(hasItem(DEFAULT_C_ODMODEL)))
            .andExpect(jsonPath("$.[*].tIPAUTOVEHICUL").value(hasItem(DEFAULT_T_IPAUTOVEHICUL)))
            .andExpect(jsonPath("$.[*].cODCULOAREEXT").value(hasItem(DEFAULT_C_ODCULOAREEXT)))
            .andExpect(jsonPath("$.[*].cULOAREEXTERIOR").value(hasItem(DEFAULT_C_ULOAREEXTERIOR)))
            .andExpect(jsonPath("$.[*].cULOAREIntegerERIOR").value(hasItem(DEFAULT_C_ULOARE_INTEGER_ERIOR)))
            .andExpect(jsonPath("$.[*].oBSERVATII").value(hasItem(DEFAULT_O_BSERVATII)))
            .andExpect(jsonPath("$.[*].nUMECLIENT").value(hasItem(DEFAULT_N_UMECLIENT)))
            .andExpect(jsonPath("$.[*].nUMEVANZATOR").value(hasItem(DEFAULT_N_UMEVANZATOR)))
            .andExpect(jsonPath("$.[*].vIN").value(hasItem(DEFAULT_V_IN)))
            .andExpect(jsonPath("$.[*].eNGINENO").value(hasItem(DEFAULT_E_NGINENO)))
            .andExpect(jsonPath("$.[*].aNFABRICATIECFCIV").value(hasItem(DEFAULT_A_NFABRICATIECFCIV)))
            .andExpect(jsonPath("$.[*].oMOLOGAREINDIVIDUALA").value(hasItem(DEFAULT_O_MOLOGAREINDIVIDUALA)))
            .andExpect(jsonPath("$.[*].pRETLISTA").value(hasItem(DEFAULT_P_RETLISTA)))
            .andExpect(jsonPath("$.[*].dISCOUNTSTANDARD").value(hasItem(DEFAULT_D_ISCOUNTSTANDARD)))
            .andExpect(jsonPath("$.[*].dISCOUNTSUPLIMENTAR").value(hasItem(DEFAULT_D_ISCOUNTSUPLIMENTAR)))
            .andExpect(jsonPath("$.[*].tRUSALEGISLATIVA").value(hasItem(DEFAULT_T_RUSALEGISLATIVA)))
            .andExpect(jsonPath("$.[*].pRETFINAL").value(hasItem(DEFAULT_P_RETFINAL)))
            .andExpect(jsonPath("$.[*].aVANSPLATIT").value(hasItem(DEFAULT_A_VANSPLATIT)))
            .andExpect(jsonPath("$.[*].rESTDEPLATA").value(hasItem(DEFAULT_R_ESTDEPLATA)))
            .andExpect(jsonPath("$.[*].cUSTOMERTRXID").value(hasItem(DEFAULT_C_USTOMERTRXID)))
            .andExpect(jsonPath("$.[*].rEZCUSTID").value(hasItem(DEFAULT_R_EZCUSTID)))
            .andExpect(jsonPath("$.[*].sOLDCUSTID").value(hasItem(DEFAULT_S_OLDCUSTID)))
            .andExpect(jsonPath("$.[*].pROFORMA").value(hasItem(DEFAULT_P_ROFORMA.booleanValue())))
            .andExpect(jsonPath("$.[*].tRANSPORT").value(hasItem(DEFAULT_T_RANSPORT.booleanValue())));
    }
}

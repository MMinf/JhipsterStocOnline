package com.custom.lgk.htro.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A Portofoliu.
 */
@Entity
@Table(name = "portofoliu")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "portofoliu")
public class Portofoliu implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "h_trocarno")
    private Integer hTROCARNO;

    @Column(name = "d_ealer")
    private String dEALER;

    @Column(name = "d_atarezsaufactura")
    private String dATAREZSAUFACTURA;

    @Column(name = "d_ataexpirare")
    private String dATAEXPIRARE;

    @Column(name = "r_esdealerid")
    private Integer rESDEALERID;

    @Column(name = "t_iplinie")
    private String tIPLINIE;

    @Column(name = "l_ocatie")
    private String lOCATIE;

    @Column(name = "l_unaproductie")
    private String lUNAPRODUCTIE;

    @Column(name = "l_unasosireintara")
    private String lUNASOSIREINTARA;

    @Column(name = "c_odmodel")
    private String cODMODEL;

    @Column(name = "t_ipautovehicul")
    private String tIPAUTOVEHICUL;

    @Column(name = "c_odculoareext")
    private String cODCULOAREEXT;

    @Column(name = "c_uloareexterior")
    private String cULOAREEXTERIOR;

    @Column(name = "c_uloare_integer_erior")
    private String cULOAREIntegerERIOR;

    @Column(name = "o_bservatii")
    private String oBSERVATII;

    @Column(name = "n_umeclient")
    private String nUMECLIENT;

    @Column(name = "n_umevanzator")
    private String nUMEVANZATOR;

    @Column(name = "v_in")
    private String vIN;

    @Column(name = "e_ngineno")
    private String eNGINENO;

    @Column(name = "a_nfabricatiecfciv")
    private Integer aNFABRICATIECFCIV;

    @Column(name = "o_mologareindividuala")
    private String oMOLOGAREINDIVIDUALA;

    @Column(name = "p_retlista")
    private Integer pRETLISTA;

    @Column(name = "d_iscountstandard")
    private Integer dISCOUNTSTANDARD;

    @Column(name = "d_iscountsuplimentar")
    private Integer dISCOUNTSUPLIMENTAR;

    @Column(name = "t_rusalegislativa")
    private Integer tRUSALEGISLATIVA;

    @Column(name = "p_retfinal")
    private Integer pRETFINAL;

    @Column(name = "a_vansplatit")
    private Integer aVANSPLATIT;

    @Column(name = "r_estdeplata")
    private Integer rESTDEPLATA;

    @Column(name = "c_ustomertrxid")
    private Integer cUSTOMERTRXID;

    @Column(name = "r_ezcustid")
    private String rEZCUSTID;

    @Column(name = "s_oldcustid")
    private Integer sOLDCUSTID;

    @Column(name = "p_roforma")
    private Boolean pROFORMA;

    @Column(name = "t_ransport")
    private Boolean tRANSPORT;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties("portofolius")
    private Dealer dealer;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer gethTROCARNO() {
        return hTROCARNO;
    }

    public Portofoliu hTROCARNO(Integer hTROCARNO) {
        this.hTROCARNO = hTROCARNO;
        return this;
    }

    public void sethTROCARNO(Integer hTROCARNO) {
        this.hTROCARNO = hTROCARNO;
    }

    public String getdEALER() {
        return dEALER;
    }

    public Portofoliu dEALER(String dEALER) {
        this.dEALER = dEALER;
        return this;
    }

    public void setdEALER(String dEALER) {
        this.dEALER = dEALER;
    }

    public String getdATAREZSAUFACTURA() {
        return dATAREZSAUFACTURA;
    }

    public Portofoliu dATAREZSAUFACTURA(String dATAREZSAUFACTURA) {
        this.dATAREZSAUFACTURA = dATAREZSAUFACTURA;
        return this;
    }

    public void setdATAREZSAUFACTURA(String dATAREZSAUFACTURA) {
        this.dATAREZSAUFACTURA = dATAREZSAUFACTURA;
    }

    public String getdATAEXPIRARE() {
        return dATAEXPIRARE;
    }

    public Portofoliu dATAEXPIRARE(String dATAEXPIRARE) {
        this.dATAEXPIRARE = dATAEXPIRARE;
        return this;
    }

    public void setdATAEXPIRARE(String dATAEXPIRARE) {
        this.dATAEXPIRARE = dATAEXPIRARE;
    }

    public Integer getrESDEALERID() {
        return rESDEALERID;
    }

    public Portofoliu rESDEALERID(Integer rESDEALERID) {
        this.rESDEALERID = rESDEALERID;
        return this;
    }

    public void setrESDEALERID(Integer rESDEALERID) {
        this.rESDEALERID = rESDEALERID;
    }

    public String gettIPLINIE() {
        return tIPLINIE;
    }

    public Portofoliu tIPLINIE(String tIPLINIE) {
        this.tIPLINIE = tIPLINIE;
        return this;
    }

    public void settIPLINIE(String tIPLINIE) {
        this.tIPLINIE = tIPLINIE;
    }

    public String getlOCATIE() {
        return lOCATIE;
    }

    public Portofoliu lOCATIE(String lOCATIE) {
        this.lOCATIE = lOCATIE;
        return this;
    }

    public void setlOCATIE(String lOCATIE) {
        this.lOCATIE = lOCATIE;
    }

    public String getlUNAPRODUCTIE() {
        return lUNAPRODUCTIE;
    }

    public Portofoliu lUNAPRODUCTIE(String lUNAPRODUCTIE) {
        this.lUNAPRODUCTIE = lUNAPRODUCTIE;
        return this;
    }

    public void setlUNAPRODUCTIE(String lUNAPRODUCTIE) {
        this.lUNAPRODUCTIE = lUNAPRODUCTIE;
    }

    public String getlUNASOSIREINTARA() {
        return lUNASOSIREINTARA;
    }

    public Portofoliu lUNASOSIREINTARA(String lUNASOSIREINTARA) {
        this.lUNASOSIREINTARA = lUNASOSIREINTARA;
        return this;
    }

    public void setlUNASOSIREINTARA(String lUNASOSIREINTARA) {
        this.lUNASOSIREINTARA = lUNASOSIREINTARA;
    }

    public String getcODMODEL() {
        return cODMODEL;
    }

    public Portofoliu cODMODEL(String cODMODEL) {
        this.cODMODEL = cODMODEL;
        return this;
    }

    public void setcODMODEL(String cODMODEL) {
        this.cODMODEL = cODMODEL;
    }

    public String gettIPAUTOVEHICUL() {
        return tIPAUTOVEHICUL;
    }

    public Portofoliu tIPAUTOVEHICUL(String tIPAUTOVEHICUL) {
        this.tIPAUTOVEHICUL = tIPAUTOVEHICUL;
        return this;
    }

    public void settIPAUTOVEHICUL(String tIPAUTOVEHICUL) {
        this.tIPAUTOVEHICUL = tIPAUTOVEHICUL;
    }

    public String getcODCULOAREEXT() {
        return cODCULOAREEXT;
    }

    public Portofoliu cODCULOAREEXT(String cODCULOAREEXT) {
        this.cODCULOAREEXT = cODCULOAREEXT;
        return this;
    }

    public void setcODCULOAREEXT(String cODCULOAREEXT) {
        this.cODCULOAREEXT = cODCULOAREEXT;
    }

    public String getcULOAREEXTERIOR() {
        return cULOAREEXTERIOR;
    }

    public Portofoliu cULOAREEXTERIOR(String cULOAREEXTERIOR) {
        this.cULOAREEXTERIOR = cULOAREEXTERIOR;
        return this;
    }

    public void setcULOAREEXTERIOR(String cULOAREEXTERIOR) {
        this.cULOAREEXTERIOR = cULOAREEXTERIOR;
    }

    public String getcULOAREIntegerERIOR() {
        return cULOAREIntegerERIOR;
    }

    public Portofoliu cULOAREIntegerERIOR(String cULOAREIntegerERIOR) {
        this.cULOAREIntegerERIOR = cULOAREIntegerERIOR;
        return this;
    }

    public void setcULOAREIntegerERIOR(String cULOAREIntegerERIOR) {
        this.cULOAREIntegerERIOR = cULOAREIntegerERIOR;
    }

    public String getoBSERVATII() {
        return oBSERVATII;
    }

    public Portofoliu oBSERVATII(String oBSERVATII) {
        this.oBSERVATII = oBSERVATII;
        return this;
    }

    public void setoBSERVATII(String oBSERVATII) {
        this.oBSERVATII = oBSERVATII;
    }

    public String getnUMECLIENT() {
        return nUMECLIENT;
    }

    public Portofoliu nUMECLIENT(String nUMECLIENT) {
        this.nUMECLIENT = nUMECLIENT;
        return this;
    }

    public void setnUMECLIENT(String nUMECLIENT) {
        this.nUMECLIENT = nUMECLIENT;
    }

    public String getnUMEVANZATOR() {
        return nUMEVANZATOR;
    }

    public Portofoliu nUMEVANZATOR(String nUMEVANZATOR) {
        this.nUMEVANZATOR = nUMEVANZATOR;
        return this;
    }

    public void setnUMEVANZATOR(String nUMEVANZATOR) {
        this.nUMEVANZATOR = nUMEVANZATOR;
    }

    public String getvIN() {
        return vIN;
    }

    public Portofoliu vIN(String vIN) {
        this.vIN = vIN;
        return this;
    }

    public void setvIN(String vIN) {
        this.vIN = vIN;
    }

    public String geteNGINENO() {
        return eNGINENO;
    }

    public Portofoliu eNGINENO(String eNGINENO) {
        this.eNGINENO = eNGINENO;
        return this;
    }

    public void seteNGINENO(String eNGINENO) {
        this.eNGINENO = eNGINENO;
    }

    public Integer getaNFABRICATIECFCIV() {
        return aNFABRICATIECFCIV;
    }

    public Portofoliu aNFABRICATIECFCIV(Integer aNFABRICATIECFCIV) {
        this.aNFABRICATIECFCIV = aNFABRICATIECFCIV;
        return this;
    }

    public void setaNFABRICATIECFCIV(Integer aNFABRICATIECFCIV) {
        this.aNFABRICATIECFCIV = aNFABRICATIECFCIV;
    }

    public String getoMOLOGAREINDIVIDUALA() {
        return oMOLOGAREINDIVIDUALA;
    }

    public Portofoliu oMOLOGAREINDIVIDUALA(String oMOLOGAREINDIVIDUALA) {
        this.oMOLOGAREINDIVIDUALA = oMOLOGAREINDIVIDUALA;
        return this;
    }

    public void setoMOLOGAREINDIVIDUALA(String oMOLOGAREINDIVIDUALA) {
        this.oMOLOGAREINDIVIDUALA = oMOLOGAREINDIVIDUALA;
    }

    public Integer getpRETLISTA() {
        return pRETLISTA;
    }

    public Portofoliu pRETLISTA(Integer pRETLISTA) {
        this.pRETLISTA = pRETLISTA;
        return this;
    }

    public void setpRETLISTA(Integer pRETLISTA) {
        this.pRETLISTA = pRETLISTA;
    }

    public Integer getdISCOUNTSTANDARD() {
        return dISCOUNTSTANDARD;
    }

    public Portofoliu dISCOUNTSTANDARD(Integer dISCOUNTSTANDARD) {
        this.dISCOUNTSTANDARD = dISCOUNTSTANDARD;
        return this;
    }

    public void setdISCOUNTSTANDARD(Integer dISCOUNTSTANDARD) {
        this.dISCOUNTSTANDARD = dISCOUNTSTANDARD;
    }

    public Integer getdISCOUNTSUPLIMENTAR() {
        return dISCOUNTSUPLIMENTAR;
    }

    public Portofoliu dISCOUNTSUPLIMENTAR(Integer dISCOUNTSUPLIMENTAR) {
        this.dISCOUNTSUPLIMENTAR = dISCOUNTSUPLIMENTAR;
        return this;
    }

    public void setdISCOUNTSUPLIMENTAR(Integer dISCOUNTSUPLIMENTAR) {
        this.dISCOUNTSUPLIMENTAR = dISCOUNTSUPLIMENTAR;
    }

    public Integer gettRUSALEGISLATIVA() {
        return tRUSALEGISLATIVA;
    }

    public Portofoliu tRUSALEGISLATIVA(Integer tRUSALEGISLATIVA) {
        this.tRUSALEGISLATIVA = tRUSALEGISLATIVA;
        return this;
    }

    public void settRUSALEGISLATIVA(Integer tRUSALEGISLATIVA) {
        this.tRUSALEGISLATIVA = tRUSALEGISLATIVA;
    }

    public Integer getpRETFINAL() {
        return pRETFINAL;
    }

    public Portofoliu pRETFINAL(Integer pRETFINAL) {
        this.pRETFINAL = pRETFINAL;
        return this;
    }

    public void setpRETFINAL(Integer pRETFINAL) {
        this.pRETFINAL = pRETFINAL;
    }

    public Integer getaVANSPLATIT() {
        return aVANSPLATIT;
    }

    public Portofoliu aVANSPLATIT(Integer aVANSPLATIT) {
        this.aVANSPLATIT = aVANSPLATIT;
        return this;
    }

    public void setaVANSPLATIT(Integer aVANSPLATIT) {
        this.aVANSPLATIT = aVANSPLATIT;
    }

    public Integer getrESTDEPLATA() {
        return rESTDEPLATA;
    }

    public Portofoliu rESTDEPLATA(Integer rESTDEPLATA) {
        this.rESTDEPLATA = rESTDEPLATA;
        return this;
    }

    public void setrESTDEPLATA(Integer rESTDEPLATA) {
        this.rESTDEPLATA = rESTDEPLATA;
    }

    public Integer getcUSTOMERTRXID() {
        return cUSTOMERTRXID;
    }

    public Portofoliu cUSTOMERTRXID(Integer cUSTOMERTRXID) {
        this.cUSTOMERTRXID = cUSTOMERTRXID;
        return this;
    }

    public void setcUSTOMERTRXID(Integer cUSTOMERTRXID) {
        this.cUSTOMERTRXID = cUSTOMERTRXID;
    }

    public String getrEZCUSTID() {
        return rEZCUSTID;
    }

    public Portofoliu rEZCUSTID(String rEZCUSTID) {
        this.rEZCUSTID = rEZCUSTID;
        return this;
    }

    public void setrEZCUSTID(String rEZCUSTID) {
        this.rEZCUSTID = rEZCUSTID;
    }

    public Integer getsOLDCUSTID() {
        return sOLDCUSTID;
    }

    public Portofoliu sOLDCUSTID(Integer sOLDCUSTID) {
        this.sOLDCUSTID = sOLDCUSTID;
        return this;
    }

    public void setsOLDCUSTID(Integer sOLDCUSTID) {
        this.sOLDCUSTID = sOLDCUSTID;
    }

    public Boolean ispROFORMA() {
        return pROFORMA;
    }

    public Portofoliu pROFORMA(Boolean pROFORMA) {
        this.pROFORMA = pROFORMA;
        return this;
    }

    public void setpROFORMA(Boolean pROFORMA) {
        this.pROFORMA = pROFORMA;
    }

    public Boolean istRANSPORT() {
        return tRANSPORT;
    }

    public Portofoliu tRANSPORT(Boolean tRANSPORT) {
        this.tRANSPORT = tRANSPORT;
        return this;
    }

    public void settRANSPORT(Boolean tRANSPORT) {
        this.tRANSPORT = tRANSPORT;
    }

    public Dealer getDealer() {
        return dealer;
    }

    public Portofoliu dealer(Dealer dealer) {
        this.dealer = dealer;
        return this;
    }

    public void setDealer(Dealer dealer) {
        this.dealer = dealer;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Portofoliu)) {
            return false;
        }
        return id != null && id.equals(((Portofoliu) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Portofoliu{" +
            "id=" + getId() +
            ", hTROCARNO=" + gethTROCARNO() +
            ", dEALER='" + getdEALER() + "'" +
            ", dATAREZSAUFACTURA='" + getdATAREZSAUFACTURA() + "'" +
            ", dATAEXPIRARE='" + getdATAEXPIRARE() + "'" +
            ", rESDEALERID=" + getrESDEALERID() +
            ", tIPLINIE='" + gettIPLINIE() + "'" +
            ", lOCATIE='" + getlOCATIE() + "'" +
            ", lUNAPRODUCTIE='" + getlUNAPRODUCTIE() + "'" +
            ", lUNASOSIREINTARA='" + getlUNASOSIREINTARA() + "'" +
            ", cODMODEL='" + getcODMODEL() + "'" +
            ", tIPAUTOVEHICUL='" + gettIPAUTOVEHICUL() + "'" +
            ", cODCULOAREEXT='" + getcODCULOAREEXT() + "'" +
            ", cULOAREEXTERIOR='" + getcULOAREEXTERIOR() + "'" +
            ", cULOAREIntegerERIOR='" + getcULOAREIntegerERIOR() + "'" +
            ", oBSERVATII='" + getoBSERVATII() + "'" +
            ", nUMECLIENT='" + getnUMECLIENT() + "'" +
            ", nUMEVANZATOR='" + getnUMEVANZATOR() + "'" +
            ", vIN='" + getvIN() + "'" +
            ", eNGINENO='" + geteNGINENO() + "'" +
            ", aNFABRICATIECFCIV=" + getaNFABRICATIECFCIV() +
            ", oMOLOGAREINDIVIDUALA='" + getoMOLOGAREINDIVIDUALA() + "'" +
            ", pRETLISTA=" + getpRETLISTA() +
            ", dISCOUNTSTANDARD=" + getdISCOUNTSTANDARD() +
            ", dISCOUNTSUPLIMENTAR=" + getdISCOUNTSUPLIMENTAR() +
            ", tRUSALEGISLATIVA=" + gettRUSALEGISLATIVA() +
            ", pRETFINAL=" + getpRETFINAL() +
            ", aVANSPLATIT=" + getaVANSPLATIT() +
            ", rESTDEPLATA=" + getrESTDEPLATA() +
            ", cUSTOMERTRXID=" + getcUSTOMERTRXID() +
            ", rEZCUSTID='" + getrEZCUSTID() + "'" +
            ", sOLDCUSTID=" + getsOLDCUSTID() +
            ", pROFORMA='" + ispROFORMA() + "'" +
            ", tRANSPORT='" + istRANSPORT() + "'" +
            "}";
    }
}

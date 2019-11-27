package com.custom.lgk.htro.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A Stoc.
 */
@Entity
@Table(name = "stoc")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "stoc")
public class Stoc implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "h_trocarno")
    private Integer hTROCARNO;

    @Column(name = "r_esdealerid")
    private Integer rESDEALERID;

    @Column(name = "a_nfabricatieciv")
    private Integer aNFABRICATIECIV;

    @Column(name = "t_ipautovehicul")
    private String tIPAUTOVEHICUL;

    @Column(name = "c_odculoareexterior")
    private String cODCULOAREEXTERIOR;

    @Column(name = "d_escculoareexterior")
    private String dESCCULOAREEXTERIOR;

    @Column(name = "v_opseametalizata")
    private String vOPSEAMETALIZATA;

    @Column(name = "c_uloareinterior")
    private String cULOAREINTERIOR;

    @Column(name = "o_bservatii")
    private String oBSERVATII;

    @Column(name = "l_ocatie")
    private String lOCATIE;

    @Column(name = "o_mologareind")
    private String oMOLOGAREIND;

    @Column(name = "l_unasosireintara")
    private String lUNASOSIREINTARA;

    @Column(name = "r_ezervata")
    private String rEZERVATA;

    @Column(name = "d_ataexpirarerez")
    private String dATAEXPIRAREREZ;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties("stocs")
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

    public Stoc hTROCARNO(Integer hTROCARNO) {
        this.hTROCARNO = hTROCARNO;
        return this;
    }

    public void sethTROCARNO(Integer hTROCARNO) {
        this.hTROCARNO = hTROCARNO;
    }

    public Integer getrESDEALERID() {
        return rESDEALERID;
    }

    public Stoc rESDEALERID(Integer rESDEALERID) {
        this.rESDEALERID = rESDEALERID;
        return this;
    }

    public void setrESDEALERID(Integer rESDEALERID) {
        this.rESDEALERID = rESDEALERID;
    }

    public Integer getaNFABRICATIECIV() {
        return aNFABRICATIECIV;
    }

    public Stoc aNFABRICATIECIV(Integer aNFABRICATIECIV) {
        this.aNFABRICATIECIV = aNFABRICATIECIV;
        return this;
    }

    public void setaNFABRICATIECIV(Integer aNFABRICATIECIV) {
        this.aNFABRICATIECIV = aNFABRICATIECIV;
    }

    public String gettIPAUTOVEHICUL() {
        return tIPAUTOVEHICUL;
    }

    public Stoc tIPAUTOVEHICUL(String tIPAUTOVEHICUL) {
        this.tIPAUTOVEHICUL = tIPAUTOVEHICUL;
        return this;
    }

    public void settIPAUTOVEHICUL(String tIPAUTOVEHICUL) {
        this.tIPAUTOVEHICUL = tIPAUTOVEHICUL;
    }

    public String getcODCULOAREEXTERIOR() {
        return cODCULOAREEXTERIOR;
    }

    public Stoc cODCULOAREEXTERIOR(String cODCULOAREEXTERIOR) {
        this.cODCULOAREEXTERIOR = cODCULOAREEXTERIOR;
        return this;
    }

    public void setcODCULOAREEXTERIOR(String cODCULOAREEXTERIOR) {
        this.cODCULOAREEXTERIOR = cODCULOAREEXTERIOR;
    }

    public String getdESCCULOAREEXTERIOR() {
        return dESCCULOAREEXTERIOR;
    }

    public Stoc dESCCULOAREEXTERIOR(String dESCCULOAREEXTERIOR) {
        this.dESCCULOAREEXTERIOR = dESCCULOAREEXTERIOR;
        return this;
    }

    public void setdESCCULOAREEXTERIOR(String dESCCULOAREEXTERIOR) {
        this.dESCCULOAREEXTERIOR = dESCCULOAREEXTERIOR;
    }

    public String getvOPSEAMETALIZATA() {
        return vOPSEAMETALIZATA;
    }

    public Stoc vOPSEAMETALIZATA(String vOPSEAMETALIZATA) {
        this.vOPSEAMETALIZATA = vOPSEAMETALIZATA;
        return this;
    }

    public void setvOPSEAMETALIZATA(String vOPSEAMETALIZATA) {
        this.vOPSEAMETALIZATA = vOPSEAMETALIZATA;
    }

    public String getcULOAREINTERIOR() {
        return cULOAREINTERIOR;
    }

    public Stoc cULOAREINTERIOR(String cULOAREINTERIOR) {
        this.cULOAREINTERIOR = cULOAREINTERIOR;
        return this;
    }

    public void setcULOAREINTERIOR(String cULOAREINTERIOR) {
        this.cULOAREINTERIOR = cULOAREINTERIOR;
    }

    public String getoBSERVATII() {
        return oBSERVATII;
    }

    public Stoc oBSERVATII(String oBSERVATII) {
        this.oBSERVATII = oBSERVATII;
        return this;
    }

    public void setoBSERVATII(String oBSERVATII) {
        this.oBSERVATII = oBSERVATII;
    }

    public String getlOCATIE() {
        return lOCATIE;
    }

    public Stoc lOCATIE(String lOCATIE) {
        this.lOCATIE = lOCATIE;
        return this;
    }

    public void setlOCATIE(String lOCATIE) {
        this.lOCATIE = lOCATIE;
    }

    public String getoMOLOGAREIND() {
        return oMOLOGAREIND;
    }

    public Stoc oMOLOGAREIND(String oMOLOGAREIND) {
        this.oMOLOGAREIND = oMOLOGAREIND;
        return this;
    }

    public void setoMOLOGAREIND(String oMOLOGAREIND) {
        this.oMOLOGAREIND = oMOLOGAREIND;
    }

    public String getlUNASOSIREINTARA() {
        return lUNASOSIREINTARA;
    }

    public Stoc lUNASOSIREINTARA(String lUNASOSIREINTARA) {
        this.lUNASOSIREINTARA = lUNASOSIREINTARA;
        return this;
    }

    public void setlUNASOSIREINTARA(String lUNASOSIREINTARA) {
        this.lUNASOSIREINTARA = lUNASOSIREINTARA;
    }

    public String getrEZERVATA() {
        return rEZERVATA;
    }

    public Stoc rEZERVATA(String rEZERVATA) {
        this.rEZERVATA = rEZERVATA;
        return this;
    }

    public void setrEZERVATA(String rEZERVATA) {
        this.rEZERVATA = rEZERVATA;
    }

    public String getdATAEXPIRAREREZ() {
        return dATAEXPIRAREREZ;
    }

    public Stoc dATAEXPIRAREREZ(String dATAEXPIRAREREZ) {
        this.dATAEXPIRAREREZ = dATAEXPIRAREREZ;
        return this;
    }

    public void setdATAEXPIRAREREZ(String dATAEXPIRAREREZ) {
        this.dATAEXPIRAREREZ = dATAEXPIRAREREZ;
    }

    public Dealer getDealer() {
        return dealer;
    }

    public Stoc dealer(Dealer dealer) {
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
        if (!(o instanceof Stoc)) {
            return false;
        }
        return id != null && id.equals(((Stoc) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Stoc{" +
            "id=" + getId() +
            ", hTROCARNO=" + gethTROCARNO() +
            ", rESDEALERID=" + getrESDEALERID() +
            ", aNFABRICATIECIV=" + getaNFABRICATIECIV() +
            ", tIPAUTOVEHICUL='" + gettIPAUTOVEHICUL() + "'" +
            ", cODCULOAREEXTERIOR='" + getcODCULOAREEXTERIOR() + "'" +
            ", dESCCULOAREEXTERIOR='" + getdESCCULOAREEXTERIOR() + "'" +
            ", vOPSEAMETALIZATA='" + getvOPSEAMETALIZATA() + "'" +
            ", cULOAREINTERIOR='" + getcULOAREINTERIOR() + "'" +
            ", oBSERVATII='" + getoBSERVATII() + "'" +
            ", lOCATIE='" + getlOCATIE() + "'" +
            ", oMOLOGAREIND='" + getoMOLOGAREIND() + "'" +
            ", lUNASOSIREINTARA='" + getlUNASOSIREINTARA() + "'" +
            ", rEZERVATA='" + getrEZERVATA() + "'" +
            ", dATAEXPIRAREREZ='" + getdATAEXPIRAREREZ() + "'" +
            "}";
    }
}

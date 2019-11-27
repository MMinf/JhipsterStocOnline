import { element, by, ElementFinder } from 'protractor';

export default class PortofoliuUpdatePage {
  pageTitle: ElementFinder = element(by.id('hondaStocOnlineApp.portofoliu.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  hTROCARNOInput: ElementFinder = element(by.css('input#portofoliu-hTROCARNO'));
  dEALERInput: ElementFinder = element(by.css('input#portofoliu-dEALER'));
  dATAREZSAUFACTURAInput: ElementFinder = element(by.css('input#portofoliu-dATAREZSAUFACTURA'));
  dATAEXPIRAREInput: ElementFinder = element(by.css('input#portofoliu-dATAEXPIRARE'));
  rESDEALERIDInput: ElementFinder = element(by.css('input#portofoliu-rESDEALERID'));
  tIPLINIEInput: ElementFinder = element(by.css('input#portofoliu-tIPLINIE'));
  lOCATIEInput: ElementFinder = element(by.css('input#portofoliu-lOCATIE'));
  lUNAPRODUCTIEInput: ElementFinder = element(by.css('input#portofoliu-lUNAPRODUCTIE'));
  lUNASOSIREINTARAInput: ElementFinder = element(by.css('input#portofoliu-lUNASOSIREINTARA'));
  cODMODELInput: ElementFinder = element(by.css('input#portofoliu-cODMODEL'));
  tIPAUTOVEHICULInput: ElementFinder = element(by.css('input#portofoliu-tIPAUTOVEHICUL'));
  cODCULOAREEXTInput: ElementFinder = element(by.css('input#portofoliu-cODCULOAREEXT'));
  cULOAREEXTERIORInput: ElementFinder = element(by.css('input#portofoliu-cULOAREEXTERIOR'));
  cULOAREIntegerERIORInput: ElementFinder = element(by.css('input#portofoliu-cULOAREIntegerERIOR'));
  oBSERVATIIInput: ElementFinder = element(by.css('input#portofoliu-oBSERVATII'));
  nUMECLIENTInput: ElementFinder = element(by.css('input#portofoliu-nUMECLIENT'));
  nUMEVANZATORInput: ElementFinder = element(by.css('input#portofoliu-nUMEVANZATOR'));
  vINInput: ElementFinder = element(by.css('input#portofoliu-vIN'));
  eNGINENOInput: ElementFinder = element(by.css('input#portofoliu-eNGINENO'));
  aNFABRICATIECFCIVInput: ElementFinder = element(by.css('input#portofoliu-aNFABRICATIECFCIV'));
  oMOLOGAREINDIVIDUALAInput: ElementFinder = element(by.css('input#portofoliu-oMOLOGAREINDIVIDUALA'));
  pRETLISTAInput: ElementFinder = element(by.css('input#portofoliu-pRETLISTA'));
  dISCOUNTSTANDARDInput: ElementFinder = element(by.css('input#portofoliu-dISCOUNTSTANDARD'));
  dISCOUNTSUPLIMENTARInput: ElementFinder = element(by.css('input#portofoliu-dISCOUNTSUPLIMENTAR'));
  tRUSALEGISLATIVAInput: ElementFinder = element(by.css('input#portofoliu-tRUSALEGISLATIVA'));
  pRETFINALInput: ElementFinder = element(by.css('input#portofoliu-pRETFINAL'));
  aVANSPLATITInput: ElementFinder = element(by.css('input#portofoliu-aVANSPLATIT'));
  rESTDEPLATAInput: ElementFinder = element(by.css('input#portofoliu-rESTDEPLATA'));
  cUSTOMERTRXIDInput: ElementFinder = element(by.css('input#portofoliu-cUSTOMERTRXID'));
  rEZCUSTIDInput: ElementFinder = element(by.css('input#portofoliu-rEZCUSTID'));
  sOLDCUSTIDInput: ElementFinder = element(by.css('input#portofoliu-sOLDCUSTID'));
  pROFORMAInput: ElementFinder = element(by.css('input#portofoliu-pROFORMA'));
  tRANSPORTInput: ElementFinder = element(by.css('input#portofoliu-tRANSPORT'));
  dealerSelect: ElementFinder = element(by.css('select#portofoliu-dealer'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setHTROCARNOInput(hTROCARNO) {
    await this.hTROCARNOInput.sendKeys(hTROCARNO);
  }

  async getHTROCARNOInput() {
    return this.hTROCARNOInput.getAttribute('value');
  }

  async setDEALERInput(dEALER) {
    await this.dEALERInput.sendKeys(dEALER);
  }

  async getDEALERInput() {
    return this.dEALERInput.getAttribute('value');
  }

  async setDATAREZSAUFACTURAInput(dATAREZSAUFACTURA) {
    await this.dATAREZSAUFACTURAInput.sendKeys(dATAREZSAUFACTURA);
  }

  async getDATAREZSAUFACTURAInput() {
    return this.dATAREZSAUFACTURAInput.getAttribute('value');
  }

  async setDATAEXPIRAREInput(dATAEXPIRARE) {
    await this.dATAEXPIRAREInput.sendKeys(dATAEXPIRARE);
  }

  async getDATAEXPIRAREInput() {
    return this.dATAEXPIRAREInput.getAttribute('value');
  }

  async setRESDEALERIDInput(rESDEALERID) {
    await this.rESDEALERIDInput.sendKeys(rESDEALERID);
  }

  async getRESDEALERIDInput() {
    return this.rESDEALERIDInput.getAttribute('value');
  }

  async setTIPLINIEInput(tIPLINIE) {
    await this.tIPLINIEInput.sendKeys(tIPLINIE);
  }

  async getTIPLINIEInput() {
    return this.tIPLINIEInput.getAttribute('value');
  }

  async setLOCATIEInput(lOCATIE) {
    await this.lOCATIEInput.sendKeys(lOCATIE);
  }

  async getLOCATIEInput() {
    return this.lOCATIEInput.getAttribute('value');
  }

  async setLUNAPRODUCTIEInput(lUNAPRODUCTIE) {
    await this.lUNAPRODUCTIEInput.sendKeys(lUNAPRODUCTIE);
  }

  async getLUNAPRODUCTIEInput() {
    return this.lUNAPRODUCTIEInput.getAttribute('value');
  }

  async setLUNASOSIREINTARAInput(lUNASOSIREINTARA) {
    await this.lUNASOSIREINTARAInput.sendKeys(lUNASOSIREINTARA);
  }

  async getLUNASOSIREINTARAInput() {
    return this.lUNASOSIREINTARAInput.getAttribute('value');
  }

  async setCODMODELInput(cODMODEL) {
    await this.cODMODELInput.sendKeys(cODMODEL);
  }

  async getCODMODELInput() {
    return this.cODMODELInput.getAttribute('value');
  }

  async setTIPAUTOVEHICULInput(tIPAUTOVEHICUL) {
    await this.tIPAUTOVEHICULInput.sendKeys(tIPAUTOVEHICUL);
  }

  async getTIPAUTOVEHICULInput() {
    return this.tIPAUTOVEHICULInput.getAttribute('value');
  }

  async setCODCULOAREEXTInput(cODCULOAREEXT) {
    await this.cODCULOAREEXTInput.sendKeys(cODCULOAREEXT);
  }

  async getCODCULOAREEXTInput() {
    return this.cODCULOAREEXTInput.getAttribute('value');
  }

  async setCULOAREEXTERIORInput(cULOAREEXTERIOR) {
    await this.cULOAREEXTERIORInput.sendKeys(cULOAREEXTERIOR);
  }

  async getCULOAREEXTERIORInput() {
    return this.cULOAREEXTERIORInput.getAttribute('value');
  }

  async setCULOAREIntegerERIORInput(cULOAREIntegerERIOR) {
    await this.cULOAREIntegerERIORInput.sendKeys(cULOAREIntegerERIOR);
  }

  async getCULOAREIntegerERIORInput() {
    return this.cULOAREIntegerERIORInput.getAttribute('value');
  }

  async setOBSERVATIIInput(oBSERVATII) {
    await this.oBSERVATIIInput.sendKeys(oBSERVATII);
  }

  async getOBSERVATIIInput() {
    return this.oBSERVATIIInput.getAttribute('value');
  }

  async setNUMECLIENTInput(nUMECLIENT) {
    await this.nUMECLIENTInput.sendKeys(nUMECLIENT);
  }

  async getNUMECLIENTInput() {
    return this.nUMECLIENTInput.getAttribute('value');
  }

  async setNUMEVANZATORInput(nUMEVANZATOR) {
    await this.nUMEVANZATORInput.sendKeys(nUMEVANZATOR);
  }

  async getNUMEVANZATORInput() {
    return this.nUMEVANZATORInput.getAttribute('value');
  }

  async setVINInput(vIN) {
    await this.vINInput.sendKeys(vIN);
  }

  async getVINInput() {
    return this.vINInput.getAttribute('value');
  }

  async setENGINENOInput(eNGINENO) {
    await this.eNGINENOInput.sendKeys(eNGINENO);
  }

  async getENGINENOInput() {
    return this.eNGINENOInput.getAttribute('value');
  }

  async setANFABRICATIECFCIVInput(aNFABRICATIECFCIV) {
    await this.aNFABRICATIECFCIVInput.sendKeys(aNFABRICATIECFCIV);
  }

  async getANFABRICATIECFCIVInput() {
    return this.aNFABRICATIECFCIVInput.getAttribute('value');
  }

  async setOMOLOGAREINDIVIDUALAInput(oMOLOGAREINDIVIDUALA) {
    await this.oMOLOGAREINDIVIDUALAInput.sendKeys(oMOLOGAREINDIVIDUALA);
  }

  async getOMOLOGAREINDIVIDUALAInput() {
    return this.oMOLOGAREINDIVIDUALAInput.getAttribute('value');
  }

  async setPRETLISTAInput(pRETLISTA) {
    await this.pRETLISTAInput.sendKeys(pRETLISTA);
  }

  async getPRETLISTAInput() {
    return this.pRETLISTAInput.getAttribute('value');
  }

  async setDISCOUNTSTANDARDInput(dISCOUNTSTANDARD) {
    await this.dISCOUNTSTANDARDInput.sendKeys(dISCOUNTSTANDARD);
  }

  async getDISCOUNTSTANDARDInput() {
    return this.dISCOUNTSTANDARDInput.getAttribute('value');
  }

  async setDISCOUNTSUPLIMENTARInput(dISCOUNTSUPLIMENTAR) {
    await this.dISCOUNTSUPLIMENTARInput.sendKeys(dISCOUNTSUPLIMENTAR);
  }

  async getDISCOUNTSUPLIMENTARInput() {
    return this.dISCOUNTSUPLIMENTARInput.getAttribute('value');
  }

  async setTRUSALEGISLATIVAInput(tRUSALEGISLATIVA) {
    await this.tRUSALEGISLATIVAInput.sendKeys(tRUSALEGISLATIVA);
  }

  async getTRUSALEGISLATIVAInput() {
    return this.tRUSALEGISLATIVAInput.getAttribute('value');
  }

  async setPRETFINALInput(pRETFINAL) {
    await this.pRETFINALInput.sendKeys(pRETFINAL);
  }

  async getPRETFINALInput() {
    return this.pRETFINALInput.getAttribute('value');
  }

  async setAVANSPLATITInput(aVANSPLATIT) {
    await this.aVANSPLATITInput.sendKeys(aVANSPLATIT);
  }

  async getAVANSPLATITInput() {
    return this.aVANSPLATITInput.getAttribute('value');
  }

  async setRESTDEPLATAInput(rESTDEPLATA) {
    await this.rESTDEPLATAInput.sendKeys(rESTDEPLATA);
  }

  async getRESTDEPLATAInput() {
    return this.rESTDEPLATAInput.getAttribute('value');
  }

  async setCUSTOMERTRXIDInput(cUSTOMERTRXID) {
    await this.cUSTOMERTRXIDInput.sendKeys(cUSTOMERTRXID);
  }

  async getCUSTOMERTRXIDInput() {
    return this.cUSTOMERTRXIDInput.getAttribute('value');
  }

  async setREZCUSTIDInput(rEZCUSTID) {
    await this.rEZCUSTIDInput.sendKeys(rEZCUSTID);
  }

  async getREZCUSTIDInput() {
    return this.rEZCUSTIDInput.getAttribute('value');
  }

  async setSOLDCUSTIDInput(sOLDCUSTID) {
    await this.sOLDCUSTIDInput.sendKeys(sOLDCUSTID);
  }

  async getSOLDCUSTIDInput() {
    return this.sOLDCUSTIDInput.getAttribute('value');
  }

  getPROFORMAInput() {
    return this.pROFORMAInput;
  }
  getTRANSPORTInput() {
    return this.tRANSPORTInput;
  }
  async dealerSelectLastOption() {
    await this.dealerSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async dealerSelectOption(option) {
    await this.dealerSelect.sendKeys(option);
  }

  getDealerSelect() {
    return this.dealerSelect;
  }

  async getDealerSelectedOption() {
    return this.dealerSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}

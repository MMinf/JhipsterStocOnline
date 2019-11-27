import { element, by, ElementFinder } from 'protractor';

export default class StocUpdatePage {
  pageTitle: ElementFinder = element(by.id('hondaStocOnlineApp.stoc.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  hTROCARNOInput: ElementFinder = element(by.css('input#stoc-hTROCARNO'));
  rESDEALERIDInput: ElementFinder = element(by.css('input#stoc-rESDEALERID'));
  aNFABRICATIECIVInput: ElementFinder = element(by.css('input#stoc-aNFABRICATIECIV'));
  tIPAUTOVEHICULInput: ElementFinder = element(by.css('input#stoc-tIPAUTOVEHICUL'));
  cODCULOAREEXTERIORInput: ElementFinder = element(by.css('input#stoc-cODCULOAREEXTERIOR'));
  dESCCULOAREEXTERIORInput: ElementFinder = element(by.css('input#stoc-dESCCULOAREEXTERIOR'));
  vOPSEAMETALIZATAInput: ElementFinder = element(by.css('input#stoc-vOPSEAMETALIZATA'));
  cULOAREINTERIORInput: ElementFinder = element(by.css('input#stoc-cULOAREINTERIOR'));
  oBSERVATIIInput: ElementFinder = element(by.css('input#stoc-oBSERVATII'));
  lOCATIEInput: ElementFinder = element(by.css('input#stoc-lOCATIE'));
  oMOLOGAREINDInput: ElementFinder = element(by.css('input#stoc-oMOLOGAREIND'));
  lUNASOSIREINTARAInput: ElementFinder = element(by.css('input#stoc-lUNASOSIREINTARA'));
  rEZERVATAInput: ElementFinder = element(by.css('input#stoc-rEZERVATA'));
  dATAEXPIRAREREZInput: ElementFinder = element(by.css('input#stoc-dATAEXPIRAREREZ'));
  dealerSelect: ElementFinder = element(by.css('select#stoc-dealer'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setHTROCARNOInput(hTROCARNO) {
    await this.hTROCARNOInput.sendKeys(hTROCARNO);
  }

  async getHTROCARNOInput() {
    return this.hTROCARNOInput.getAttribute('value');
  }

  async setRESDEALERIDInput(rESDEALERID) {
    await this.rESDEALERIDInput.sendKeys(rESDEALERID);
  }

  async getRESDEALERIDInput() {
    return this.rESDEALERIDInput.getAttribute('value');
  }

  async setANFABRICATIECIVInput(aNFABRICATIECIV) {
    await this.aNFABRICATIECIVInput.sendKeys(aNFABRICATIECIV);
  }

  async getANFABRICATIECIVInput() {
    return this.aNFABRICATIECIVInput.getAttribute('value');
  }

  async setTIPAUTOVEHICULInput(tIPAUTOVEHICUL) {
    await this.tIPAUTOVEHICULInput.sendKeys(tIPAUTOVEHICUL);
  }

  async getTIPAUTOVEHICULInput() {
    return this.tIPAUTOVEHICULInput.getAttribute('value');
  }

  async setCODCULOAREEXTERIORInput(cODCULOAREEXTERIOR) {
    await this.cODCULOAREEXTERIORInput.sendKeys(cODCULOAREEXTERIOR);
  }

  async getCODCULOAREEXTERIORInput() {
    return this.cODCULOAREEXTERIORInput.getAttribute('value');
  }

  async setDESCCULOAREEXTERIORInput(dESCCULOAREEXTERIOR) {
    await this.dESCCULOAREEXTERIORInput.sendKeys(dESCCULOAREEXTERIOR);
  }

  async getDESCCULOAREEXTERIORInput() {
    return this.dESCCULOAREEXTERIORInput.getAttribute('value');
  }

  async setVOPSEAMETALIZATAInput(vOPSEAMETALIZATA) {
    await this.vOPSEAMETALIZATAInput.sendKeys(vOPSEAMETALIZATA);
  }

  async getVOPSEAMETALIZATAInput() {
    return this.vOPSEAMETALIZATAInput.getAttribute('value');
  }

  async setCULOAREINTERIORInput(cULOAREINTERIOR) {
    await this.cULOAREINTERIORInput.sendKeys(cULOAREINTERIOR);
  }

  async getCULOAREINTERIORInput() {
    return this.cULOAREINTERIORInput.getAttribute('value');
  }

  async setOBSERVATIIInput(oBSERVATII) {
    await this.oBSERVATIIInput.sendKeys(oBSERVATII);
  }

  async getOBSERVATIIInput() {
    return this.oBSERVATIIInput.getAttribute('value');
  }

  async setLOCATIEInput(lOCATIE) {
    await this.lOCATIEInput.sendKeys(lOCATIE);
  }

  async getLOCATIEInput() {
    return this.lOCATIEInput.getAttribute('value');
  }

  async setOMOLOGAREINDInput(oMOLOGAREIND) {
    await this.oMOLOGAREINDInput.sendKeys(oMOLOGAREIND);
  }

  async getOMOLOGAREINDInput() {
    return this.oMOLOGAREINDInput.getAttribute('value');
  }

  async setLUNASOSIREINTARAInput(lUNASOSIREINTARA) {
    await this.lUNASOSIREINTARAInput.sendKeys(lUNASOSIREINTARA);
  }

  async getLUNASOSIREINTARAInput() {
    return this.lUNASOSIREINTARAInput.getAttribute('value');
  }

  async setREZERVATAInput(rEZERVATA) {
    await this.rEZERVATAInput.sendKeys(rEZERVATA);
  }

  async getREZERVATAInput() {
    return this.rEZERVATAInput.getAttribute('value');
  }

  async setDATAEXPIRAREREZInput(dATAEXPIRAREREZ) {
    await this.dATAEXPIRAREREZInput.sendKeys(dATAEXPIRAREREZ);
  }

  async getDATAEXPIRAREREZInput() {
    return this.dATAEXPIRAREREZInput.getAttribute('value');
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

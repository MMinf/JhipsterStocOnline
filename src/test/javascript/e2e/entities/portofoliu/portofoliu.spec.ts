import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PortofoliuComponentsPage, { PortofoliuDeleteDialog } from './portofoliu.page-object';
import PortofoliuUpdatePage from './portofoliu-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Portofoliu e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let portofoliuComponentsPage: PortofoliuComponentsPage;
  let portofoliuUpdatePage: PortofoliuUpdatePage;
  let portofoliuDeleteDialog: PortofoliuDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load Portofolius', async () => {
    await navBarPage.getEntityPage('portofoliu');
    portofoliuComponentsPage = new PortofoliuComponentsPage();
    expect(await portofoliuComponentsPage.getTitle().getText()).to.match(/Portofolius/);
  });

  it('should load create Portofoliu page', async () => {
    await portofoliuComponentsPage.clickOnCreateButton();
    portofoliuUpdatePage = new PortofoliuUpdatePage();
    expect(await portofoliuUpdatePage.getPageTitle().getAttribute('id')).to.match(/hondaStocOnlineApp.portofoliu.home.createOrEditLabel/);
    await portofoliuUpdatePage.cancel();
  });

  it('should create and save Portofolius', async () => {
    async function createPortofoliu() {
      await portofoliuComponentsPage.clickOnCreateButton();
      await portofoliuUpdatePage.setHTROCARNOInput('5');
      expect(await portofoliuUpdatePage.getHTROCARNOInput()).to.eq('5');
      await portofoliuUpdatePage.setDEALERInput('dEALER');
      expect(await portofoliuUpdatePage.getDEALERInput()).to.match(/dEALER/);
      await portofoliuUpdatePage.setDATAREZSAUFACTURAInput('dATAREZSAUFACTURA');
      expect(await portofoliuUpdatePage.getDATAREZSAUFACTURAInput()).to.match(/dATAREZSAUFACTURA/);
      await portofoliuUpdatePage.setDATAEXPIRAREInput('dATAEXPIRARE');
      expect(await portofoliuUpdatePage.getDATAEXPIRAREInput()).to.match(/dATAEXPIRARE/);
      await portofoliuUpdatePage.setRESDEALERIDInput('5');
      expect(await portofoliuUpdatePage.getRESDEALERIDInput()).to.eq('5');
      await portofoliuUpdatePage.setTIPLINIEInput('tIPLINIE');
      expect(await portofoliuUpdatePage.getTIPLINIEInput()).to.match(/tIPLINIE/);
      await portofoliuUpdatePage.setLOCATIEInput('lOCATIE');
      expect(await portofoliuUpdatePage.getLOCATIEInput()).to.match(/lOCATIE/);
      await portofoliuUpdatePage.setLUNAPRODUCTIEInput('lUNAPRODUCTIE');
      expect(await portofoliuUpdatePage.getLUNAPRODUCTIEInput()).to.match(/lUNAPRODUCTIE/);
      await portofoliuUpdatePage.setLUNASOSIREINTARAInput('lUNASOSIREINTARA');
      expect(await portofoliuUpdatePage.getLUNASOSIREINTARAInput()).to.match(/lUNASOSIREINTARA/);
      await portofoliuUpdatePage.setCODMODELInput('cODMODEL');
      expect(await portofoliuUpdatePage.getCODMODELInput()).to.match(/cODMODEL/);
      await portofoliuUpdatePage.setTIPAUTOVEHICULInput('tIPAUTOVEHICUL');
      expect(await portofoliuUpdatePage.getTIPAUTOVEHICULInput()).to.match(/tIPAUTOVEHICUL/);
      await portofoliuUpdatePage.setCODCULOAREEXTInput('cODCULOAREEXT');
      expect(await portofoliuUpdatePage.getCODCULOAREEXTInput()).to.match(/cODCULOAREEXT/);
      await portofoliuUpdatePage.setCULOAREEXTERIORInput('cULOAREEXTERIOR');
      expect(await portofoliuUpdatePage.getCULOAREEXTERIORInput()).to.match(/cULOAREEXTERIOR/);
      await portofoliuUpdatePage.setCULOAREIntegerERIORInput('cULOAREIntegerERIOR');
      expect(await portofoliuUpdatePage.getCULOAREIntegerERIORInput()).to.match(/cULOAREIntegerERIOR/);
      await portofoliuUpdatePage.setOBSERVATIIInput('oBSERVATII');
      expect(await portofoliuUpdatePage.getOBSERVATIIInput()).to.match(/oBSERVATII/);
      await portofoliuUpdatePage.setNUMECLIENTInput('nUMECLIENT');
      expect(await portofoliuUpdatePage.getNUMECLIENTInput()).to.match(/nUMECLIENT/);
      await portofoliuUpdatePage.setNUMEVANZATORInput('nUMEVANZATOR');
      expect(await portofoliuUpdatePage.getNUMEVANZATORInput()).to.match(/nUMEVANZATOR/);
      await portofoliuUpdatePage.setVINInput('vIN');
      expect(await portofoliuUpdatePage.getVINInput()).to.match(/vIN/);
      await portofoliuUpdatePage.setENGINENOInput('eNGINENO');
      expect(await portofoliuUpdatePage.getENGINENOInput()).to.match(/eNGINENO/);
      await portofoliuUpdatePage.setANFABRICATIECFCIVInput('5');
      expect(await portofoliuUpdatePage.getANFABRICATIECFCIVInput()).to.eq('5');
      await portofoliuUpdatePage.setOMOLOGAREINDIVIDUALAInput('oMOLOGAREINDIVIDUALA');
      expect(await portofoliuUpdatePage.getOMOLOGAREINDIVIDUALAInput()).to.match(/oMOLOGAREINDIVIDUALA/);
      await portofoliuUpdatePage.setPRETLISTAInput('5');
      expect(await portofoliuUpdatePage.getPRETLISTAInput()).to.eq('5');
      await portofoliuUpdatePage.setDISCOUNTSTANDARDInput('5');
      expect(await portofoliuUpdatePage.getDISCOUNTSTANDARDInput()).to.eq('5');
      await portofoliuUpdatePage.setDISCOUNTSUPLIMENTARInput('5');
      expect(await portofoliuUpdatePage.getDISCOUNTSUPLIMENTARInput()).to.eq('5');
      await portofoliuUpdatePage.setTRUSALEGISLATIVAInput('5');
      expect(await portofoliuUpdatePage.getTRUSALEGISLATIVAInput()).to.eq('5');
      await portofoliuUpdatePage.setPRETFINALInput('5');
      expect(await portofoliuUpdatePage.getPRETFINALInput()).to.eq('5');
      await portofoliuUpdatePage.setAVANSPLATITInput('5');
      expect(await portofoliuUpdatePage.getAVANSPLATITInput()).to.eq('5');
      await portofoliuUpdatePage.setRESTDEPLATAInput('5');
      expect(await portofoliuUpdatePage.getRESTDEPLATAInput()).to.eq('5');
      await portofoliuUpdatePage.setCUSTOMERTRXIDInput('5');
      expect(await portofoliuUpdatePage.getCUSTOMERTRXIDInput()).to.eq('5');
      await portofoliuUpdatePage.setREZCUSTIDInput('rEZCUSTID');
      expect(await portofoliuUpdatePage.getREZCUSTIDInput()).to.match(/rEZCUSTID/);
      await portofoliuUpdatePage.setSOLDCUSTIDInput('5');
      expect(await portofoliuUpdatePage.getSOLDCUSTIDInput()).to.eq('5');
      const selectedPROFORMA = await portofoliuUpdatePage.getPROFORMAInput().isSelected();
      if (selectedPROFORMA) {
        await portofoliuUpdatePage.getPROFORMAInput().click();
        expect(await portofoliuUpdatePage.getPROFORMAInput().isSelected()).to.be.false;
      } else {
        await portofoliuUpdatePage.getPROFORMAInput().click();
        expect(await portofoliuUpdatePage.getPROFORMAInput().isSelected()).to.be.true;
      }
      const selectedTRANSPORT = await portofoliuUpdatePage.getTRANSPORTInput().isSelected();
      if (selectedTRANSPORT) {
        await portofoliuUpdatePage.getTRANSPORTInput().click();
        expect(await portofoliuUpdatePage.getTRANSPORTInput().isSelected()).to.be.false;
      } else {
        await portofoliuUpdatePage.getTRANSPORTInput().click();
        expect(await portofoliuUpdatePage.getTRANSPORTInput().isSelected()).to.be.true;
      }
      await portofoliuUpdatePage.dealerSelectLastOption();
      await waitUntilDisplayed(portofoliuUpdatePage.getSaveButton());
      await portofoliuUpdatePage.save();
      await waitUntilHidden(portofoliuUpdatePage.getSaveButton());
      expect(await portofoliuUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createPortofoliu();
    await portofoliuComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await portofoliuComponentsPage.countDeleteButtons();
    await createPortofoliu();

    await portofoliuComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await portofoliuComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Portofoliu', async () => {
    await portofoliuComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await portofoliuComponentsPage.countDeleteButtons();
    await portofoliuComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    portofoliuDeleteDialog = new PortofoliuDeleteDialog();
    expect(await portofoliuDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/hondaStocOnlineApp.portofoliu.delete.question/);
    await portofoliuDeleteDialog.clickOnConfirmButton();

    await portofoliuComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await portofoliuComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

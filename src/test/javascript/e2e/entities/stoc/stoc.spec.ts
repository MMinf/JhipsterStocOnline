import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import StocComponentsPage, { StocDeleteDialog } from './stoc.page-object';
import StocUpdatePage from './stoc-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Stoc e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let stocComponentsPage: StocComponentsPage;
  let stocUpdatePage: StocUpdatePage;
  let stocDeleteDialog: StocDeleteDialog;

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

  it('should load Stocs', async () => {
    await navBarPage.getEntityPage('stoc');
    stocComponentsPage = new StocComponentsPage();
    expect(await stocComponentsPage.getTitle().getText()).to.match(/Stocs/);
  });

  it('should load create Stoc page', async () => {
    await stocComponentsPage.clickOnCreateButton();
    stocUpdatePage = new StocUpdatePage();
    expect(await stocUpdatePage.getPageTitle().getAttribute('id')).to.match(/hondaStocOnlineApp.stoc.home.createOrEditLabel/);
    await stocUpdatePage.cancel();
  });

  it('should create and save Stocs', async () => {
    async function createStoc() {
      await stocComponentsPage.clickOnCreateButton();
      await stocUpdatePage.setHTROCARNOInput('5');
      expect(await stocUpdatePage.getHTROCARNOInput()).to.eq('5');
      await stocUpdatePage.setRESDEALERIDInput('5');
      expect(await stocUpdatePage.getRESDEALERIDInput()).to.eq('5');
      await stocUpdatePage.setANFABRICATIECIVInput('5');
      expect(await stocUpdatePage.getANFABRICATIECIVInput()).to.eq('5');
      await stocUpdatePage.setTIPAUTOVEHICULInput('tIPAUTOVEHICUL');
      expect(await stocUpdatePage.getTIPAUTOVEHICULInput()).to.match(/tIPAUTOVEHICUL/);
      await stocUpdatePage.setCODCULOAREEXTERIORInput('cODCULOAREEXTERIOR');
      expect(await stocUpdatePage.getCODCULOAREEXTERIORInput()).to.match(/cODCULOAREEXTERIOR/);
      await stocUpdatePage.setDESCCULOAREEXTERIORInput('dESCCULOAREEXTERIOR');
      expect(await stocUpdatePage.getDESCCULOAREEXTERIORInput()).to.match(/dESCCULOAREEXTERIOR/);
      await stocUpdatePage.setVOPSEAMETALIZATAInput('vOPSEAMETALIZATA');
      expect(await stocUpdatePage.getVOPSEAMETALIZATAInput()).to.match(/vOPSEAMETALIZATA/);
      await stocUpdatePage.setCULOAREINTERIORInput('cULOAREINTERIOR');
      expect(await stocUpdatePage.getCULOAREINTERIORInput()).to.match(/cULOAREINTERIOR/);
      await stocUpdatePage.setOBSERVATIIInput('oBSERVATII');
      expect(await stocUpdatePage.getOBSERVATIIInput()).to.match(/oBSERVATII/);
      await stocUpdatePage.setLOCATIEInput('lOCATIE');
      expect(await stocUpdatePage.getLOCATIEInput()).to.match(/lOCATIE/);
      await stocUpdatePage.setOMOLOGAREINDInput('oMOLOGAREIND');
      expect(await stocUpdatePage.getOMOLOGAREINDInput()).to.match(/oMOLOGAREIND/);
      await stocUpdatePage.setLUNASOSIREINTARAInput('lUNASOSIREINTARA');
      expect(await stocUpdatePage.getLUNASOSIREINTARAInput()).to.match(/lUNASOSIREINTARA/);
      await stocUpdatePage.setREZERVATAInput('rEZERVATA');
      expect(await stocUpdatePage.getREZERVATAInput()).to.match(/rEZERVATA/);
      await stocUpdatePage.setDATAEXPIRAREREZInput('dATAEXPIRAREREZ');
      expect(await stocUpdatePage.getDATAEXPIRAREREZInput()).to.match(/dATAEXPIRAREREZ/);
      await stocUpdatePage.dealerSelectLastOption();
      await waitUntilDisplayed(stocUpdatePage.getSaveButton());
      await stocUpdatePage.save();
      await waitUntilHidden(stocUpdatePage.getSaveButton());
      expect(await stocUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createStoc();
    await stocComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await stocComponentsPage.countDeleteButtons();
    await createStoc();

    await stocComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await stocComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Stoc', async () => {
    await stocComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await stocComponentsPage.countDeleteButtons();
    await stocComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    stocDeleteDialog = new StocDeleteDialog();
    expect(await stocDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/hondaStocOnlineApp.stoc.delete.question/);
    await stocDeleteDialog.clickOnConfirmButton();

    await stocComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await stocComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

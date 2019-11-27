import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DealerComponentsPage, { DealerDeleteDialog } from './dealer.page-object';
import DealerUpdatePage from './dealer-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Dealer e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let dealerComponentsPage: DealerComponentsPage;
  let dealerUpdatePage: DealerUpdatePage;
  let dealerDeleteDialog: DealerDeleteDialog;

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

  it('should load Dealers', async () => {
    await navBarPage.getEntityPage('dealer');
    dealerComponentsPage = new DealerComponentsPage();
    expect(await dealerComponentsPage.getTitle().getText()).to.match(/Dealers/);
  });

  it('should load create Dealer page', async () => {
    await dealerComponentsPage.clickOnCreateButton();
    dealerUpdatePage = new DealerUpdatePage();
    expect(await dealerUpdatePage.getPageTitle().getAttribute('id')).to.match(/hondaStocOnlineApp.dealer.home.createOrEditLabel/);
    await dealerUpdatePage.cancel();
  });

  it('should create and save Dealers', async () => {
    async function createDealer() {
      await dealerComponentsPage.clickOnCreateButton();
      await dealerUpdatePage.setNameInput('name');
      expect(await dealerUpdatePage.getNameInput()).to.match(/name/);
      await dealerUpdatePage.setDescriptionInput('description');
      expect(await dealerUpdatePage.getDescriptionInput()).to.match(/description/);
      await dealerUpdatePage.tipAutovehiculeSelectLastOption();
      await dealerUpdatePage.setDealerIdInput('dealerId');
      expect(await dealerUpdatePage.getDealerIdInput()).to.match(/dealerId/);
      // dealerUpdatePage.userSelectLastOption();
      await waitUntilDisplayed(dealerUpdatePage.getSaveButton());
      await dealerUpdatePage.save();
      await waitUntilHidden(dealerUpdatePage.getSaveButton());
      expect(await dealerUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createDealer();
    await dealerComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await dealerComponentsPage.countDeleteButtons();
    await createDealer();

    await dealerComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await dealerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Dealer', async () => {
    await dealerComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await dealerComponentsPage.countDeleteButtons();
    await dealerComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    dealerDeleteDialog = new DealerDeleteDialog();
    expect(await dealerDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/hondaStocOnlineApp.dealer.delete.question/);
    await dealerDeleteDialog.clickOnConfirmButton();

    await dealerComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await dealerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

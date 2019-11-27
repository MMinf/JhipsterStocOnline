import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ExtendedUserComponentsPage, { ExtendedUserDeleteDialog } from './extended-user.page-object';
import ExtendedUserUpdatePage from './extended-user-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('ExtendedUser e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let extendedUserComponentsPage: ExtendedUserComponentsPage;
  let extendedUserUpdatePage: ExtendedUserUpdatePage;
  let extendedUserDeleteDialog: ExtendedUserDeleteDialog;

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

  it('should load ExtendedUsers', async () => {
    await navBarPage.getEntityPage('extended-user');
    extendedUserComponentsPage = new ExtendedUserComponentsPage();
    expect(await extendedUserComponentsPage.getTitle().getText()).to.match(/Extended Users/);
  });

  it('should load create ExtendedUser page', async () => {
    await extendedUserComponentsPage.clickOnCreateButton();
    extendedUserUpdatePage = new ExtendedUserUpdatePage();
    expect(await extendedUserUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /hondaStocOnlineApp.extendedUser.home.createOrEditLabel/
    );
    await extendedUserUpdatePage.cancel();
  });

  it('should create and save ExtendedUsers', async () => {
    async function createExtendedUser() {
      await extendedUserComponentsPage.clickOnCreateButton();
      await extendedUserUpdatePage.setBirthdayInput('01-01-2001');
      expect(await extendedUserUpdatePage.getBirthdayInput()).to.eq('2001-01-01');
      await extendedUserUpdatePage.setGenderInput('gender');
      expect(await extendedUserUpdatePage.getGenderInput()).to.match(/gender/);
      await extendedUserUpdatePage.setMobileNoInput('5');
      expect(await extendedUserUpdatePage.getMobileNoInput()).to.eq('5');
      await extendedUserUpdatePage.userSelectLastOption();
      await waitUntilDisplayed(extendedUserUpdatePage.getSaveButton());
      await extendedUserUpdatePage.save();
      await waitUntilHidden(extendedUserUpdatePage.getSaveButton());
      expect(await extendedUserUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createExtendedUser();
    await extendedUserComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await extendedUserComponentsPage.countDeleteButtons();
    await createExtendedUser();

    await extendedUserComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await extendedUserComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last ExtendedUser', async () => {
    await extendedUserComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await extendedUserComponentsPage.countDeleteButtons();
    await extendedUserComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    extendedUserDeleteDialog = new ExtendedUserDeleteDialog();
    expect(await extendedUserDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/hondaStocOnlineApp.extendedUser.delete.question/);
    await extendedUserDeleteDialog.clickOnConfirmButton();

    await extendedUserComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await extendedUserComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

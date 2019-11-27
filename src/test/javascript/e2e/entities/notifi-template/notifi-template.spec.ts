import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import NotifiTemplateComponentsPage, { NotifiTemplateDeleteDialog } from './notifi-template.page-object';
import NotifiTemplateUpdatePage from './notifi-template-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('NotifiTemplate e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let notifiTemplateComponentsPage: NotifiTemplateComponentsPage;
  let notifiTemplateUpdatePage: NotifiTemplateUpdatePage;
  let notifiTemplateDeleteDialog: NotifiTemplateDeleteDialog;

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

  it('should load NotifiTemplates', async () => {
    await navBarPage.getEntityPage('notifi-template');
    notifiTemplateComponentsPage = new NotifiTemplateComponentsPage();
    expect(await notifiTemplateComponentsPage.getTitle().getText()).to.match(/Notifi Templates/);
  });

  it('should load create NotifiTemplate page', async () => {
    await notifiTemplateComponentsPage.clickOnCreateButton();
    notifiTemplateUpdatePage = new NotifiTemplateUpdatePage();
    expect(await notifiTemplateUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /hondaStocOnlineApp.notifiTemplate.home.createOrEditLabel/
    );
    await notifiTemplateUpdatePage.cancel();
  });

  it('should create and save NotifiTemplates', async () => {
    async function createNotifiTemplate() {
      await notifiTemplateComponentsPage.clickOnCreateButton();
      await notifiTemplateUpdatePage.setEmailAddressesInput('emailAddresses');
      expect(await notifiTemplateUpdatePage.getEmailAddressesInput()).to.match(/emailAddresses/);
      await notifiTemplateUpdatePage.setMessageInput('message');
      expect(await notifiTemplateUpdatePage.getMessageInput()).to.match(/message/);
      await waitUntilDisplayed(notifiTemplateUpdatePage.getSaveButton());
      await notifiTemplateUpdatePage.save();
      await waitUntilHidden(notifiTemplateUpdatePage.getSaveButton());
      expect(await notifiTemplateUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createNotifiTemplate();
    await notifiTemplateComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await notifiTemplateComponentsPage.countDeleteButtons();
    await createNotifiTemplate();

    await notifiTemplateComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await notifiTemplateComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last NotifiTemplate', async () => {
    await notifiTemplateComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await notifiTemplateComponentsPage.countDeleteButtons();
    await notifiTemplateComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    notifiTemplateDeleteDialog = new NotifiTemplateDeleteDialog();
    expect(await notifiTemplateDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /hondaStocOnlineApp.notifiTemplate.delete.question/
    );
    await notifiTemplateDeleteDialog.clickOnConfirmButton();

    await notifiTemplateComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await notifiTemplateComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

import { element, by, ElementFinder } from 'protractor';

export default class NotifiTemplateUpdatePage {
  pageTitle: ElementFinder = element(by.id('hondaStocOnlineApp.notifiTemplate.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  emailAddressesInput: ElementFinder = element(by.css('input#notifi-template-emailAddresses'));
  messageInput: ElementFinder = element(by.css('input#notifi-template-message'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setEmailAddressesInput(emailAddresses) {
    await this.emailAddressesInput.sendKeys(emailAddresses);
  }

  async getEmailAddressesInput() {
    return this.emailAddressesInput.getAttribute('value');
  }

  async setMessageInput(message) {
    await this.messageInput.sendKeys(message);
  }

  async getMessageInput() {
    return this.messageInput.getAttribute('value');
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

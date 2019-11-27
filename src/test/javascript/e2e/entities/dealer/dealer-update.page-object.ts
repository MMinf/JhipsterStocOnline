import { element, by, ElementFinder } from 'protractor';

export default class DealerUpdatePage {
  pageTitle: ElementFinder = element(by.id('hondaStocOnlineApp.dealer.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#dealer-name'));
  descriptionInput: ElementFinder = element(by.css('input#dealer-description'));
  tipAutovehiculeSelect: ElementFinder = element(by.css('select#dealer-tipAutovehicule'));
  dealerIdInput: ElementFinder = element(by.css('input#dealer-dealerId'));
  userSelect: ElementFinder = element(by.css('select#dealer-user'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setTipAutovehiculeSelect(tipAutovehicule) {
    await this.tipAutovehiculeSelect.sendKeys(tipAutovehicule);
  }

  async getTipAutovehiculeSelect() {
    return this.tipAutovehiculeSelect.element(by.css('option:checked')).getText();
  }

  async tipAutovehiculeSelectLastOption() {
    await this.tipAutovehiculeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setDealerIdInput(dealerId) {
    await this.dealerIdInput.sendKeys(dealerId);
  }

  async getDealerIdInput() {
    return this.dealerIdInput.getAttribute('value');
  }

  async userSelectLastOption() {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
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

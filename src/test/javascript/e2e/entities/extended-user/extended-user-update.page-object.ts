import { element, by, ElementFinder } from 'protractor';

export default class ExtendedUserUpdatePage {
  pageTitle: ElementFinder = element(by.id('hondaStocOnlineApp.extendedUser.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  birthdayInput: ElementFinder = element(by.css('input#extended-user-birthday'));
  genderInput: ElementFinder = element(by.css('input#extended-user-gender'));
  mobileNoInput: ElementFinder = element(by.css('input#extended-user-mobileNo'));
  userSelect: ElementFinder = element(by.css('select#extended-user-user'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setBirthdayInput(birthday) {
    await this.birthdayInput.sendKeys(birthday);
  }

  async getBirthdayInput() {
    return this.birthdayInput.getAttribute('value');
  }

  async setGenderInput(gender) {
    await this.genderInput.sendKeys(gender);
  }

  async getGenderInput() {
    return this.genderInput.getAttribute('value');
  }

  async setMobileNoInput(mobileNo) {
    await this.mobileNoInput.sendKeys(mobileNo);
  }

  async getMobileNoInput() {
    return this.mobileNoInput.getAttribute('value');
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

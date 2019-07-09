import BasePage from './base-component';

export default class SettingsPage extends BasePage {
  static getSelf() {
    return cy.get('#settings-form');
  }

  static get() {
    return cy.visit('/account/settings');
  }

  static getTitleElement() {
    return cy.get('#settings-title');
  }

  static getFirstNameElement() {
    return cy.get('#firstName');
  }

  static getLastNameElement() {
    return cy.get('#lastName');
  }

  static getEmailElement() {
    return cy.get('#email');
  }

  static getSaveButton() {
    return cy.get('button[type=submit]');
  }

  static getTitle() {
    return this.getTitleElement().invoke('attr', 'id');
  }

  static setFirstName(firstName: string) {
    return this.getFirstNameElement().type(firstName);
  }

  static setLastName(lastName: string) {
    return this.getLastNameElement().type(lastName);
  }

  static setEmail(email: string) {
    return this.getEmailElement().type(email);
  }

  static clearEmail() {
    return this.getEmailElement().clear();
  }

  static save() {
    return this.getSaveButton().click();
  }
}

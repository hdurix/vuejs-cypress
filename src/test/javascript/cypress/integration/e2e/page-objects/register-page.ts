import BasePage from './base-component';

export default class RegisterPage extends BasePage {
  static getSelf() {
    return cy.get('#register-form');
  }

  static get() {
    return cy.visit('/register');
  }

  static getTitleElement() {
    return cy.get('#register-title');
  }

  static getUsernameElement() {
    return cy.get('#username');
  }

  static getEmailElement() {
    return cy.get('#email');
  }

  static getFirstPasswordElement() {
    return cy.get('#firstPassword');
  }

  static getSecondPasswordElement() {
    return cy.get('#secondPassword');
  }

  static getSaveButton() {
    return cy.get('button[type=submit]');
  }

  static getTitle() {
    return this.getTitleElement().invoke('attr', 'id');
  }

  static setUserName(username: string) {
    return this.getUsernameElement().type(username);
  }

  static setEmail(email: string) {
    return this.getEmailElement().type(email);
  }

  static setFirstPassword(password: string) {
    return this.getFirstPasswordElement().type(password);
  }

  static setSecondPassword(password: string) {
    return this.getSecondPasswordElement().type(password);
  }

  static autoSignUpUsing(username: string, email: string, password: string) {
    this.setUserName(username);
    this.setEmail(email);
    this.setFirstPassword(password);
    this.setSecondPassword(password);
    return this.save();
  }

  static save() {
    return this.getSaveButton().click();
  }
}

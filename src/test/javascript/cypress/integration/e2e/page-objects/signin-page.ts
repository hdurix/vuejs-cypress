import BasePage from './base-component';

export default class SignInPage extends BasePage {
  static getSelf() {
    return cy.get('#register-form');
  }

  static get() {
    return cy.visit('/login');
  }

  static getTitleElement() {
    return cy.get('#login-title');
  }

  static getUsernameElement() {
    return cy.get('#username');
  }

  static getPasswordElement() {
    return cy.get('#password');
  }

  static getLoginButton() {
    return cy.get('button[type=submit]');
  }

  static getTitle() {
    return this.getTitleElement().invoke('attr', 'id');
  }

  static setUserName(username: string) {
    return this.getUsernameElement().type(username);
  }

  static clearUserName() {
    return this.getUsernameElement().clear();
  }

  static setPassword(password: string) {
    return this.getPasswordElement().type(password);
  }

  static clearPassword() {
    return this.getPasswordElement().clear();
  }

  static autoSignInUsing(username: string, password: string) {
    this.setUserName(username);
    this.setPassword(password);
    return this.login();
  }

  static autoSignOut() {
    return cy.visit('/logout');
  }

  static login() {
    return this.getLoginButton().click();
  }
}

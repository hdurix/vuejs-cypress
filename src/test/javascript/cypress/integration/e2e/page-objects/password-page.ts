import BasePage from './base-component';

export default class PasswordPage extends BasePage {
  static getSelf() {
    return cy.get('#password-form');
  }

  static get() {
    return cy.visit('/account/password');
  }

  static getTitleElement() {
    return cy.get('#password-title');
  }

  static getCurrentPasswordElement() {
    return cy.get('#currentPassword');
  }

  static getNewPasswordElement() {
    return cy.get('#newPassword');
  }

  static getConfirmPasswordElement() {
    return cy.get('#confirmPassword');
  }

  static getSaveButton() {
    return cy.get('button[type=submit]');
  }

  static getTitle() {
    return this.getTitleElement().invoke('attr', 'id');
  }

  static setCurrentPassword(currentPassword: string) {
    return this.getCurrentPasswordElement().type(currentPassword);
  }

  static clearCurrentPassword() {
    return this.getCurrentPasswordElement().clear();
  }

  static setNewPassword(password: string) {
    return this.getNewPasswordElement().type(password);
  }

  static clearNewPassword() {
    return this.getNewPasswordElement().clear();
  }

  static setConfirmPassword(password: string) {
    return this.getConfirmPasswordElement().type(password);
  }

  static clearConfirmPassword() {
    return this.getConfirmPasswordElement().clear();
  }

  static autoChangePassword(currentPassword: string, newPassword: string, confirmPassword: string) {
    this.setCurrentPassword(currentPassword);
    this.setNewPassword(newPassword);
    this.setConfirmPassword(confirmPassword);
    return this.save();
  }

  static save() {
    this.getSaveButton().click();
  }
}

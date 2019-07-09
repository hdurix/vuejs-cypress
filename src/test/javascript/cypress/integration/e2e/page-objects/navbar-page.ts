import BasePage from './base-component';
import SignInPage from './signin-page';

export default class NavBarPage extends BasePage {
  static getSelf() {
    return cy.get('#app-header');
  }

  static getAdminMenuElement() {
    return cy.get('#admin-menu');
  }

  static getAccountMenuElement() {
    return cy.get('#account-menu');
  }

  static getEntityMenuElement() {
    return cy.get('#entity-menu');
  }

  static getPasswordPage() {
    return this.clickOnAccountMenuItem('password');
  }

  static getSettingsPage() {
    return this.clickOnAccountMenuItem('settings');
  }

  static getRegisterPage() {
    this.clickOnAccountMenu();
    return this.clickOnTabMenu('#register');
  }

  static getSignInPage() {
    this.clickOnAccountMenu();
    return this.clickOnTabMenu('#login');
  }

  static getEntityPage(entityName: string) {
    this.clickOnEntityMenu();
    return this.clickOnEntity(entityName);
  }

  static clickOnTabMenu(item: string) {
    return cy
      .get('#header-tabs')
      .get(`.dropdown-menu ${item}`)
      .click();
  }

  static clickOnAccountMenu() {
    return this.getAccountMenuElement().click();
  }

  static clickOnAccountMenuItem(item: string) {
    return this.clickOnAccountMenu()
      .get(`.dropdown-item[href="/account/${item}"`)
      .click();
  }

  static clickOnAdminMenuItem(item: string) {
    return this.getAdminMenuElement()
      .click()
      .get(`.dropdown-item[href="/admin/${item}"]`)
      .click();
  }

  static clickOnEntityMenu() {
    return this.getEntityMenuElement().click({ force: true });
  }

  static clickOnEntity(entityName: string) {
    return cy.get(`.dropdown-item[href="/entity/${entityName}"]`).click({ force: true });
  }

  static autoSignIn() {
    SignInPage.getSelf();
    SignInPage.autoSignInUsing('admin', 'admin');
  }

  static autoSignOut() {
    this.clickOnAccountMenu();
    this.clickOnTabMenu('#logout');
  }
}

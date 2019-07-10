/// <reference types="cypress" />

// TODO: conditionnal adding
import { datetimeToMinutes } from '../../util/utils';

export default class PostUpdatePage {
  static getPageTitle() {
    return cy.get('h2');
  }

  static getFooter() {
    return cy.get('#footer');
  }

  static getSaveButton() {
    return cy.get('#save-entity');
  }

  static isSaveButtonPresent() {
    cy.get('#save-entity').then($saveElement => {
      if ($saveElement) {
        return true;
      }
    });

    return false;
  }

  static save() {
    return this.getSaveButton().click();
  }

  static cancel() {
    return cy.get('cancel-save').click();
  }

  // --------------------------------------------------

  static getNameInput() {
    return cy.get('input#post-name');
  }

  static setNameInput(name) {
    return this.getNameInput().type(name);
  }

  static clearNameInput() {
    return this.getNameInput().clear();
  }
  // --------------------------------------------------

  static getAgeInput() {
    return cy.get('input#post-age');
  }

  static setAgeInput(age) {
    return this.getAgeInput().type(age);
  }

  static clearAgeInput() {
    return this.getAgeInput().clear();
  }
  // --------------------------------------------------

  static getUserSelect() {
    return cy.get('select#post-user');
  }

  static getUserSelectLastOption() {
    return this.getUserSelect()
      .find('option')
      .last.click();
  }

  static getUserSelectOption(option) {
    return this.getUserSelect().type(option);
  }

  static getUserSelectedOption() {
    return this.getUserSelect()
      .find('option:checked')
      .invoke('text');
  }
}

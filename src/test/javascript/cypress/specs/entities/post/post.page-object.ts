/// <reference types="cypress" />

export default class PostComponentsPage {
  static isSaveButtonPresent() {
    cy.get('#save-entity').then($saveElement => {
      if ($saveElement) {
        return true;
      }
    });

    return false;
  }

  static save() {
    return cy.get('#save-entity').click();
  }

  static cancel() {
    return cy.get('#cancel-save').click();
  }

  static getCreateButton() {
    return cy.get('#jh-create-entity');
  }

  static clickOnCreateButton() {
    return cy.get('#jh-create-entity').click();
  }

  static getDetailButtons() {
    return cy.get('.btn-info.details');
  }

  static clickOnLastDetailsButton() {
    return this.getDetailButtons()
      .last()
      .click();
  }

  static getEditButtons() {
    return cy.get('.btn-primary.edit');
  }

  static clickOnLastEditButton() {
    return this.getEditButtons()
      .last()
      .click();
  }

  static getDeleteButtons() {
    return cy.get('div table .btn-danger');
  }

  static clickOnLastDeleteButton() {
    return this.getDeleteButtons()
      .last()
      .click();
  }

  static countPost() {
    return this.getDeleteButtons().then($buttons => {
      return $buttons.length;
    });
  }

  static getTitle() {
    return cy.get('#post-heading');
  }

  static getFooter() {
    return cy.get('#footer');
  }
}

export class PostDeleteDialog {
  static getDialogTitle() {
    return cy.get('#jhi-delete-post-heading');
  }

  static clickOnConfirmButton() {
    return cy.get('#jhi-confirm-delete-post').click();
  }
}

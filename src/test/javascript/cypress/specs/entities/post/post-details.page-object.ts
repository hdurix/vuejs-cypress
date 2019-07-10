/// <reference types="cypress" />

export default class PostDetailsPage {
  static getPageTitle() {
    return cy.get('h2');
  }

  static getFirstDetail() {
    return cy.get('.jh-entity-details > dd > span').first();
  }

  static getBackButton() {
    return cy.get('.btn-info');
  }
}

import {
  loginModalSelector,
  loginTitleSelector,
  loginUsernameSelector,
  loginPasswordSelector,
  loginSubmitSelector,
  loginAlertSelector
} from '../../support/page-objects/login-page';

describe('Log In', () => {
  beforeEach(() => {
    cy.logout();
    cy.visit('/');
    cy.clickOnLoginItem();
  });

  it('should display login modal', () => {
    cy.get(loginModalSelector).find(loginTitleSelector);
    cy.get(loginModalSelector).find(loginUsernameSelector);
    cy.get(loginModalSelector).find(loginPasswordSelector);
    cy.get(loginModalSelector).find(loginSubmitSelector);

    // TODO: test checkbox and alert warnings si moins de flemme
  });

  it('should fail to login with bad password', () => {
    cy.get(loginModalSelector)
      .find(loginUsernameSelector)
      .type('admin');
    cy.get(loginModalSelector)
      .find(loginPasswordSelector)
      .type('foo');

    cy.get(loginModalSelector)
      .find(loginSubmitSelector)
      .click();
    cy.get(loginModalSelector)
      .find(loginTitleSelector)
      .should('exist');
    cy.get(loginModalSelector)
      .find(loginAlertSelector)
      .should('exist');
    cy.get(loginModalSelector)
      .find(loginAlertSelector)
      .should('have.class', 'alert-danger');
  });

  it('should login with admin account', () => {
    cy.get(loginModalSelector)
      .find(loginUsernameSelector)
      .clear()
      .type('admin');
    cy.get(loginModalSelector)
      .find(loginPasswordSelector)
      .clear()
      .type('admin');
    cy.get(loginModalSelector)
      .find(loginSubmitSelector)
      .click();

    cy.get(loginModalSelector)
      .find(loginTitleSelector)
      .should('not.exist');
  });
});

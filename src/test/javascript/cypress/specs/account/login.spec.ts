import {
  loginModalSelector,
  loginTitleSelector,
  loginUsernameSelector,
  loginPasswordSelector,
  loginSubmitSelector,
  loginAlertSelector
} from '../../support/page-objects/login-page';

// should be in login-page.ts?
const loginWith = (username: string, password: string) => {
  cy.get(loginModalSelector)
    .find(loginUsernameSelector)
    .type(username);
  cy.get(loginModalSelector)
    .find(loginPasswordSelector)
    .type(password);
  cy.get(loginModalSelector)
    .find(loginSubmitSelector)
    .click();
};

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
    // WHEN
    loginWith('admin', 'wrong');

    // THEN
    cy.get(loginModalSelector)
      .find(loginTitleSelector)
      .should('exist');
    // Not so useful as already tested after
    // cy.get(loginModalSelector)
    //   .find(loginAlertSelector)
    //   .should('exist');
    cy.get(loginModalSelector)
      .find(loginAlertSelector)
      .should('have.class', 'alert-danger');
  });

  it('should login with admin account', () => {
    // WHEN
    loginWith('admin', 'admin');

    // THEN
    cy.get(loginModalSelector)
      .find(loginTitleSelector)
      .should('not.exist');
  });
});

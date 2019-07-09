describe('Log In', () => {
  const loginModalSelector = '[data-e2e-container=login-modal]';
  const loginTitleSelector = '[data-e2e-element=title]';
  const loginUsernameSelector = '[data-e2e-element=username]';
  const loginPasswordSelector = '[data-e2e-element=password]';
  const loginSubmitSelector = '[data-e2e-element=submit]';
  const loginAlertSelector = '[data-e2e-element=alert-authentication-error]';

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

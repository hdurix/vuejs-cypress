import {
  autoSignUpUsing,
  registerConfirmationPasswordSelector,
  registerEmailSelector,
  registerPageSelector,
  registerPasswordSelector,
  registerSubmitSelector,
  registerTitleSelector,
  registerUsernameSelector
} from '../../support/page-objects/register-page';

describe('Register', () => {
  beforeEach(() => {
    cy.cleanUsers();
    // TODO: Move logout to support ? It would run before each test
    cy.logout();
    cy.visit('/register');
  });

  it('should display register page', () => {
    cy.get(registerPageSelector).find(registerTitleSelector);
    cy.get(registerPageSelector).find(registerUsernameSelector);
    cy.get(registerPageSelector).find(registerEmailSelector);
    cy.get(registerPageSelector).find(registerPasswordSelector);
    cy.get(registerPageSelector).find(registerConfirmationPasswordSelector);
    cy.get(registerPageSelector).find(registerSubmitSelector);
  });

  it('should be able to sign up', () => {
    // GIVEN

    // WHEN
    autoSignUpUsing('user_test', 'admin@localhost.jh', 'user_test');

    // THEN
    cy.getSuccessToast().should('exist');
  });

  // TODO: test input required + password match

  it('should not be able to sign up if login already taken', () => {
    // GIVEN
    cy.createAndActivateUserUsing('user-login-taken', 'user-login-taken@localhost.jh', 'user-login-taken');

    autoSignUpUsing('user-login-taken', 'user-login-taken@localhost.jh', 'user-login-taken');

    // THEN
    cy.getDangerToast().should('exist');
  });

  it('should not be able to sign up if email already taken', () => {
    // GIVEN
    cy.createAndActivateUserUsing('user-email-taken', 'user-email-taken@localhost.jh', 'user-email-taken');

    // WHEN
    autoSignUpUsing('user-email-taken', 'user-email-taken@localhost.jh', 'user-email-taken');

    // THEN
    cy.getDangerToast().should('exist');
  });
});

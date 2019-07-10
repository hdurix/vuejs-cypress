import {
  autoSignUpUsing,
  registerConfirmationPasswordSelector,
  registerEmailSelector,
  registerPageSelector,
  registerPasswordSelector,
  registerSubmitSelector,
  registerTitleSelector,
  registerUsernameSelector
} from '../../page-objects/register-page';

import { getDangerToast, getSuccessToast } from '../../util/utils';

describe('Register', () => {
  beforeEach(() => {
    cy.cleanUsers();
    // TODO: Move logout to support ? It would run before each test
    cy.logout();
    cy.visit('/');
  });

  it('should display register page', () => {
    cy.visit('/register');

    cy.get(registerPageSelector).find(registerTitleSelector);
    cy.get(registerPageSelector).find(registerUsernameSelector);
    cy.get(registerPageSelector).find(registerEmailSelector);
    cy.get(registerPageSelector).find(registerPasswordSelector);
    cy.get(registerPageSelector).find(registerConfirmationPasswordSelector);
    cy.get(registerPageSelector).find(registerSubmitSelector);
  });

  it('should be able to sign up', () => {
    cy.visit('/register');
    autoSignUpUsing('user_test', 'admin@localhost.jh', 'user_test');

    getSuccessToast().should('exist');
  });

  // TODO: test input required + password match

  it('should not be able to sign up if login already taken', () => {
    cy.createAndActivateUserUsing('user-login-taken', 'user-login-taken@localhost.jh', 'user-login-taken');

    cy.visit('/register');
    autoSignUpUsing('user-login-taken', 'user-login-taken@localhost.jh', 'user-login-taken');

    // Error toast should appear
    getDangerToast().should('exist');
  });

  it('should not be able to sign up if email already taken', () => {
    cy.createAndActivateUserUsing('user-email-taken', 'user-email-taken@localhost.jh', 'user-email-taken');
    cy.visit('/register');
    autoSignUpUsing('user-email-taken', 'user-email-taken@localhost.jh', 'user-email-taken');

    // Error toast should appear
    getDangerToast().should('exist');
  });
});

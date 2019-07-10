import { autoChangePassword } from '../../support/page-objects/password-page';

describe('Account Management', () => {
  beforeEach(() => {
    cy.cleanUsers();
    // TODO: Move logout to support ? It would run before each test
    cy.logout();
    cy.visit('/');
  });

  it('should fail to update password when using incorrect current password', () => {
    // GIVEN
    cy.createAndActivateUserUsing('user-fail-change-password', 'user-fail-change-password@localhost.jh', 'user-fail-change-password');
    cy.loginUsing('user-fail-change-password', 'user-fail-change-password');
    cy.visit('/account/password');

    // WHEN
    autoChangePassword('bad-password', 'new_password', 'new_password');

    // THEN
    cy.getDangerToast().should('exist');
  });

  it('should be able to update password', () => {
    // GIVEN
    cy.createAndActivateUserUsing('user-change-password', 'user-change-password@localhost.jh', 'user-change-password');
    cy.loginUsing('user-change-password', 'user-change-password');
    cy.visit('/account/password');

    // WHEN
    autoChangePassword('user-change-password', 'new_password', 'new_password');

    // THEN
    cy.getSuccessToast().should('exist');
    cy.logout();

    // Should be able to login with updated password
    cy.loginUsing('user-change-password', 'new_password');
  });
});

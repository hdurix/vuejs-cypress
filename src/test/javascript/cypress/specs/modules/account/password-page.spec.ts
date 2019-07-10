import { autoChangePassword } from '../../page-objects/password-page';

import { getDangerToast, getSuccessToast } from '../../util/utils';

describe('Account Management', () => {
  beforeEach(() => {
    cy.cleanUsers();
    // TODO: Move logout to support ? It would run before each test
    cy.logout();
    cy.visit('/');
  });

  it('should fail to update password when using incorrect current password', () => {
    cy.createAndActivateUserUsing('user-fail-change-password', 'user-fail-change-password@localhost.jh', 'user-fail-change-password');
    cy.loginUsing('user-fail-change-password', 'user-fail-change-password');
    cy.visit('/account/password');
    autoChangePassword('bad-password', 'new_password', 'new_password');

    // Error toast should appear
    getDangerToast().should('exist');
  });

  it('should be able to update password', () => {
    cy.createAndActivateUserUsing('user-change-password', 'user-change-password@localhost.jh', 'user-change-password');
    cy.loginUsing('user-change-password', 'user-change-password');
    cy.visit('/account/password');
    autoChangePassword('user-change-password', 'new_password', 'new_password');

    // Error toast should appear
    getSuccessToast().should('exist');
    cy.logout();

    // Should be able to login with updated password
    cy.loginUsing('user-change-password', 'new_password');
  });
});

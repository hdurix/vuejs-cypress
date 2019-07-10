import {
  getUserDeactivatedButtonByLogin,
  getUserDeleteButtonByLogin,
  userDeleteModalPageSelector
} from '../../../page-objects/user-managements-pages';

import { getDangerToast } from '../../../util/utils';

describe('User Management', () => {
  beforeEach(() => {
    cy.cleanUsers();
    // TODO: Move logout to support ? It would run before each test
    cy.logout();
    cy.loginWithAdmin();
    cy.visit('/admin/user-management');
  });

  it('should be able to activate deactivated user', () => {
    cy.registerUserUsing('user-deactivated', 'user-deactivated@localhost.jh', 'user-deactivated');
    cy.reload();
    getUserDeactivatedButtonByLogin('user-deactivated').click();

    // Deactivated button should disappear
    getUserDeactivatedButtonByLogin('user-deactivated').should('not.exist');
  });

  it('should be able to delete existing user', () => {
    cy.registerUserUsing('user-to-delete', 'user-to-delete@localhost.jh', 'user-to-delete');
    cy.reload();

    getUserDeleteButtonByLogin('user-to-delete').click();
    cy.get(userDeleteModalPageSelector)
      .find('button')
      .contains('OK')
      .click();

    // Delete modal should disappear
    cy.get(userDeleteModalPageSelector).should('not.be.visible');

    // Danger toast should appear
    getDangerToast().should('exist');
  });
});

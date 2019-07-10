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
    // GIVEN
    cy.registerUserUsing('user-deactivated', 'user-deactivated@localhost.jh', 'user-deactivated');
    cy.reload();

    // WHEN
    getUserDeactivatedButtonByLogin('user-deactivated').click();

    // THEN
    getUserDeactivatedButtonByLogin('user-deactivated').should('not.exist');
  });

  it('should be able to delete existing user', () => {
    // GIVEN
    cy.registerUserUsing('user-to-delete', 'user-to-delete@localhost.jh', 'user-to-delete');
    cy.reload();

    // WHEN
    getUserDeleteButtonByLogin('user-to-delete').click();
    cy.get(userDeleteModalPageSelector)
      .find('button')
      .contains('OK')
      .click();

    // THEN
    cy.get(userDeleteModalPageSelector).should('not.be.visible');
    getDangerToast().should('exist');
  });
});

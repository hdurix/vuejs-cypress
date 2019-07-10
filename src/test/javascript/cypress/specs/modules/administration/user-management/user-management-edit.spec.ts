import {
  getUserEditButtonByLogin,
  getUserEmailByLogin,
  userEditEmailSelector,
  userEditPageSelector,
  userEditSaveSelector
} from '../../../page-objects/user-managements-pages';

import { getInfoToast } from '../../../util/utils';

describe('User Edit', () => {
  beforeEach(() => {
    cy.cleanUsers();
    // TODO: Move logout to support ? It would run before each test
    cy.logout();
    cy.loginWithAdmin();
    cy.registerUserUsing('user-edit-details', 'user-edit-details@localhost.jh', 'user-edit-details');
    cy.visit('/admin/user-management');
  });

  it('should edit details from user', () => {
    // WHEN
    getUserEditButtonByLogin('user-edit-details').click();

    cy.get(userEditPageSelector)
      .find(userEditEmailSelector)
      .type('ipster');
    cy.get(userEditPageSelector)
      .find(userEditSaveSelector)
      .click();

    // THEN
    getInfoToast().should('exist');
    getUserEmailByLogin('user-edit-details').shouldTextBe('user-edit-details@localhost.jhipster');
  });
});

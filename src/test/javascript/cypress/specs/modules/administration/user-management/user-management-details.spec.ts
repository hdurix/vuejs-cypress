import {
  getUserDetailsButtonByLogin,
  userDetailsLoginSelector,
  userDetailsPageSelector
} from '../../../page-objects/user-managements-pages';

describe('User Details', () => {
  beforeEach(() => {
    cy.cleanUsers();
    // TODO: Move logout to support ? It would run before each test
    cy.logout();
    cy.loginWithAdmin();
    cy.registerUserUsing('user-details', 'user-details@localhost.jh', 'user-details');
    cy.visit('/admin/user-management');
  });

  it('should preview details from user', () => {
    getUserDetailsButtonByLogin('user-details').click();

    cy.get(userDetailsPageSelector)
      .find(userDetailsLoginSelector)
      .shouldTextBe('user-details');
  });
});

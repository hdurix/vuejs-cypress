import RegisterPage from '../../page-objects/register-page';
import PasswordPage from '../../page-objects/password-page';

import {
  getUserDeactivatedButtonByLogin,
  getUserDeleteButtonByLogin,
  getUserDetailsButtonByLogin,
  getUserEditButtonByLogin,
  getUserEmailByLogin,
  getSuccessToast,
  getInfoToast,
  getDangerToast
} from '../../util/utils';

describe('Account Management', () => {
  beforeEach(() => {
    cy.cleanUsers();
    cy.visit('/');
  });

  it('should be able to sign up', () => {
    cy.server();
    cy.route('POST', '/api/register').as('registrationRequest');

    cy.visit('/register');
    RegisterPage.autoSignUpUsing('user_test', 'admin@localhost.jh', 'user_test');

    cy.wait('@registrationRequest');
    getSuccessToast().should('exist');
  });

  it('should not be able to sign up if login already taken', () => {
    cy.server();
    cy.route('POST', '/api/register').as('registrationRequest');

    cy.createAndActivateUserUsing('user-login-taken', 'user-login-taken@localhost.jh', 'user-login-taken');

    cy.visit('/register');
    RegisterPage.autoSignUpUsing('user-login-taken', 'user-login-taken@localhost.jh', 'user-login-taken');

    cy.wait('@registrationRequest');

    // Error toast should appear
    getDangerToast().should('exist');
  });

  it('should not be able to sign up if email already taken', () => {
    cy.server();
    cy.route('POST', '/api/register').as('registrationRequest');

    cy.createAndActivateUserUsing('user-email-taken', 'user-email-taken@localhost.jh', 'user-email-taken');
    cy.visit('/register');
    RegisterPage.autoSignUpUsing('user-email-taken', 'user-email-taken@localhost.jh', 'user-email-taken');

    cy.wait('@registrationRequest');

    // Error toast should appear
    getDangerToast().should('exist');
  });

  it('should be able to activate deactivated user', () => {
    cy.server();
    cy.route('PUT', '/api/users').as('activateUserRequest');

    cy.registerUserUsing('user-deactivated', 'user-deactivated@localhost.jh', 'user-deactivated');
    cy.loginWithAdmin().then(() => cy.visit('/admin/user-management'));
    getUserDeactivatedButtonByLogin('user-deactivated').click();

    cy.wait('@activateUserRequest');

    // Deactivated button should disappear
    getUserDeactivatedButtonByLogin('user-deactivated').should('not.exist');
  });

  it('should fail to update password when using incorrect current password', () => {
    cy.server();
    cy.route('POST', '/api/account/change-password').as('changePasswordRequest');

    cy.createAndActivateUserUsing('user-fail-change-password', 'user-fail-change-password@localhost.jh', 'user-fail-change-password');
    cy.loginUsing('user-fail-change-password', 'user-fail-change-password').then(() => cy.visit('/account/password'));
    PasswordPage.autoChangePassword('bad-password', 'new_password', 'new_password');

    cy.wait('@changePasswordRequest');

    // Error toast should appear
    getDangerToast().should('exist');
  });

  it('should be able to update password', () => {
    cy.server();
    cy.route('POST', '/api/account/change-password').as('changePasswordRequest');

    cy.createAndActivateUserUsing('user-change-password', 'user-change-password@localhost.jh', 'user-change-password');
    cy.loginUsing('user-change-password', 'user-change-password').then(() => cy.visit('/account/password'));
    PasswordPage.autoChangePassword('user-change-password', 'new_password', 'new_password');

    cy.wait('@changePasswordRequest');

    // Error toast should appear
    getSuccessToast().should('exist');
    cy.logout();

    // Should be able to login with updated password
    cy.loginUsing('user-change-password', 'new_password');
  });

  it('should be able to change user_test settings', () => {
    cy.server();
    cy.route('POST', '/api/account').as('settingsModificationRequest');

    cy.createAndActivateUserUsing(
      'user-change-settings',
      'user-change-settings@localhost.jh',
      'user-change-settings',
      'User',
      'Change-Settings'
    );
    cy.loginUsing('user-change-settings', 'user-change-settings');
    cy.visit('/account/settings');

    cy.get('#firstName')
      .clear()
      .type('jhipster');
    cy.get('#lastName')
      .clear()
      .type('retspihj');
    cy.get('button[type=submit]').click();

    cy.wait('@settingsModificationRequest');

    // Error toast should appear
    getSuccessToast().should('exist');
  });

  it('should not be able to change user settings if email already exists', () => {
    cy.server();
    cy.route('POST', '/api/account').as('settingsModificationRequest');

    cy.createAndActivateUserUsing(
      'user-fail-change-settings1',
      'user-fail-change-settings1@localhost.jh',
      'user-fail-change-settings1',
      'User',
      'Change-Settings'
    );
    cy.registerUserUsing('user-fail-change-settings2', 'user-fail-change-settings2@localhost.jh', 'user-fail-change-settings2');
    cy.loginUsing('user-fail-change-settings1', 'user-fail-change-settings1');
    cy.visit('/account/settings');

    cy.get('#email')
      .clear()
      .type('user-fail-change-settings2@localhost.jh');
    cy.get('button[type=submit]').click();

    cy.wait('@settingsModificationRequest');

    // Error toast should appear
    getDangerToast().should('exist');
  });

  it('should preview details from previously created fake user', () => {
    cy.registerUserUsing('user-details', 'user-details@localhost.jh', 'user-details');

    cy.loginWithAdmin();
    cy.visit('/admin/user-management');
    getUserDetailsButtonByLogin('user-details').click();

    // TODO: remove
    cy.get('h2.jh-entity-heading');
    cy.get('.jh-entity-details > dd > span')
      .first()
      .invoke('text')
      .should('equal', 'user-details');
  });

  it('should edit details from fake user', () => {
    cy.server();
    cy.route('GET', '/api/users/user-edit-details').as('userDetailRequest');
    cy.route('PUT', '/api/users').as('userDetailModificationRequest');

    cy.registerUserUsing('user-edit-details', 'user-edit-details@localhost.jh', 'user-edit-details');

    cy.loginWithAdmin();
    cy.visit('/admin/user-management');
    getUserEditButtonByLogin('user-edit-details').click();

    cy.wait('@userDetailRequest');

    cy.get('input#email').type('ipster');
    cy.get('.btn-primary').click();

    cy.wait('@userDetailModificationRequest');

    // Info toast should appear
    getInfoToast().should('exist');

    getUserEmailByLogin('user-edit-details')
      .invoke('text')
      .should('equal', 'user-edit-details@localhost.jhipster');
  });

  it('should be able to delete existing user', () => {
    cy.server();
    cy.route('DELETE', '/api/users/user-to-delete').as('userDeleteRequest');

    cy.registerUserUsing('user-to-delete', 'user-to-delete@localhost.jh', 'user-to-delete');

    cy.loginWithAdmin();
    cy.visit('/admin/user-management');

    getUserDeleteButtonByLogin('user-to-delete').click();
    cy.get('.modal').should('exist');
    cy.get('button')
      .contains('OK')
      .click();
    cy.wait('@userDeleteRequest');

    // Delete modal should disappear
    cy.get('.modal').should('not.be.visible');

    // Danger toast should appear
    getDangerToast().should('exist');
  });
});

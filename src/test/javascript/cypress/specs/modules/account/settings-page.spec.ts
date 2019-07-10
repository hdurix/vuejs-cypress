import {
  settingsEmailSelector,
  settingsFirstNameSelector,
  settingsLastNameSelector,
  settingsPageSelector,
  settingsSubmitSelector
} from '../../page-objects/settings-page';

import { getSuccessToast, getDangerToast } from '../../util/utils';

describe('Account Management', () => {
  beforeEach(() => {
    cy.cleanUsers();
    // TODO: Move logout to support ? It would run before each test
    cy.logout();
    cy.visit('/');
  });

  it('should be able to change user_test settings', () => {
    // GIVEN
    cy.createAndActivateUserUsing(
      'user-change-settings',
      'user-change-settings@localhost.jh',
      'user-change-settings',
      'User',
      'Change-Settings'
    );
    cy.loginUsing('user-change-settings', 'user-change-settings');
    cy.visit('/account/settings');

    // WHEN
    cy.get(settingsPageSelector)
      .find(settingsFirstNameSelector)
      .clear()
      .type('jhipster');
    cy.get(settingsPageSelector)
      .find(settingsLastNameSelector)
      .clear()
      .type('retspihj');
    cy.get(settingsPageSelector)
      .find(settingsSubmitSelector)
      .click();

    // THEN
    getSuccessToast().should('exist');
  });

  it('should not be able to change user settings if email already exists', () => {
    // GIVEN
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

    // WHEN
    cy.get(settingsPageSelector)
      .find(settingsEmailSelector)
      .clear()
      .type('user-fail-change-settings2@localhost.jh');
    cy.get(settingsPageSelector)
      .find(settingsSubmitSelector)
      .click();

    // THEN
    getDangerToast().should('exist');
  });
});

// Main page
export const usersTableBody = '[data-e2e-container=users-table-body]';
export const userDeleteModalPageSelector = '[data-e2e-container=user-delete-modal]';

export const getUserDeactivatedButtonByLogin = (login: string) =>
  cy
    .get(usersTableBody)
    .find('#' + login)
    .find('.btn-danger.deactivated');

export const getUserDeleteButtonByLogin = (login: string) =>
  cy
    .get(usersTableBody)
    .find('#' + login)
    .find('.btn-danger.delete');

export const getUserDetailsButtonByLogin = (login: string) =>
  cy
    .get(usersTableBody)
    .find('#' + login)
    .find('.btn-info.details');

export const getUserEditButtonByLogin = (login: string) =>
  cy
    .get(usersTableBody)
    .find('#' + login)
    .find('.btn-primary.edit');

export const getUserEmailByLogin = (login: string) =>
  cy
    .get(usersTableBody)
    .find('#' + login)
    .find('.jhi-user-email');

// User edit page
export const userEditPageSelector = '[data-e2e-container=user-edit-page]';
export const userEditEmailSelector = '[data-e2e-element=email]';
export const userEditSaveSelector = '[data-e2e-element=save]';

// User details page
export const userDetailsPageSelector = '[data-e2e-container=user-details-page]';
export const userDetailsLoginSelector = '[data-e2e-element=user-login]';

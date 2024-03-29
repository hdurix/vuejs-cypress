export const getModifiedDateSortButton = () => cy.get('#modified-date-sort');

export const getIdSortButton = () => cy.get('th').contains('ID');

export const getUserDeactivatedButtonByLogin = (login: string) =>
  cy
    .get('table > tbody')
    .find('#' + login)
    .find('.btn-danger.deactivated');

export const getUserDeleteButtonByLogin = (login: string) =>
  cy
    .get('table > tbody')
    .find('#' + login)
    .find('.btn-danger.delete');

export const getUserDetailsButtonByLogin = (login: string) =>
  cy
    .get('table > tbody')
    .find('#' + login)
    .find('.btn-info.details');

export const getUserEditButtonByLogin = (login: string) =>
  cy
    .get('table > tbody')
    .find('#' + login)
    .find('.btn-primary.edit');

export const getUserEmailByLogin = (login: string) =>
  cy
    .get('table > tbody')
    .find('#' + login)
    .find('.jhi-user-email');

export const getSuccessToast = () => cy.get('div[role=alert].alert.alert-success');

export const getInfoToast = () => cy.get('div[role=alert].alert.alert-info');

export const getDangerToast = () => cy.get('div[role=alert].alert.alert-danger');

// Fix this
export const datetimeToMinutes = (datetime: string) => new Date(datetime).valueOf() / 60000;

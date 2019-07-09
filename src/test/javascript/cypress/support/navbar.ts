const navbarSelector = '[data-e2e-container=navbar]';
const adminMenuSelector = '[data-e2e-element=admin-menu]';
const accountMenuSelector = '[data-e2e-element=account-menu]';
const loginSelector = '[data-e2e-element=login]';

Cypress.Commands.add('clickOnAdminMenuItem', (item: string) => {
  return cy
    .get(navbarSelector)
    .find(adminMenuSelector)
    .click()
    .find(`.dropdown-item[href="/admin/${item}"]`)
    .click();
});

Cypress.Commands.add('clickOnLoginItem', () => {
  return cy
    .get(navbarSelector)
    .find(accountMenuSelector)
    .click()
    .find(loginSelector)
    .click();
});

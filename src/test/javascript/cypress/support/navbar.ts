Cypress.Commands.add('getAdminMenuElement', () => cy.get('#admin-menu'));

Cypress.Commands.add('clickOnAdminMenuItem', (item: string) => {
  return cy
    .getAdminMenuElement()
    .click()
    .get(`.dropdown-item[href="/admin/${item}"]`)
    .click();
});

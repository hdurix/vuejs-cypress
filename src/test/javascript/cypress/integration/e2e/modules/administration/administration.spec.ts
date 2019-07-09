describe('Administration', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.loginWithAdmin();
  });

  it('should load user management', () => {
    cy.clickOnAdminMenuItem('user-management');

    // Title should be equal to 'Users'
    cy.get('#user-management-page-heading')
      .invoke('text')
      .should('equal', 'Users');
  });

  it('should load metrics', () => {
    cy.clickOnAdminMenuItem('jhi-metrics');
    cy.get('#metrics-page-heading')
      .invoke('text')
      .should('to.not.have.lengthOf', 0);
  });

  it('should load health', () => {
    cy.clickOnAdminMenuItem('jhi-health');
    cy.get('#health-page-heading')
      .invoke('text')
      .should('to.not.have.lengthOf', 0);
  });

  it('should load configuration', () => {
    cy.clickOnAdminMenuItem('jhi-configuration');
    cy.get('#configuration-page-heading')
      .invoke('text')
      .should('to.not.have.lengthOf', 0);
  });

  it('should load audits', () => {
    cy.clickOnAdminMenuItem('audits');
    cy.get('#audits-page-heading')
      .invoke('text')
      .should('to.not.have.lengthOf', 0);
  });

  it('should load logs', () => {
    cy.clickOnAdminMenuItem('logs');
    cy.get('#logs-page-heading')
      .invoke('text')
      .should('to.not.have.lengthOf', 0);
  });
});

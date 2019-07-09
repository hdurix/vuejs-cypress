describe('Administration', () => {
  const navbarSelector = '[data-e2e-container=navbar]';
  const userManagementPageHeadingSelector = '[data-jhi-e2e-page-heading-value=user-management]';
  const metricsPageHeadingSelector = '[data-jhi-e2e-page-heading-value=metrics]';
  const healthPageHeadingSelector = '[data-jhi-e2e-page-heading-value=health]';
  const configurationPageHeadingSelector = '[data-jhi-e2e-page-heading-value=configuration]';
  const auditsPageHeadingSelector = '[data-jhi-e2e-page-heading-value=audits]';
  const logsPageHeadingSelector = '[data-jhi-e2e-page-heading-value=logs]';
  const apiPageHeadingSelector = '[data-jhi-e2e-page-heading-value=api]';

  beforeEach(() => {
    cy.logout();
    cy.loginWithAdmin();
    cy.visit('/');
  });

  it('should list administration items', () => {
    cy.get(navbarSelector).find('.dropdown-item');
  });

  it('should load user management', () => {
    cy.clickOnAdminMenuItem('user-management');
    cy.get(userManagementPageHeadingSelector).shouldTextBe('Users');
  });

  it('should load metrics', () => {
    cy.clickOnAdminMenuItem('jhi-metrics');
    cy.get(metricsPageHeadingSelector).shouldTextBe('Application Metrics');
  });

  it('should load health', () => {
    cy.clickOnAdminMenuItem('jhi-health');
    cy.get(healthPageHeadingSelector).shouldTextBe('Health Checks');
  });

  it('should load configuration', () => {
    cy.clickOnAdminMenuItem('jhi-configuration');
    cy.get(configurationPageHeadingSelector).shouldTextBe('Configuration');
  });

  it('should load audits', () => {
    cy.clickOnAdminMenuItem('audits');
    cy.get(auditsPageHeadingSelector).shouldTextBe('Audits');
  });

  it('should load logs', () => {
    cy.clickOnAdminMenuItem('logs');
    cy.get(logsPageHeadingSelector).shouldTextBe('Logs');
  });

  it('should load Swagger API (Docs)', () => {
    cy.clickOnAdminMenuItem('docs');
    cy.get(apiPageHeadingSelector);
  });
});

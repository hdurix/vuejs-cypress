import SignInPage from '../../page-objects/signin-page';
import NavBarPage from '../../page-objects/navbar-page';

describe('Log In', () => {
  const loginPageTitle = 'login-title';

  beforeEach(() => {
    cy.logout();
    cy.visit('/');
    NavBarPage.getSignInPage();
  });

  it('should fail to login with bad password', () => {
    SignInPage.getTitle().should('equal', loginPageTitle);
    SignInPage.getUsernameElement().type('admin');
    SignInPage.getPasswordElement().type('foo');

    SignInPage.getLoginButton().click();
    SignInPage.getTitle().should('equal', loginPageTitle);
  });

  it('should login with admin account', () => {
    cy.server();
    cy.route('GET', '/api/account').as('authenticationRequest');

    SignInPage.clearUserName();
    SignInPage.setUserName('admin');
    SignInPage.clearPassword();
    SignInPage.setPassword('admin');
    SignInPage.getLoginButton().click();

    cy.wait('@authenticationRequest');

    SignInPage.getTitleElement().should('not.exist');
    NavBarPage.autoSignOut();
  });
});

Cypress.Commands.add('loginUsing', (username: string, password: string) => {
  return cy
    .request({
      method: 'POST',
      url: '/api/authenticate',
      body: {
        username,
        password,
        rememberMe: null
      }
    })
    .then((result: any) => {
      const bearerToken = result.headers.authorization;
      if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
        window.sessionStorage.setItem('jhi-authenticationToken', bearerToken.slice(7, bearerToken.length));
      }
    });
});

Cypress.Commands.add('loginWithAdmin', () => {
  return cy.loginUsing('admin', 'admin');
});

Cypress.Commands.add('logout', () => {
  window.sessionStorage.removeItem('jhi-authenticationToken');
  window.localStorage.removeItem('jhi-authenticationToken');
});

Cypress.Commands.add('registerUserUsing', (login: string, email: string, password: string) => {
  return cy.request({
    method: 'POST',
    url: '/api/register',
    body: {
      login,
      email,
      password
    }
  });
});

Cypress.Commands.add(
  'createAndActivateUserUsing',
  (login: string, email: string, password: string, firstName?: string, lastName?: string) => {
    cy.registerUserUsing(login, email, password).then(() => {
      cy.loginWithAdmin().then(result => {
        const auth = window.sessionStorage.getItem('jhi-authenticationToken');
        cy.request({
          method: 'GET',
          url: '/api/users',
          auth: {
            bearer: auth
          }
        }).then(response => {
          // TODO: replace any by correct type
          response.body.forEach((user: any) => {
            if (user.login === login) {
              cy.request({
                method: 'PUT',
                url: '/api/users',
                body: {
                  ...user,
                  firstName,
                  lastName,
                  activated: true
                },
                auth: {
                  bearer: auth
                }
              });
            }
          });
        });
      });
      cy.logout();
    });
  }
);

Cypress.Commands.add('cleanUsers', () => {
  cy.loginWithAdmin().then(() => {
    const auth = window.sessionStorage.getItem('jhi-authenticationToken');
    cy.request({
      method: 'GET',
      url: `/api/users`,
      auth: {
        bearer: auth
      }
    }).then(response => {
      // TODO: replace any by correct type
      response.body.forEach((user: any) => {
        if (!['user', 'admin', 'system'].includes(user.login)) {
          cy.request({
            method: 'DELETE',
            url: `/api/users/${user.login}`,
            auth: {
              bearer: auth
            }
          });
        }
      });
    });
  });
  cy.logout();
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      logout(): void;
      loginUsing(username: string, password: string): Cypress.Chainable;
      loginWithAdmin(): Cypress.Chainable;
      registerUserUsing(login: string, email: string, password: string): Cypress.Chainable;
      createAndActivateUserUsing(login: string, email: string, password: string, firstName?: string, lastName?: string): Cypress.Chainable;
      cleanUsers(): void;
    }
  }
}

// Convert this to a module instead of script (allows import/export)
export {};

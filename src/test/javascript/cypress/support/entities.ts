Cypress.Commands.add('createEntity', (entityName: string, body: any) => {
  return cy.request({
    method: 'POST',
    url: `/api/${entityName}`,
    body,
    auth: {
      bearer: window.sessionStorage.getItem('jhi-authenticationToken')
    }
  });
});

Cypress.Commands.add('cleanEntity', (entityName: string, ids: number[]) => {
  ids.forEach(id => {
    cy.request({
      method: 'DELETE',
      url: `/api/${entityName}/${id}`,
      auth: {
        bearer: window.sessionStorage.getItem('jhi-authenticationToken')
      }
    });
  });
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      createEntity(entityName: string, body: any): Cypress.Chainable;
      cleanEntity(entityName: string, ids: number[]): void;
    }
  }
}

// Convert this to a module instead of script (allows import/export)
export {};

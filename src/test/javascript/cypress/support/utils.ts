Cypress.Commands.add(
  'shouldTextBe',
  {
    prevSubject: true
  },
  (subject: any, text: string) => {
    return cy
      .wrap(subject)
      .invoke('text')
      .should('eq', text);
  }
);

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      shouldTextBe(subject: any, text: string): Cypress.Chainable;
    }
  }
}

// Convert this to a module instead of script (allows import/export)
export {};

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

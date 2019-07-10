export const registerPageSelector = '[data-e2e-container=register-page]';
export const registerTitleSelector = '[data-e2e-element=title]';
export const registerUsernameSelector = '[data-e2e-element=username]';
export const registerEmailSelector = '[data-e2e-element=email]';
export const registerPasswordSelector = '[data-e2e-element=password]';
export const registerConfirmationPasswordSelector = '[data-e2e-element=confirmation-password]';
export const registerSubmitSelector = '[data-e2e-element=submit]';

export function autoSignUpUsing(username: string, email: string, password: string) {
  cy.get(registerPageSelector)
    .find(registerUsernameSelector)
    .type(username);
  cy.get(registerPageSelector)
    .find(registerEmailSelector)
    .type(email);
  cy.get(registerPageSelector)
    .find(registerPasswordSelector)
    .type(password);
  cy.get(registerPageSelector)
    .find(registerConfirmationPasswordSelector)
    .type(password);
  cy.get(registerPageSelector)
    .find(registerSubmitSelector)
    .click();
}

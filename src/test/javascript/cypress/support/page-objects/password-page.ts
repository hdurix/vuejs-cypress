export const passwordPageSelector = '[data-e2e-container=password-page]';
export const passwordCurrentPasswordSelector = '[data-e2e-element=current-password]';
export const passwordNewPasswordSelector = '[data-e2e-element=new-password]';
export const passwordConfirmationPasswordSelector = '[data-e2e-element=confirmation-password]';
export const passwordSubmitSelector = '[data-e2e-element=submit]';

export function autoChangePassword(currentPassword: string, newPassword: string, confirmPassword: string) {
  cy.get(passwordPageSelector)
    .get(passwordCurrentPasswordSelector)
    .type(currentPassword);
  cy.get(passwordPageSelector)
    .get(passwordNewPasswordSelector)
    .type(newPassword);
  cy.get(passwordPageSelector)
    .get(passwordConfirmationPasswordSelector)
    .type(confirmPassword);
  cy.get(passwordPageSelector)
    .get(passwordSubmitSelector)
    .click();
}

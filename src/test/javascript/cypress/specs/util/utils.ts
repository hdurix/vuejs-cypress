export const getSuccessToast = () => cy.get('div[role=alert].alert.alert-success');

export const getInfoToast = () => cy.get('div[role=alert].alert.alert-info');

export const getDangerToast = () => cy.get('div[role=alert].alert.alert-danger');

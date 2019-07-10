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

// /**
//  * Example that shows how to write a custom Chai assertion.
//  *
//  * @see https://www.chaijs.com/guide/helpers/
//  * @example
//  ```
//  expect('foo').to.be.foo()
//  expect('bar').to.not.be.foo()
//  cy.wrap('foo').should('be.foo')
//  cy.wrap('bar').should('not.be.foo')
//  ```
//  * */
// const isTextEqualTo = (_chai: any) => {
//   function assertTextEqual (this: any, text: string) {
//     this.assert(
//         this._obj === text,
//         'expected #{this} to be #{exp} but got #{act}',
//         'expected #{this} to not be #{act}',
//         this._obj
//     )
//   }
//
//   _chai.Assertion.addMethod('isTextEqualTo', assertTextEqual);
// };
// // registers our assertion function "isFoo" with Chai
// chai.use(isTextEqualTo);

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      shouldTextBe(text: string): Cypress.Chainable;
    }

    // interface Chainer<Subject> {
    //   /**
    //    * Custom Chai assertion that checks if given subject is string text
    //    *
    //    * @example
    //    ```
    //    expect('foo').to.be.foo()
    //    cy.wrap('foo').should('be.foo')
    //    ```
    //    * */
    //   (chainer: 'haveText'): Chainable<Subject>
    //
    //   /**
    //    * Custom Chai assertion that checks if given subject is NOT string "foo"
    //    *
    //    * @example
    //    ```
    //    expect('bar').to.not.be.foo()
    //    cy.wrap('bar').should('not.be.foo')
    //    ```
    //    * */
    //   (chainer: 'not.be.foo'): Chainable<Subject>
    // }
  }
}

// Convert this to a module instead of script (allows import/export)
export {};

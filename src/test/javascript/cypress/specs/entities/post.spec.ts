import {
  postCreateSelector,
  postDeleteButtonSelector,
  postDeleteConfirmSelector,
  postDeleteModalSelector,
  postDeleteTitleSelector,
  postDetailsBackSelector,
  postDetailsButtonSelector,
  postDetailsItemSelector,
  postDetailsPageSelector,
  postDetailsTitleSelector,
  postEditAgeSelector,
  postEditButtonSelector,
  postEditNameSelector,
  postEditPageSelector,
  postEditSaveSelector,
  postEditTitleSelector,
  postPageSelector,
  postTitleSelector
} from '../../support/page-objects/entities/post-page';

describe('Post e2e test', () => {
  let startingEntitiesCount = 0;
  let entityToDelete: number[] = [];

  beforeEach(() => {
    cy.logout();
    cy.loginWithAdmin().then(() => {
      // COULD BE IN A NAMED FUNCTION

      // TODO: Check navgation in navbar
      cy.visit('/entity/post');
      cy.request({
        method: 'GET',
        url: '/api/posts',
        auth: {
          bearer: window.sessionStorage.getItem('jhi-authenticationToken')
        }
      })
        .its('body')
        .then(entities => {
          startingEntitiesCount = entities.length;
        });
    });
  });

  it('should load Posts', () => {
    cy.get(postPageSelector).find(postTitleSelector);

    if (startingEntitiesCount === 0) {
      // TODO: test if message? stub response?
      cy.get(postPageSelector)
        .find(postDeleteButtonSelector)
        .should('not.exist');
    } else {
      // TODO: handle pagination?
      cy.get(postPageSelector)
        .find(postDeleteButtonSelector)
        .should('have.lengthOf', startingEntitiesCount);
    }
  });

  it('should load create Post page', () => {
    cy.get(postPageSelector)
      .find(postCreateSelector)
      .click();

    cy.get(postEditPageSelector)
      .find(postEditSaveSelector)
      .should('exist');

    cy.get(postEditPageSelector)
      .find(postEditTitleSelector)
      .invoke('attr', 'id')
      .should('match', /vueApp.post.home.createOrEditLabel/);
  });

  it('should create and save Posts', () => {
    cy.server();
    cy.route('POST', '/api/posts').as('saveEntityRequest');

    cy.get(postPageSelector)
      .find(postCreateSelector)
      .click();

    cy.get(postEditPageSelector)
      .find(postEditNameSelector)
      .type('name')
      .invoke('val')
      .should('match', /name/);

    cy.get(postEditPageSelector)
      .find(postEditAgeSelector)
      .type('5')
      .should('have.value', '5');

    // PostUpdatePage.userSelectLastOption();

    cy.get(postEditPageSelector)
      .find(postEditSaveSelector)
      .click();

    cy.wait('@saveEntityRequest')
      .its('responseBody')
      .then(post => {
        // @ts-ignore
        entityToDelete.push(post.id);
      });

    cy.get(postEditPageSelector).should('not.exist');

    // Success toast should appear
    cy.getSuccessToast().should('exist');

    cy.request({
      method: 'GET',
      url: '/api/posts',
      auth: {
        bearer: window.sessionStorage.getItem('jhi-authenticationToken')
      }
    })
      .its('body')
      .then(entities => {
        expect(entities.length).to.equal(startingEntitiesCount + 1);
      });
  });

  it('should load details Post page and fetch data', () => {
    cy.createEntity('posts', {
      age: 0,
      name: 'test',
      user: {
        id: 3
      }
    }).then(response => {
      entityToDelete.push(response.body.id);
    });
    cy.reload();
    cy.get(postPageSelector)
      .find(postDetailsButtonSelector)
      .last()
      .click();

    cy.get(postDetailsPageSelector)
      .find(postDetailsTitleSelector)
      .invoke('text')
      .should('not.have.lengthOf', 0);
    cy.get(postDetailsPageSelector)
      .find(postDetailsBackSelector)
      .should('exist');

    cy.get(postDetailsPageSelector)
      .find(postDetailsItemSelector)
      .first()
      .invoke('text')
      .should('not.have.lengthOf', 0);

    cy.get(postDetailsPageSelector)
      .find(postDetailsBackSelector)
      .click();

    cy.request({
      method: 'GET',
      url: '/api/posts',
      auth: {
        bearer: window.sessionStorage.getItem('jhi-authenticationToken')
      }
    })
      .its('body')
      .then(entities => {
        expect(entities.length).to.equal(startingEntitiesCount + 1);
      });
  });

  it('should load edit Post page and fetch data', () => {
    cy.createEntity('posts', {
      age: 0,
      name: 'test',
      user: {
        id: 3
      }
    }).then(response => {
      entityToDelete.push(response.body.id);
    });
    cy.reload();

    cy.get(postPageSelector)
      .find(postEditButtonSelector)
      .last()
      .click();

    cy.get(postEditPageSelector)
      .find(postEditSaveSelector)
      .should('exist');
    cy.get(postEditPageSelector)
      .find(postEditTitleSelector)
      .invoke('text')
      .should('not.have.lengthOf', 0);

    cy.get(postEditPageSelector)
      .find(postEditNameSelector)
      .clear()
      .type('modified')
      .invoke('val')
      .should('match', /modified/);

    cy.get(postEditPageSelector)
      .find(postEditAgeSelector)
      .clear()
      .type('6')
      .should('have.value', '6');

    cy.get(postEditPageSelector)
      .find(postEditSaveSelector)
      .click();

    cy.get(postEditPageSelector).should('not.exist');

    // Info toast should appear
    cy.getInfoToast().should('exist');
  });

  it('should delete last Post', () => {
    cy.createEntity('posts', {
      age: 0,
      name: 'test',
      user: {
        id: 3
      }
    }).then(response => {
      entityToDelete.push(response.body.id);
    });
    cy.reload();

    cy.get(postPageSelector)
      .find(postDeleteButtonSelector)
      .last()
      .click();

    cy.get(postDeleteModalSelector)
      .find(postDeleteTitleSelector)
      .should('be.visible');
    // cy.get(".lkahlezj");
    cy.get(postDeleteModalSelector)
      .find(postDeleteTitleSelector)
      .invoke('attr', 'id')
      .should('match', /jhi-delete-post-heading/);

    cy.get(postDeleteModalSelector)
      .find(postDeleteConfirmSelector)
      .click();

    // Delete modal should disappear
    cy.get(postDeleteModalSelector)
      .find(postDeleteTitleSelector)
      .should('not.be.visible');

    cy.request({
      method: 'GET',
      url: '/api/posts',
      auth: {
        bearer: window.sessionStorage.getItem('jhi-authenticationToken')
      }
    })
      .its('body')
      .then(entities => {
        expect(entities.length).to.equal(startingEntitiesCount);
        entityToDelete = [];
      });

    // Danger toast should appear
    cy.getDangerToast().should('exist');
  });

  afterEach(() => {
    cy.cleanEntity('posts', entityToDelete);
    entityToDelete = [];
  });
});

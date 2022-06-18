import { entityItemSelector } from '../../support/commands';
import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('DisposedWaste e2e test', () => {
  const disposedWastePageUrl = '/disposed-waste-my-suffix';
  const disposedWastePageUrlPattern = new RegExp('/disposed-waste-my-suffix(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const disposedWasteSample = {};

  let disposedWaste: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/disposed-wastes+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/disposed-wastes').as('postEntityRequest');
    cy.intercept('DELETE', '/api/disposed-wastes/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (disposedWaste) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/disposed-wastes/${disposedWaste.id}`,
      }).then(() => {
        disposedWaste = undefined;
      });
    }
  });

  it('DisposedWastes menu should load DisposedWastes page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('disposed-waste-my-suffix');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('DisposedWaste').should('exist');
    cy.url().should('match', disposedWastePageUrlPattern);
  });

  describe('DisposedWaste page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(disposedWastePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create DisposedWaste page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/disposed-waste-my-suffix/new$'));
        cy.getEntityCreateUpdateHeading('DisposedWaste');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', disposedWastePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/disposed-wastes',
          body: disposedWasteSample,
        }).then(({ body }) => {
          disposedWaste = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/disposed-wastes+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [disposedWaste],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(disposedWastePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details DisposedWaste page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('disposedWaste');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', disposedWastePageUrlPattern);
      });

      it('edit button click should load edit DisposedWaste page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('DisposedWaste');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', disposedWastePageUrlPattern);
      });

      it('last delete button click should delete instance of DisposedWaste', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('disposedWaste').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', disposedWastePageUrlPattern);

        disposedWaste = undefined;
      });
    });
  });

  describe('new DisposedWaste page', () => {
    beforeEach(() => {
      cy.visit(`${disposedWastePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('DisposedWaste');
    });

    it('should create an instance of DisposedWaste', () => {
      cy.get(`[data-cy="subTotal"]`).type('84986').should('have.value', '84986');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        disposedWaste = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', disposedWastePageUrlPattern);
    });
  });
});

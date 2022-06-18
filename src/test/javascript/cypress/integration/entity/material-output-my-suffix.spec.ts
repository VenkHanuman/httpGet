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

describe('MaterialOutput e2e test', () => {
  const materialOutputPageUrl = '/material-output-my-suffix';
  const materialOutputPageUrlPattern = new RegExp('/material-output-my-suffix(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const materialOutputSample = {};

  let materialOutput: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/material-outputs+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/material-outputs').as('postEntityRequest');
    cy.intercept('DELETE', '/api/material-outputs/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (materialOutput) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/material-outputs/${materialOutput.id}`,
      }).then(() => {
        materialOutput = undefined;
      });
    }
  });

  it('MaterialOutputs menu should load MaterialOutputs page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('material-output-my-suffix');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('MaterialOutput').should('exist');
    cy.url().should('match', materialOutputPageUrlPattern);
  });

  describe('MaterialOutput page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(materialOutputPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create MaterialOutput page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/material-output-my-suffix/new$'));
        cy.getEntityCreateUpdateHeading('MaterialOutput');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', materialOutputPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/material-outputs',
          body: materialOutputSample,
        }).then(({ body }) => {
          materialOutput = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/material-outputs+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [materialOutput],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(materialOutputPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details MaterialOutput page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('materialOutput');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', materialOutputPageUrlPattern);
      });

      it('edit button click should load edit MaterialOutput page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('MaterialOutput');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', materialOutputPageUrlPattern);
      });

      it('last delete button click should delete instance of MaterialOutput', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('materialOutput').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', materialOutputPageUrlPattern);

        materialOutput = undefined;
      });
    });
  });

  describe('new MaterialOutput page', () => {
    beforeEach(() => {
      cy.visit(`${materialOutputPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('MaterialOutput');
    });

    it('should create an instance of MaterialOutput', () => {
      cy.get(`[data-cy="typeOfMatrial"]`).select('ABS');

      cy.get(`[data-cy="subTotal"]`).type('31159').should('have.value', '31159');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        materialOutput = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', materialOutputPageUrlPattern);
    });
  });
});

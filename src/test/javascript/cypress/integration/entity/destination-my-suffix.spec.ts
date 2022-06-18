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

describe('Destination e2e test', () => {
  const destinationPageUrl = '/destination-my-suffix';
  const destinationPageUrlPattern = new RegExp('/destination-my-suffix(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const destinationSample = {};

  let destination: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/destinations+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/destinations').as('postEntityRequest');
    cy.intercept('DELETE', '/api/destinations/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (destination) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/destinations/${destination.id}`,
      }).then(() => {
        destination = undefined;
      });
    }
  });

  it('Destinations menu should load Destinations page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('destination-my-suffix');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Destination').should('exist');
    cy.url().should('match', destinationPageUrlPattern);
  });

  describe('Destination page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(destinationPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Destination page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/destination-my-suffix/new$'));
        cy.getEntityCreateUpdateHeading('Destination');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', destinationPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/destinations',
          body: destinationSample,
        }).then(({ body }) => {
          destination = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/destinations+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [destination],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(destinationPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Destination page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('destination');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', destinationPageUrlPattern);
      });

      it('edit button click should load edit Destination page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Destination');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', destinationPageUrlPattern);
      });

      it('last delete button click should delete instance of Destination', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('destination').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', destinationPageUrlPattern);

        destination = undefined;
      });
    });
  });

  describe('new Destination page', () => {
    beforeEach(() => {
      cy.visit(`${destinationPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Destination');
    });

    it('should create an instance of Destination', () => {
      cy.get(`[data-cy="name"]`).type('payment deposit Timor-Leste').should('have.value', 'payment deposit Timor-Leste');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        destination = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', destinationPageUrlPattern);
    });
  });
});

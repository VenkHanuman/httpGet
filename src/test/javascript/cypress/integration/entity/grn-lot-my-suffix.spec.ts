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

describe('GRNLot e2e test', () => {
  const gRNLotPageUrl = '/grn-lot-my-suffix';
  const gRNLotPageUrlPattern = new RegExp('/grn-lot-my-suffix(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const gRNLotSample = {};

  let gRNLot: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/grn-lots+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/grn-lots').as('postEntityRequest');
    cy.intercept('DELETE', '/api/grn-lots/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (gRNLot) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/grn-lots/${gRNLot.id}`,
      }).then(() => {
        gRNLot = undefined;
      });
    }
  });

  it('GRNLots menu should load GRNLots page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('grn-lot-my-suffix');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('GRNLot').should('exist');
    cy.url().should('match', gRNLotPageUrlPattern);
  });

  describe('GRNLot page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(gRNLotPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create GRNLot page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/grn-lot-my-suffix/new$'));
        cy.getEntityCreateUpdateHeading('GRNLot');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', gRNLotPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/grn-lots',
          body: gRNLotSample,
        }).then(({ body }) => {
          gRNLot = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/grn-lots+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/grn-lots?page=0&size=20>; rel="last",<http://localhost/api/grn-lots?page=0&size=20>; rel="first"',
              },
              body: [gRNLot],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(gRNLotPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details GRNLot page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('gRNLot');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', gRNLotPageUrlPattern);
      });

      it('edit button click should load edit GRNLot page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('GRNLot');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', gRNLotPageUrlPattern);
      });

      it('last delete button click should delete instance of GRNLot', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('gRNLot').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', gRNLotPageUrlPattern);

        gRNLot = undefined;
      });
    });
  });

  describe('new GRNLot page', () => {
    beforeEach(() => {
      cy.visit(`${gRNLotPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('GRNLot');
    });

    it('should create an instance of GRNLot', () => {
      cy.get(`[data-cy="grnCode"]`).type('Practical Automated Concrete').should('have.value', 'Practical Automated Concrete');

      cy.get(`[data-cy="collectionDate"]`).type('2022-06-16T02:09').should('have.value', '2022-06-16T02:09');

      cy.get(`[data-cy="vehicleNumber"]`).type('Chicken mobile').should('have.value', 'Chicken mobile');

      cy.get(`[data-cy="srcOfMaterials"]`).type('lavender Home').should('have.value', 'lavender Home');

      cy.get(`[data-cy="totalWeight"]`).type('43104').should('have.value', '43104');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        gRNLot = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', gRNLotPageUrlPattern);
    });
  });
});

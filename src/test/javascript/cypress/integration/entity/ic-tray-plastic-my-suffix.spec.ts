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

describe('ICTrayPlastic e2e test', () => {
  const iCTrayPlasticPageUrl = '/ic-tray-plastic-my-suffix';
  const iCTrayPlasticPageUrlPattern = new RegExp('/ic-tray-plastic-my-suffix(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const iCTrayPlasticSample = {};

  let iCTrayPlastic: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/ic-tray-plastics+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/ic-tray-plastics').as('postEntityRequest');
    cy.intercept('DELETE', '/api/ic-tray-plastics/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (iCTrayPlastic) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/ic-tray-plastics/${iCTrayPlastic.id}`,
      }).then(() => {
        iCTrayPlastic = undefined;
      });
    }
  });

  it('ICTrayPlastics menu should load ICTrayPlastics page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('ic-tray-plastic-my-suffix');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('ICTrayPlastic').should('exist');
    cy.url().should('match', iCTrayPlasticPageUrlPattern);
  });

  describe('ICTrayPlastic page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(iCTrayPlasticPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create ICTrayPlastic page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/ic-tray-plastic-my-suffix/new$'));
        cy.getEntityCreateUpdateHeading('ICTrayPlastic');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', iCTrayPlasticPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/ic-tray-plastics',
          body: iCTrayPlasticSample,
        }).then(({ body }) => {
          iCTrayPlastic = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/ic-tray-plastics+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [iCTrayPlastic],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(iCTrayPlasticPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details ICTrayPlastic page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('iCTrayPlastic');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', iCTrayPlasticPageUrlPattern);
      });

      it('edit button click should load edit ICTrayPlastic page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ICTrayPlastic');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', iCTrayPlasticPageUrlPattern);
      });

      it('last delete button click should delete instance of ICTrayPlastic', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('iCTrayPlastic').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', iCTrayPlasticPageUrlPattern);

        iCTrayPlastic = undefined;
      });
    });
  });

  describe('new ICTrayPlastic page', () => {
    beforeEach(() => {
      cy.visit(`${iCTrayPlasticPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('ICTrayPlastic');
    });

    it('should create an instance of ICTrayPlastic', () => {
      cy.get(`[data-cy="brandName"]`).type('International Cambridgeshire').should('have.value', 'International Cambridgeshire');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        iCTrayPlastic = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', iCTrayPlasticPageUrlPattern);
    });
  });
});

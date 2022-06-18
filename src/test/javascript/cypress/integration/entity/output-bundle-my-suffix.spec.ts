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

describe('OutputBundle e2e test', () => {
  const outputBundlePageUrl = '/output-bundle-my-suffix';
  const outputBundlePageUrlPattern = new RegExp('/output-bundle-my-suffix(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const outputBundleSample = {};

  let outputBundle: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/output-bundles+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/output-bundles').as('postEntityRequest');
    cy.intercept('DELETE', '/api/output-bundles/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (outputBundle) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/output-bundles/${outputBundle.id}`,
      }).then(() => {
        outputBundle = undefined;
      });
    }
  });

  it('OutputBundles menu should load OutputBundles page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('output-bundle-my-suffix');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('OutputBundle').should('exist');
    cy.url().should('match', outputBundlePageUrlPattern);
  });

  describe('OutputBundle page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(outputBundlePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create OutputBundle page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/output-bundle-my-suffix/new$'));
        cy.getEntityCreateUpdateHeading('OutputBundle');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', outputBundlePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/output-bundles',
          body: outputBundleSample,
        }).then(({ body }) => {
          outputBundle = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/output-bundles+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/output-bundles?page=0&size=20>; rel="last",<http://localhost/api/output-bundles?page=0&size=20>; rel="first"',
              },
              body: [outputBundle],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(outputBundlePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details OutputBundle page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('outputBundle');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', outputBundlePageUrlPattern);
      });

      it('edit button click should load edit OutputBundle page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('OutputBundle');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', outputBundlePageUrlPattern);
      });

      it('last delete button click should delete instance of OutputBundle', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('outputBundle').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', outputBundlePageUrlPattern);

        outputBundle = undefined;
      });
    });
  });

  describe('new OutputBundle page', () => {
    beforeEach(() => {
      cy.visit(`${outputBundlePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('OutputBundle');
    });

    it('should create an instance of OutputBundle', () => {
      cy.get(`[data-cy="total"]`).type('49485').should('have.value', '49485');

      cy.get(`[data-cy="totalOfDisposableWaste"]`).type('68662').should('have.value', '68662');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        outputBundle = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', outputBundlePageUrlPattern);
    });
  });
});

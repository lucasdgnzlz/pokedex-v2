/// <reference types="Cypress"/>

const URL = "192.168.1.41:8080";

describe('Pokedex V2', () => {
  beforeEach(() => {
		cy.visit(URL);
	});

  context("Comprueba correcto inicio de la página", () => {
    it("Comprueba visibilidad general de la página", () => {
      cy.get("#logo-cabecera").should("be.visible");
      cy.get(".buscador-pokemon").should("be.visible");
      cy.get(".boton-buscar-pokemon").should("be.visible");

      cy.get(".error-validacion").should("not.be.visible");
    });
  });
});

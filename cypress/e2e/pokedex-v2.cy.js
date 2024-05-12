/// <reference types="Cypress"/>

const URL = "192.168.1.41:8080";

describe('Pokedex V2', () => {
  beforeEach(() => {
    cy.visit(URL);
    localStorage.clear();
  });

  context("Comprueba correcto inicio de la página", () => {
    it("Prueba correcta carga del listado inicial de pokemones", () => {
      cy.intercept("GET", "https://pokeapi.co/api/v2/pokemon?offset=0&limit=9", {
        fixture: "listado-pagina-1",
      }).as("listadoApiRequest");

      cy.fixture("listado-pagina-1").then((pokemonData) => {
        cy.get(".nombre-pokemon-listado").each(($nombrePokemon, index) => {
          console.log(pokemonData);
          cy.wrap($nombrePokemon).should("have.text", pokemonData.results[index]["name"]);
        });
      });
    });

    it("Prueba visibilidad general de la página", () => {
      cy.get("#logo-cabecera").should("be.visible");
      cy.get(".buscador-pokemon").should("be.visible");
      cy.get(".boton-buscar-pokemon").should("be.visible");
      cy.get(".error-validacion").should("not.be.visible");

      cy.get(".contenedor-listado-pokemones").should("be.visible");
      cy.get(".contenedor-informacion-pokemon").should("not.be.visible");

      cy.get(".contenedor-cambio-pagina").should("be.visible");
    });
  });
});

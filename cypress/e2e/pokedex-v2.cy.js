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

  context("Comprueba correcto funcionamiento del buscador pokémon", () => {
    it("Muestra error al no ingresar un valor en el input", () => {
      cy.get(".error-validacion")
        .should("not.be.visible")
        .and("have.text", "");
      cy.get(".buscador-pokemon")
        .should("be.visible")
        .should("have.value", "");

      cy.get(".boton-buscar-pokemon").should("be.visible").click();

      cy.get(".error-validacion")
        .should("be.visible")
        .and("have.text", "Error: El campo está vacío");
    });

    it("Muestra error al ingresar un nombre que no corresponda a un pokémon", () => {
      cy.get(".error-validacion")
        .should("not.be.visible")
        .and("have.text", "");
      cy.get(".buscador-pokemon")
        .should("be.visible")
        .type("Marcelo Tinelli");

      cy.get(".boton-buscar-pokemon").should("be.visible").click();

      cy.get(".error-validacion")
        .should("be.visible")
        .and("have.text", "Error: Nombre no válido");
    });

    it("Carga el pokemon correctamente con el nombre del mismo", () => {
      cy.get(".contenedor-informacion-pokemon").should("not.be.visible");
      cy.get(".nombre-pokemon")
        .should("not.be.visible")
        .and("have.text", "");

      cy.get(".buscador-pokemon")
        .should("be.visible")
        .type("charmander");

      cy.intercept("GET", "https://pokeapi.co/api/v2/pokemon/charmander", {
        fixture: "charmander",
      }).as("charmanderRequest");

      cy.get(".boton-buscar-pokemon").should("be.visible").click();

      cy.get(".error-validacion")
        .should("not.be.visible")
        .and("have.text", "");

      cy.get(".contenedor-informacion-pokemon").should("be.visible");
      cy.get(".nombre-pokemon")
        .should("be.visible")
        .and("have.text", "charmander");
    });

    it("Carga el pokémon correctamente con el id del mismo", () => {
      cy.get(".contenedor-informacion-pokemon").should("not.be.visible");
      cy.get(".nombre-pokemon")
        .should("not.be.visible")
        .and("have.text", "");

      cy.get(".buscador-pokemon")
        .should("be.visible")
        .type("4");

      cy.intercept("GET", "https://pokeapi.co/api/v2/pokemon/4", {
        fixture: "charmander",
      }).as("charmanderRequest");

      cy.get(".boton-buscar-pokemon").should("be.visible").click();

      cy.get(".error-validacion")
        .should("not.be.visible")
        .and("have.text", "");

      cy.get(".contenedor-informacion-pokemon").should("be.visible");
      cy.get(".nombre-pokemon")
        .should("be.visible")
        .and("have.text", "charmander");
      cy.get(".id-pokemon")
        .should("be.visible")
        .and("have.text", "#4");
      cy.get("#imagen-pokemon")
        .should("be.visible")
        .and("have.attr", "src", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png");
      cy.get(".contenedor-listas-stats").should("be.visible");
      cy.get(".lista-habilidades").should("be.visible");
    });
  });

  context("Prueba el correcto funcionamiento del listado de pokemones", () => {
    it("Carga el pokémon elegido correctamente", () => {
      cy.intercept("GET", "https://pokeapi.co/api/v2/pokemon/4", {
        fixture: "charmander",
      }).as("charmanderRequest");

      cy.get(".nombre-pokemon-listado").should("be.visible");
      cy.get(".nombre-pokemon-listado").each(($pokemon) => {
        const nombrePokemon = $pokemon.text();

        if (nombrePokemon === "charmander") {
          cy.wrap($pokemon).should("be.visible").click();
        }
      });

      cy.get(".contenedor-informacion-pokemon").should("be.visible");
      cy.get(".nombre-pokemon")
        .should("be.visible")
        .and("have.text", "charmander");
      cy.get(".id-pokemon")
        .should("be.visible")
        .and("have.text", "#4");
      cy.get("#imagen-pokemon")
        .should("be.visible")
        .and("have.attr", "src", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png");
      cy.get(".contenedor-listas-stats").should("be.visible");
      cy.get(".lista-habilidades").should("be.visible");
    });
  });
});

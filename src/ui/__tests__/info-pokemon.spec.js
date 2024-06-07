/// <reference types="Jest" />

import { imprimirNombresPokemon, imprimirInformacionPokemonEspecifico } from "../info-pokemon.js";
import fixturePrimeraListaPokemones from "../../../cypress/fixtures/listado-pagina-1.json";
import fixtureCharmander from "../../../cypress/fixtures/charmander.json";

describe("imprimirNombresPokemon", () => {
  it("Imprime los nombres del listado de pokemones", () => {
    document.body.innerHTML = `
    <p class="nombre-pokemon-listado"></p>
    <p class="nombre-pokemon-listado"></p>
    <p class="nombre-pokemon-listado"></p>
    <p class="nombre-pokemon-listado"></p>
    <p class="nombre-pokemon-listado"></p>
    <p class="nombre-pokemon-listado"></p>
    <p class="nombre-pokemon-listado"></p>
    <p class="nombre-pokemon-listado"></p>
    <p class="nombre-pokemon-listado"></p>`;

    const nombresPokemonesFixture = fixturePrimeraListaPokemones["results"];
    let listadoNombresPokemonesAImprimir = [];
    nombresPokemonesFixture.forEach((nombrePokemon) => {
      listadoNombresPokemonesAImprimir.push(nombrePokemon["name"]);
    });

    const $nombresPokemones = document.querySelectorAll(".nombre-pokemon-listado");
    $nombresPokemones.forEach((nombreListado) => {
      expect(nombreListado.textContent).toEqual("");
    });

    imprimirNombresPokemon(listadoNombresPokemonesAImprimir);
    const $nombresPokemonesActualizados = document.querySelectorAll(".nombre-pokemon-listado");
    $nombresPokemonesActualizados.forEach((nombrePokemonListado, i) => {
      expect(nombrePokemonListado.textContent).toEqual(listadoNombresPokemonesAImprimir[i]);
    });
  });
});

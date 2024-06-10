/// <reference types="Jest" />

import { imprimirNombresPokemon, imprimirInformacionPokemonEspecifico } from "../info-pokemon.js";
import { dividirInformacionPokemon } from "../../utilidades/utilidades.js";
import fixturePrimeraListaPokemones from "../../../cypress/fixtures/listado-pagina-1.json";
import fixtureCharmander from "../../../cypress/fixtures/charmander.json";
import infoPokemonEspecificoFixture from "../../../cypress/fixtures/infoPokemonEspecifico.fixture.js";

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

describe("imprimirInformacionPokemonEspecifico", () => {
  it("Imprime toda la información del pokémon especificado", () => {
    document.body.innerHTML = infoPokemonEspecificoFixture;
    const dataFinalCharmander = dividirInformacionPokemon(fixtureCharmander);

    const $nombrePokemon = document.querySelector(".nombre-pokemon");
    expect($nombrePokemon.textContent).toEqual("");

    imprimirInformacionPokemonEspecifico(dataFinalCharmander);

    const $nombrePokemonActualizado = document.querySelector(".nombre-pokemon");
    expect($nombrePokemonActualizado.textContent).toEqual("charmander");

  });
});

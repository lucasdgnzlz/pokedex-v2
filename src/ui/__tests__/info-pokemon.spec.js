import { imprimirNombresPokemon, imprimirInformacionPokemonEspecifico } from "../info-pokemon.js";
import { mapearPokemon } from "../../utilidades/utilidades.js";
import fixturePrimeraListaPokemones from "../../../cypress/fixtures/listado-pagina-1.json";
import fixtureCharmander from "../../../cypress/fixtures/charmander.json";
import fixtureCharizard from "../../../cypress/fixtures/charizard.json";
import infoPokemonEspecificoFixture from "../../../cypress/fixtures/infoPokemonEspecifico.fixture.js";

describe("imprimirNombresPokemon", () => {
  afterEach(() => {
    document.body.innerHTML = ''; // Limpiar el DOM
  });

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
  afterEach(() => {
    document.body.innerHTML = ''; // Limpiar el DOM
  });
  
  it("Imprime toda la información del pokémon especificado", () => {
    document.body.innerHTML = infoPokemonEspecificoFixture;
    const dataFinalCharmander = mapearPokemon(fixtureCharmander);

    const $nombrePokemon = document.querySelector(".nombre-pokemon");
    const $idPokemon = document.querySelector(".id-pokemon");

    expect($nombrePokemon.textContent).toEqual("");
    expect($idPokemon.textContent).toEqual("");

    imprimirInformacionPokemonEspecifico(dataFinalCharmander);

    const $nombrePokemonActualizado = document.querySelector(".nombre-pokemon");
    expect($nombrePokemonActualizado.textContent).toEqual("charmander");
    expect($idPokemon.textContent).toEqual("#4");
  });

  it("Imprime la información de un pkm y luego imprime la info de otro distinto", () => {
    document.body.innerHTML = infoPokemonEspecificoFixture;
    const dataFinalCharmander = mapearPokemon(fixtureCharmander);

    const $nombrePokemon = document.querySelector(".nombre-pokemon");
    const $idPokemon = document.querySelector(".id-pokemon");

    expect($nombrePokemon.textContent).toEqual("");
    expect($idPokemon.textContent).toEqual("");

    imprimirInformacionPokemonEspecifico(dataFinalCharmander);

    const $nombrePokemonActualizado = document.querySelector(".nombre-pokemon");
    expect($nombrePokemonActualizado.textContent).toEqual("charmander");
    expect($idPokemon.textContent).toEqual("#4");

    const dataFinalCharizard = mapearPokemon(fixtureCharizard);
    imprimirInformacionPokemonEspecifico(dataFinalCharizard);

    expect($nombrePokemonActualizado.textContent).toEqual("charizard");
    expect($idPokemon.textContent).toEqual("#6");
  });
});

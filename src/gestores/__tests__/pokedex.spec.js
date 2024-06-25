/// <reference types="Jest" />

import { gestionarListadoPokemones, gestionarPedidoDataPokemonEspecifico, gestionarCambioPaginaSiguiente, gestionarCambioAnteriorPagina, gestionarActualizacionPagina } from "../pokedex.js";
import { guardarListadoPokemonesEnLocalStorage, guardarDataPokemonEnLocalStorage } from "../../storage/pokedex.js";
import { dividirInformacionPokemon } from "../../utilidades/utilidades.js";
import fixturePrimeraListaPokemones from "../../../cypress/fixtures/listado-pagina-1.json";
import fixtureDataCharmander from "../../../cypress/fixtures/charmander.json";
import fixtureListadoPokemonesYPaginador from "../../../cypress/fixtures/listadoPokedex.fixture.js";
import infoPokemonEspecificoFixture from "../../../cypress/fixtures/infoPokemonEspecifico.fixture.js";

describe("gestionarListadoPokemones", () => {
  afterEach(() => {
    jest.resetAllMocks();
    document.body.innerHTML = ''; // Limpiar el DOM
  });

  it("Gestiona impresión del listado de pokemones directamente llamando a la API", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(fixturePrimeraListaPokemones)
      })
    );

    const INDICADOR_PAGINA = 0;
    document.body.innerHTML = fixtureListadoPokemonesYPaginador;

    await gestionarListadoPokemones(INDICADOR_PAGINA);

    const pokemonesEnListado = document.querySelectorAll(".nombre-pokemon-listado");
    pokemonesEnListado.forEach((pokemonLista, i) => {
      expect(pokemonLista.textContent).toEqual(fixturePrimeraListaPokemones["results"][i]["name"]);
    });
  });

  it("Gestiona impresión del listado de pokemones cargando la data del storage", async () => {
    const INDICADOR_PAGINA_LISTADO = 1;
    const listadoPokemones = fixturePrimeraListaPokemones;

    guardarListadoPokemonesEnLocalStorage(INDICADOR_PAGINA_LISTADO, listadoPokemones);

    const INDICADOR_PAGINA = 0;
    document.body.innerHTML = fixtureListadoPokemonesYPaginador;

    await gestionarListadoPokemones(INDICADOR_PAGINA);

    const $pokemonesEnListado = document.querySelectorAll(".nombre-pokemon-listado");
    $pokemonesEnListado.forEach((pokemonLista, i) => {
      expect(pokemonLista.textContent).toEqual(fixturePrimeraListaPokemones["results"][i]["name"]);
    });
  });
});

describe("gestionarPedidoDataPokemonEspecifico", () => {
  afterEach(() => {
    jest.resetAllMocks();
    document.body.innerHTML = ''; // Limpiar el DOM
  });

  it("Gestiona impresión de info de un pkmn específico mediante una llamada a la API", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(fixtureDataCharmander)
      })
    );

    document.body.innerHTML = infoPokemonEspecificoFixture;

    const $nombreInicialPokemon = document.querySelector(".nombre-pokemon");
    expect($nombreInicialPokemon.textContent).toEqual("");

    const IDENTIFICADOR_POKEMON = "charmander";
    await gestionarPedidoDataPokemonEspecifico(IDENTIFICADOR_POKEMON);

    expect($nombreInicialPokemon.textContent).toEqual(fixtureDataCharmander.name);
  });

  it("Gestiona impresión de info de un pkmn específico cargándolo del storage", async () => {
    const dataPokemonInicial = fixtureDataCharmander;
    const dataPokemonFinal = dividirInformacionPokemon(dataPokemonInicial);

    guardarDataPokemonEnLocalStorage(dataPokemonFinal);

    document.body.innerHTML = infoPokemonEspecificoFixture;

    const $nombrePokemon = document.querySelector(".nombre-pokemon");
    expect($nombrePokemon.textContent).toEqual("");

    const IDENTIFICADOR_POKEMON = "charmander";
    await gestionarPedidoDataPokemonEspecifico(IDENTIFICADOR_POKEMON);

    expect($nombrePokemon.textContent).toEqual(IDENTIFICADOR_POKEMON);
  });
});

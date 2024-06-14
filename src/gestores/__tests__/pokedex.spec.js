/// <reference types="Jest" />

import { gestionarListadoPokemones, gestionarPedidoDataPokemonEspecifico, gestionarCambioPaginaSiguiente, gestionarCambioAnteriorPagina, gestionarActualizacionPagina } from "../pokedex.js";
import fixturePrimeraListaPokemones from "../../../cypress/fixtures/listado-pagina-1.json";
import fixtureListadoPokemonesYPaginador from "../../../cypress/fixtures/listadoPokedex.fixture.js";

describe("gestionarListadoPokemones", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(fixturePrimeraListaPokemones)
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Gestiona impresión del listado de pokemones directamente llamando a la API", async () => {
    const INDICADOR_PAGINA = 0;
    document.body.innerHTML = fixtureListadoPokemonesYPaginador;

    await gestionarListadoPokemones(INDICADOR_PAGINA);

    const pokemonesEnListado = document.querySelectorAll(".nombre-pokemon-listado");
    pokemonesEnListado.forEach((pokemonLista, i) => {
      expect(pokemonLista.textContent).toEqual(fixturePrimeraListaPokemones["results"][i]["name"]);
    });
  });
});
/// <reference types="Jest" />
import { expect, jest, test } from '@jest/globals';

import { guardarListadoPokemonesEnLocalStorage, cargarListadoPokemonesDeLocalStorage, guardarDataPokemonEnLocalStorage, cargarDataPokemonDeLocalStorage } from "../pokedex.js";
import { dividirInformacionPokemon } from "../../utilidades/utilidades.js";
import fixtureCharmander from "../../../cypress/fixtures/charmander.json";
import fixturePrimeraListaPokemones from "../../../cypress/fixtures/listado-pagina-1.json";

describe("guardarListadoPokemonesEnLocalStorage", () => {
  it("Devuelve un error si el indicadorPagina no es type number", () => {
    const INDICADOR_PAGINA = "indicadorPaginaNoEsUnNumero";
    const dataPokemon = fixturePrimeraListaPokemones;

    expect(() => { guardarListadoPokemonesEnLocalStorage(INDICADOR_PAGINA, dataPokemon) }).toThrow("Se necesita el número de la página a la que pertenece la data, y los pokemones para guardar en el localStorage");
  });

  it("Devuelve un error si la dataPokemon no es un objeto", () => {
    const INDICADOR_PAGINA = 1;
    const dataPokemon = "dataPokemon no es un objeto";

    expect(() => { guardarListadoPokemonesEnLocalStorage(INDICADOR_PAGINA, dataPokemon) }).toThrow("Se necesita el número de la página a la que pertenece la data, y los pokemones para guardar en el localStorage");
  });

  it("Guarda la data en localStorage", () => {
    const INDICADOR_PAGINA = 1;
    const pokemons = fixturePrimeraListaPokemones;

    const setItemMockeado = jest.spyOn(Storage.prototype, 'setItem');

    guardarListadoPokemonesEnLocalStorage(INDICADOR_PAGINA, pokemons);

    expect(setItemMockeado).toHaveBeenCalledWith(`pagina_${INDICADOR_PAGINA}`, JSON.stringify(pokemons));

    setItemMockeado.mockRestore(); // Restaura los mocks
    localStorage.clear(); // Limpia el storage
  });
});

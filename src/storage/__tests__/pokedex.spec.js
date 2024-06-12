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

describe("cargarListadoPokemonesDeLocalStorage", () => {
  it("Devuelve un error controlado al ser undefined el parámetro pasado", () => {
    let INDICADOR_PAGINA;
    expect(() => { cargarListadoPokemonesDeLocalStorage(INDICADOR_PAGINA) }).toThrow("Se necesita una cantidad y un indicador de página para cargar a los pokemones");
  });

  it("Devuelve un error controlado al ser null la data de los pokemones en el storage", () => {
    let INDICADOR_PAGINA = 2;
    expect(() => { cargarListadoPokemonesDeLocalStorage(INDICADOR_PAGINA) }).toThrow(`Pagina ${INDICADOR_PAGINA} de Pokemones no se encontró en el localStorage`);
  });

  it("Devuelve la data del storage correctamente", () => {
    const INDICADOR_PAGINA = 1;
    const pokemones = fixturePrimeraListaPokemones;

    const setItemMockeado = jest.spyOn(Storage.prototype, 'setItem');

    guardarListadoPokemonesEnLocalStorage(INDICADOR_PAGINA, pokemones);

    expect(setItemMockeado).toHaveBeenCalledWith(`pagina_${INDICADOR_PAGINA}`, JSON.stringify(pokemones));
    expect(cargarListadoPokemonesDeLocalStorage(INDICADOR_PAGINA)).toEqual(pokemones);

    setItemMockeado.mockRestore(); // Restaura los mocks
    localStorage.clear(); // Limpia el storage
  });
});

describe("guardarDataPokemonEnLocalStorage", () => {
  it("Devuelve error al recibir un parámetro que no sea un objeto", () => {
    const DATA_POKEMON = "deberia ser un objeto pero no lo es";
    expect(() => { guardarDataPokemonEnLocalStorage(DATA_POKEMON) }).toThrow("Se necesita la data del pokémon para guardarla en el localStorage");
  });

  it("Guarda correctamente la data de un pokémon específico", () => {
    const dataPokemonInicial = fixtureCharmander;
    const dataPokemonFinal = dividirInformacionPokemon(dataPokemonInicial);

    const setItemMockeado = jest.spyOn(Storage.prototype, 'setItem');

    guardarDataPokemonEnLocalStorage(dataPokemonFinal);

    expect(setItemMockeado).toHaveBeenCalledWith(`pokemon_${dataPokemonFinal.nombre}`, JSON.stringify(dataPokemonFinal));
  });
});

describe("cargarDataPokemonDeLocalStorage", () => {
  it("Devuelve error controlado si el parámetro enviado como nombre pokémon es undefined", () => {
    const NOMBRE_POKEMON = undefined;
    expect(() => { cargarDataPokemonDeLocalStorage(NOMBRE_POKEMON) }).toThrow("Se necesita el nombre para cargar el pokémon correspondiente");
  });
});

/// <reference types="Jest" />

import { hacerSolicitud, buscarPokemonEspecifico } from "../pokedex.js";
import fixturePrimeraListaPokemones from "../../../cypress/fixtures/listado-pagina-1.json";
import fixtureCharmander from "../../../cypress/fixtures/charmander.json";

describe("hacerSolicitud", () => {
  it("Devuelve la data de la primera lista de pokemones correctamente", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(fixturePrimeraListaPokemones)
      })
    );

    const INDICADOR_POKEMON = 0;
    const LIMITE_POKEMONES = 9;

    const data = await hacerSolicitud(INDICADOR_POKEMON, LIMITE_POKEMONES);

    expect(data).toEqual(fixturePrimeraListaPokemones);
  });
});

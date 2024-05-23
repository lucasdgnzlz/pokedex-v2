/// <reference types="Jest" />

import { validarPokemonABuscar } from "../validaciones.js";

describe(("validarPokemonABuscar"), () => {
  it(("Debería devolver un texto indicando que solo se aceptan números"), () => {
    const NOMBRE_POKEMON = "";

    expect(validarPokemonABuscar(NOMBRE_POKEMON)).toBe("Error: El campo está vacío");
  });

  it("Devuelve un error al no ser compatible con el regex", () => {
    const NOMBRE_POKEMON_NO_VALIDO = ".";

    expect(validarPokemonABuscar(NOMBRE_POKEMON_NO_VALIDO)).toBe("Error: Nombre no válido");
  });
});

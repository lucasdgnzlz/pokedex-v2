/// <reference types="Jest" />

import { validarPokemonABuscar } from "../validaciones.js";

describe(("validarPokemonABuscar"), () => {
  it(("Debería devolver un texto indicando que solo se aceptan números"), () => {
    const NOMBRE_POKEMON = "";

    expect(validarPokemonABuscar(NOMBRE_POKEMON)).toBe("Error: El campo está vacío");
  });
});

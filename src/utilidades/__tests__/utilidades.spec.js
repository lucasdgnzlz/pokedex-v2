/// <reference types="Jest" />

import { calcularNumeroPokemonListado, dividirInformacionPokemon } from "../utilidades.js";

describe("calcularNumeroPokemonListado", () => {
  it("Devuelve el indicador de la pagina a llamar mediante la API", () => {
    const INDICADOR_PAGINA = 2;
    const resultadoEsperado = 18;

    expect(calcularNumeroPokemonListado(INDICADOR_PAGINA)).toEqual(resultadoEsperado);
  });
});

/// <reference types="Jest" />

import { calcularNumeroPokemonListado, dividirInformacionPokemon } from "../utilidades.js";
import fixtureCharmander from "../../../cypress/fixtures/charmander.json";

describe("calcularNumeroPokemonListado", () => {
  it("Devuelve el indicador de la pagina a llamar mediante la API", () => {
    const INDICADOR_PAGINA = 2;
    const resultadoEsperado = 18;

    expect(calcularNumeroPokemonListado(INDICADOR_PAGINA)).toEqual(resultadoEsperado);
  });
});

describe("dividirInformacionPokemon", () => {
  it("Deuvelve la data de la API dividida para dejar únicamente lo necesario", () => {
    const dataEsperada = {
      id: 4,
      nombre: "charmander",
      tipos: ["fire"],
      stats: [{"hp": 39}, {"attack": 52}, {"defense": 43}, {"special-attack": 60}, {"special-defense": 50}, {"speed": 65}],
      imagenPokemon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
      habilidades: ["blaze", "solar-power"]
    };

    expect(dividirInformacionPokemon(fixtureCharmander)).toEqual(dataEsperada);
  });
});

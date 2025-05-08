import { calcularNumeroPokemonListado, mapearPokemon } from "../utilidades.js";
import fixtureCharmander from "../../../cypress/fixtures/charmander.json";

describe("calcularNumeroPokemonListado", () => {
  it("Devuelve el indicador de la pagina a llamar mediante la API", () => {
    const INDICADOR_PAGINA = 2;
    const resultadoEsperado = 18;

    expect(calcularNumeroPokemonListado(INDICADOR_PAGINA)).toEqual(resultadoEsperado);
  });
});

describe("mapearPokemon", () => {
  it("Deuvelve la data de la API dividida para dejar únicamente lo necesario", () => {
    const dataEsperada = {
      nombre: "charmander",
      id: 4,
      imagenPokemon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
      tipos: ["fire"],
      estadisticas: {ataqueBasePokemon: 52, ataqueEspecialBasePokemon: 60, defensaBasePokemon: 43, defensaEspecialBasePokemon: 50, velocidadBasePokemon: 65, vidaBasePokemon: 39},
      habilidades: ["blaze", "solar-power"]
    }

    expect(mapearPokemon(fixtureCharmander)).toEqual(dataEsperada);
  });
});

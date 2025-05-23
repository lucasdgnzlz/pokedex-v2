import { buscarPokemones, buscarPokemonEspecifico } from "../pokedex.js";
import fixturePrimeraListaPokemones from "../../../cypress/fixtures/listado-pagina-1.json";
import fixtureCharmander from "../../../cypress/fixtures/charmander.json";

describe("buscarPokemones", () => {
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

  it("Devuelve la data de la primera lista de pokemones correctamente", async () => {
    const INDICADOR_POKEMON = 0;
    const LIMITE_POKEMONES = 9;

    const data = await buscarPokemones(INDICADOR_POKEMON, LIMITE_POKEMONES);

    expect(data).toEqual(fixturePrimeraListaPokemones);
  });

  it("Devuelve un error al no pasarle un identificador a la función", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error("No se encontró el listado de pokemones indicado"))
    );

    await expect(buscarPokemones("", "")).rejects.toThrow("No se encontró el listado de pokemones indicado");
  });
});

describe("buscarPokemonEspecifico", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(fixtureCharmander)
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Devuelve la data del pokémon (charmander) al pasarle los parámetros correctos", async () => {
    const IDENTIFICADOR_POKEMON = "charmander";
    const data = await buscarPokemonEspecifico(IDENTIFICADOR_POKEMON);

    expect(data).toEqual(fixtureCharmander);
  });

  it("Devuelve error al no encontrar el pokémon especificado", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error("No se encontró ese pokémon :/"))
    );

    await expect(buscarPokemonEspecifico(".-.--.-.")).rejects.toThrow("No se encontró ese pokémon :/");
  });
});

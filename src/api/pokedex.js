const API_BASE = "https://pokeapi.co/api/v2/pokemon?offset=";

export async function hacerSolicitud(indicadorPokemon, LIMITE_POKEMONES) {
  try {
    const respuesta = await fetch(API_BASE + `${`${indicadorPokemon}&limit=${LIMITE_POKEMONES}`}`);
    const data = await respuesta.json();
    return data;
  } catch (error) {
    throw new Error("No se encontró el listado de pokemones indicado");
  }
}

export async function buscarPokemonEspecifico(identificadorPokemon) {
  try {
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${identificadorPokemon}`);
    const data = await respuesta.json();
    return data;
  } catch (error) {
    throw new Error("No se encontró ese pokémon :/");
  }
}

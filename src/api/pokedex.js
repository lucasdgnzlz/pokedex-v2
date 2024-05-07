export async function hacerSolicitud(indicadorPokemon, LIMITE_POKEMONES) {
  try {
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${indicadorPokemon}&limit=${LIMITE_POKEMONES}`);
    const data = await respuesta.json();
    return data;
  } catch (error) {
    console.error(error);
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

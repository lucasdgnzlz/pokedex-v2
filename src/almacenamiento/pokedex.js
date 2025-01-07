export function guardarListadoPokemonesEnLocalStorage(indicadorPagina, dataPokemones) {
  if (typeof indicadorPagina !== "number" || typeof dataPokemones !== "object") {
    throw new Error("Se necesita el número de la página a la que pertenece la data, y los pokemones para guardar en el localStorage");
  }

  localStorage.setItem(`pagina_${indicadorPagina}`, JSON.stringify(dataPokemones));
}

export function cargarListadoPokemonesDeLocalStorage(indicadorPagina) {
  if (indicadorPagina === undefined) {
    throw new Error("Se necesita una cantidad y un indicador de página para cargar a los pokemones");
  }

  const pokemones = JSON.parse(localStorage.getItem(`pagina_${indicadorPagina}`));

  if (pokemones === null) {
    throw new Error(`Pagina ${indicadorPagina} de Pokemones no se encontró en el localStorage`);
  }

  return pokemones;
}

export function guardarDataPokemonEnLocalStorage(dataPokemon) {
  if (typeof dataPokemon !== "object") {
    throw new Error("Se necesita la data del pokémon para guardarla en el localStorage");
  }

  localStorage.setItem(`pokemon_${dataPokemon.nombre}`, JSON.stringify(dataPokemon));
}

export function cargarDataPokemonDeLocalStorage(nombrePokemon){
	if(nombrePokemon === undefined){
		throw new Error("Se necesita el nombre para cargar el pokémon correspondiente");
	}

	const dataPokemon = JSON.parse(localStorage.getItem(`pokemon_${nombrePokemon}`));

	if(dataPokemon === null){
		throw new Error(`Pokémon ${nombrePokemon} no se encontró en el localStorage`);
	}

	return dataPokemon;
}

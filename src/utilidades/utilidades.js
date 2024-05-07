export function calcularNumeroPokemonListado(indicadorPaginaASolicitar) {
  const POKEMONES_POR_PAGINA = 9;
  const resultado = (POKEMONES_POR_PAGINA * indicadorPaginaASolicitar);

  return resultado;
}

export function dividirInformacionPokemon(dataPokemon) {
  const infoPokemon = {
    id: dataPokemon["id"],
    nombre: dataPokemon["name"],
    tipos: [],
    stats: [],
    imagenPokemon: dataPokemon["sprites"]["front_default"],
    habilidades: []
  }

  const cantidadTiposPokemon = dataPokemon["types"];

  cantidadTiposPokemon.forEach((tipoPokemon) => {
    const nombreTipo = tipoPokemon["type"]["name"];
    infoPokemon["tipos"].push(nombreTipo);
  })

  const statsPokemon = dataPokemon["stats"];

  statsPokemon.forEach((statPokemon) => {
    const nombreStat = statPokemon["stat"]["name"];
    const valorStat = statPokemon["base_stat"];

    infoPokemon["stats"].push({[nombreStat]: valorStat});
  })

  const habilidadesPokemon = dataPokemon["abilities"];

  habilidadesPokemon.forEach((habilidadPokemon) => {
    const nombreHabilidad = habilidadPokemon["ability"]["name"];
    infoPokemon["habilidades"].push(nombreHabilidad);
  })

  return infoPokemon;
}

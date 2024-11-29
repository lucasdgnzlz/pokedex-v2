class Pokemon {
  constructor(dataPokemon) {
    this.nombre = dataPokemon["name"];
    this.id = dataPokemon["id"];
    this.imagenPokemon = dataPokemon["sprites"]["front_default"];
    this.tipos = [];
    this.stats = [];
    this.habilidades = [];
  }

  agregarTipos(cantidadTiposPokemon) {
    cantidadTiposPokemon.forEach((tipoPokemon) => {
      const nombreTipo = tipoPokemon["type"]["name"];
      this.tipos.push(nombreTipo);
    });
  }

  agregarStats(statsPokemon) {
    statsPokemon.forEach((statPokemon) => {
      const nombreStat = statPokemon["stat"]["name"];
      const valorStat = statPokemon["base_stat"];

      this.stats.push({ [nombreStat]: valorStat });
    })
  }

  agregarHabilidades(habilidadesPokemon) {
    habilidadesPokemon.forEach((habilidadPokemon) => {
      const nombreHabilidad = habilidadPokemon["ability"]["name"];
      this.habilidades.push(nombreHabilidad);
    })
  }
}

export function calcularNumeroPokemonListado(indicadorPaginaASolicitar) {
  const POKEMONES_POR_PAGINA = 9;
  const resultado = (POKEMONES_POR_PAGINA * indicadorPaginaASolicitar);

  return resultado;
}

export function instanciarPokemon(dataPokemon) {
  const nuevoPokemon = new Pokemon(dataPokemon);
  nuevoPokemon.agregarTipos(dataPokemon["types"]);
  nuevoPokemon.agregarStats(dataPokemon["stats"]);
  nuevoPokemon.agregarHabilidades(dataPokemon["abilities"]);

  return nuevoPokemon;
}

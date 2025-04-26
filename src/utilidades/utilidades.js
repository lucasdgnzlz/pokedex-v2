class Pokemon {
  constructor({ nombre, id, fotoPrincipal, tipos, estadisticas, habilidades }) {
    this.nombre = nombre;
    this.id = id;
    this.imagenPokemon = fotoPrincipal;
    this.tipos = tipos;
    this.estadisticas = estadisticas;
    this.habilidades = habilidades;
  }
}

export function calcularNumeroPokemonListado(indicadorPaginaASolicitar) {
  const POKEMONES_POR_PAGINA = 9;
  const resultado = POKEMONES_POR_PAGINA * indicadorPaginaASolicitar;

  return resultado;
}

export function mapearPokemon(dataPokemon) {
  const listadoEstadisticasPokemon = dataPokemon["stats"];

  let estadisticasPokemon = mapearEstadisticasPokemon(listadoEstadisticasPokemon);

  const dataPokemonMapeada = {
    nombre: dataPokemon.name,
    id: dataPokemon.id,
    fotoPrincipal: dataPokemon["sprites"]["front_default"],
    tipos: dataPokemon["types"].map((item) => item["type"]["name"]),
    estadisticas: estadisticasPokemon,
    habilidades: dataPokemon["abilities"].map((item) => item["ability"]["name"]),
  };

  return new Pokemon(dataPokemonMapeada);
}

function mapearEstadisticasPokemon(listadoEstadisticasPokemon) {
  let estadisticasPokemon = [];

  listadoEstadisticasPokemon.forEach((estadistica) => {
    const nombreEstadistica = estadistica["stat"]["name"];
    const valorEstadistica = estadistica["base_stat"];

    estadisticasPokemon.push({ [nombreEstadistica]: valorEstadistica });
  });

  const estadisticasMapeadas = {};

  estadisticasPokemon.forEach((stat) => {
    const nombreEstadistica = Object.keys(stat)[0];

    if (nombreEstadistica === "hp") {
      estadisticasMapeadas.vidaBasePokemon = stat["hp"];
    } else if (nombreEstadistica === "attack") {
      estadisticasMapeadas.ataqueBasePokemon = stat["attack"];
    } else if (nombreEstadistica === "defense") {
      estadisticasMapeadas.defensaBasePokemon = stat["defense"];
    } else if (nombreEstadistica === "special-attack") {
      estadisticasMapeadas.ataqueEspecialBasePokemon = stat["special-attack"];
    } else if (nombreEstadistica === "special-defense") {
      estadisticasMapeadas.defensaEspecialBasePokemon = stat["special-defense"];
    } else if (nombreEstadistica === "speed") {
      estadisticasMapeadas.velocidadBasePokemon = stat["speed"];
    }
  });

  return estadisticasMapeadas;
}

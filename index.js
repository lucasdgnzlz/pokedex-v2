const $nombresPokemon = document.querySelectorAll(".nombre-pokemon-listado");

async function hacerSolicitud(indicadorPokemon, LIMITE_POKEMONES) {
  try {
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${indicadorPokemon}&limit=${LIMITE_POKEMONES}`);
    const data = await respuesta.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function buscarPokemonEspecifico(identificadorPokemon) {
  try {
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${identificadorPokemon}`);
    const data = await respuesta.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function iniciarPagina(INDICADOR_PRIMER_PAGINA = 0) {
  const LIMITE_POKEMONES = 9;

  const dataPokemon = await hacerSolicitud(INDICADOR_PRIMER_PAGINA, LIMITE_POKEMONES);
  let nombresPokemon = [];

  dataPokemon["results"].forEach(pokemon => {
    const nombrePokemon = pokemon.name;
    nombresPokemon.push(nombrePokemon);
  });

  imprimirNombresPokemon(nombresPokemon);
}
iniciarPagina();

$nombresPokemon.forEach(($nombrePokemon) => {
  $nombrePokemon.addEventListener("click", () => {
    const nombrePokemon = $nombrePokemon.textContent;
    gestionarBusquedaPokemonEspecifico(nombrePokemon);
  })
})

async function gestionarBusquedaPokemonEspecifico(nombrePokemon) {
  const dataPokemon = await buscarPokemonEspecifico(nombrePokemon);
  const infoPokemon = dividirInformacionPokemon(dataPokemon);
  imprimirInformacionPokemonEspecifico(infoPokemon);
}

function imprimirNombresPokemon(nombresPokemon) {
  $nombresPokemon.forEach(($botonNombrePokemon, i) => {
    const nombrePokemon = nombresPokemon[i];
    $botonNombrePokemon.textContent = nombrePokemon;
  });
}

function dividirInformacionPokemon(dataPokemon) {
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

    infoPokemon["stats"][nombreStat] = valorStat;
  })

  const habilidadesPokemon = dataPokemon["abilities"];

  habilidadesPokemon.forEach((habilidadPokemon) => {
    const nombreHabilidad = habilidadPokemon["ability"]["name"];
    infoPokemon["habilidades"].push(nombreHabilidad);
  })

  return infoPokemon;
}

function imprimirInformacionPokemonEspecifico(infoPokemon) {
  mostrarNombrePokemonElegido(infoPokemon);
  mostrarIdPokemonElegido(infoPokemon);
  mostrarImagenPokemonElegido(infoPokemon);
  mostrarTiposPokemonElegido(infoPokemon);
  mostrarStatsPokemonElegido(infoPokemon);
  mostrarHabilidadesPokemon(infoPokemon);
  mostrarInformacionPokemon();
}

function mostrarNombrePokemonElegido(infoPokemon) {
  const $nombrePokemon = document.querySelector(".nombre-pokemon");
  $nombrePokemon.textContent = infoPokemon["nombre"];
}

function mostrarIdPokemonElegido(infoPokemon) {
  const $idPokemon = document.querySelector(".id-pokemon");
  $idPokemon.textContent = `#${infoPokemon["id"]}`;
}

function mostrarImagenPokemonElegido(infoPokemon) {
  const $imagenPokemon = document.querySelector("#imagen-pokemon");
  $imagenPokemon.src = infoPokemon["imagenPokemon"];
}

function mostrarTiposPokemonElegido(infoPokemon) {
  const $tiposPokemonElegido = document.querySelectorAll(".imagen-tipos-pokemon");
  const tiposPokemonElegido = infoPokemon["tipos"];

  tiposPokemonElegido.forEach((tipoPokemon, i) => {
    $tiposPokemonElegido[i].src = `img/tipos/${tipoPokemon}.svg`;
  });

  if (tiposPokemonElegido.length === 1) {
    $tiposPokemonElegido[1].id = "oculto";
  } else {
    $tiposPokemonElegido[1].id = "";
  }
}

function mostrarStatsPokemonElegido(infoPokemon) {
  const $vidaBasePokemon = document.querySelector(".vida-base-respuesta");
  const $ataqueBasePokemon = document.querySelector(".ataque-base-respuesta");
  const $defensaBasePokemon = document.querySelector(".defensa-base-respuesta");
  const $ataqueEspecialPokemon = document.querySelector(".ataque-especial-base-respuesta");
  const $defensaEspecialPokemon = document.querySelector(".defensa-especial-base-respuesta");
  const $velocidadBasePokemon = document.querySelector(".velocidad-base-respuesta");

  const vidaBasePokemon = infoPokemon["stats"]["hp"];
  const ataqueBasePokemon = infoPokemon["stats"]["attack"];
  const defensaBasePokemon = infoPokemon["stats"]["defense"];
  const ataqueEspecialBasePokemon = infoPokemon["stats"]["special-attack"];
  const defensaEspecialBasePokemon = infoPokemon["stats"]["special-defense"];
  const velocidadBasePokemon = infoPokemon["stats"]["speed"];

  $vidaBasePokemon.textContent = vidaBasePokemon;
  $ataqueBasePokemon.textContent = ataqueBasePokemon;
  $defensaBasePokemon.textContent = defensaBasePokemon;
  $ataqueEspecialPokemon.textContent = ataqueEspecialBasePokemon;
  $defensaEspecialPokemon.textContent = defensaEspecialBasePokemon;
  $velocidadBasePokemon.textContent = velocidadBasePokemon;
}

function mostrarHabilidadesPokemon(infoPokemon) {
  const cantidadHabilidadesPokemon = (infoPokemon["habilidades"]).length;
  crearItemsListaHabilidades(cantidadHabilidadesPokemon);

  const $habilidadesPokemon = document.querySelectorAll(".item-lista-habilidades");
  const habilidadesPokemon = infoPokemon["habilidades"];

  habilidadesPokemon.forEach((habilidadPokemon, i) => {
    $habilidadesPokemon[i].textContent = habilidadPokemon;
  })
}

function crearItemsListaHabilidades(cantidadHabilidades) {
  const $listaHabilidadesPokemon = document.querySelector(".lista-habilidades");

  for (let i = 0; i < cantidadHabilidades; i++) {
    const itemListaHabilidades = document.createElement("li");
    itemListaHabilidades.className = "habilidad-pokemon item-lista-habilidades";
    $listaHabilidadesPokemon.appendChild(itemListaHabilidades);
  }
}

function mostrarInformacionPokemon() {
  const $bloqueInformacionPokemon = document.querySelector(".contenedor-informacion-pokemon");
  $bloqueInformacionPokemon.id = "";
}

const $indicadoresPagina = document.querySelectorAll(".indicador-pagina");
const $botonAnteriorPagina = document.querySelector(".boton-anterior-pagina");
const $botonSiguientePagina = document.querySelector(".boton-siguiente-pagina");

$indicadoresPagina.forEach(($indicadorPagina) => {
  $indicadorPagina.addEventListener("click", () => {
    const numeroPaginaSolicitada = $indicadorPagina.textContent;
    gestionarActualizacionPagina(numeroPaginaSolicitada, $indicadoresPagina);
  })
})

function gestionarActualizacionPagina(numeroPaginaSolicitada, $indicadoresPagina) {
  const indicadorPaginaASolicitar = numeroPaginaSolicitada - 1;
  const ACCIONAR = "especifico";

  const indicadorDefinitivo = calcularNumeroPokemonListado(indicadorPaginaASolicitar);

  actualizarNumerosIndicadorPagina(ACCIONAR, indicadorPaginaASolicitar, $indicadoresPagina);
  desactivarPaginaActiva();
  mostrarPaginaActiva(indicadorPaginaASolicitar, $indicadoresPagina);
  iniciarPagina(indicadorDefinitivo);
}

function actualizarNumerosIndicadorPagina(accionar, paginaSolicitada, $indicadoresPagina) {
  let accionesPaginador = ["anterior", "siguiente", "especifico"];

  if (accionar === accionesPaginador[0]) {
    let numeroAImprimir = paginaSolicitada;
    $indicadoresPagina.forEach(($indicador) => {
      $indicador.textContent = numeroAImprimir;
      numeroAImprimir++;
    });
  } else if (accionar === accionesPaginador[1]) {
    let numeroAImprimir = paginaSolicitada + 2;
    $indicadoresPagina.forEach(($indicador) => {
      $indicador.textContent = numeroAImprimir;
      numeroAImprimir++;
    });
  } else if (accionar === accionesPaginador[2]) {
    let numeroAImprimir = paginaSolicitada + 1;
    $indicadoresPagina.forEach(($indicador) => {
      $indicador.textContent = numeroAImprimir;
      numeroAImprimir++;
    });
  } else {
    return false;
  }
}

function desactivarPaginaActiva() {
  const $contenedoresNumerosPagina = document.querySelectorAll(".pagina-item");

  $contenedoresNumerosPagina.forEach(($contenedorNumeroPagina) => {
    $contenedorNumeroPagina.classList.remove("active");
  });
}

function mostrarPaginaActiva(paginaParaActivar, $indicadoresPagina) {
  const numeroPaginaACambiar = paginaParaActivar + 1;

  $indicadoresPagina.forEach(($indicadorPagina) => {
    const numeroIndicador = Number($indicadorPagina.textContent);

    if (numeroIndicador === numeroPaginaACambiar) {
      $indicadorPagina.classList.add("active");
    }
  });
}

function calcularNumeroPokemonListado(indicadorPaginaASolicitar) {
  const POKEMONES_POR_PAGINA = 9;
  const resultado = (POKEMONES_POR_PAGINA * indicadorPaginaASolicitar);

  return resultado;
}
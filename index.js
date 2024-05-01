// Variables globales

const $nombresPokemon = document.querySelectorAll(".nombre-pokemon-listado");

const $indicadoresPagina = document.querySelectorAll(".indicador-pagina"); // Indicadores de página del paginador
const $botonAnteriorPagina = document.querySelector(".boton-anterior-pagina"); // Botón página anterior del paginador
const $botonSiguientePagina = document.querySelector(".boton-siguiente-pagina"); // Botón página siguiente del paginador

// API

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
    throw new Error("No se encontró ese pokémon :/");
  }
}

// UI

function imprimirNombresPokemon(nombresPokemon) {
  $nombresPokemon.forEach(($botonNombrePokemon, i) => {
    const nombrePokemon = nombresPokemon[i];
    $botonNombrePokemon.textContent = nombrePokemon;
  });
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
    const $enlaceNumeroPagina = $contenedorNumeroPagina.querySelector(".indicador-pagina");
    $enlaceNumeroPagina.classList.remove("active");
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

function desactivarBotonAnteriorPagina() {
  const $estadoBotonAnterior = document.querySelector(".indicador-estado-anterior");
  $estadoBotonAnterior.classList.add("disabled");

  const $botonAnteriorPagina = $estadoBotonAnterior.querySelector(".boton-anterior-pagina");
  $botonAnteriorPagina.classList.add("disabled");
}

function activarBotonAnteriorPagina() {
  const $estadoBotonAnterior = document.querySelector(".indicador-estado-anterior");
  $estadoBotonAnterior.classList.remove("disabled");
}

function desactivarBotonSiguientePagina() {
  const $estadoBotonAnterior = document.querySelector(".indicador-estado-siguiente");
  $estadoBotonAnterior.classList.add("disabled");

  const $botonSiguientePagina = $estadoBotonAnterior.querySelector(".boton-siguiente-pagina");
  $botonSiguientePagina.classList.add("disabled");
}

function activarBotonSiguientePagina() {
  const $estadoBotonAnterior = document.querySelector(".indicador-estado-siguiente");
  $estadoBotonAnterior.classList.remove("disabled");
}

function imprimirErrorValidacionBuscador(error) {
  const $contenedorErrorValidacion = document.querySelector(".contenedor-error-validacion");
  const textoErrorValidacion = $contenedorErrorValidacion.querySelector(".error-validacion");
  textoErrorValidacion.textContent = error;
}

function mostrarErrorValidacion() {
  const $contenedorErrorValidacion = document.querySelector(".contenedor-error-validacion");
  $contenedorErrorValidacion.id = "";
}

function ocultarErrorValidacion() {
  const $contenedorErrorValidacion = document.querySelector(".contenedor-error-validacion");
  $contenedorErrorValidacion.id = "oculto";
}

// Inicio página

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

// DOM

$nombresPokemon.forEach(($nombrePokemon) => {
  $nombrePokemon.addEventListener("click", () => {
    const nombrePokemon = $nombrePokemon.textContent;
    gestionarBusquedaPokemonEspecifico(nombrePokemon);
  })
})

$indicadoresPagina.forEach(($indicadorPagina) => {
  $indicadorPagina.addEventListener("click", () => {
    const numeroPaginaSolicitada = $indicadorPagina.textContent;
    gestionarActualizacionPagina(numeroPaginaSolicitada, $indicadoresPagina);
  })
})

$botonAnteriorPagina.addEventListener("click", () => {
  const numeroPaginaActual = Number(document.querySelector(".active").textContent);
  gestionarCambioAnteriorPagina(numeroPaginaActual, $indicadoresPagina);
})

$botonSiguientePagina.addEventListener("click", () => {
  const numeroPaginaActual = Number(document.querySelector(".active").textContent);
  gestionarCambioPaginaSiguiente(numeroPaginaActual, $indicadoresPagina);
})

// Generales

async function gestionarBusquedaPokemonEspecifico(nombrePokemon) {
  try{
    const dataPokemon = await buscarPokemonEspecifico(nombrePokemon);
    const infoPokemon = dividirInformacionPokemon(dataPokemon);
    ocultarErrorValidacion();
    imprimirInformacionPokemonEspecifico(infoPokemon);
  } catch(error) {
    mostrarErrorValidacion();
    imprimirErrorValidacionBuscador(error);
  }
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

function gestionarCambioPaginaSiguiente(numeroPaginaActual, $indicadoresPagina) {
  let indicadorPagina = numeroPaginaActual - 1;
  let numeroPaginaSolicitada = numeroPaginaActual;
  const limitePaginas = 62;
  const accionar = "siguiente";
  const indicadorDefinitivo = calcularNumeroPokemonListado(numeroPaginaSolicitada);

  if (indicadorPagina === limitePaginas) {
    return false;
  } else if (indicadorPagina === limitePaginas - 1) {
    desactivarBotonSiguientePagina();
    desactivarPaginaActiva();
    actualizarNumerosIndicadorPagina(accionar, indicadorPagina, $indicadoresPagina);
    mostrarPaginaActiva(numeroPaginaSolicitada, $indicadoresPagina);
    iniciarPagina(indicadorDefinitivo);
  } else {
    activarBotonAnteriorPagina();
    desactivarPaginaActiva();
    actualizarNumerosIndicadorPagina(accionar, indicadorPagina, $indicadoresPagina);
    mostrarPaginaActiva(numeroPaginaSolicitada, $indicadoresPagina);
    iniciarPagina(indicadorDefinitivo);
  }
}

function gestionarCambioAnteriorPagina(numeroPaginaActual, $indicadoresPagina) {
  let indicadorPagina = numeroPaginaActual - 1;
  let numeroPaginaSolicitada = numeroPaginaActual - 2;
  const accionar = "anterior";
  const indicadorDefinitivo = calcularNumeroPokemonListado(numeroPaginaSolicitada);

  if (indicadorPagina === 0) {
    return false;
  } else if (indicadorPagina === 1) {
    actualizarNumerosIndicadorPagina(accionar, indicadorPagina, $indicadoresPagina);
    desactivarPaginaActiva();
    mostrarPaginaActiva(numeroPaginaSolicitada, $indicadoresPagina);
    calcularNumeroPokemonListado(indicadorPagina);
    desactivarBotonAnteriorPagina();
    iniciarPagina(indicadorDefinitivo);
  } else {
    activarBotonSiguientePagina();
    desactivarPaginaActiva();
    actualizarNumerosIndicadorPagina(accionar, indicadorPagina, $indicadoresPagina);
    mostrarPaginaActiva(numeroPaginaSolicitada, $indicadoresPagina);
    iniciarPagina(indicadorDefinitivo);
  }
}

function gestionarActualizacionPagina(numeroPaginaSolicitada, $indicadoresPagina) {
  const indicadorPaginaASolicitar = numeroPaginaSolicitada - 1;
  const ACCIONAR = "especifico";

  const indicadorDefinitivo = calcularNumeroPokemonListado(indicadorPaginaASolicitar);

  actualizarNumerosIndicadorPagina(ACCIONAR, indicadorPaginaASolicitar, $indicadoresPagina);
  desactivarPaginaActiva();
  mostrarPaginaActiva(indicadorPaginaASolicitar, $indicadoresPagina);
  activarBotonAnteriorPagina();
  iniciarPagina(indicadorDefinitivo);
}

function calcularNumeroPokemonListado(indicadorPaginaASolicitar) {
  const POKEMONES_POR_PAGINA = 9;
  const resultado = (POKEMONES_POR_PAGINA * indicadorPaginaASolicitar);

  return resultado;
}

/* Buscador */

const $botonBuscarPokemon = document.querySelector(".boton-buscar-pokemon");

$botonBuscarPokemon.addEventListener("click", () => {
  const pokemonABuscar = document.querySelector(".buscador-pokemon").value;

  const error = validarPokemonABuscar(pokemonABuscar);

  if (error !== "") {
    mostrarErrorValidacion();
    imprimirErrorValidacionBuscador(error);
  } else {
    gestionarBusquedaPokemonEspecifico(pokemonABuscar);
  }
})

/* Validaciones */

function validarPokemonABuscar(pokemon) {
  const regex = /^[a-zA-Z0-9]+$/;

  if(pokemon === ""){
    return "Error: El campo está vacío"
  }
  else if (!regex.test(pokemon)) {
    return "Error: Nombre no válido";
  } else {
    return "";
  }
}

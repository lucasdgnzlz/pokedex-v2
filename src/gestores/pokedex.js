import { hacerSolicitud, buscarPokemonEspecifico } from "../api/pokedex.js";
import { imprimirNombresPokemon, imprimirInformacionPokemonEspecifico } from "../ui/info-pokemon.js";
import { calcularNumeroPokemonListado, dividirInformacionPokemon } from "../utilidades/utilidades.js";
import {
  guardarListadoPokemonesEnLocalStorage,
  cargarListadoPokemonesDeLocalStorage,
  guardarDataPokemonEnLocalStorage,
  cargarDataPokemonDeLocalStorage
} from "../storage/pokedex.js";
import {
  actualizarNumerosIndicadorPagina,
  desactivarPaginaActiva,
  mostrarPaginaActiva,
  desactivarBotonAnteriorPagina,
  activarBotonAnteriorPagina,
  desactivarBotonSiguientePagina,
  activarBotonSiguientePagina,
  imprimirErrorValidacionBuscador,
  mostrarErrorValidacion,
  ocultarErrorValidacion
} from "../ui/general.js";

export async function gestionarListadoPokemones(indicadorPagina) {
  const paginaActual = Number(document.querySelector(".active").textContent);
  const LIMITE_POKEMONES = 9;

  try {
    const dataPokemon = cargarListadoPokemonesDeLocalStorage(paginaActual);
    let listaNombresPokemones = [];

    dataPokemon["results"].forEach(pokemon => {
      const nombrePokemon = pokemon.name;
      listaNombresPokemones.push(nombrePokemon);
    });

    imprimirNombresPokemon(listaNombresPokemones);
  } catch (error) {
    const dataPokemon = await hacerSolicitud(indicadorPagina, LIMITE_POKEMONES);
    guardarListadoPokemonesEnLocalStorage(paginaActual, dataPokemon);

    let listaNombresPokemones = [];

    dataPokemon["results"].forEach(pokemon => {
      const nombrePokemon = pokemon.name;
      listaNombresPokemones.push(nombrePokemon);
    });

    imprimirNombresPokemon(listaNombresPokemones);
  }
}

export async function gestionarPedidoDataPokemonEspecifico(identificadorPokemon) {
  const identificadorFinal = identificadorPokemon.toLowerCase();

  try {
    const pokemonGuardado = cargarDataPokemonDeLocalStorage(identificadorFinal);
    ocultarErrorValidacion();
    imprimirInformacionPokemonEspecifico(pokemonGuardado);
  } catch (error) {
    await gestionarBusquedaPokemonEspecifico(identificadorFinal);
  }
}

async function gestionarBusquedaPokemonEspecifico(identificadorPokemon) {
  try {
    const dataPokemon = await buscarPokemonEspecifico(identificadorPokemon);
    const infoPokemon = dividirInformacionPokemon(dataPokemon);
    guardarDataPokemonEnLocalStorage(infoPokemon);
    ocultarErrorValidacion();
    imprimirInformacionPokemonEspecifico(infoPokemon);
  } catch (error) {
    mostrarErrorValidacion();
    imprimirErrorValidacionBuscador(error);
  }
}

export function gestionarCambioPaginaSiguiente(numeroPaginaActual, $indicadoresPagina) {
  let indicadorPagina = numeroPaginaActual - 1;
  let numeroPaginaSolicitada = numeroPaginaActual;
  const limitePaginas = 113;
  const accionar = "siguiente";
  const indicadorDefinitivo = calcularNumeroPokemonListado(numeroPaginaSolicitada);

  if (indicadorPagina === limitePaginas) {
    return false;
  } else if (indicadorPagina === limitePaginas - 1) {
    desactivarBotonSiguientePagina();
    desactivarPaginaActiva($indicadoresPagina);
    actualizarNumerosIndicadorPagina(accionar, indicadorPagina, $indicadoresPagina);
    mostrarPaginaActiva(numeroPaginaSolicitada, $indicadoresPagina);
    gestionarListadoPokemones(indicadorDefinitivo);
  } else {
    activarBotonAnteriorPagina();
    desactivarPaginaActiva($indicadoresPagina);
    actualizarNumerosIndicadorPagina(accionar, indicadorPagina, $indicadoresPagina);
    mostrarPaginaActiva(numeroPaginaSolicitada, $indicadoresPagina);
    gestionarListadoPokemones(indicadorDefinitivo);
  }
}

export function gestionarCambioAnteriorPagina(numeroPaginaActual, $indicadoresPagina) {
  let indicadorPagina = numeroPaginaActual - 1;
  let numeroPaginaSolicitada = numeroPaginaActual - 2;
  const accionar = "anterior";
  const indicadorDefinitivo = calcularNumeroPokemonListado(numeroPaginaSolicitada);

  if (indicadorPagina === 0) {
    return false;
  } else if (indicadorPagina === 1) {
    actualizarNumerosIndicadorPagina(accionar, indicadorPagina, $indicadoresPagina);
    desactivarPaginaActiva($indicadoresPagina);
    mostrarPaginaActiva(numeroPaginaSolicitada, $indicadoresPagina);
    calcularNumeroPokemonListado(indicadorPagina);
    desactivarBotonAnteriorPagina();
    gestionarListadoPokemones(indicadorDefinitivo);
  } else {
    activarBotonSiguientePagina();
    desactivarPaginaActiva($indicadoresPagina);
    actualizarNumerosIndicadorPagina(accionar, indicadorPagina, $indicadoresPagina);
    mostrarPaginaActiva(numeroPaginaSolicitada, $indicadoresPagina);
    gestionarListadoPokemones(indicadorDefinitivo);
  }
}

export function gestionarActualizacionPagina(numeroPaginaSolicitada, $indicadoresPagina) {
  const indicadorPaginaASolicitar = numeroPaginaSolicitada - 1;
  const ACCIONAR = "especifico";

  const indicadorDefinitivo = calcularNumeroPokemonListado(indicadorPaginaASolicitar);

  actualizarNumerosIndicadorPagina(ACCIONAR, indicadorPaginaASolicitar, $indicadoresPagina);
  desactivarPaginaActiva($indicadoresPagina);
  mostrarPaginaActiva(indicadorPaginaASolicitar, $indicadoresPagina);
  activarBotonAnteriorPagina();
  gestionarListadoPokemones(indicadorDefinitivo);
}

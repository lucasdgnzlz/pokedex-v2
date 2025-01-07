import { validarPokemonABuscar } from "./validaciones/validaciones.js";
import { 
  gestionarListadoPokemones, 
  gestionarPedidoDataPokemonEspecifico, 
  gestionarCambioPaginaSiguiente, 
  gestionarCambioAnteriorPagina, 
  gestionarActualizacionPagina 
} from "./gestores/pokedex.js";
import { mostrarErrorValidacion, imprimirErrorValidacionBuscador } from "./ui/general.js";

// Variables globales

const $nombresPokemon = document.querySelectorAll(".nombre-pokemon-listado");

const $indicadoresPagina = document.querySelectorAll(".indicador-pagina"); // Indicadores de página del paginador
const $botonAnteriorPagina = document.querySelector(".boton-anterior-pagina"); // Botón página anterior del paginador
const $botonSiguientePagina = document.querySelector(".boton-siguiente-pagina"); // Botón página siguiente del paginador

// Inicio página

async function iniciarPagina(indicadorPagina = 0) {
  gestionarListadoPokemones(indicadorPagina);
}
iniciarPagina();

// DOM

/* Buscador */

const $botonBuscarPokemon = document.querySelector(".boton-buscar-pokemon");

$botonBuscarPokemon.addEventListener("click", () => {
  const pokemonABuscar = document.querySelector(".buscador-pokemon").value;

  const error = validarPokemonABuscar(pokemonABuscar);

  if (error !== "") {
    mostrarErrorValidacion();
    imprimirErrorValidacionBuscador(error);
  } else {
    gestionarPedidoDataPokemonEspecifico(pokemonABuscar);
  }
})

/* Listado pokemones */

$nombresPokemon.forEach(($nombrePokemon) => {
  $nombrePokemon.addEventListener("click", () => {
    const nombrePokemon = $nombrePokemon.textContent;
    gestionarPedidoDataPokemonEspecifico(nombrePokemon);
  })
})

/* Modal */

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

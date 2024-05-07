export function actualizarNumerosIndicadorPagina(accionar, paginaSolicitada, $indicadoresPagina) {
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

export function desactivarPaginaActiva() {
  const $contenedoresNumerosPagina = document.querySelectorAll(".pagina-item");

  $contenedoresNumerosPagina.forEach(($contenedorNumeroPagina) => {
    $contenedorNumeroPagina.classList.remove("active");
    const $enlaceNumeroPagina = $contenedorNumeroPagina.querySelector(".indicador-pagina");
    $enlaceNumeroPagina.classList.remove("active");
  });
}

export function mostrarPaginaActiva(paginaParaActivar, $indicadoresPagina) {
  const numeroPaginaACambiar = paginaParaActivar + 1;

  $indicadoresPagina.forEach(($indicadorPagina) => {
    const numeroIndicador = Number($indicadorPagina.textContent);

    if (numeroIndicador === numeroPaginaACambiar) {
      $indicadorPagina.classList.add("active");
    }
  });
}

export function desactivarBotonAnteriorPagina() {
  const $estadoBotonAnterior = document.querySelector(".indicador-estado-anterior");
  $estadoBotonAnterior.classList.add("disabled");

  const $botonAnteriorPagina = $estadoBotonAnterior.querySelector(".boton-anterior-pagina");
  $botonAnteriorPagina.classList.add("disabled");
}

export function activarBotonAnteriorPagina() {
  const $estadoBotonAnterior = document.querySelector(".indicador-estado-anterior");
  $estadoBotonAnterior.classList.remove("disabled");

  const $botonAnteriorPagina = $estadoBotonAnterior.querySelector(".boton-anterior-pagina");
  $botonAnteriorPagina.classList.remove("disabled");
}

export function desactivarBotonSiguientePagina() {
  const $estadoBotonSiguiente = document.querySelector(".indicador-estado-siguiente");
  $estadoBotonSiguiente.classList.add("disabled");

  const $botonSiguientePagina = $estadoBotonSiguiente.querySelector(".boton-siguiente-pagina");
  $botonSiguientePagina.classList.add("disabled");
}

export function activarBotonSiguientePagina() {
  const $estadoBotonSiguiente = document.querySelector(".indicador-estado-siguiente");
  $estadoBotonSiguiente.classList.remove("disabled");

  const $botonSiguientePagina = $estadoBotonSiguiente.querySelector(".boton-siguiente-pagina");
  $botonSiguientePagina.classList.remove("disabled");
}

export function imprimirErrorValidacionBuscador(error) {
  const $contenedorErrorValidacion = document.querySelector(".contenedor-error-validacion");
  const textoErrorValidacion = $contenedorErrorValidacion.querySelector(".error-validacion");
  textoErrorValidacion.textContent = error;
}

export function mostrarErrorValidacion() {
  const $contenedorErrorValidacion = document.querySelector(".contenedor-error-validacion");
  $contenedorErrorValidacion.id = "";
}

export function ocultarErrorValidacion() {
  const $contenedorErrorValidacion = document.querySelector(".contenedor-error-validacion");
  $contenedorErrorValidacion.id = "oculto";
}

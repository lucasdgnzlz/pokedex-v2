/// <reference types="Jest" />

import { actualizarNumerosIndicadorPagina, desactivarPaginaActiva, mostrarPaginaActiva, desactivarBotonAnteriorPagina, activarBotonAnteriorPagina, desactivarBotonSiguientePagina, activarBotonSiguientePagina, imprimirErrorValidacionBuscador, mostrarErrorValidacion, ocultarErrorValidacion } from "../general.js";
import fixturePrimeraListaPokemones from "../../../cypress/fixtures/listado-pagina-1.json";
import fixtureCharmander from "../../../cypress/fixtures/charmander.json";

describe("actualizarNumerosIndicadorPagina", () => {
  it("Actualiza los números del paginador con el accionar 'siguiente'", () => {
    document.body.innerHTML = `
    <a class="page-link indicador-pagina">1</a>
    <a class="page-link indicador-pagina">2</a>
    <a class="page-link indicador-pagina">3</a>`;

    const $indicadoresPagina = document.querySelectorAll(".indicador-pagina");
    const PAGINA_SOLICITADA = 1;
    const accionar = "siguiente";

    actualizarNumerosIndicadorPagina(accionar, PAGINA_SOLICITADA, $indicadoresPagina);
    const $indicadoresActualizados = document.querySelectorAll(".indicador-pagina");
    $indicadoresActualizados.forEach((indicadorPagina, index) => {
      const RESPUESTA_ESPERADA = ["3", "4", "5"];
      expect(indicadorPagina.textContent).toEqual(RESPUESTA_ESPERADA[index]);
    });
  });
});

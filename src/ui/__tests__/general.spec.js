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
    const PAGINA_SOLICITADA = 0;
    const accionar = "siguiente";

    actualizarNumerosIndicadorPagina(accionar, PAGINA_SOLICITADA, $indicadoresPagina);

    const $indicadoresActualizados = document.querySelectorAll(".indicador-pagina");
    $indicadoresActualizados.forEach((indicadorPagina, index) => {
      const RESPUESTA_ESPERADA = ["2", "3", "4"];
      expect(indicadorPagina.textContent).toEqual(RESPUESTA_ESPERADA[index]);
    });
  });

  it("Actualiza los números del paginador con el accionar 'anterior'", () => {
    document.body.innerHTML = `
    <a class="page-link indicador-pagina">2</a>
    <a class="page-link indicador-pagina">3</a>
    <a class="page-link indicador-pagina">4</a>`;

    const $indicadoresPagina = document.querySelectorAll(".indicador-pagina");
    const PAGINA_SOLICITADA = 1;
    const accionar = "anterior";

    actualizarNumerosIndicadorPagina(accionar, PAGINA_SOLICITADA, $indicadoresPagina);

    const $indicadoresActualizados = document.querySelectorAll(".indicador-pagina");
    $indicadoresActualizados.forEach((indicadorPagina, index) => {
      const RESPUESTA_ESPERADA = ["1", "2", "3"];
      expect(indicadorPagina.textContent).toEqual(RESPUESTA_ESPERADA[index]);
    });
  });

  it("Actualiza los números del paginador con el accionar 'especifico'", () => {
    document.body.innerHTML = `
    <a class="page-link indicador-pagina">1</a>
    <a class="page-link indicador-pagina">2</a>
    <a class="page-link indicador-pagina">3</a>`;

    const $indicadoresPagina = document.querySelectorAll(".indicador-pagina");
    const PAGINA_SOLICITADA = 2;
    const accionar = "especifico";

    actualizarNumerosIndicadorPagina(accionar, PAGINA_SOLICITADA, $indicadoresPagina);

    const $indicadoresActualizados = document.querySelectorAll(".indicador-pagina");
    $indicadoresActualizados.forEach((indicadorPagina, index) => {
      const RESPUESTA_ESPERADA = ["3", "4", "5"];
      expect(indicadorPagina.textContent).toEqual(RESPUESTA_ESPERADA[index]);
    });
  });

  it("No actualiza números al no coincidir el accionar solicitado", () => {
    document.body.innerHTML = `
    <a class="page-link indicador-pagina">1</a>
    <a class="page-link indicador-pagina">2</a>
    <a class="page-link indicador-pagina">3</a>`;

    const $indicadoresPagina = document.querySelectorAll(".indicador-pagina");
    const PAGINA_SOLICITADA = 2;
    const accionar = "Sevienebocaaa";

    expect(actualizarNumerosIndicadorPagina(accionar, PAGINA_SOLICITADA, $indicadoresPagina)).toBe(false);

    const $indicadoresActualizados = document.querySelectorAll(".indicador-pagina");
    $indicadoresActualizados.forEach((indicadorPagina, index) => {
      const RESPUESTA_ESPERADA = ["1", "2", "3"];
      expect(indicadorPagina.textContent).toEqual(RESPUESTA_ESPERADA[index]);
    });
  });
});

describe("desactivarPaginaActiva", () => {
  it("Desactiva la página que esté activa en ese momento", () => {
    document.body.innerHTML = `
    <li class="page-item pagina-item">
      <a class="indicador-pagina"></a>
    </li>
    <li class="page-item pagina-item">
      <a class="indicador-pagina"></a>
    </li>
    <li class="page-item pagina-item active">
      <a class="indicador-pagina active"></a>
    </li>`;

    desactivarPaginaActiva();

    const $paginasItem = document.querySelectorAll(".pagina-item");
    $paginasItem.forEach((pagina) => {
      expect(pagina.classList.contains("active")).toBe(false);
    });
  });
});

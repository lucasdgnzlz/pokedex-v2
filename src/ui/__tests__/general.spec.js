/// <reference types="Jest" />

import { actualizarNumerosIndicadorPagina, desactivarPaginaActiva, mostrarPaginaActiva, desactivarBotonAnteriorPagina, activarBotonAnteriorPagina, desactivarBotonSiguientePagina, activarBotonSiguientePagina, imprimirErrorValidacionBuscador, mostrarErrorValidacion, ocultarErrorValidacion } from "../general.js";

describe("actualizarNumerosIndicadorPagina", () => {
  afterEach(() => {
    document.body.innerHTML = ''; // Limpiar el DOM
  });

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
  afterEach(() => {
    document.body.innerHTML = ''; // Limpiar el DOM
  });

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

    const $indicadoresPagina = document.querySelectorAll(".indicador-pagina");

    desactivarPaginaActiva($indicadoresPagina);

    const $paginasItem = document.querySelectorAll(".pagina-item");
    $paginasItem.forEach((pagina, i) => {
      expect(pagina.classList.contains("active")).toBe(false);
      expect($indicadoresPagina[i].classList.contains("active")).toBe(false);
    });
  });
});

describe("mostrarPaginaActiva", () => {
  afterEach(() => {
    document.body.innerHTML = ''; // Limpiar el DOM
  });

  it("Muestra la página que tiene que ser activa", () => {
    document.body.innerHTML = `
    <a class="page-link indicador-pagina">3</a>
    <a class="page-link indicador-pagina">4</a>
    <a class="page-link indicador-pagina">5</a>`;

    const $indicadoresPagina = document.querySelectorAll(".indicador-pagina");
    const indicadorPaginaParaActivar = 2;
    mostrarPaginaActiva(indicadorPaginaParaActivar, $indicadoresPagina);

    const $indicadoresActualizados = document.querySelectorAll(".indicador-pagina");
    $indicadoresActualizados.forEach(($indicadorPagina) => {
      const numeroIndicador = Number($indicadorPagina.textContent);

      if (numeroIndicador === indicadorPaginaParaActivar + 1) {
        expect($indicadorPagina.classList.contains("active")).toBe(true);
      } else {
        expect($indicadorPagina.classList.contains("active")).toBe(false);
      }
    })
  });
});

describe("desactivarBotonAnteriorPagina", () => {
  afterEach(() => {
    document.body.innerHTML = ''; // Limpiar el DOM
  });

  it("Desactiva el botón anterior página", () => {
    document.body.innerHTML = `
    <li class="page-item indicador-estado-anterior">
      <a class="page-link boton-anterior-pagina" aria-label="Previous">
        <span aria-hidden="true">«</span>
      </a>
    </li>`;

    desactivarBotonAnteriorPagina();
    const $estadoBotonAnterior = document.querySelector(".indicador-estado-anterior");
    const $botonAnteriorPagina = $estadoBotonAnterior.querySelector(".boton-anterior-pagina");
    expect($estadoBotonAnterior.classList.contains("disabled")).toBe(true);
    expect($botonAnteriorPagina.classList.contains("disabled")).toBe(true);
  });
});

describe("activarBotonAnteriorPagina", () => {
  afterEach(() => {
    document.body.innerHTML = ''; // Limpiar el DOM
  });

  it("Activa el botón de anterior página", () => {
    document.body.innerHTML = `
    <li class="page-item indicador-estado-anterior disabled">
      <a class="page-link boton-anterior-pagina" aria-label="Previous">
        <span aria-hidden="true">«</span>
      </a>
    </li>`;

    activarBotonAnteriorPagina();
    const $estadoBotonAnterior = document.querySelector(".indicador-estado-anterior");
    const $botonAnteriorPagina = $estadoBotonAnterior.querySelector(".boton-anterior-pagina");
    expect($estadoBotonAnterior.classList.contains("disabled")).toBe(false);
    expect($botonAnteriorPagina.classList.contains("disabled")).toBe(false);
  });
});

describe("desactivarBotonSiguientePagina", () => {
  afterEach(() => {
    document.body.innerHTML = ''; // Limpiar el DOM
  });

  it("Desactiva el botón siguiente página", () => {
    document.body.innerHTML = `
    <li class="page-item indicador-estado-siguiente">
      <a class="page-link boton-siguiente-pagina" aria-label="Next">
        <span aria-hidden="true">»</span>
      </a>
    </li>`;

    desactivarBotonSiguientePagina();
    const $estadoBotonSiguiente = document.querySelector(".indicador-estado-siguiente");
    const $botonSiguientePagina = $estadoBotonSiguiente.querySelector(".boton-siguiente-pagina");
    expect($estadoBotonSiguiente.classList.contains("disabled")).toBe(true);
    expect($botonSiguientePagina.classList.contains("disabled")).toBe(true);
  });
});

describe("activarBotonSiguientePagina", () => {
  afterEach(() => {
    document.body.innerHTML = ''; // Limpiar el DOM
  });

  it("Activa el botón siguiente página", () => {
    document.body.innerHTML = `
    <li class="page-item indicador-estado-siguiente disabled">
      <a class="page-link boton-siguiente-pagina disabled" aria-label="Next">
        <span aria-hidden="true">»</span>
      </a>
    </li>`;

    activarBotonSiguientePagina();
    const $estadoBotonSiguiente = document.querySelector(".indicador-estado-siguiente");
    const $botonSiguientePagina = $estadoBotonSiguiente.querySelector(".boton-siguiente-pagina");
    expect($estadoBotonSiguiente.classList.contains("disabled")).toBe(false);
    expect($botonSiguientePagina.classList.contains("disabled")).toBe(false);
  });
});

describe("imprimirErrorValidacionBuscador", () => {
  afterEach(() => {
    document.body.innerHTML = ''; // Limpiar el DOM
  });

  it("Imprime error de validación del buscador", () => {
    document.body.innerHTML = `
    <div class="contenedor-error-validacion" id="">
      <p class="error-validacion"></p>
    </div>`;

    const ERROR_PRUEBA = "Error: Noches alegres mañanas triste";

    const $contenedorErrorValidacion = document.querySelector(".contenedor-error-validacion");
    const textoErrorValidacion = $contenedorErrorValidacion.querySelector(".error-validacion");
    expect(textoErrorValidacion.textContent).toEqual("");

    imprimirErrorValidacionBuscador(ERROR_PRUEBA);

    const textoErrorValidacionActualizado = $contenedorErrorValidacion.querySelector(".error-validacion");
    expect(textoErrorValidacionActualizado.textContent).toEqual(ERROR_PRUEBA);
  });
});

describe("mostrarErrorValidacion", () => {
  afterEach(() => {
    document.body.innerHTML = ''; // Limpiar el DOM
  });

  it("Cambia la visibilidad del error de validación para que se vea", () => {
    document.body.innerHTML = `
    <div class="contenedor-error-validacion" id="oculto">
      <p class="error-validacion"></p>
    </div>`;

    const $contenedorErrorValidacion = document.querySelector(".contenedor-error-validacion");
    expect($contenedorErrorValidacion.id).toEqual("oculto");

    mostrarErrorValidacion();

    const $contenedorErrorValidacionActualizado = document.querySelector(".contenedor-error-validacion");
    expect($contenedorErrorValidacionActualizado.id).toEqual("");
  });
});

describe("ocultarErrorValidacion", () => {
  afterEach(() => {
    document.body.innerHTML = ''; // Limpiar el DOM
  });
  
  it("Oculta el error de validación", () => {
    document.body.innerHTML = `
    <div class="contenedor-error-validacion" id="">
      <p class="error-validacion"></p>
    </div>`;

    const $contenedorErrorValidacion = document.querySelector(".contenedor-error-validacion");
    expect($contenedorErrorValidacion.id).toEqual("");

    ocultarErrorValidacion();

    const $contenedorErrorValidacionActualizado = document.querySelector(".contenedor-error-validacion");
    expect($contenedorErrorValidacionActualizado.id).toEqual("oculto");
  });
});

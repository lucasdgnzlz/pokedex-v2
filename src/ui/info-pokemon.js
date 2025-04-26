export function imprimirNombresPokemon(listaNombresPokemones) {
  const $nombresPokemon = document.querySelectorAll(".nombre-pokemon-listado");

  $nombresPokemon.forEach(($botonNombrePokemon, i) => {
    const nombrePokemon = listaNombresPokemones[i];
    $botonNombrePokemon.textContent = nombrePokemon;
  });
}

export function imprimirInformacionPokemonEspecifico(nuevoPokemon) {
  imprimirNombrePokemonElegido(nuevoPokemon);
  imprimirIdPokemonElegido(nuevoPokemon);
  mostrarImagenPokemonElegido(nuevoPokemon);
  imprimirTiposPokemonElegido(nuevoPokemon);
  imprimirStatsPokemonElegido(nuevoPokemon);
  imprimirHabilidadesPokemon(nuevoPokemon);
  mostrarInformacionPokemon();
}

function imprimirNombrePokemonElegido(nuevoPokemon) {
  const $nombrePokemon = document.querySelector(".nombre-pokemon");
  $nombrePokemon.textContent = nuevoPokemon["nombre"];
}

function imprimirIdPokemonElegido(nuevoPokemon) {
  const $idPokemon = document.querySelector(".id-pokemon");
  $idPokemon.textContent = `#${nuevoPokemon["id"]}`;
}

function mostrarImagenPokemonElegido(nuevoPokemon) {
  const $imagenPokemon = document.querySelector("#imagen-pokemon");
  $imagenPokemon.src = nuevoPokemon["imagenPokemon"];
}

function imprimirTiposPokemonElegido(nuevoPokemon) {
  const $tiposPokemonElegido = document.querySelectorAll(".imagen-tipos-pokemon");
  const tiposPokemonElegido = nuevoPokemon["tipos"];

  tiposPokemonElegido.forEach((tipoPokemon, i) => {
    $tiposPokemonElegido[i].src = `img/tipos/${tipoPokemon}.svg`;
  });

  if (tiposPokemonElegido.length === 1) {
    $tiposPokemonElegido[1].id = "oculto";
  } else {
    $tiposPokemonElegido[1].id = "";
  }
}

function imprimirStatsPokemonElegido(nuevoPokemon) {
  const estadisticasPokemon = nuevoPokemon["estadisticas"];

  const $vidaBasePokemon = document.querySelector(".vida-base-respuesta");
  const $ataqueBasePokemon = document.querySelector(".ataque-base-respuesta");
  const $defensaBasePokemon = document.querySelector(".defensa-base-respuesta");
  const $ataqueEspecialPokemon = document.querySelector(".ataque-especial-base-respuesta");
  const $defensaEspecialPokemon = document.querySelector(".defensa-especial-base-respuesta");
  const $velocidadBasePokemon = document.querySelector(".velocidad-base-respuesta");

  $vidaBasePokemon.textContent = estadisticasPokemon.vidaBasePokemon;
  $ataqueBasePokemon.textContent = estadisticasPokemon.ataqueBasePokemon;
  $defensaBasePokemon.textContent = estadisticasPokemon.defensaBasePokemon;
  $ataqueEspecialPokemon.textContent = estadisticasPokemon.ataqueEspecialBasePokemon;
  $defensaEspecialPokemon.textContent = estadisticasPokemon.defensaEspecialBasePokemon;
  $velocidadBasePokemon.textContent = estadisticasPokemon.velocidadBasePokemon;
}

function imprimirHabilidadesPokemon(nuevoPokemon) {
  const $contenedorHabilidadesPokemon = document.querySelector(".lista-habilidades");

  while ($contenedorHabilidadesPokemon.firstChild) {
    $contenedorHabilidadesPokemon.removeChild($contenedorHabilidadesPokemon.firstChild);
  }

  const cantidadHabilidadesPokemon = nuevoPokemon["habilidades"].length;
  crearItemsListaHabilidades(cantidadHabilidadesPokemon);

  const $habilidadesPokemon = document.querySelectorAll(".item-lista-habilidades");
  const habilidadesPokemon = nuevoPokemon["habilidades"];

  habilidadesPokemon.forEach((habilidadPokemon, i) => {
    $habilidadesPokemon[i].textContent = habilidadPokemon;
  });
}

function mostrarInformacionPokemon() {
  const $bloqueInformacionPokemon = document.querySelector(".contenedor-informacion-pokemon");
  $bloqueInformacionPokemon.id = "";
}

function crearItemsListaHabilidades(cantidadHabilidades) {
  const $listaHabilidadesPokemon = document.querySelector(".lista-habilidades");

  for (let i = 0; i < cantidadHabilidades; i++) {
    const itemListaHabilidades = document.createElement("li");
    itemListaHabilidades.className = "habilidad-pokemon item-lista-habilidades";
    $listaHabilidadesPokemon.appendChild(itemListaHabilidades);
  }
}

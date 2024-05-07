export function imprimirNombresPokemon(listaNombresPokemones) {
  const $nombresPokemon = document.querySelectorAll(".nombre-pokemon-listado");

  $nombresPokemon.forEach(($botonNombrePokemon, i) => {
    const nombrePokemon = listaNombresPokemones[i];
    $botonNombrePokemon.textContent = nombrePokemon;
  });
}

export function imprimirInformacionPokemonEspecifico(infoPokemon) {
  imprimirNombrePokemonElegido(infoPokemon);
  imprimirIdPokemonElegido(infoPokemon);
  mostrarImagenPokemonElegido(infoPokemon);
  imprimirTiposPokemonElegido(infoPokemon);
  imprimirStatsPokemonElegido(infoPokemon);
  imprimirHabilidadesPokemon(infoPokemon);
  mostrarInformacionPokemon();
}

function imprimirNombrePokemonElegido(infoPokemon) {
  const $nombrePokemon = document.querySelector(".nombre-pokemon");
  $nombrePokemon.textContent = infoPokemon["nombre"];
}

function imprimirIdPokemonElegido(infoPokemon) {
  const $idPokemon = document.querySelector(".id-pokemon");
  $idPokemon.textContent = `#${infoPokemon["id"]}`;
}

function mostrarImagenPokemonElegido(infoPokemon) {
  const $imagenPokemon = document.querySelector("#imagen-pokemon");
  $imagenPokemon.src = infoPokemon["imagenPokemon"];
}

function imprimirTiposPokemonElegido(infoPokemon) {
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

function imprimirStatsPokemonElegido(infoPokemon) {
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

function imprimirHabilidadesPokemon(infoPokemon) {
  const $contenedorHabilidadesPokemon = document.querySelector(".lista-habilidades");

  while ($contenedorHabilidadesPokemon.firstChild) {
    $contenedorHabilidadesPokemon.removeChild($contenedorHabilidadesPokemon.firstChild);
  }

  const cantidadHabilidadesPokemon = (infoPokemon["habilidades"]).length;
  crearItemsListaHabilidades(cantidadHabilidadesPokemon);

  const $habilidadesPokemon = document.querySelectorAll(".item-lista-habilidades");
  const habilidadesPokemon = infoPokemon["habilidades"];

  habilidadesPokemon.forEach((habilidadPokemon, i) => {
    $habilidadesPokemon[i].textContent = habilidadPokemon;
  })
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

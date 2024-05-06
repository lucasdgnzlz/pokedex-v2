export function validarPokemonABuscar(pokemon) {
  const regex = /^[a-zA-Z0-9]+$/;

  if (pokemon === "") {
    return "Error: El campo está vacío"
  }
  else if (!regex.test(pokemon)) {
    return "Error: Nombre no válido";
  } else {
    return "";
  }
}
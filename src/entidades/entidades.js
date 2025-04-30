export class Pokemon {
  constructor({ nombre, id, fotoPrincipal, tipos, estadisticas, habilidades }) {
    this.nombre = nombre;
    this.id = id;
    this.imagenPokemon = fotoPrincipal;
    this.tipos = tipos;
    this.estadisticas = estadisticas;
    this.habilidades = habilidades;
  }
}

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

export class ListadoDePokemones {
  constructor(dataListadoPokemones) {
    this.count = dataListadoPokemones.count;
    this.next = dataListadoPokemones.next;
    this.previous = dataListadoPokemones.previous;
    this.results = dataListadoPokemones.results;
  }
}

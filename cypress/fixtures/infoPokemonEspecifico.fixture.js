export default `
  <div id="oculto" class="contenedor-informacion-pokemon">
    <div class="contenedor-identificacion-pokemon">
      <h3 class="nombre-pokemon"></h3>
      <h5 class="id-pokemon"></h5>
    </div>

    <div class="contenedor-imagen-pokemon">
      <img src="" id="imagen-pokemon" />
    </div>

    <div class="contenedor-tipos-pokemon">
      <div class="contenedor-imagen-tipo">
        <img class="imagen-tipos-pokemon imagen-primer-tipo" src="" />
      </div>

      <div class="contenedor-imagen-tipo">
        <img class="imagen-tipos-pokemon imagen-segundo-tipo" src="" />
      </div>
    </div>

    <div class="contenedor-stats-pokemon">
      <div class="contenedor-titulo-stats">
        <h4 class="titulo-stats-pokemon">Stats</h4>
      </div>

      <div class="contenedor-listas-stats">
        <ul class="lista-stats">
          <li class="vida-base item-lista-stats">Vida:</li>
          <li class="ataque-base item-lista-stats">Ataque:</li>
          <li class="defensa-base item-lista-stats">Defensa:</li>
          <li class="ataque-especial-base item-lista-stats">Ataque especial:</li>
          <li class="defensa-especial-base item-lista-stats">Defensa especial:</li>
          <li class="velocidad-base item-lista-stats">Velocidad:</li>
        </ul>

        <ul class="lista-respuestas-stats">
          <li class="vida-base-respuesta item-lista-stats"></li>
          <li class="ataque-base-respuesta item-lista-stats"></li>
          <li class="defensa-base-respuesta item-lista-stats"></li>
          <li class="ataque-especial-base-respuesta item-lista-stats"></li>
          <li class="defensa-especial-base-respuesta item-lista-stats"></li>
          <li class="velocidad-base-respuesta item-lista-stats"></li>
        </ul>
      </div>
    </div>

    <div class="contenedor-habilidades-pokemon">
      <div class="contenedor-titulo-habilidades">
        <h4 class="titulo-habilidades-pokemon">Habilidades</h4>
      </div>
      <ul class="lista-habilidades"></ul>
    </div>
  </div>`;
  
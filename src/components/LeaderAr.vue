<template>
    <section id="home">
    <div class="contenedor">
      <img src="../assets/fondo.png" class="fondo-imagen">
      <div class="texto-contenedor">
        <h1 class="iglesia">Iglesia Bautista Centro De Edificación Familiar</h1>
        <h2 class="objetivo">
          Nuestro Objetivo como comunidad es dar<br> a conocer el mensaje de salvación
          a todas <br>las personas posibles como servidores de Cristo Jesús
        </h2>
        <img class="logo" src="../assets/Logo/logo.png">
      </div>
    </div>
</section>
  </template>
  
  <script>
  export default {
    name: "LeaderAr",
    components: {}
  }
  </script>
  
  <style scoped>
  .contenedor {
    width: 100%;
    height: 100vh; /* Hace que el contenedor ocupe toda la altura de la ventana */
    display: flex;
    justify-content: center; /* Centra horizontalmente */
    align-items: center; /* Centra verticalmente */
    overflow: hidden; /* Oculta cualquier parte de la imagen que se salga del contenedor */
    position: relative;
  }
  
  .fondo-imagen {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Escala la imagen para que ocupe todo el contenedor sin distorsionarse */
    position: absolute;
    top: 0;
    left: 0;
  }
  
  .texto-contenedor {
    position: relative;
    z-index: 1; /* Asegura que el texto esté sobre la imagen */
    text-align: center;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center; /* Centra verticalmente el contenido */
    align-items: center; /* Centra horizontalmente el contenido */
    height: 100%;
    padding: 0 20px; /* Añade un poco de padding para asegurar que el texto no toque los bordes */
  }
  
  .iglesia {
    font-weight: 700;
    font-size: 67px;
    margin: 0;
    position: relative;
    top: -29px;
}
  
  
  .objetivo {
    font-weight: 700;
    font-size: 29px;
    margin: 20px 0 0 0;
    position: relative;
    top: -16px;
    left: -26px;
  }
  .logo{
    width: 12%;
    margin: 20px 0 0 0;
    position: relative;
    top: 53px;
    left: -26px;

  }
  </style>
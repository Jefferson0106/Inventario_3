<template>
    <section class="gallery" id="portafolio">
  <div class="contenedor">
    <h2 class="subtitulo">Portafolio</h2>
    <div class="contenedor-galeria">
      <img src="../assets/images_Proyecto/portafolio.png" alt="" class="img-galeria">
      <img src="../assets/images_Proyecto/portafolio2.png" alt="" class="img-galeria">
      <img src="../assets/images_Proyecto/portafolio3.png" alt="" class="img-galeria">

    </div>
  </div>
</section>


</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Poppins', sans-serif;
}

.contenedor {
    width: 90%;
    max-width: 1200px;
    overflow: hidden;
    margin: auto;
    padding: 60px 0;
}

.subtitulo {
    text-align: center;
    font-weight: 700;
    margin-bottom: 40px;
    font-size: 40px;
}




.contenedor-galeria{
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
}

.img-galeria {
    object-fit: cover;
    width: 30%;
    display: block;
    margin-bottom: 15px;
    box-shadow: 0 0 6px rgb(0, 0, 0, 0.5);
    cursor: pointer;
}

.img-galeria:hover{
    transition: all 0.3s ease-in-out;
    transform: scale(1.1);
}

.imagen-light{
    position: fixed;
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translate(100%);
    transition: transform .2s ease-in-out;
}

.show{
    transform: translate(0);
}

.agregar-imagen {
    object-fit: cover;
    width: 60%;
    border-radius: 10px;
    transform: scale(0);
    transition: transform .3s .2s;
}

.showImage{
    transform: scale(1);
}

.close {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 40px;
    cursor: pointer;
    color:#fff;
    font-size: 25px;
}

</style>
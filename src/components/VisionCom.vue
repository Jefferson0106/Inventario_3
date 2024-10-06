<template>
    <section id="vision">
      <div class="container">
        <h1>Vision</h1>
        <div class="content">
          <div class="image-container">
            <img src="../assets/images_Proyecto/vision.png" class="main-image">
          </div>
          <div class="text-content">
            <h1>¿ cual es nuestra vision?</h1>
            <p>
                Ser un familia-Iglesia de crecimiento sostenido que provea un hogar espiritual seguro para el desarrollo integral de cada uno de los miembros de los hogares, a través de escuelas de desarrollo familiar

            </p>
          </div>
        </div>
      </div>
    </section>
  </template>

  <script>
  export default {
    name: "MisionCom",
    components: {}
  }
  </script>
  
  .<style scoped>
.container {
    padding: 20px;
  }
  
  h1 {
    font-size: 54px;
    text-align: center;
    margin-bottom: 20px;
    position: relative;
    left: 181px;
  }
  
  .content {
    display: flex;
    align-items: flex-start;
    gap: 20px; /* Espacio entre la imagen y el texto */
  }
  
  .image-container {
    display: flex;
    flex-direction: column;
    gap: 20px; /* Espacio entre las imágenes */
    flex: 1; /* Asegura que el contenedor de imágenes ocupe el espacio necesario */
  }
  
  img {
    width: 122%;
    position: relative;
    top: 48px;
    left: -75px;
  }
  
  .main-image {
    max-height: 300px; /* Ajusta el tamaño máximo de la primera imagen */
    object-fit: cover;
  }
  
  .additional-image {
    max-height: 252px;
    object-fit: cover;
    position: relative;
    top: 138px;
  }
  
  .text-content {
    flex: 2;
    padding: 20px;
  }
  
  .text-content h1 {
    font-size: 32px;
    position: relative;
    left: -2px;
  }
  
  .text-content p {
    font-size: 16px;
    position: relative;
    left: 25px;
  }
</style>
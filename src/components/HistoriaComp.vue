<template>
    <section id="historia">
      <div class="container">
        <h1>Nuestra Historia</h1>
        <div class="content">
          <div class="image-container">
            <img src="../assets/images_Proyecto/familia.png" class="main-image">
            <img src="../assets/images_Proyecto/familia2.png" class="additional-image">
          </div>
          <div class="text-content">
            <h1>Reseña de la Iglesia Bautista Centro de Edificación Familiar 2024</h1>
            <p>
              Todo comenzó cuando Dios colocó la inquietud en un grupo de familias que querían capacitarse y formar una iglesia. Estas reuniones empezaron a adquirir forma de células las cuales asistían la familia Landaeta Martínez, Andrade Campos y Rami de Guedes, estas personas fueron dirigidas por la familia pastoral conformada por Benjamín y Maritza de Zambrano y su hijo Nathaniel Zambrano. Siendo ellos anteriormente miembros de la primera Iglesia Bautista de Barquisimeto, lo que serían los fundadores de esta familia iglesia (2008 - 2010). Un 24 de enero del 2010 fue constituida la Iglesia Bautista CEF, bajo la cobertura de la primera Iglesia Bautista de Barquisimeto siendo realizada dicha celebración en las instalaciones de la Iglesia Bautista central de Araure durante este mes enfrentamos nuestro primer reto, llamada la fiesta del amigo, la cual asistieron un gran número de personas que sobrepasó las expectativas. Estas mismas personas fueron edificadas las cuales recibieron a nuestro señor Jesucristo como señor y Salvador, asimismo fueros integrados en una escuela de desarrollo familiar, la cual llamamos edf. Entre los años 2012 y 2013 la iglesia vivió un proceso y con la ayuda de Dios la iglesia siguió trabajando en diferentes actividades siendo dirigidos por una comisión de púlpito. Pero el Señor contestando nuestras oraciones un 17 de agosto del 2013 se fueron nombrados como pastores Alexis Jiménez y familia. Mitad del 2015 la iglesia vuelve a tener un proceso donde queda dirigida por una comisión de púlpito hasta el año 2018 recibiendo a la familia Ministerial Zabaleta Torres como pastores, los cuales estuvieron hasta el 2020. Un primero de agosto del 2020 el señor hace el llamado al pastor Raúl Castillo una familia interna edificada y desarrollada dentro de la misma hasta el día de hoy. Esta es la identidad de la que hoy conocemos como IBCEF, una familia iglesia comprometida a llevar el evangelio de Dios cada una de las familias que residen el estado, país y mundo. Como iglesia hemos tenido una serie de retos y pruebas, lo cual damos gracias a Dios porque a pesar de las dificultades hemos salido victoriosos, y hoy en día podemos asegurar y afirmar con los ojos cerrados que nuestro padre celestial siempre ha estado con nosotros y es quien ha tenido el control de todas las situaciones presentadas.
            </p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: "HistoriaComp",
    components: {}
  }
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
  }
  
  h1 {
    font-size: 54px;
   
    text-align: center;
    margin-bottom: 20px;
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
    top: 94px;
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
  
  }
  
  .text-content p {
    font-size: 16px;
  
  }
  </style>
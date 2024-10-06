<template>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-logo">
          <img src="../assets/Logo/logo.png" alt="Logo" />
        </div>
        <div class="footer-links">
          <a href="#home">Inicio</a>
          <a href="#historia">Historia</a>
          <a href="#conocenos">Conócenos</a>
          <a href="#mision">Misión</a>
          <a href="#vision">Visión</a>
          <a href="#portafolio">Portafolio</a>
          <a href="#contact">Contáctanos</a>
        </div>
        <div class="footer-info">
          <p><strong>Pastor:</strong> Raúl Castillo</p>
          <p><strong>Secretaria:</strong> Elena Piña</p>
          <p><strong>Tesorera:</strong> Noris Camacaro</p>
          <p><strong>Ubicación:</strong> Calle 8, entre Av.26 y Eduardo Cholet</p>
        </div>
        <div class="footer-social">
          <a href="#"><i class="fab fa-facebook-f"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
        </div>
      </div>
    </footer>
  </template>
  
  <style scoped>
  .footer {
    background-color: #333;
    color: blanchedalmond;
    padding: 20px 0;
    text-align: center;
    width: 100%;
  }
  
  .footer-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .footer-logo img {
    max-width: 124px;
      position: relative;
      top: 50px;
  }
  
  .footer-links {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
  }
  
  .footer-links a {
    color: blanchedalmond;
    text-decoration: none;
    margin: 5px 0;
  }
  
  .footer-info {
    margin: 10px 0;
  }
  
  .footer-social a {
    color: blanchedalmond;
    margin: 0 10px;
    text-decoration: none;
    font-size: 30px;
    position: relative;
    top:  80px;
  }
  </style>
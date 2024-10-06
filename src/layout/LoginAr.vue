<template>
    <div class="about">
      <head>
        <title>Webpage Design</title>
      </head>
  
      <div class="main">
        <div class="navbar">
          <div class="icon">
            <h2 class="logo">I.B.C.E.F</h2> 
          </div>
  
          <div class="menu">
            <ul>
              <li><a href="#" @click="home">HOME</a></li>
              <li><a href="#historia">Historia</a></li>
      <li><a href="#conocenos">Conócenos</a></li>
      <li><a href="#mision">Mision</a></li>
      <li><a href="#vision">vision</a></li>
      <li><a href="#portafolio">portafolio</a></li>
      <li><a href="#contact">Contáctanos</a></li>
            </ul>
          </div>
        </div> 
  
        <div class="content">
          <h1>Inventario  <br><span>I.B.C.E.F</span> <br></h1>
          <p class="par">Este sistema  Permite que los usuarios puedan llevar un control forma ordenada <br> de los producto que hay en nuestra organizacion, te ofrece
                <br>  una seguridad de ultima gama, gracias ha que ha sido desarrollodo 
              <br>con las ultimas tecnologias en sistemas desarrollados en api <br> saber mas de nosotros pulsa el boton conocenos</p>
  
          <button class="cn"><a href="#conos">conocenos</a></button>
  
          <div class="form">
          <h2>Inicia Sesión</h2>
          <form action="#" v-on:submit.prevent="login">
            <input type="email" placeholder="Correo" v-model="correo" required>
            <input type="password" placeholder="Contraseña" v-model="contrasena" required>
            <button class="btnn">Login</button>
          </form>

          <div class="alert alert-danger" role="alert" v-if="error">
                       {{ error_msg }}
</div>
  
            <!---p class="link">Don't have an account<br>
            <a href="#">Sign up </a></p>
            <p class="liw">Log in with</p> -->
  
            <div class="icons">
              <a href="#"><ion-icon name="logo-facebook"></ion-icon></a>
              <a href="#"><ion-icon name="logo-instagram"></ion-icon></a>
              <a href="#"><ion-icon name="logo-twitter"></ion-icon></a>
              <a href="#"><ion-icon name="logo-google"></ion-icon></a>
              <a href="#"><ion-icon name="logo-skype"></ion-icon></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>


<script>
import axios from 'axios';
export default {
  name: 'LoginAr',
  data() {
    return {
      correo: "",
      contrasena: "",
      error: false,
      error_msg: "",
    };
  },
  methods: {
    login() {
      axios.get('https://localhost:7061/api/Usuario/Lista')
        .then(response => {
          if (response.status === 200) {
            let results = response.data.response;
            let userToLoad = results.find(element => element.correo === this.correo);

            if (userToLoad && userToLoad.contrasena === this.contrasena) {
              // Obtener la lista de roles
              axios.get('https://localhost:7061/api/Role/Lista')
                .then(roleResponse => {
                  if (roleResponse.status === 200) {
                    // Guardar roles en localStorage
                    localStorage.setItem("roles", JSON.stringify(roleResponse.data));
                    localStorage.setItem("Rol", userToLoad.idRol);
                    localStorage.setItem("userName", userToLoad.nombreCompleto); // Guarda el nombre del usuario
                    this.$router.push({ path: "/dashboard" });
                  } else {
                    this.error = true;
                    this.error_msg = "Error: No se pudo obtener la lista de roles.";
                  }
                })
                .catch(roleError => {
                  console.error('Error al obtener la lista de roles:', roleError);
                  this.error = true;
                  this.error_msg = "Error: No se pudo obtener la lista de roles.";
                });
            } else {
              this.error = true;
              this.error_msg = "Error: Los datos ingresados no coinciden con nuestros registros.";
            }
          } else {
            this.error = true;
            this.error_msg = "Error: Hubo un problema al procesar tu solicitud.";
          }
        })
        .catch(error => {
          console.error('Error al realizar la solicitud:', error);
          this.error = true;
          this.error_msg = "Error: Hubo un problema al procesar tu solicitud.";
        });
    },
    home(){
        this.$router.push({ path: "/PublicidadEr" });
    }
  }
}
</script>

<style scoped>
/* Made with love by Mutiullah Samim*/
*{
    margin: 0;
    padding: 0;
}

.main{
    width: 100%;
    background: linear-gradient(to top, rgba(0,0,0,0.5)50%,rgba(0,0,0,0.5)50%), url(../assets/fondo.png);
    background-position: center;
    background-size: cover;
    height: 100vh;
}

.navbar{
    width: 1200px;
    height: 75px;
    margin: auto;
}

.icon{
    width: 200px;
    float: left;
    height: 70px;
}

.logo{
    color: #ff7200;
    font-size: 35px;
    font-family: Arial;
    padding-left: 20px;
    float: left;
    padding-top: 10px;
    margin-top: 5px
}

.menu{
    width: 400px;
    float: left;
    height: 70px;
}

ul{
    float: left;
    display: flex;
    position: relative;
    left: -541px;
    justify-content: center;
    align-items: center;
}

ul li{
    list-style: none;
    margin-left: 62px;
    margin-top: 27px;
    font-size: 14px;
}

ul li a{
    text-decoration: none;
    color: #fff;
    font-family: Arial;
    font-weight: bold;
    transition: 0.4s ease-in-out;
}

ul li a:hover{
    color: #ff7200;
}

.search{
    width: 330px;
    float: left;
    margin-left: 270px;
}

.srch{
    font-family: 'Times New Roman';
    width: 200px;
    height: 40px;
    background: transparent;
    border: 1px solid #ff7200;
    margin-top: 13px;
    color: #fff;
    border-right: none;
    font-size: 16px;
    float: left;
    padding: 10px;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
}

.btn{
    width: 100px;
    height: 40px;
    background: #ff7200;
    border: 2px solid #ff7200;
    margin-top: 13px;
    color: #fff;
    font-size: 15px;
    border-bottom-right-radius: 5px;
    border-bottom-right-radius: 5px;
    transition: 0.2s ease;
    cursor: pointer;
}
.btn:hover{
    color: #000;
}

.btn:focus{
    outline: none;
}

.srch:focus{
    outline: none;
}

.content{
    width: 1200px;
    height: auto;
    margin: auto;
    color: #fff;
    position: relative;
}

.content .par{
    padding-left: 20px;
    padding-bottom: 25px;
    font-family: Arial;
    letter-spacing: 1.2px;
    line-height: 30px;
}

.content h1{
    font-family: 'Times New Roman';
    font-size: 50px;
    padding-left: 20px;
    margin-top: 9%;
    letter-spacing: 2px;
}

.content .cn{
    width: 160px;
    height: 40px;
    background: #ff7200;
    border: none;
    margin-bottom: 10px;
    margin-left: 20px;
    font-size: 18px;
    border-radius: 10px;
    cursor: pointer;
    transition: .4s ease;
    
}

.content .cn a{
    text-decoration: none;
    color: #000;
    transition: .3s ease;
}

.cn:hover{
    background-color: #fff;
}

.content span{
    color: #ff7200;
    font-size: 65px
}

.form{
  width: 348px;
    height: 380px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.8) 50%);
    position: absolute;
    top: -20px;
    left: 814px;
    transform: translate(0%, -5%);
    border-radius: 10px;
    padding: 25px;
}

.form h2{
  width: 220px;
    position: relative;
    left: 34px;
    font-family: sans-serif;
    text-align: center;
    color: #ff7200;
    font-size: 22px;
    background-color: #fff;
    border-radius: 10px;
    margin: 2px;
    padding: 8px;

}

.form input{
    width: 240px;
    height: 35px;
    background: transparent;
    border-bottom: 1px solid #ff7200;
    border-top: none;
    border-right: none;
    border-left: none;
    color: #fff;
    font-size: 15px;
    letter-spacing: 1px;
    margin-top: 30px;
    font-family: sans-serif;
}

.form input:focus{
    outline: none;
}

::placeholder{
    color: #fff;
    font-family: Arial;
}

.btnn{
  width: 187px;
    height: 40px;
    position: relative;
    left: 51px;
    background: #ff7200;
    border: none;
    margin-top: 30px;
    font-size: 18px;
    border-radius: 10px;
    cursor: pointer;
    color: #fff;
    transition: 0.4s ease;
}
.btnn:hover{
    background: #fff;
    color: #ff7200;
}
.btnn a{
    text-decoration: none;
    color: #000;
    font-weight: bold;
}
.form .link{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 17px;
    padding-top: 20px;
    text-align: center;
}
.form .link a{
    text-decoration: none;
    color: #ff7200;
}
.liw{
    padding-top: 15px;
    padding-bottom: 10px;
    text-align: center;
}
.icons a{
    text-decoration: none;
    color: #fff;
}
.icons ion-icon{
    color: #fff;
    font-size: 30px;
    padding-left: 14px;
    padding-top: 5px;
    transition: 0.3s ease;
}
.icons ion-icon:hover{
    color: #ff7200;
}
.alert {
  background-color: black;
  color: red;
  border: 1px solid black;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
}
</style>

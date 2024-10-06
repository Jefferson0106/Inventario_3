
<template>
    <div>
  <nav class="navbar">
    <div class="navbar-logo">
      <img src="../assets/Logo/logo.png" alt="Logo">
    </div>
    <ul class="navbar-links">
      <li><a href="#home">Inicio</a></li>
      <li><a href="#historia">Historia</a></li>
      <li><a href="#conocenos">Conócenos</a></li>
      <li><a href="#mision">Mision</a></li>
      <li><a href="#vision">vision</a></li>
      <li><a href="#portafolio">portafolio</a></li>
      <li><a href="#contact">Contáctanos</a></li>
    </ul>
    <div class="navbar-login">
      <button @click="login">Iniciar sesión</button>
    </div>
  </nav>
  <LeaderAr/>
  <HistoriaComp/>
  <ConocenosCom/>
  <MisionCom/>
  <VisionCom/>
  <PortafolioCom/>
  <FooterVue/>
</div>
</template>

<script>
import LeaderAr from '@/components/LeaderAr.vue'
import HistoriaComp from '@/components/HistoriaComp.vue'
import ConocenosCom from '@/components/ConocenosCom.vue'
import MisionCom from '@/components/MisionCom.vue'
import VisionCom from '@/components/VisionCom.vue'
import PortafolioCom from '@/components/PortafolioCom.vue'
import FooterVue from '@/components/FooterVue.vue'
export default {
  name: 'HomeView',
  components: {
    LeaderAr,
    HistoriaComp,
    ConocenosCom,
    MisionCom,
    VisionCom,
    PortafolioCom,
    FooterVue
  },
  methods:{
     login(){
      this.$router.push({ path: "/login" })
     }
  }
}
</script>



<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: white;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

.navbar-logo img {
  height: 50px;
}

.navbar-links {
  display: flex;
  list-style: none;
}

.navbar-links li {
  margin: 0 15px;
}

.navbar-links a {
  color: white;
  text-decoration: none;
  font-size: 23px;
  position: relative;
  top: 10px;
}

.navbar-links a:hover {
  text-decoration: underline;
}

.navbar-login button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #555;
  color: white;
  border: none;
  cursor: pointer;
}

.navbar-login button:hover {
  background-color: #777;
}
</style>

<template>
    <div>
      <section id="usuario">
        <img class="flecha" src="../assets/icono/flecha.png" @click="flecha">
        <div class="project-bg">
          <div class="container">
            <div class="form-container">
              <form @submit.prevent="showModal">
                <div class="input-group">
                  
                    <input type="text" id="nombreCompleto" name="nombreCompleto" placeholder="Nombre De Su Categoria" required v-model="form.nombre">
                </div>
                
                <VueSimpleAlert />
                <button type="submit">ACTUALIZAR LA COLOR</button>
               
              </form>
            </div>
          </div>
  
          <div v-if="isModalVisible" class="modal">
            <div class="modal-content">
              <p>¿Estás seguro de que quieres guardar los cambios?</p>
              <button @click="submitForm">Aceptar</button>
              <button @click="hideModal">Cancelar</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
import axios from 'axios';
import VueSimpleAlert from 'vue-simple-alert';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default {
  name: "EditarUsuario",
  data() {
    return {
      form: {
        idColor: null, // Asegúrate de inicializar el ID
        nombre: '',
      },
      rolOptions: null,
      selectedRol: null,
      isModalVisible: false,
    };
  },
  components: {
    vSelect,
    VueSimpleAlert,
  },
  mounted() {
    this.cargarRoles();
    this.cargarDatosUsuario(); // Cargar los datos del usuario al montar el componente
  },
  methods: {
    async cargarRoles() {
      try {
        const response = await axios.get("https://localhost:7061/api/Role/Lista");
        this.rolOptions = response.data.response.map(rol => ({
          id: rol.idRol,
          nombreRol: rol.nombreRol
        }));
      } catch (error) {
        console.error('Error al cargar los roles:', error);
      }
    },
    async cargarDatosUsuario() {
      const idColor = this.$route.params.idColor; // Suponiendo que pasas el ID del usuario por la URL
      try {
        const response = await axios.get(`https://localhost:7061/api/Colore/Obtener/${idColor}`);
        this.form = response.data.response;
        this.selectedRol = this.rolOptions.find(rol => rol.id === this.form.idRol); // Asegúrate de que coincidan los IDs
      } catch (error) {
        console.error('Error al cargar los datos del Su Color:', error);
      }
    },
    showModal() {
      this.isModalVisible = true;
    },
    hideModal() {
      this.isModalVisible = false;
    },

    flecha(){
      this.$router.push('/ColorTable'); // Ajusta la ruta de redirección según sea necesario
      },
    async submitForm() {
      try {
        // Verifica si se ha seleccionado un rol válido
        if (this.selectedRol && this.selectedRol.id) {
          this.form.idRol = this.selectedRol.id; // Accede a la propiedad id, no idRol
        } else {
          this.form.idRol = ""; // O lo puedes dejar vacío si es necesario
        }

        // Verifica qué valor tiene el idRol antes de enviarlo
        console.log("idRol a enviar:", this.form.idRol);

        // Realiza la solicitud PUT enviando el objeto form
        await axios.put(`https://localhost:7061/api/Colore/Editar`, this.form);
        
        this.$alert('Categoria actualizado correctamente!');
        this.$router.push('ColorTable');
      } catch (error) {
        console.error('Error al actualizar Su Color', error);
        this.$alert('Ocurrió un error al actualizar Su Color');
      } finally {
        this.hideModal();
      }
    }
  }
}
</script>


<style scoped>
/* Styles from your original code */
.form-container {
  position: relative;
  text-align: center;
  left: 84px;
  top: 30px;

  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 1200px;
  height: 420px;
  max-width: 90%; /* Se asegura de que se vea bien en pantallas pequeñas */
}

.flecha{
    width: 5%;
    position: relative;
    top: 7px;
    left: 893px;
    cursor: pointer;
    
  }
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}
.modal-content {
  width: 50%;
  position: relative;
  left: 68px;

  background-color: white;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
}
.modal-content button {
  margin: 10px;
  display: inline-block;
  border-radius: 10px;
  top: 7px;
 
}
p{
  color: #000;
}
input, textarea {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  color: #000;
}
textarea {
  height: 100px;
}
button {
  width: 20%;
  padding: 10px;
  background-color: #fff; /* Fondo blanco */
  color: rgba(3, 15, 39, 0.8); /* Texto en azul */
  border: 2px solid #007BFF; /* Borde azul */
  border-radius: 5px; /* Bordes redondeados */
  font-weight: bold; /* Texto en negrita */
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  top: 87px;
  left: -2px;
  position: relative;
}
button:hover {
  background-color: #007BFF; /* Fondo azul al pasar el ratón */
  color: #fff; /* Texto blanco al pasar el ratón */
}
.input-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
input[type="text"], input[type="email"], input[type="tel"] {
  flex: 1;
}
.v-select {
  margin: 10px 0;
}
.v-select .dropdown-toggle {
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 10px;
  width: 100%;
  color: #000;
  font-size: 14px;
}
.v-select .dropdown-menu {
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 5px;
}
.v-select .dropdown-item {
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}
.v-select .dropdown-item:hover {
  background-color: #007BFF;
  color: #fff;
}
.v-select .selected-tag {
  background-color: #007BFF;
  color: #fff;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 5px;
}
@media only screen and (min-width: 768px) and (max-width: 991px) {
  .form-container {
    position: relative;
    text-align: center;
    left: 27px;
    top: 31px;
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 1200px;
    height: 420px;
    max-width: 90%; /* Se asegura de que se vea bien en pantallas pequeñas */
  }
  button {
    width: 47%;
  }
}
@media only screen and (max-width: 767px) {
  .form-container {
    position: relative;
    text-align: center;
    left: 27px;
    top: 31px;
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 1200px;
    height: 420px;
    max-width: 90%; /* Se asegura de que se vea bien en pantallas pequeñas */
  }
  button {
    width: 47%;
  }
}
</style>
<template>
  <div>
    <section id="usuario">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
      <img class="flecha" src="../assets/icono/flecha.png" @click="flecha">
      <div class="project-bg">
        <div class="container">
          <div class="form-container">
            <form @submit.prevent="showModal">
              <div class="input-group">
                <div class="input-with-icon">
                  <i class="fa-solid fa-user"></i>
                  <input type="text" id="nombreCompleto" name="nombreCompleto" placeholder="Nombre Completo" required v-model="form.nombreCompleto">
                </div>
                <div class="input-with-icon">
                  <i class="fa-solid fa-user"></i>
                  <input type="text" id="apellidoCompleto" name="apellidoCompleto" placeholder="Apellido Completo" required v-model="form.apellidoCompleto">
                </div>
                <div class="input-with-icon">
                  <i class="fa-solid fa-envelope"></i>
                  <input type="email" id="correo" name="correo" placeholder="Correo" required v-model="form.correo">
                </div>
                <div class="input-with-icon">
                  <i class="fa-solid fa-lock"></i>
                  <input type="password" id="contrasena" name="contrasena" placeholder="Contraseña" required v-model="form.contrasena">
                </div>
                <div class="input-with-icon">
                  <i class="fa-solid fa-id-card"></i>
                  <input 
                    type="text" 
                    id="cedula" 
                    name="cedula" 
                    placeholder="Cédula" 
                    required 
                    v-model="form.cedula"
                    @input="validateCedula"
                    maxlength="10"
                  >
                </div>
                <div class="input-with-icon">
                  <i class="fa-solid fa-phone"></i>
                  <input 
                    type="text" 
                    id="telefono" 
                    name="telefono" 
                    placeholder="Teléfono" 
                    required 
                    v-model="form.telefono"
                    @input="validateTelefono"
                    maxlength="11"
                  >
                </div>
                
                <!-- Componente v-select para seleccionar un rol -->
                <v-select 
                  class="select" 
                  v-if="rolOptions" 
                  label="nombreRol" 
                  :options="rolOptions" 
                  v-model="selectedRol"
                  placeholder="Selecciona un rol"
                ></v-select>
              </div>
              <VueSimpleAlert />
              <button type="submit">CREAR USUARIO</button>
            </form>
          </div>
        </div>
        <div v-if="isModalVisible" class="modal">
          <div class="modal-content">
            <p>¿Estás seguro de que quieres enviar el formulario?</p>
            <button @click="submitForm">Aceptar</button>
            <button @click="hideModal">Cancelar</button>
          </div>
        </div>
        <div v-if="isThankYouModalVisible" class="modal">
          <div class="modal-content">
            <i class="fa-solid fa-circle-check" style="color: green; font-size: 5em;"></i>
            <p>Gracias por crear el usuario, se ha registrado correctamente.</p>
            <button @click="hideThankYouModal">Cerrar</button>
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
  name: "UsuarioNuevo",
  data() {
    return {
      form: {
        nombreCompleto: '',
        apellidoCompleto: '',
        correo: '',
        contrasena: '',
        cedula: '',
        telefono: '',
        idRol: null,
        fechaCreacion: new Date().toISOString()
      },
      rolOptions: null,
      selectedRol: null,
      isModalVisible: false,
      isThankYouModalVisible: false
    };
  },
  components: {
    vSelect,
    VueSimpleAlert,
  },
  mounted() {
    let direccion = "https://localhost:7061/api/Role/Lista";
    axios.get(direccion).then(data => {
      this.rolOptions = data.data.response.map(rol => ({
        id: rol.idRol,
        nombreRol: rol.nombreRol
      }));
    }).catch(error => {
      console.error('Error al cargar los roles:', error);
    });
  },
  methods: {
    flecha() {
      this.$router.push('/table-list');
    },
    showModal() {
      this.isModalVisible = true;
    },
    hideModal() {
      this.isModalVisible = false;
    },
    showThankYouModal() {
      this.isThankYouModalVisible = true;
    },
    hideThankYouModal() {
      this.isThankYouModalVisible = false;
    },
    async submitForm() {
      try {
        this.form.idRol = this.selectedRol ? this.selectedRol.id : null;
        const response = await axios.post("https://localhost:7061/api/Usuario/Guardar", this.form);
        console.log(response.data);
        this.showThankYouModal();
        this.mostrarAlerta();
        this.$router.push('table-list');
      } catch (error) {
        console.error(error);
        this.$alert('Ocurrió un error al guardar el usuario.');
      } finally {
        this.hideModal();
      }
    },
    mostrarAlerta() {
      this.$alert('¡El Usuario ha sido creado!');
    },
    validateCedula() {
      let input = this.form.cedula.replace(/\D/g, ''); // Remover todo lo que no sea número
      if (input.length > 2) {
        input = input.substring(0, 2) + '.' + input.substring(2);
      }
      if (input.length > 6) {
        input = input.substring(0, 6) + '.' + input.substring(6);
      }
      this.form.cedula = input.substring(0, 10); // Limitar a 10 caracteres en total
    },
    validateTelefono() {
      this.form.telefono = this.form.telefono.replace(/[^0-9]/g, ''); // Solo permite números
    }
  }
};
</script>
  
<style scoped>
.input-with-icon {
  position: relative;
  margin-bottom: 10px;
}
.input-with-icon i {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}
.input-with-icon input {
  padding-left: 35px; /* Espacio para el ícono */
}

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
  height: 381px;
  max-width: 90%;
}

.flecha {
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
}

p {
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

button {
  width: 20%;
  padding: 10px;
  background-color: #fff;
  color: rgba(3, 15, 39, 0.8);
  border: 2px solid #007BFF;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

button:hover {
  background-color: #007BFF;
  color: #fff;
}

.input-group {
  display: flex;
  justify-content: space-between;
  gap: 0px;
  position: relative;
  top: -18px;
  margin-bottom: 20px;
}

.input-group .select {
  width: 30%;
}



.select {
  position: relative;
  top: -10px;
}

</style>
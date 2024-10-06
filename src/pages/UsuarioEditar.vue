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
              <button type="submit">ACTUALIZAR USUARIO</button>
            </form>
          </div>
        </div>
        <div v-if="isModalVisible" class="modal">
          <div class="modal-content">
            <p>¿Estás seguro de que quieres Acatualizar el formulario?</p>
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
import 'vue-select/dist/vue-select.css';

export default {
  name: "EditarUsuario",
  data() {
    return {
      form: {
        idUsuario: null, // Asegúrate de inicializar el ID
        nombreCompleto: '',
        apellidoCompleto: '',
        correo: '',
        contrasena: '',
        cedula: '',
        telefono: '',
        idRol: '',
        fechaCreacion: new Date().toISOString() // fecha actual en formato ISO
      },
      rolOptions: null,
      selectedRol: null,
      isModalVisible: false,
    };
  },
  components: {
    VueSimpleAlert,
  },
  mounted() {
    this.cargarRoles();
    this.cargarDatosUsuario(); // Cargar los datos del usuario al montar el componente
  },
  methods: {
    
    flecha(){
        this.$router.push('/table-list'); // Ajusta la ruta de redirección según sea necesario
      },
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
      const idUsuario = this.$route.params.idUsuario; // Suponiendo que pasas el ID del usuario por la URL
      try {
        const response = await axios.get(`https://localhost:7061/api/Usuario/Obtener/${idUsuario}`);
        this.form = response.data.response;
        this.selectedRol = this.rolOptions.find(rol => rol.id === this.form.idRol); // Asegúrate de que coincidan los IDs
      } catch (error) {
        console.error('Error al cargar los datos del usuario:', error);
      }
    },
    showModal() {
      this.isModalVisible = true;
    },
    hideModal() {
      this.isModalVisible = false;
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
        await axios.put(`https://localhost:7061/api/Usuario/Editar`, this.form);
        
        this.$alert('¡Usuario actualizado correctamente!');
        this.$router.push('/table-list');
      } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        this.$alert('Ocurrió un error al actualizar el usuario.');
      } finally {
        this.hideModal();
      }
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
}
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
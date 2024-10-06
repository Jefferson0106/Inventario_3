<template>
  <div>
    <section id="almacen">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
      <img class="flecha" src="../assets/icono/flecha.png" @click="flecha">
      <div class="project-bg">
        <div class="container">
          <div class="form-container">
            <form @submit.prevent="showModal">
              <div class="input-group">
                <div class="input-with-icon">
                  <i class="fa-solid fa-warehouse"></i>
                  <input type="text" id="nombreAlmacen" name="nombreAlmacen" placeholder="Nombre del Almacén" required v-model="form.nombreAlmacen">
                </div>
                <div class="input-with-icon">
                  <i class="fa-solid fa-location-dot"></i>
                  <input type="text" id="ubicacion" name="ubicacion" placeholder="Ubicación" required v-model="form.ubicacion">
                </div>
                <div class="input-with-icon">
                  <i class="fa-solid fa-pencil-alt"></i>
                  <textarea id="descripcion" name="descripcion" placeholder="Descripción" required v-model="form.descripcion"></textarea>
                </div>
                <div class="input-with-icon">
                  <i class="fa-solid fa-user"></i>
                  <select id="idUsuario" name="idUsuario" v-model="form.idUsuario" required>
                    <option value="" disabled>Selecciona un usuario</option>
                    <option v-for="usuario in usuarios" :key="usuario.idUsuario" :value="usuario.idUsuario">
                      {{ usuario.nombreCompleto }}
                    </option>
                  </select>
                </div>
              </div>
              <VueSimpleAlert />
              <button type="submit">ACTUALIZAR ALMACÉN</button>
            </form>
          </div>
        </div>
        <div v-if="isModalVisible" class="modal">
          <div class="modal-content">
            <p>¿Estás seguro de que quieres actualizar este almacén?</p>
            <button @click="submitForm">Aceptar</button>
            <button @click="hideModal">Cancelar</button>
          </div>
        </div>
        <div v-if="isThankYouModalVisible" class="modal">
          <div class="modal-content">
            <i class="fa-solid fa-circle-check" style="color: green; font-size: 5em;"></i>
            <p>Gracias por actualizar el almacén, se ha guardado correctamente.</p>
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

export default {
  name: "EditarAlmacen",
  data() {
    return {
      form: {
        idAlmacen: null, // Inicializar el ID
        nombreAlmacen: '',
        ubicacion: '',
        descripcion: '',
        idUsuario: null, // Asegúrate de inicializar esto como null
        fechaCreacion: new Date().toISOString(), // Fecha actual
      },
      usuarios: [], // Nuevo campo para almacenar la lista de usuarios
      isModalVisible: false,
      isThankYouModalVisible: false,
    };
  },
  components: {
    VueSimpleAlert,
  },
  mounted() {
    this.cargarDatosAlmacen(); // Cargar los datos al montar el componente
    this.cargarUsuarios(); // Cargar la lista de usuarios
  },
  methods: {
    flecha() {
      this.$router.push('/AlmacenTable'); // Ajustar la ruta según necesidad
    },
    async cargarDatosAlmacen() {
      const idAlmacen = this.$route.params.idAlmacen; // Obtener el ID de la URL
      try {
        const response = await axios.get(`https://localhost:7061/api/Almacene/Obtener/${idAlmacen}`);
        this.form = response.data.response; // Asignar los datos obtenidos
      } catch (error) {
        console.error('Error al cargar los datos del almacén:', error);
      }
    },
    async cargarUsuarios() {
      try {
        const response = await axios.get(`https://localhost:7061/api/Usuario/Lista`);
        this.usuarios = response.data.response; // Asignar la lista de usuarios
      } catch (error) {
        console.error('Error al cargar la lista de usuarios:', error);
      }
    },
    showModal() {
      this.isModalVisible = true;
    },
    hideModal() {
      this.isModalVisible = false;
    },
    hideThankYouModal() {
      this.isThankYouModalVisible = false;
    },
    async submitForm() {
      try {
        await axios.put(`https://localhost:7061/api/Almacene/Editar`, this.form);
        this.$alert('¡Almacén actualizado correctamente!');
        this.$router.push('/AlmacenTable');
      } catch (error) {
        console.error('Error al actualizar el almacén:', error);
        this.$alert('Ocurrió un error al actualizar el almacén.');
      } finally {
        this.hideModal();
      }
    }
  }
}
</script>

<style scoped>
.input-with-icon {
  position: relative;
  margin-bottom: 10px; /* Espacio entre campos */
}

.input-with-icon i {
  position: absolute;
  left: 10px; /* Espacio desde el borde izquierdo del campo */
  top: 50%; /* Centra verticalmente el ícono */
  transform: translateY(-50%); /* Alinea verticalmente el ícono */
  color: #666;
  pointer-events: none; /* Asegura que el ícono no interfiera con la interacción del campo */
}

.input-with-icon input,
.input-with-icon textarea,
.input-with-icon select {
  padding-left: 35px; /* Espacio para el ícono */
  width: 100%; /* Asegura que el campo ocupe todo el ancho disponible */
  border-radius: 5px;
  border: 1px solid #ccc;
  color: #000;
  box-sizing: border-box; /* Incluye padding y border en el ancho total del campo */
}

.input-with-icon textarea {
  resize: vertical; /* Permite cambiar el tamaño del textarea verticalmente */
  height: 100px; /* Ajusta la altura del textarea */
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
  height: 478px;
  max-width: 90%; /* Se asegura de que se vea bien en pantallas pequeñas */
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

input,
textarea,
select {
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
  background-color: #fff; /* Fondo blanco */
  color: rgba(3, 15, 39, 0.8); /* Texto en azul */
  border: 2px solid #007BFF; /* Borde azul */
  border-radius: 5px; /* Bordes redondeados */
  font-weight: bold; /* Texto en negrita */
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  position: relative;
}

button:hover {
  background-color: #007BFF; /* Fondo azul al pasar el ratón */
  color: #fff; /* Texto blanco al pasar el ratón */
}

.input-group {
  display: flex;
  flex-direction: column; /* Alinea los campos verticalmente */
  gap: 0px; /* Espacio entre campos */
}

@media only screen and (min-width: 768px) and (max-width: 991px) {
  .form-container {
    left: 27px;
    top: 31px;
  }
  button {
    width: 47%;
  }
}

@media only screen and (max-width: 767px) {
  .form-container {
    left: 27px;
    top: 31px;
  }
  button {
    width: 47%;
  }
}
</style>
<template>
    <div>
      <section id="usuario">
        <img class="flecha" src="../assets/icono/flecha.png" @click="flecha">
        <div class="project-bg">
          <div class="container">
            <div class="form-container">
              <form @submit.prevent="showModal">
                <div class="input-group">
                  <input type="text" id="nombreCompleto" name="nombreCompleto" placeholder="Nombre Del Perfil" required v-model="form.nombreRol">
                  <textarea id="mensaje" name="mensaje" placeholder="Descripcion (Perfil)" required v-model="form.descripcion"></textarea>
  
                  <!-- Componente v-select para seleccionar permisos -->
                  <v-select 
          class="select" 
          v-if="rolOptions" 
          multiple 
          label="nombre" 
          :options="rolOptions" 
          v-model="Relacione" 
          :reduce="item => item.idPermiso"
>
        </v-select>
                </div>
                <VueSimpleAlert />
                <button type="submit" v-on:click="editar">Actualizar Perfil</button>
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
              <p>Gracias por crear el Perfil, se ha registrado correctamente.</p>
              <button @click="hideThankYouModal">Cerrar</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  
  import axios from 'axios';
  import vSelect from 'vue-select';
  
  export default {
    name: "RolEditar",
    components: {
      vSelect
    },
    data() {
      return {
        idRol: null,
        currentRol: null,
        form: {
          idRol: this.$route.params.idRol,
          nombreRol: "",
          descripcion: "",
        },
        rolOptions: null,
        rolRelations: null,
        Relacione: [],
      };
    },
    async mounted() {
      this.idRol = this.$route.params.idRol;
  
      try {
        // Obtener los datos del rol
        const rolResponse = await axios.get(`https://localhost:7061/api/Role/Obtener/${this.idRol}`);
        this.currentRol = rolResponse.data.response;
        this.form.nombreRol = this.currentRol.nombreRol;
        this.form.descripcion = this.currentRol.descripcion; // Asegúrate de que 'descripcion' esté en la respuesta
  
        // Obtener opciones de permisos
        const permisosResponse = await axios.get("https://localhost:7061/api/Permiso/Lista");
        this.rolOptions = permisosResponse.data.response;
  
        // Obtener relaciones del rol
        const relacionesResponse = await axios.get(`https://localhost:7061/api/RolPermiso/Lista`);
        this.rolRelations = relacionesResponse.data.response.filter(element => element.idRol === this.idRol);
        this.Relacione = this.rolRelations.map(element => element.idPermiso);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    },
    methods: {
      flecha(){
        this.$router.push('/RolTable'); // Ajusta la ruta de redirección según sea necesario
      },

      async editar() {
        try {
          // Actualizar el rol
          await axios.put('https://localhost:7061/api/Role/Editar', this.form);
  
          // Eliminar relaciones existentes
          for (const relation of this.rolRelations) {
            await axios.delete(`https://localhost:7061/api/RolPermiso/Eliminar/${relation.idRolPermiso}`);
          }
  
          // Guardar nuevas relaciones
          for (const module of this.Relacione) {
            await axios.post(`https://localhost:7061/api/RolPermiso/Guardar`, {
              idRol: this.idRol,
              idPermiso: module
            });
          }
  
          this.$router.go(-1);
        } catch (error) {
          console.error('Error al actualizar el rol:', error);
        }
      },
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
  textarea {
    height: 100px;
}
  input, textarea {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #ccc;
    color: #000;
  }
  .flecha{
    width: 5%;
    position: relative;
    top: 7px;
    left: 893px;
    cursor: pointer;
    
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
    top: 17px;
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

/* Contenedor del v-select */
.v-select {
  margin: 10px 0;
  width: 100%; /* Ajusta esto si quieres cambiar el ancho del select */
  font-family: 'Arial', sans-serif;
  color: #333;
}

.v-select .vs__dropdown-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border: 2px solid #007BFF; /* Borde azul */
  border-radius: 5px;
  padding: 12px;
  width: 100%;
  font-size: 14px;
  color: #333;
  transition: border 0.3s ease, background-color 0.3s ease;
}

.v-select .vs__dropdown-toggle:hover {
  background-color: #f2f7fc; /* Color de fondo al hacer hover */
  border-color: #0056b3; /* Borde más oscuro al hacer hover */
}

.v-select .vs__dropdown-toggle::after {
  content: '▼';
  font-size: 12px;
  color: #007BFF;
  margin-left: 10px;
  transition: transform 0.3s ease;
}

.vs__open-indicator {
  margin-left: 8px;
  color: #007BFF;
  transition: transform 0.3s ease;
}

.vs__dropdown-open .vs__dropdown-toggle::after {
  transform: rotate(180deg);
}

.v-select .dropdown-menu {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 200px; /* Limitar la altura del menú */
  overflow-y: auto;
  padding: 5px;
  z-index: 1000;
}

.v-select .vs__dropdown-option {
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.v-select .vs__dropdown-option:hover {
  background-color: #007BFF;
  color: #fff;
}

.v-select .vs__dropdown-option--selected {
  background-color: #e0efff;
  font-weight: bold;
}

.v-select .selected-tag {
  background-color: #007BFF;
  color: #fff;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 5px;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
}

.v-select .selected-tag .close-icon {
  margin-left: 10px;
  font-size: 12px;
  cursor: pointer;
  color: white;
}

/* Personalización del placeholder */
.vs__search::placeholder {
  color: #888;
  font-style: italic;
}

.vs__clear {
  color: #ccc;
}

.vs__clear:hover {
  color: #007BFF;
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